use crate::minecraft::versions::get_minecraft_dir;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::fs;
use std::io::{Cursor, Read, Write};
use std::path::{Path, PathBuf};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AddonDiskInfo {
    pub id: String,
    pub name: String,
    pub version: String,
    pub description: String,
    pub author: String,
    pub category: String,
    #[serde(default)]
    pub icon: Option<String>,
    #[serde(rename = "sizeBytes", default)]
    pub size_bytes: u64,
    #[serde(rename = "minLauncherVersion", default)]
    pub min_launcher_version: Option<String>,
    #[serde(default)]
    pub permissions: Vec<String>,
    #[serde(default)]
    pub tags: Vec<String>,
    #[serde(rename = "hasJs", default)]
    pub has_js: bool,
    #[serde(rename = "hasCss", default)]
    pub has_css: bool,
    #[serde(default)]
    pub checksum: Option<String>,
    #[serde(default)]
    pub verified: bool,
}

pub fn get_addons_dir() -> PathBuf {
    let dir = get_minecraft_dir().join("addons");
    if !dir.exists() {
        let _ = fs::create_dir_all(&dir);
    }
    dir
}

pub fn calculate_sha256(bytes: &[u8]) -> String {
    let mut hasher = Sha256::new();
    hasher.update(bytes);
    format!("{:x}", hasher.finalize())
}

static EMBEDDED_CATALOG_JSON: &str = include_str!("../../addons/catalog.json");

pub fn is_verified_addon(id: &str, checksum: Option<&str>) -> bool {
    if let Some(target_checksum) = checksum {
        if let Ok(catalog) = serde_json::from_str::<Vec<serde_json::Value>>(EMBEDDED_CATALOG_JSON) {
            if catalog.iter().any(|item| {
                item.get("id").and_then(|v| v.as_str()) == Some(id)
                    && item.get("checksum").and_then(|v| v.as_str()) == Some(target_checksum)
            }) {
                return true;
            }
        }
    } else {
        if let Ok(catalog) = serde_json::from_str::<Vec<serde_json::Value>>(EMBEDDED_CATALOG_JSON) {
            if catalog
                .iter()
                .any(|item| item.get("id").and_then(|v| v.as_str()) == Some(id))
            {
                return true;
            }
        }
        #[cfg(debug_assertions)]
        {
            if let Some(dev_src) = get_dev_addons_src_dir() {
                return dev_src.join(id).exists();
            }
        }
    }
    false
}

pub fn sanitize_path(base: &Path, relative: &Path) -> Result<PathBuf, String> {
    if relative.is_absolute() {
        return Err("Invalid file path: absolute path not allowed".to_string());
    }
    for component in relative.components() {
        match component {
            std::path::Component::ParentDir
            | std::path::Component::RootDir
            | std::path::Component::Prefix(_) => {
                return Err("Invalid file path: path traversal detected".to_string());
            }
            _ => {}
        }
    }
    let full = base.join(relative);
    // Prevent directory traversal attacks
    if full.starts_with(base) {
        Ok(full)
    } else {
        Err("Invalid file path: path traversal detected".to_string())
    }
}

pub fn safe_zip_extract_path(target_dir: &Path, rel_name: &str) -> Result<PathBuf, String> {
    let rel_path = Path::new(rel_name);
    if rel_path.is_absolute() {
        return Err(format!(
            "Invalid archive entry: absolute path '{}'",
            rel_name
        ));
    }
    for component in rel_path.components() {
        match component {
            std::path::Component::ParentDir
            | std::path::Component::RootDir
            | std::path::Component::Prefix(_) => {
                return Err(format!(
                    "Path traversal detected in archive entry: '{}'",
                    rel_name
                ));
            }
            _ => {}
        }
    }
    let outpath = target_dir.join(rel_path);
    if outpath.starts_with(target_dir) {
        Ok(outpath)
    } else {
        Err(format!(
            "Archive entry '{}' escapes target directory",
            rel_name
        ))
    }
}

fn get_dir_size(path: &Path) -> u64 {
    let mut total = 0;
    if let Ok(entries) = fs::read_dir(path) {
        for entry in entries.flatten() {
            if let Ok(meta) = entry.metadata() {
                if meta.is_dir() {
                    total += get_dir_size(&entry.path());
                } else {
                    total += meta.len();
                }
            }
        }
    }
    total
}

