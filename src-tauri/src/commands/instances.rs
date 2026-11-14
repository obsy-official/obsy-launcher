use crate::{validate_safe_id, AppState};
use tauri::State;

#[tauri::command]
pub fn open_version_folder(version_id: String, app: tauri::AppHandle) -> Result<(), String> {
    validate_safe_id(&version_id)?;
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

#[tauri::command]
pub fn delete_instance(
    version_id: String,
    state: State<'_, AppState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    validate_safe_id(&version_id)?;
    let mc_dir = crate::minecraft::versions::get_minecraft_dir();

    let instance_dir = mc_dir.join("instances").join(&version_id);
    if instance_dir.exists() {
        let _ = std::fs::remove_dir_all(&instance_dir);
    }

    let version_dir = mc_dir.join("versions").join(&version_id);
    if version_dir.exists() {
        let _ = std::fs::remove_dir_all(&version_dir);
    }

    let natives_dir = mc_dir
        .join("versions")
        .join(format!("{}-natives", version_id));
    if natives_dir.exists() {
        let _ = std::fs::remove_dir_all(&natives_dir);
    }

    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    if current_state.selected_version_id.as_ref() == Some(&version_id) {
        current_state.selected_version_id = None;
        current_state.save(&app)?;
    }

    Ok(())
}

#[tauri::command]
pub async fn create_instance(
    id: String,
    base_version: String,
    loader: Option<String>,
    loader_version: Option<String>,
    files: Option<Vec<(String, Vec<u8>)>>,
    state: State<'_, AppState>,
    app: tauri::AppHandle,
) -> Result<String, String> {
    validate_safe_id(&id)?;
    let mc_dir = crate::minecraft::versions::get_minecraft_dir();

    let mut final_id = id.clone();
    let mut counter = 2;
    while mc_dir.join("versions").join(&final_id).exists()
        || mc_dir.join("instances").join(&final_id).exists()
    {
        final_id = format!("{}-{}", id, counter);
        counter += 1;
    }

    let version_dir = mc_dir.join("versions").join(&final_id);
    std::fs::create_dir_all(&version_dir).map_err(|e| e.to_string())?;

    let selected_loader = loader.as_deref().unwrap_or("fabric");
    let selected_loader_version = loader_version.unwrap_or_else(|| {
        if selected_loader == "fabric" {
            "0.19.3".to_string()
        } else {
            "latest".to_string()
        }
    });

    let version_json_path = version_dir.join(format!("{}.json", final_id));
    let minimal_json = if selected_loader == "vanilla" {
        serde_json::json!({
            "id": final_id,
            "inheritsFrom": base_version,
            "type": "custom"
        })
    } else {
        serde_json::json!({
            "id": final_id,
            "inheritsFrom": base_version,
            "type": "custom",
            "loader": selected_loader,
            "loaderVersion": selected_loader_version
        })
    };
    std::fs::write(&version_json_path, minimal_json.to_string()).map_err(|e| e.to_string())?;

    let instance_dir = mc_dir.join("instances").join(&final_id);
    let mods_dir = instance_dir.join("mods");
    std::fs::create_dir_all(&mods_dir).map_err(|e| e.to_string())?;

    let instance_json_path = instance_dir.join("instance.json");
    let _ = std::fs::write(&instance_json_path, minimal_json.to_string());

    if let Some(file_list) = files {
        for (filename, bytes) in file_list {
            let file_path = mods_dir.join(filename);
            let _ = std::fs::write(file_path, bytes);
        }
    }

    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    current_state.selected_version_id = Some(final_id.clone());
    current_state.save(&app)?;

    Ok(final_id)
}

#[tauri::command]
pub async fn download_instance_file(
    instance_id: String,
    subpath: String,
    url: String,
) -> Result<String, String> {
    validate_safe_id(&instance_id)?;
    if subpath.contains("..") || subpath.starts_with('/') || subpath.starts_with('\\') {
        return Err("Invalid subpath (directory traversal forbidden)".to_string());
    }

    let mc_dir = crate::minecraft::versions::get_minecraft_dir();
    let instance_dir = mc_dir.join("instances").join(&instance_id);
    let dest_path = instance_dir.join(&subpath);

    if let Some(parent) = dest_path.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }

    // 1. Check central deduplication CAS cache in obsy_objects by URL hash
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(url.as_bytes());
    let url_hash = format!("{:x}", hasher.finalize());

    let cache_dir = mc_dir.join("obsy_objects").join(&url_hash[0..2]);
    let cache_file = cache_dir.join(&url_hash);

    if cache_file.exists() {
        if crate::minecraft::dedup::link_or_copy(&cache_file, &dest_path).is_ok() {
            println!(
                "[DEDUP] Reused cached instance file from obsy_objects for: {}",
                subpath
            );
            return Ok(subpath);
        }
    }

    // 2. Download from network if not in cache
    let client = crate::open_launcher::utils::get_http_client();
    let resp = client
        .get(&url)
        .header(
            "User-Agent",
            concat!("ObsyLauncher/", env!("CARGO_PKG_VERSION")),
        )
        .send()
        .await
        .map_err(|e| format!("Failed to download file: {}", e))?;

    let bytes = resp
        .bytes()
        .await
        .map_err(|e| format!("Failed to read bytes: {}", e))?;

    // 3. Save to central CAS cache and hardlink to destination
    let _ = std::fs::create_dir_all(&cache_dir);
    let _ = std::fs::write(&cache_file, &bytes);
    let _ = crate::minecraft::dedup::link_or_copy(&cache_file, &dest_path);

    Ok(subpath)
}

