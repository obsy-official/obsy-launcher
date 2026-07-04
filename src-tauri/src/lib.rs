pub mod state;
pub mod auth;
pub mod minecraft;
pub mod msa;

use std::sync::Mutex;
use tauri::{AppHandle, Manager, State, Emitter};
use crate::state::LauncherState;
use crate::auth::{Profile, ProfileStore};
use crate::minecraft::models::MinecraftVersion;

pub struct AppState {
    pub launcher_state: Mutex<LauncherState>,
    pub profile_store: ProfileStore,
}

#[tauri::command]
fn get_launcher_state(state: State<'_, AppState>) -> Result<LauncherState, String> {
    let state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    Ok(state.clone())
}

#[tauri::command]
fn update_launcher_state(app: AppHandle, new_state: LauncherState, state: State<'_, AppState>) -> Result<(), String> {
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    *current_state = new_state.clone();
    current_state.normalize();
    current_state.save(&app)?;
    Ok(())
}

#[tauri::command]
fn get_profiles(state: State<'_, AppState>) -> Result<Vec<Profile>, String> {
    Ok(state.profile_store.load())
}

#[tauri::command]
fn add_offline_profile(username: String, state: State<'_, AppState>) -> Result<Vec<Profile>, String> {
    let mut profiles = state.profile_store.load();
    let profile = Profile::new_offline(username);
    if let Some(existing) = profiles.iter_mut().find(|p| p.id == profile.id || p.username == profile.username) {
        *existing = profile;
    } else {
        profiles.push(profile);
    }
    state.profile_store.save(&profiles)?;
    Ok(profiles)
}

#[tauri::command]
fn select_profile(id: String, state: State<'_, AppState>, app: AppHandle) -> Result<(), String> {
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    current_state.selected_profile_id = Some(id);
    current_state.save(&app)?;
    Ok(())
}

#[tauri::command]
fn remove_profile(id: String, state: State<'_, AppState>, app: AppHandle) -> Result<Vec<Profile>, String> {
    let mut profiles = state.profile_store.load();
    profiles.retain(|p| p.id != id);
    state.profile_store.save(&profiles)?;
    
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    if current_state.selected_profile_id.as_ref() == Some(&id) {
        current_state.selected_profile_id = None;
        current_state.save(&app)?;
    }
    
    Ok(profiles)
}

#[tauri::command]
async fn get_versions(state: State<'_, AppState>) -> Result<Vec<MinecraftVersion>, String> {
    let mut remote_versions = crate::minecraft::versions::get_mojang_versions().await.unwrap_or_default();
    let local_versions = crate::minecraft::versions::get_local_versions().unwrap_or_default();
    
    let current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    
    for local in local_versions {
        if let Some(existing) = remote_versions.iter_mut().find(|v| v.id == local.id) {
            existing.is_local = true;
        } else {
            remote_versions.push(local);
        }
    }
    
    remote_versions.retain(|v| {
        if v.is_local {
            return true;
        }
        match v.r#type.as_str() {
            "release" => current_state.release_filter,
            "snapshot" => current_state.snapshot_filter,
            "old_beta" | "old_alpha" => current_state.legacy_filter,
            _ => true,
        }
    });

    Ok(remote_versions)
}

#[tauri::command]
fn select_version(id: String, state: State<'_, AppState>, app: AppHandle) -> Result<(), String> {
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    current_state.selected_version_id = Some(id);
    current_state.save(&app)?;
    Ok(())
}

#[derive(Clone, serde::Serialize)]
struct LaunchProgressPayload {
    status: String,
    progress: f32,
}