#[tauri::command]
pub fn inspect_addon_archive(archive_bytes: Vec<u8>) -> Result<AddonDiskInfo, String> {
    let sha256_hash = calculate_sha256(&archive_bytes);
    let reader = Cursor::new(&archive_bytes);
    let mut zip =
        zip::ZipArchive::new(reader).map_err(|e| format!("Invalid zip archive: {}", e))?;

    let mut manifest_content = String::new();

    for i in 0..zip.len() {
        let mut file = zip
            .by_index(i)
            .map_err(|e| format!("Zip read error: {}", e))?;
        let name = file.name().to_string();

        if name.ends_with("addon.json") || name.ends_with("manifest.json") {
            file.read_to_string(&mut manifest_content)
                .map_err(|e| format!("Failed to read manifest inside zip: {}", e))?;
            break;
        }
    }

    if manifest_content.is_empty() {
        return Err("No addon.json or manifest.json found in archive".to_string());
    }

    let mut info: AddonDiskInfo = serde_json::from_str(&manifest_content)
        .map_err(|e| format!("Failed to parse addon manifest: {}", e))?;

    info.size_bytes = archive_bytes.len() as u64;
    info.checksum = Some(sha256_hash.clone());
    info.verified = is_verified_addon(&info.id, Some(&sha256_hash));

    Ok(info)
}

fn get_dev_addons_src_dir() -> Option<PathBuf> {
    #[cfg(debug_assertions)]
    {
        if let Ok(cwd) = std::env::current_dir() {
            if cwd.join("addons").join("src").exists() {
                return Some(cwd.join("addons").join("src"));
            }
            if let Some(parent) = cwd.parent() {
                if parent.join("addons").join("src").exists() {
                    return Some(parent.join("addons").join("src"));
                }
            }
        }
    }
    None
}

#[tauri::command]
pub fn get_installed_addons_from_disk() -> Result<Vec<AddonDiskInfo>, String> {
    let addons_dir = get_addons_dir();
    let mut list = Vec::new();

    let entries =
        fs::read_dir(&addons_dir).map_err(|e| format!("Failed to read addons directory: {}", e))?;

    for entry in entries.flatten() {
        let path = entry.path();
        if path.is_dir() {
            let manifest_path = if path.join("addon.json").exists() {
                path.join("addon.json")
            } else if path.join("manifest.json").exists() {
                path.join("manifest.json")
            } else {
                continue;
            };

            if let Ok(content) = fs::read_to_string(&manifest_path) {
                if let Ok(mut info) = serde_json::from_str::<AddonDiskInfo>(&content) {
                    info.has_js =
                        path.join("index.js").exists() || path.join("dist/index.js").exists();
                    info.has_css = path.join("style.css").exists()
                        || path.join("index.css").exists()
                        || path.join("dist/index.css").exists();
                    if info.size_bytes == 0 {
                        info.size_bytes = get_dir_size(&path);
                    }
                    info.verified = is_verified_addon(&info.id, info.checksum.as_deref());
                    list.push(info);
                }
            }
        }
    }

    Ok(list)
}

#[tauri::command]
pub fn read_addon_file(addon_id: String, file_name: String) -> Result<String, String> {
    crate::validate_safe_id(&addon_id)?;

    // 1. In dev mode, prioritize reading directly from workspace addons/src/<addon_id>/
    if let Some(dev_src) = get_dev_addons_src_dir() {
        let dev_addon_dir = dev_src.join(&addon_id);
        if dev_addon_dir.exists() {
            if let Ok(target_path) = sanitize_path(&dev_addon_dir, Path::new(&file_name)) {
                if target_path.exists() {
                    return fs::read_to_string(&target_path).map_err(|e| {
                        format!("Failed to read dev addon file '{}': {}", file_name, e)
                    });
                }
                let dist_path = dev_addon_dir.join("dist").join(&file_name);
                if dist_path.exists() {
                    return fs::read_to_string(&dist_path).map_err(|e| {
                        format!("Failed to read dev addon dist file '{}': {}", file_name, e)
                    });
                }
            }
        }
    }

    let addons_dir = get_addons_dir();
    let addon_dir = addons_dir.join(&addon_id);
    if !addon_dir.exists() {
        return Err(format!("Addon '{}' not found on disk", addon_id));
    }

    let target_path = sanitize_path(&addon_dir, Path::new(&file_name))?;

    // If file directly exists, read it
    if target_path.exists() {
        return fs::read_to_string(&target_path)
            .map_err(|e| format!("Failed to read file '{}': {}", file_name, e));
    }

    // Fallback: check in dist/
    let dist_path = addon_dir.join("dist").join(&file_name);
    if dist_path.exists() {
        return fs::read_to_string(&dist_path)
            .map_err(|e| format!("Failed to read dist file '{}': {}", file_name, e));
    }

    Err(format!(
        "File '{}' not found in addon '{}'",
        file_name, addon_id
    ))
}

