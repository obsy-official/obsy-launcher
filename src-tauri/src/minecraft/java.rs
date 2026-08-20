use std::fs;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Emitter};

pub fn get_required_java_version(mc_version: &str) -> u32 {
    let mc_dir = crate::minecraft::versions::get_minecraft_dir();
    let json_path = mc_dir
        .join("versions")
        .join(mc_version)
        .join(format!("{}.json", mc_version));

    if let Ok(content) = std::fs::read_to_string(&json_path) {
        if let Ok(json) = serde_json::from_str::<serde_json::Value>(&content) {
            if let Some(java_version) = json.get("javaVersion") {
                if let Some(major) = java_version.get("majorVersion") {
                    if let Some(major_u32) = major.as_u64() {
                        let ver = major_u32 as u32;
                        if ver >= 25 {
                            return 25;
                        } else if ver >= 21 {
                            return 21;
                        } else if ver >= 17 {
                            return 17;
                        } else {
                            return 8;
                        }
                    }
                }
            }
        }
    }

    let (major, minor, patch) = crate::open_launcher::utils::parse_mc_version(mc_version);
    if major >= 26 || (major == 1 && minor >= 26) {
        25
    } else if (major == 1 && minor > 20) || (major == 1 && minor == 20 && patch >= 5) {
        21
    } else if major == 1 && minor >= 17 {
        17
    } else {
        8
    }
}

pub async fn download_java_if_needed(mc_version: &str, app: &AppHandle) -> Result<String, String> {
    let version = get_required_java_version(mc_version);
    let mc_dir = super::versions::get_minecraft_dir();
    let jre_dir = mc_dir.join("jre").join(version.to_string());

    let java_executable = if cfg!(target_os = "windows") {
        "java.exe"
    } else {
        "java"
    };

    let find_extracted_java = |dir: &Path| -> Option<PathBuf> {
        let mut paths_to_check = vec![dir.to_path_buf()];
        while let Some(current) = paths_to_check.pop() {
            if let Ok(entries) = fs::read_dir(&current) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.is_dir() {
                        paths_to_check.push(path);
                    } else if path.is_file()
                        && path.file_name().unwrap_or_default() == java_executable
                    {
                        return Some(path);
                    }
                }
            }
        }
        None
    };

    if jre_dir.exists() {
        if let Some(path) = find_extracted_java(&jre_dir) {
            #[cfg(unix)]
            {
                use std::os::unix::fs::PermissionsExt;
                if let Ok(metadata) = fs::metadata(&path) {
                    let mut perms = metadata.permissions();
                    perms.set_mode(0o755);
                    let _ = fs::set_permissions(&path, perms);
                }
            }
            return Ok(path.to_string_lossy().to_string());
        }
    }

    if let Some(sys_java) = find_system_java(version) {
        return Ok(sys_java);
    }

    #[derive(Clone, serde::Serialize)]
    struct LaunchProgressPayload {
        status: String,
        progress: f32,
        detail: Option<String>,
    }

    let _ = app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "downloading_java".to_string(),
            progress: 0.1,
            detail: None,
        },
    );

    let os = if cfg!(target_os = "macos") {
        "mac"
    } else if cfg!(target_os = "windows") {
        "windows"
    } else {
        "linux"
    };

    let mut arch = if cfg!(target_arch = "aarch64") {
        "aarch64"
    } else {
        "x64"
    };

    if os == "mac" && arch == "aarch64" && version == 8 {
        arch = "x64";
    }

    let url = format!(
        "https://api.adoptium.net/v3/binary/latest/{}/ga/{}/{}/jre/hotspot/normal/eclipse",
        version, os, arch
    );

    fs::create_dir_all(&jre_dir).map_err(|e| e.to_string())?;

    let response = match reqwest::get(&url).await {
        Ok(r) => r,
        Err(e) => {
            eprintln!("reqwest::get failed: {}", e);
            return Err(e.to_string());
        }
    };

    if !response.status().is_success() {
        let status = response.status();
        eprintln!("HTTP Error: {}", status);
        return Err(format!("HTTP Error: {}", status));
    }

    let bytes = match response.bytes().await {
        Ok(b) => b,
        Err(e) => {
            eprintln!("Failed to read bytes: {}", e);
            return Err(e.to_string());
        }
    };

    let _ = app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "extracting_java".to_string(),
            progress: 0.5,
            detail: None,
        },
    );

    if os == "windows" {
        let reader = std::io::Cursor::new(bytes);
        let mut archive = match zip::ZipArchive::new(reader) {
            Ok(a) => a,
            Err(e) => {
                eprintln!("ZipArchive::new failed: {}", e);
                return Err(e.to_string());
            }
        };
        if let Err(e) = archive.extract(&jre_dir) {
            eprintln!("Zip extraction failed: {}", e);
            return Err(e.to_string());
        }
    } else {
        let tar = flate2::read::GzDecoder::new(std::io::Cursor::new(bytes));
        let mut archive = tar::Archive::new(tar);
        if let Err(e) = archive.unpack(&jre_dir) {
            eprintln!("Tar extraction failed: {}", e);
            return Err(e.to_string());
        }

        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            if let Some(java_path) = find_extracted_java(&jre_dir) {
                if let Ok(metadata) = fs::metadata(&java_path) {
                    let mut perms = metadata.permissions();
                    perms.set_mode(0o755);
                    let _ = fs::set_permissions(&java_path, perms);
                }
            }
        }
    }

    if let Some(path) = find_extracted_java(&jre_dir) {
        Ok(path.to_string_lossy().to_string())
    } else {
        Err("Failed to find java executable after extraction".to_string())
    }
}

