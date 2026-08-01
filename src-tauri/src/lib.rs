pub mod auth;
pub mod minecraft;
pub mod msa;
pub mod open_launcher;
pub mod state;
pub mod wardrobe;

use crate::auth::{Profile, ProfileStore};
use crate::minecraft::models::MinecraftVersion;
use crate::state::LauncherState;
use crate::wardrobe::WardrobeStore;
use std::sync::Mutex;
use tauri::{AppHandle, Emitter, Manager, State};

pub struct AppState {
    pub launcher_state: Mutex<LauncherState>,
    pub profile_store: ProfileStore,
    pub wardrobe_store: WardrobeStore,
}

#[tauri::command]
fn get_launcher_state(state: State<'_, AppState>) -> Result<LauncherState, String> {
    let state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    Ok(state.clone())
}

#[tauri::command]
fn update_launcher_state(
    app: AppHandle,
    new_state: LauncherState,
    state: State<'_, AppState>,
) -> Result<(), String> {
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
fn add_offline_profile(
    username: String,
    state: State<'_, AppState>,
) -> Result<Vec<Profile>, String> {
    let mut profiles = state.profile_store.load();
    let profile = Profile::new_offline(username);
    if let Some(existing) = profiles
        .iter_mut()
        .find(|p| p.id == profile.id || p.username == profile.username)
    {
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
fn remove_profile(
    id: String,
    state: State<'_, AppState>,
    app: AppHandle,
) -> Result<Vec<Profile>, String> {
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
    let mut remote_versions = crate::minecraft::versions::get_mojang_versions()
        .await
        .unwrap_or_default();
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
        let l_state = state
            .launcher_state
            .lock()
            .map_err(|e| e.to_string())?
            .clone();
        let profiles = state.profile_store.load();
        let profile = profiles
            .into_iter()
            .find(|p| p.id == profile_id)
            .ok_or("Profile not found")?;
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
    let mc_dir_str = mc_dir
        .to_str()
        .ok_or("Invalid minecraft dir path")?
        .to_string();

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
            minecraft_version: version_id.clone(),
            loader: None,
            loader_version: None,
        },
    )
    .await;

    let mut iso_dir = mc_dir.clone();
    iso_dir.push("instances");
    iso_dir.push(&version_id);
    launcher.set_execution_directory(iso_dir);

    launcher.auth(auth);
    launcher.custom_resolution(
        launcher_state.screen_width as i32,
        launcher_state.screen_height as i32,
    );
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

            let _ = app_clone.emit(
                "launch-progress",
                LaunchProgressPayload {
                    status: prog.task.clone(),
                    progress: percentage,
                },
            );
        }
    });

    app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "installing_version".to_string(),
            progress: 0.1,
        },
    )
    .map_err(|e| e.to_string())?;
    launcher
        .install_version()
        .await
        .map_err(|e| e.to_string())?;

    app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "installing_assets".to_string(),
            progress: 0.3,
        },
    )
    .map_err(|e| e.to_string())?;
    launcher.install_assets().await.map_err(|e| e.to_string())?;

    app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "installing_libraries".to_string(),
            progress: 0.6,
        },
    )
    .map_err(|e| e.to_string())?;
    launcher
        .install_libraries()
        .await
        .map_err(|e| e.to_string())?;

    app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "launching".to_string(),
            progress: 1.0,
        },
    )
    .map_err(|e| e.to_string())?;

    let mut child = launcher.launch().map_err(|e| e.to_string())?;

    let app_clone_2 = app.clone();
    let _ = app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "success".to_string(),
            progress: 1.0,
        },
    );

    if launcher_state.close_after_launch {
        if let Some(window) = app.get_webview_window("main") {
            let _ = window.hide();

            std::thread::spawn(move || {
                let _ = child.wait();
                let _ = window.show();
                let _ = app_clone_2.emit(
                    "launch-progress",
                    LaunchProgressPayload {
                        status: "success".to_string(),
                        progress: 1.0,
                    },
                );
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
) -> Result<Profile, String> {
    let tokens = msa::poll_device_code(&device_code, interval).await?;
    let (xbl_token, uhs) = msa::auth_xbox_live(&tokens.access_token).await?;
    let xsts_token = msa::auth_xsts(&xbl_token).await?;
    let mc_token = msa::auth_minecraft(&uhs, &xsts_token).await?;
    let mc_profile = msa::get_minecraft_profile(&mc_token).await?;

    let active_skin = mc_profile.skins.iter().find(|s| s.state == "ACTIVE");
    let skin_png = Some(format!("https://mc-heads.net/skin/{}", mc_profile.id));
    let slim = active_skin.map(|s| s.variant == "SLIM").unwrap_or(false);

    let mut profiles = state.profile_store.load();
    let profile = Profile {
        id: mc_profile.id,
        username: mc_profile.name,
        microsoft: true,
        skin_png,
        slim,
        capes: vec![],
        access_token: Some(mc_token),
        refresh_token: Some(tokens.refresh_token),
    };

    if let Some(existing) = profiles
        .iter_mut()
        .find(|p| p.id == profile.id || p.username == profile.username)
    {
        *existing = profile.clone();
    } else {
        profiles.push(profile.clone());
    }

    state.profile_store.save(&profiles)?;
    Ok(profile)
}

#[tauri::command]
fn get_wardrobe(state: State<'_, AppState>) -> Result<Vec<crate::wardrobe::WardrobeSkin>, String> {
    Ok(state.wardrobe_store.load())
}

#[tauri::command]
fn add_skin_to_wardrobe(
    state: State<'_, AppState>,
    file_bytes: Vec<u8>,
    name: String,
    slim: bool,
    profile_id: String,
) -> Result<crate::wardrobe::WardrobeSkin, String> {
    state
        .wardrobe_store
        .add_skin(file_bytes, name, slim, profile_id)
}

#[tauri::command]
fn remove_skin_from_wardrobe(state: State<'_, AppState>, id: String) -> Result<(), String> {
    state.wardrobe_store.remove_skin(&id)
}

#[tauri::command]
async fn apply_skin(
    state: State<'_, AppState>,
    profile_id: String,
    skin_id: String,
) -> Result<(), String> {
    let mut profiles = state.profile_store.load();
    let profile = profiles
        .iter_mut()
        .find(|p| p.id == profile_id)
        .ok_or("Profile not found")?;

    let skins = state.wardrobe_store.load();
    let skin = skins
        .iter()
        .find(|s| s.id == skin_id)
        .ok_or("Skin not found")?;

    if profile.microsoft {
        let access_token = profile
            .access_token
            .clone()
            .ok_or("No access token for profile")?;
        let variant = if skin.slim { "slim" } else { "classic" };

        use base64::{engine::general_purpose, Engine as _};
        let b64_str = skin
            .base64_data
            .trim_start_matches("data:image/png;base64,");
        let bytes = general_purpose::STANDARD
            .decode(b64_str)
            .map_err(|e| e.to_string())?;

        let temp_dir = std::env::temp_dir();
        let temp_file = temp_dir.join(format!("{}.png", skin.id));
        std::fs::write(&temp_file, &bytes).map_err(|e| e.to_string())?;

        crate::msa::upload_minecraft_skin(&access_token, variant, temp_file.to_str().unwrap())
            .await?;
        let _ = std::fs::remove_file(temp_file);

        // Refetch profile to update slim variant correctly if needed
        let mc_profile = crate::msa::get_minecraft_profile(&access_token).await?;
        let active_skin = mc_profile.skins.iter().find(|s| s.state == "ACTIVE");
        if let Some(active) = active_skin {
            profile.slim = active.variant == "SLIM";
        } else {
            profile.slim = skin.slim;
        }
        // Always use the local base64 data for the UI to avoid CORS and caching delays
        profile.skin_png = Some(skin.base64_data.clone());
    } else {
        profile.skin_png = Some(skin.base64_data.clone());
        profile.slim = skin.slim;
    }

    state.profile_store.save(&profiles)?;
    Ok(())
}

#[tauri::command]
async fn refresh_profile_skin(
    state: State<'_, AppState>,
    profile_id: String,
) -> Result<(), String> {
    let mut profiles = state.profile_store.load();
    let profile = profiles
        .iter_mut()
        .find(|p| p.id == profile_id)
        .ok_or("Profile not found")?;

    if profile.microsoft {
        if let Ok(Some((base64_data, slim))) =
            crate::msa::fetch_public_skin_base64(&profile.id).await
        {
            profile.skin_png = Some(base64_data);
            profile.slim = slim;
            state.profile_store.save(&profiles)?;
        }
    } else {
        let client = reqwest::Client::new();
        if let Ok(res) = client
            .get(&format!("https://mc-heads.net/skin/{}", profile.username))
            .send()
            .await
        {
            if res.status().is_success() {
                if let Ok(bytes) = res.bytes().await {
                    use base64::{engine::general_purpose, Engine as _};
                    profile.skin_png = Some(format!(
                        "data:image/png;base64,{}",
                        general_purpose::STANDARD.encode(&bytes)
                    ));
                    profile.slim = false; // default to classic
                    state.profile_store.save(&profiles)?;
                }
            }
        }
    }
    Ok(())
}

#[tauri::command]
async fn refresh_profile_token(
    state: State<'_, AppState>,
    profile_id: String,
) -> Result<(), String> {
    let mut profiles = state.profile_store.load();
    let profile = profiles
        .iter_mut()
        .find(|p| p.id == profile_id)
        .ok_or("Profile not found")?;

    if profile.microsoft {
        if let Some(refresh_token) = &profile.refresh_token {
            if let Ok(new_msa_tokens) = crate::msa::refresh_msa_token(refresh_token).await {
                if let Ok((xbl_token, uhs)) =
                    crate::msa::auth_xbox_live(&new_msa_tokens.access_token).await
                {
                    if let Ok(xsts_token) = crate::msa::auth_xsts(&xbl_token).await {
                        if let Ok(mc_token) = crate::msa::auth_minecraft(&uhs, &xsts_token).await {
                            profile.access_token = Some(mc_token);
                            profile.refresh_token = Some(new_msa_tokens.refresh_token);
                            let _ = state.profile_store.save(&profiles);
                        }
                    }
                }
            }
        }
    }
    Ok(())
}

#[tauri::command]
fn open_version_folder(
    version_id: String,
    app: tauri::AppHandle,
) -> Result<(), String> {
    use tauri_plugin_opener::OpenerExt;

    let mut mc_dir = crate::minecraft::versions::get_minecraft_dir();

    mc_dir.push("instances");
    mc_dir.push(&version_id);

    if !mc_dir.exists() {
        let _ = std::fs::create_dir_all(&mc_dir);
    }

    app.opener()
        .open_path(mc_dir.to_string_lossy().to_string(), None::<&str>)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle();
            let initial_state = LauncherState::load(handle);
            let profile_store = ProfileStore::new(handle);
            let wardrobe_store = WardrobeStore::new(handle);
            app.manage(AppState {
                launcher_state: Mutex::new(initial_state),
                profile_store,
                wardrobe_store,
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
            poll_msa_auth,
            get_wardrobe,
            add_skin_to_wardrobe,
            remove_skin_from_wardrobe,
            apply_skin,
            refresh_profile_skin,
            refresh_profile_token,
            open_version_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