#[tauri::command]
pub fn uninstall_addon_files(addon_id: String) -> Result<(), String> {
    crate::validate_safe_id(&addon_id)?;
    let addons_dir = get_addons_dir();
    let addon_dir = addons_dir.join(&addon_id);
    if addon_dir.exists() {
        fs::remove_dir_all(&addon_dir)
            .map_err(|e| format!("Failed to remove addon directory: {}", e))?;
    }
    Ok(())
}

#[tauri::command]
pub fn install_addon_from_archive_bytes(
    archive_bytes: Vec<u8>,
    expected_checksum: Option<String>,
) -> Result<AddonDiskInfo, String> {
    let computed_hash = calculate_sha256(&archive_bytes);

    if let Some(expected) = expected_checksum {
        if !expected.is_empty() && expected != computed_hash {
            return Err(format!(
                "Security Alert: SHA-256 checksum mismatch! Expected {}, got {}",
                expected, computed_hash
            ));
        }
    }

    let reader = Cursor::new(&archive_bytes);
    let mut zip =
        zip::ZipArchive::new(reader).map_err(|e| format!("Invalid zip archive: {}", e))?;

    // Find and read manifest first
    let mut manifest_content = String::new();
    let mut manifest_prefix = String::new();

    for i in 0..zip.len() {
        let mut file = zip
            .by_index(i)
            .map_err(|e| format!("Zip read error: {}", e))?;
        let name = file.name().to_string();

        if name.ends_with("addon.json") || name.ends_with("manifest.json") {
            file.read_to_string(&mut manifest_content)
                .map_err(|e| format!("Failed to read manifest inside zip: {}", e))?;

            if let Some(pos) = name.rfind('/') {
                manifest_prefix = name[..=pos].to_string();
            }
            break;
        }
    }

    if manifest_content.is_empty() {
        return Err("No addon.json or manifest.json found in archive".to_string());
    }

    let mut info: AddonDiskInfo = serde_json::from_str(&manifest_content)
        .map_err(|e| format!("Failed to parse addon manifest: {}", e))?;

    crate::validate_safe_id(&info.id)?;

    let addons_dir = get_addons_dir();
    let target_dir = addons_dir.join(&info.id);

    if target_dir.exists() {
        let _ = fs::remove_dir_all(&target_dir);
    }
    fs::create_dir_all(&target_dir).map_err(|e| format!("Failed to create directory: {}", e))?;

    // Extract all files safely
    for i in 0..zip.len() {
        let mut file = zip
            .by_index(i)
            .map_err(|e| format!("Zip entry error: {}", e))?;
        let name = file.name().to_string();

        let rel_name = if !manifest_prefix.is_empty() && name.starts_with(&manifest_prefix) {
            &name[manifest_prefix.len()..]
        } else {
            &name
        };

        if rel_name.is_empty() || rel_name.ends_with('/') {
            continue;
        }

        let outpath = safe_zip_extract_path(&target_dir, rel_name)?;
        if let Some(parent) = outpath.parent() {
            let _ = fs::create_dir_all(parent);
        }

        let mut outfile = fs::File::create(&outpath)
            .map_err(|e| format!("Failed to create file {:?}: {}", outpath, e))?;
        std::io::copy(&mut file, &mut outfile)
            .map_err(|e| format!("Failed to extract file: {}", e))?;
    }

    info.has_js = target_dir.join("index.js").exists() || target_dir.join("dist/index.js").exists();
    info.has_css = target_dir.join("style.css").exists()
        || target_dir.join("index.css").exists()
        || target_dir.join("dist/index.css").exists();
    info.size_bytes = get_dir_size(&target_dir);
    info.checksum = Some(computed_hash.clone());
    info.verified = is_verified_addon(&info.id, Some(&computed_hash));

    Ok(info)
}

