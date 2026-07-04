use super::models::{MinecraftVersion, MojangManifest};
use std::path::PathBuf;

pub async fn get_mojang_versions() -> Result<Vec<MinecraftVersion>, String> {
    let response = reqwest::get("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json")
        .await
        .map_err(|e| e.to_string())?;
        
    let manifest: MojangManifest = response.json()
        .await
        .map_err(|e| e.to_string())?;

    let versions = manifest.versions.into_iter().map(|v| MinecraftVersion {
        id: v.id,
        r#type: v.r#type,
        is_local: false,
        release_time: Some(v.release_time),
    }).collect();

    Ok(versions)
}

pub fn get_minecraft_dir() -> PathBuf {
    let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
    if cfg!(target_os = "macos") {
        path.push("minecraft");
    } else if cfg!(target_os = "windows") {
        path.push(".minecraft");
    } else {
        if let Some(home) = dirs::home_dir() {
            path = home;
            path.push(".minecraft");
        } else {
            path.push(".minecraft");
        }
    }
    path
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