fn get_java_executable_version(path: &str) -> Option<u32> {
    let output = std::process::Command::new(path)
        .arg("-version")
        .output()
        .ok()?;

    let stderr = String::from_utf8_lossy(&output.stderr);
    let stdout = String::from_utf8_lossy(&output.stdout);
    let text = format!("{}\n{}", stderr, stdout);

    for line in text.lines() {
        if line.contains("version \"") {
            if let Some(start) = line.find("version \"") {
                let rest = &line[start + 9..];
                if let Some(end) = rest.find('\"') {
                    let ver_str = &rest[..end];
                    if ver_str.starts_with("1.8") {
                        return Some(8);
                    }
                    if let Some(dot) = ver_str.find('.') {
                        if let Ok(major) = ver_str[..dot].parse::<u32>() {
                            return Some(major);
                        }
                    } else if let Ok(major) = ver_str.parse::<u32>() {
                        return Some(major);
                    }
                }
            }
        }
    }
    None
}

fn find_system_java(required_version: u32) -> Option<String> {
    if let Ok(java_home) = std::env::var("JAVA_HOME") {
        let path =
            std::path::Path::new(&java_home)
                .join("bin")
                .join(if cfg!(target_os = "windows") {
                    "java.exe"
                } else {
                    "java"
                });
        if path.exists() {
            let path_str = path.to_string_lossy().to_string();
            if get_java_executable_version(&path_str) == Some(required_version) {
                return Some(path_str);
            }
        }
    }

    #[cfg(target_os = "macos")]
    {
        if let Ok(entries) = std::fs::read_dir("/Library/Java/JavaVirtualMachines") {
            for entry in entries.flatten() {
                let java_path = entry
                    .path()
                    .join("Contents")
                    .join("Home")
                    .join("bin")
                    .join("java");
                if java_path.exists() {
                    let path_str = java_path.to_string_lossy().to_string();
                    if get_java_executable_version(&path_str) == Some(required_version) {
                        return Some(path_str);
                    }
                }
            }
        }

        let brew_java = "/opt/homebrew/opt/openjdk/bin/java";
        if std::path::Path::new(brew_java).exists() {
            if get_java_executable_version(brew_java) == Some(required_version) {
                return Some(brew_java.to_string());
            }
        }

        if let Some(home) = dirs::home_dir() {
            let sdkman_java = home
                .join(".sdkman")
                .join("candidates")
                .join("java")
                .join("current")
                .join("bin")
                .join("java");
            if sdkman_java.exists() {
                let path_str = sdkman_java.to_string_lossy().to_string();
                if get_java_executable_version(&path_str) == Some(required_version) {
                    return Some(path_str);
                }
            }
        }
    }

    #[cfg(target_os = "windows")]
    {
        let program_files =
            std::env::var("ProgramFiles").unwrap_or_else(|_| "C:\\Program Files".to_string());
        let java_dir = std::path::Path::new(&program_files).join("Java");
        if let Ok(entries) = std::fs::read_dir(java_dir) {
            for entry in entries.flatten() {
                let java_path = entry.path().join("bin").join("java.exe");
                if java_path.exists() {
                    let path_str = java_path.to_string_lossy().to_string();
                    if get_java_executable_version(&path_str) == Some(required_version) {
                        return Some(path_str);
                    }
                }
            }
        }
        let program_files_x86 = std::env::var("ProgramFiles(x86)")
            .unwrap_or_else(|_| "C:\\Program Files (x86)".to_string());
        let java_dir_x86 = std::path::Path::new(&program_files_x86).join("Java");
        if let Ok(entries) = std::fs::read_dir(java_dir_x86) {
            for entry in entries.flatten() {
                let java_path = entry.path().join("bin").join("java.exe");
                if java_path.exists() {
                    let path_str = java_path.to_string_lossy().to_string();
                    if get_java_executable_version(&path_str) == Some(required_version) {
                        return Some(path_str);
                    }
                }
            }
        }
    }

    #[cfg(target_os = "linux")]
    {
        if let Ok(entries) = std::fs::read_dir("/usr/lib/jvm") {
            for entry in entries.flatten() {
                let java_path = entry.path().join("bin").join("java");
                if java_path.exists() {
                    let path_str = java_path.to_string_lossy().to_string();
                    if get_java_executable_version(&path_str) == Some(required_version) {
                        return Some(path_str);
                    }
                }
            }
        }
    }

    let default_cmd = if cfg!(target_os = "windows") {
        "java.exe"
    } else {
        "java"
    };

    if get_java_executable_version(default_cmd) == Some(required_version) {
        return Some(default_cmd.to_string());
    }

    None
}
