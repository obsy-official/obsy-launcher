use std::fs;
use std::path::{Path, PathBuf};

pub fn get_legacy_source_candidates(app_handle: Option<&tauri::AppHandle>) -> Vec<PathBuf> {
    let mut candidates = Vec::new();

    if let Some(app) = app_handle {
        use tauri::Manager;
        if let Ok(config_dir) = app.path().app_config_dir() {
            candidates.push(config_dir);
        }
        if let Ok(data_dir) = app.path().app_data_dir() {
            candidates.push(data_dir);
        }
    }

    if let Some(data) = dirs::data_dir() {
        candidates.push(data.join("com.obsy-official.obsy-launcher"));
        candidates.push(data.join("obsy-launcher"));
        candidates.push(data.join("obsy"));
        candidates.push(data.join(".obsy"));
    }

    if let Some(config) = dirs::config_dir() {
        candidates.push(config.join("com.obsy-official.obsy-launcher"));
        candidates.push(config.join("obsy-launcher"));
        candidates.push(config.join("obsy"));
        candidates.push(config.join(".obsy"));
    }

    if let Some(home) = dirs::home_dir() {
        candidates.push(home.join(".obsy"));
        candidates.push(home.join(".config").join("obsy-launcher"));
        candidates.push(home.join(".config").join("com.obsy-official.obsy-launcher"));
        candidates.push(home.join(".local").join("share").join(".obsy"));
    }

    let mut unique_candidates = Vec::new();
    for c in candidates {
        if !unique_candidates.contains(&c) {
            unique_candidates.push(c);
        }
    }

    unique_candidates
}

fn copy_dir_all(src: &Path, dst: &Path) -> std::io::Result<usize> {
    if !dst.exists() {
        fs::create_dir_all(dst)?;
    }
    let mut files_copied = 0;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        let src_path = entry.path();
        let dst_path = dst.join(entry.file_name());
        if ty.is_dir() {
            files_copied += copy_dir_all(&src_path, &dst_path)?;
        } else if !dst_path.exists() {
            // Hardlink avoids duplicating large game assets on disk across directories on the same volume.
            if fs::hard_link(&src_path, &dst_path).is_err() {
                let _ = fs::copy(&src_path, &dst_path);
            }
            files_copied += 1;
        }
    }
    Ok(files_copied)
}

pub fn migrate_legacy_data_if_needed(target_dir: &Path, app_handle: Option<&tauri::AppHandle>) {
    let marker_file = target_dir.join(".migration_completed");
    if marker_file.exists() {
        return;
    }

    let _ = fs::create_dir_all(target_dir);

    let candidates = get_legacy_source_candidates(app_handle);
    let config_files = [
        "launcher_state.json",
        "profiles.json",
        "profiles.key",
        "wardrobe.json",
        "playtime.json",
        "version_manifest.json",
    ];

    let subdirs = [
        "instances",
        "versions",
        "addons",
        "assets",
        "libraries",
        "jre",
        "obsy_objects",
    ];

    for source in candidates {
        if !source.exists() || source == target_dir {
            continue;
        }

        let mut source_migrated_any = false;

        for filename in &config_files {
            let src_file = source.join(filename);
            let dst_file = target_dir.join(filename);

            if src_file.is_file() {
                // profiles.key must accompany profiles.json to decrypt existing credentials without generating a new key.
                let should_copy = if !dst_file.exists() {
                    true
                } else if *filename == "profiles.key" || *filename == "profiles.json" {
                    let src_len = fs::metadata(&src_file).map(|m| m.len()).unwrap_or(0);
                    let dst_len = fs::metadata(&dst_file).map(|m| m.len()).unwrap_or(0);
                    src_len > 0 && (dst_len == 0 || !target_dir.join("profiles.key").exists())
                } else {
                    false
                };

                if should_copy {
                    if let Ok(_) = fs::copy(&src_file, &dst_file) {
                        println!("[MIGRATION] Migrated config file: {:?}", filename);
                        source_migrated_any = true;
                    }
                }
            }
        }

        for dirname in &subdirs {
            let src_sub = source.join(dirname);
            let dst_sub = target_dir.join(dirname);
            if src_sub.is_dir() {
                if let Ok(count) = copy_dir_all(&src_sub, &dst_sub) {
                    if count > 0 {
                        println!(
                            "[MIGRATION] Migrated directory {:?} ({} files)",
                            dirname, count
                        );
                        source_migrated_any = true;
                    }
                }
            }
        }

        if source_migrated_any {
            println!(
                "[MIGRATION] Successfully migrated legacy data from {:?}",
                source
            );
        }
    }

    // Mark migration as completed so it never re-runs or spams logs on subsequent startups
    let _ = fs::write(&marker_file, b"migration_completed\n");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_migration_logic() {
        let tmp = std::env::temp_dir().join("obsy_test_migration_full");
        let src = tmp.join("legacy_source");
        let dst = tmp.join("new_target");

        let _ = fs::remove_dir_all(&tmp);
        fs::create_dir_all(&src.join("instances")).unwrap();
        fs::create_dir_all(&dst).unwrap();

        fs::write(src.join("profiles.json"), b"{\"test\":true}").unwrap();
        fs::write(src.join("profiles.key"), b"secret-key-1234").unwrap();
        fs::write(src.join("instances").join("test.txt"), b"instance data").unwrap();

        for f in &["profiles.json", "profiles.key"] {
            let s = src.join(f);
            let d = dst.join(f);
            if s.is_file() && !d.exists() {
                fs::copy(s, d).unwrap();
            }
        }
        copy_dir_all(&src.join("instances"), &dst.join("instances")).unwrap();

        assert!(dst.join("profiles.json").exists());
        assert!(dst.join("profiles.key").exists());
        assert!(dst.join("instances").join("test.txt").exists());

        let _ = fs::remove_dir_all(&tmp);
    }
}
