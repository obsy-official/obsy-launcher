use crate::auth::Profile;
use crate::minecraft::models::MinecraftVersion;
use crate::state::LauncherState;
use crate::{validate_safe_id, AppState};
use tauri::{AppHandle, State};

#[tauri::command]
pub fn get_launcher_state(state: State<'_, AppState>) -> Result<LauncherState, String> {
    let state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    Ok(state.clone())
}

#[tauri::command]
pub fn update_launcher_state(
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
pub fn get_profiles(state: State<'_, AppState>) -> Result<Vec<Profile>, String> {
    Ok(state.profile_store.load())
}

#[tauri::command]
pub fn add_offline_profile(
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
pub fn select_profile(
    id: String,
    state: State<'_, AppState>,
    app: AppHandle,
) -> Result<(), String> {
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    current_state.selected_profile_id = Some(id);
    current_state.save(&app)?;
    Ok(())
}

#[tauri::command]
pub fn remove_profile(
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
pub async fn get_versions(state: State<'_, AppState>) -> Result<Vec<MinecraftVersion>, String> {
    let mut remote_versions = crate::minecraft::versions::get_mojang_versions()
        .await
        .unwrap_or_default();
    let local_versions = crate::minecraft::versions::get_local_versions().unwrap_or_default();

    let current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;

    let mut custom_locals = Vec::new();
    for local in local_versions {
        if let Some(existing) = remote_versions.iter_mut().find(|v| v.id == local.id) {
            existing.is_local = true;
        } else {
            custom_locals.push(local);
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

    // Partition so all local versions / installed instances appear at the very TOP
    let mut final_list = custom_locals;
    let (mut local_downloaded, remote_only): (Vec<_>, Vec<_>) =
        remote_versions.into_iter().partition(|v| v.is_local);

    final_list.append(&mut local_downloaded);
    final_list.extend(remote_only);

    Ok(final_list)
}

#[tauri::command]
pub fn select_version(
    id: String,
    state: State<'_, AppState>,
    app: AppHandle,
) -> Result<(), String> {
    validate_safe_id(&id)?;
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    current_state.selected_version_id = Some(id);
    current_state.save(&app)?;
    Ok(())
}