#[tauri::command]
async fn launch_game(
    profile_id: String,
    version_id: String,
    state: State<'_, AppState>,
    app: AppHandle,
) -> Result<(), String> {
    let (launcher_state, profile) = {
        let l_state = state.launcher_state.lock().map_err(|e| e.to_string())?.clone();
        let profiles = state.profile_store.load();
        let profile = profiles.into_iter().find(|p| p.id == profile_id).ok_or("Profile not found")?;
        (l_state, profile)
    };

    let auth = if profile.microsoft {
        open_launcher::auth::Auth::new(
            "msa".to_string(),
            "{}".to_string(),
            profile.username.clone(),
            profile.id.clone(),
            profile.access_token.unwrap_or_default(),
        )
    } else {
        open_launcher::auth::OfflineAuth::new(&profile.username)
    };

    let mc_dir = crate::minecraft::versions::get_minecraft_dir();
    let mc_dir_str = mc_dir.to_str().ok_or("Invalid minecraft dir path")?.to_string();

    let java_path = if let Some(path) = &launcher_state.java_path {
        if path.trim().is_empty() {
            crate::minecraft::java::download_java_if_needed(&version_id, &app).await?
        } else {
            path.clone()
        }
    } else {
        crate::minecraft::java::download_java_if_needed(&version_id, &app).await?
    };

    let mut launcher = open_launcher::Launcher::new(
        &mc_dir_str,
        &java_path,
        open_launcher::version::Version {
            minecraft_version: version_id,
            loader: None,
            loader_version: None,
        },
    ).await;

    launcher.auth(auth);
    launcher.custom_resolution(launcher_state.screen_width as i32, launcher_state.screen_height as i32);
    launcher.jvm_arg(&format!("-Xmx{}M", launcher_state.memory_amount));

    if !launcher_state.jvm_arguments.is_empty() {
        for arg in launcher_state.jvm_arguments.split_whitespace() {
            launcher.jvm_arg(arg);
        }
    }

    let mut progress = launcher.on_progress();
    let app_clone = app.clone();

    tokio::spawn(async move {
        while let Ok(prog) = progress.recv().await {
            let percentage = if prog.total > 0 {
                prog.current as f32 / prog.total as f32
            } else {
                0.0
            };
            
            let _ = app_clone.emit("launch-progress", LaunchProgressPayload {
                status: prog.task.clone(),
                progress: percentage,
            });
        }
    });

    app.emit("launch-progress", LaunchProgressPayload {
        status: "installing_version".to_string(),
        progress: 0.1,
    }).map_err(|e| e.to_string())?;
    launcher.install_version().await.map_err(|e| e.to_string())?;

    app.emit("launch-progress", LaunchProgressPayload {
        status: "installing_assets".to_string(),
        progress: 0.3,
    }).map_err(|e| e.to_string())?;
    launcher.install_assets().await.map_err(|e| e.to_string())?;

    app.emit("launch-progress", LaunchProgressPayload {
        status: "installing_libraries".to_string(),
        progress: 0.6,
    }).map_err(|e| e.to_string())?;
    launcher.install_libraries().await.map_err(|e| e.to_string())?;

    app.emit("launch-progress", LaunchProgressPayload {
        status: "launching".to_string(),
        progress: 1.0,
    }).map_err(|e| e.to_string())?;

    let mut child = launcher.launch().map_err(|e| e.to_string())?;

    let app_clone_2 = app.clone();
    let _ = app.emit("launch-progress", LaunchProgressPayload {
        status: "success".to_string(),
        progress: 1.0,
    });

    if launcher_state.close_after_launch {
        if let Some(window) = app.get_webview_window("main") {
            let _ = window.hide();
            
            std::thread::spawn(move || {
                let _ = child.wait();
                let _ = window.show();
                let _ = app_clone_2.emit("launch-progress", LaunchProgressPayload {
                    status: "success".to_string(),
                    progress: 1.0,
                });
            });
        }
    }

    Ok(())
}


#[tauri::command]
async fn start_msa_auth() -> Result<msa::DeviceCodeResponse, String> {
    msa::start_device_code_flow().await
}

#[tauri::command]
async fn poll_msa_auth(
    device_code: String,
    interval: u64,
    state: State<'_, AppState>,
) -> Result<Vec<Profile>, String> {
    let tokens = msa::poll_device_code(&device_code, interval).await?;
    let (xbl_token, uhs) = msa::auth_xbox_live(&tokens.access_token).await?;
    let xsts_token = msa::auth_xsts(&xbl_token).await?;
    let mc_token = msa::auth_minecraft(&uhs, &xsts_token).await?;
    let mc_profile = msa::get_minecraft_profile(&mc_token).await?;

    let mut profiles = state.profile_store.load();
    let profile = Profile {
        id: mc_profile.id,
        username: mc_profile.name,
        microsoft: true,
        skin_png: None,
        slim: false,
        capes: vec![],
        access_token: Some(mc_token),
        refresh_token: Some(tokens.refresh_token),
    };

    if let Some(existing) = profiles.iter_mut().find(|p| p.id == profile.id || p.username == profile.username) {
        *existing = profile;
    } else {
        profiles.push(profile);
    }
    
    state.profile_store.save(&profiles)?;
    Ok(profiles)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle();
            let initial_state = LauncherState::load(handle);
            let profile_store = ProfileStore::new(handle);
            app.manage(AppState {
                launcher_state: Mutex::new(initial_state),
                profile_store,
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_launcher_state,
            update_launcher_state,
            get_profiles,
            add_offline_profile,
            select_profile,
            remove_profile,
            get_versions,
            select_version,
            launch_game,
            start_msa_auth,
            poll_msa_auth
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
