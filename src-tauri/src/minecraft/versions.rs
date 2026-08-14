use super::models::{MinecraftVersion, MojangManifest};
use std::path::PathBuf;

pub async fn get_mojang_versions() -> Result<Vec<MinecraftVersion>, String> {
    let cache_path = get_minecraft_dir().join("version_manifest.json");

    if cache_path.exists() {
        if let Ok(data) = std::fs::read(&cache_path) {
            if let Ok(m) = serde_json::from_slice::<MojangManifest>(&data) {
                let bg_cache_path = cache_path.clone();
                tokio::spawn(async move {
                    let client = crate::open_launcher::utils::get_http_client();
                    if let Ok(response) = client
                        .get("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json")
                        .timeout(std::time::Duration::from_secs(5))
                        .send()
                        .await
                    {
                        if let Ok(manifest_bytes) = response.bytes().await {
                            let _ = std::fs::write(&bg_cache_path, &manifest_bytes);
                        }
                    }
                });

                return Ok(m
                    .versions
                    .into_iter()
                    .map(|v| MinecraftVersion {
                        id: v.id,
                        r#type: v.r#type,
                        is_local: false,
                        release_time: Some(v.release_time),
                    })
                    .collect());
            }
        }
    }

    let client = crate::open_launcher::utils::get_http_client();
    let response = client
        .get("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json")
        .timeout(std::time::Duration::from_secs(4))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let manifest_bytes = response.bytes().await.map_err(|e| e.to_string())?;
    let manifest: MojangManifest =
        serde_json::from_slice(&manifest_bytes).map_err(|e| e.to_string())?;

    let _ = std::fs::write(&cache_path, &manifest_bytes);

    let versions = manifest
        .versions
        .into_iter()
        .map(|v| MinecraftVersion {
            id: v.id,
            r#type: v.r#type,
            is_local: false,
            release_time: Some(v.release_time),
        })
        .collect();

    Ok(versions)
}

pub fn get_minecraft_dir() -> PathBuf {
    if cfg!(target_os = "macos") {
        let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
        path.push("obsy");
        path
    } else if cfg!(target_os = "windows") {
        let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
        path.push(".obsy");
        path
    } else {
        let mut path = dirs::home_dir()
            .or_else(dirs::data_dir)
            .unwrap_or_else(|| PathBuf::from("."));
        path.push(".obsy");
        path
    }
}

pub fn get_local_versions() -> Result<Vec<MinecraftVersion>, String> {
    let mut versions = Vec::new();
    let mut versions_dir = get_minecraft_dir();
    versions_dir.push("versions");

    if let Ok(entries) = std::fs::read_dir(versions_dir) {
        for entry in entries.flatten() {
            if entry.path().is_dir() {
                let id = entry.file_name().to_string_lossy().to_string();
                let json_path = entry.path().join(format!("{}.json", id));
                if json_path.exists() {
                    versions.push(MinecraftVersion {
                        id,
                        r#type: "local".to_string(),
                        is_local: true,
                        release_time: None,
                    });
                }
            }
        }
    }

    Ok(versions)
}