#[tauri::command]
pub async fn read_instance_zip_entry(
    instance_id: String,
    zip_subpath: String,
    entry_path: String,
) -> Result<String, String> {
    validate_safe_id(&instance_id)?;
    if zip_subpath.contains("..") {
        return Err("Invalid zip_subpath".to_string());
    }
    let mc_dir = crate::minecraft::versions::get_minecraft_dir();
    let zip_full_path = mc_dir
        .join("instances")
        .join(&instance_id)
        .join(&zip_subpath);

    let file = std::fs::File::open(&zip_full_path).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;
    let mut entry = archive.by_name(&entry_path).map_err(|e| e.to_string())?;

    use std::io::Read;
    let mut content = String::new();
    entry
        .read_to_string(&mut content)
        .map_err(|e| e.to_string())?;
    Ok(content)
}

#[tauri::command]
pub async fn extract_instance_zip_folder(
    instance_id: String,
    zip_subpath: String,
    folder_prefix: String,
    dest_subpath: String,
) -> Result<(), String> {
    validate_safe_id(&instance_id)?;
    if zip_subpath.contains("..") || dest_subpath.contains("..") {
        return Err("Invalid subpath".to_string());
    }
    let mc_dir = crate::minecraft::versions::get_minecraft_dir();
    let instance_dir = mc_dir.join("instances").join(&instance_id);
    let zip_full_path = instance_dir.join(&zip_subpath);

    let file = std::fs::File::open(&zip_full_path).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;

    let prefix = if folder_prefix.ends_with('/') || folder_prefix.is_empty() {
        folder_prefix
    } else {
        format!("{}/", folder_prefix)
    };

    let target_base = if dest_subpath.is_empty() {
        instance_dir.clone()
    } else {
        crate::addons::sanitize_path(&instance_dir, std::path::Path::new(&dest_subpath))?
    };

    for i in 0..archive.len() {
        if let Ok(mut entry) = archive.by_index(i) {
            let name = entry.name().to_string();
            if name.starts_with(&prefix) && !name.ends_with('/') {
                let rel = name.strip_prefix(&prefix).unwrap_or(&name);
                if let Ok(target) = crate::addons::safe_zip_extract_path(&target_base, rel) {
                    if let Some(parent) = target.parent() {
                        let _ = std::fs::create_dir_all(parent);
                    }
                    if let Ok(mut out) = std::fs::File::create(&target) {
                        use std::io::copy;
                        let _ = copy(&mut entry, &mut out);
                    }
                }
            }
        }
    }
    Ok(())
}

#[tauri::command]
pub async fn delete_instance_file(instance_id: String, subpath: String) -> Result<(), String> {
    validate_safe_id(&instance_id)?;
    if subpath.contains("..") {
        return Err("Invalid subpath".to_string());
    }
    let mc_dir = crate::minecraft::versions::get_minecraft_dir();
    let file_path = mc_dir.join("instances").join(&instance_id).join(&subpath);
    if file_path.is_file() {
        let _ = std::fs::remove_file(file_path);
    } else if file_path.is_dir() {
        let _ = std::fs::remove_dir_all(file_path);
    }
    Ok(())
}