#[tauri::command]
pub async fn download_addon_archive_bytes(download_url: String) -> Result<Vec<u8>, String> {
    #[cfg(debug_assertions)]
    {
        if let Some(filename) = download_url.split('/').last() {
            if filename.ends_with(".zip") {
                if let Ok(cwd) = std::env::current_dir() {
                    let candidates = [
                        cwd.join("addons").join("dist").join(filename),
                        cwd.parent()
                            .map(|p| p.join("addons").join("dist").join(filename))
                            .unwrap_or_default(),
                    ];
                    for c in candidates {
                        if c.exists() {
                            if let Ok(bytes) = fs::read(&c) {
                                return Ok(bytes);
                            }
                        }
                    }
                }
            }
        }
    }

    let client = reqwest::Client::builder()
        .user_agent("Obsy-Launcher/AddonDownloader")
        .build()
        .map_err(|e| format!("Failed to build HTTP client: {}", e))?;

    let response = client
        .get(&download_url)
        .send()
        .await
        .map_err(|e| format!("Failed to download addon from '{}': {}", download_url, e))?;

    if !response.status().is_success() {
        return Err(format!(
            "Failed to download addon: HTTP status {}",
            response.status()
        ));
    }

    let bytes = response
        .bytes()
        .await
        .map_err(|e| format!("Failed to read response bytes: {}", e))?
        .to_vec();

    Ok(bytes)
}

#[tauri::command]
pub async fn download_and_install_addon(
    addon_id: String,
    download_url: String,
    expected_checksum: Option<String>,
) -> Result<AddonDiskInfo, String> {
    crate::validate_safe_id(&addon_id)?;
    let client = reqwest::Client::builder()
        .user_agent("Obsy-Launcher/AddonInstaller")
        .build()
        .map_err(|e| format!("Failed to build HTTP client: {}", e))?;

    let response = client
        .get(&download_url)
        .send()
        .await
        .map_err(|e| format!("Failed to download addon from '{}': {}", download_url, e))?;

    if !response.status().is_success() {
        return Err(format!(
            "Failed to download addon: HTTP status {}",
            response.status()
        ));
    }

    let bytes = response
        .bytes()
        .await
        .map_err(|e| format!("Failed to read response bytes: {}", e))?
        .to_vec();

    // Check if zip archive (magic bytes PK)
    if bytes.len() >= 4 && &bytes[0..2] == b"PK" {
        return install_addon_from_archive_bytes(bytes, expected_checksum);
    }

    // If raw bundle
    let addons_dir = get_addons_dir();
    let target_dir = addons_dir.join(&addon_id);
    let _ = fs::create_dir_all(&target_dir);

    let js_path = target_dir.join("index.js");
    let mut file =
        fs::File::create(&js_path).map_err(|e| format!("Failed to write index.js: {}", e))?;
    file.write_all(&bytes)
        .map_err(|e| format!("Failed to save index.js: {}", e))?;

    let computed_hash = calculate_sha256(&bytes);
    let is_ver = is_verified_addon(&addon_id, Some(&computed_hash));
    let info = AddonDiskInfo {
        id: addon_id.clone(),
        name: addon_id,
        version: "1.0.0".to_string(),
        description: "Installed external addon".to_string(),
        author: "Unknown".to_string(),
        category: "utility".to_string(),
        icon: None,
        size_bytes: bytes.len() as u64,
        min_launcher_version: None,
        permissions: Vec::new(),
        tags: Vec::new(),
        has_js: true,
        has_css: false,
        checksum: Some(computed_hash),
        verified: is_ver,
    };

    let manifest_json = serde_json::to_string_pretty(&info).unwrap_or_default();
    let _ = fs::write(target_dir.join("addon.json"), manifest_json);

    Ok(info)
}

#[tauri::command]
pub fn save_local_addon(
    addon_id: String,
    manifest_json: String,
    js_content: String,
    css_content: Option<String>,
) -> Result<AddonDiskInfo, String> {
    crate::validate_safe_id(&addon_id)?;
    let mut info: AddonDiskInfo = serde_json::from_str(&manifest_json)
        .map_err(|e| format!("Invalid manifest JSON: {}", e))?;

    crate::validate_safe_id(&info.id)?;

    let addons_dir = get_addons_dir();
    let target_dir = addons_dir.join(&addon_id);
    fs::create_dir_all(&target_dir)
        .map_err(|e| format!("Failed to create addon directory: {}", e))?;

    fs::write(target_dir.join("addon.json"), &manifest_json)
        .map_err(|e| format!("Failed to write addon.json: {}", e))?;

    fs::write(target_dir.join("index.js"), &js_content)
        .map_err(|e| format!("Failed to write index.js: {}", e))?;

    if let Some(css) = css_content {
        let _ = fs::write(target_dir.join("style.css"), css);
    }

    info.has_js = true;
    info.has_css = target_dir.join("style.css").exists();
    info.size_bytes = get_dir_size(&target_dir);
    info.checksum = None;
    info.verified = is_verified_addon(&info.id, None);

    Ok(info)
}
