use crate::{minecraft, AppState};
use tauri::{AppHandle, State};

#[tauri::command]
pub fn get_playtime_summary(
    app: AppHandle,
) -> Result<minecraft::playtime::PlaytimeSummary, String> {
    Ok(minecraft::playtime::get_summary(&app))
}

#[tauri::command]
pub fn get_last_crash_diagnostics(
    state: State<'_, AppState>,
) -> Result<Option<minecraft::crash::CrashDiag>, String> {
    let lock = state.last_crash.lock().map_err(|e| e.to_string())?;
    Ok(lock.clone())
}

#[tauri::command]
pub async fn apply_crash_action(
    app: AppHandle,
    state: State<'_, AppState>,
    kind: String,
    arg: String,
) -> Result<String, String> {
    match kind.as_str() {
        "set-ram" => {
            let mb: i32 = arg.parse().map_err(|_| "Invalid RAM amount".to_string())?;
            let mut l_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
            l_state.memory_amount = mb;
            l_state.auto_memory = false;
            l_state.save(&app)?;
            Ok(format!("Memory allocated to {} MB", mb))
        }
        "disable-mod" => {
            let mc_dir = crate::minecraft::versions::get_minecraft_dir();
            minecraft::crash::disable_mod_file(&mc_dir, &arg)
        }
        "install-java" => {
            let mut l_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
            l_state.java_path = None;
            l_state.save(&app)?;
            Ok("Reset Java configuration to auto-managed".to_string())
        }
        "open-folder" => {
            let mc_dir = crate::minecraft::versions::get_minecraft_dir();
            crate::open_path_or_url(&app, &mc_dir.to_string_lossy(), false)?;
            Ok("Game folder opened".to_string())
        }
        "open-url" => {
            crate::open_path_or_url(&app, &arg, true)?;
            Ok("URL opened in browser".to_string())
        }
        _ => Err(format!("Unknown crash action: {}", kind)),
    }
}
