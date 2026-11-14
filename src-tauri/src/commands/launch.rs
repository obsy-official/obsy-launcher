use crate::{is_safe_jvm_arg, minecraft, open_launcher, validate_safe_id, AppState};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Emitter, Manager, State};

#[derive(Clone, serde::Serialize)]
struct LaunchProgressPayload {
    status: String,
    progress: f32,
    detail: Option<String>,
}

#[tauri::command]
pub fn is_game_running(state: State<'_, AppState>) -> bool {
    state
        .is_game_running
        .load(std::sync::atomic::Ordering::SeqCst)
}

#[tauri::command]
pub async fn launch_game(
    profile_id: String,
    version_id: String,
    state: State<'_, AppState>,
    app: AppHandle,
) -> Result<(), String> {
    if state
        .is_game_running
        .compare_exchange(
            false,
            true,
            std::sync::atomic::Ordering::SeqCst,
            std::sync::atomic::Ordering::SeqCst,
        )
        .is_err()
    {
        return Err("Игра уже запускается или запущена".to_string());
    }

    let res = launch_game_inner(profile_id, version_id, &state, app).await;
    if res.is_err() {
        state
            .is_game_running
            .store(false, std::sync::atomic::Ordering::SeqCst);
    }
    res
}

async fn launch_game_inner(
    profile_id: String,
    version_id: String,
    state: &State<'_, AppState>,
    app: AppHandle,
) -> Result<(), String> {
    validate_safe_id(&version_id)?;
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

    // Resolve base vanilla version and mod loader
    let (mc_base_version, loader, loader_version) = {
        let instance_json_path = mc_dir
            .join("versions")
            .join(&version_id)
            .join(format!("{}.json", version_id));

        let mut base = version_id.clone();
        let mut ldr = None;
        let mut ldr_ver = None;

        if instance_json_path.exists() {
            if let Ok(content) = std::fs::read_to_string(&instance_json_path) {
                if let Ok(val) = serde_json::from_str::<serde_json::Value>(&content) {
                    if let Some(inherits) = val.get("inheritsFrom").and_then(|v| v.as_str()) {
                        base = inherits.to_string();
                    }
                    if let Some(l) = val.get("loader").and_then(|v| v.as_str()) {
                        ldr = Some(l.to_string());
                    }
                    if let Some(lv) = val.get("loaderVersion").and_then(|v| v.as_str()) {
                        ldr_ver = Some(lv.to_string());
                    }
                }
            }
        }

        if ldr_ver.as_deref() == Some("0.16.10") {
            ldr_ver = Some("0.19.3".to_string());
        }

        if base.contains('-') {
            let parts: Vec<&str> = base.split('-').collect();
            for part in parts.iter().rev() {
                if part.starts_with("1.") || part.starts_with("26.") || part.starts_with("25.") {
                    base = part.to_string();
                    break;
                }
            }
        }

        if ldr.is_none()
            && (version_id.contains("fabric")
                || version_id.contains("optimized")
                || version_id.contains('-'))
        {
            ldr = Some("fabric".to_string());
            ldr_ver = Some("0.19.3".to_string());
        }

        (base, ldr, ldr_ver)
    };

    let java_path = if let Some(path) = &launcher_state.java_path {
        if path.trim().is_empty() {
            crate::minecraft::java::download_java_if_needed(&mc_base_version, &app).await?
        } else {
            let mut is_ok = false;
            if let Ok(out) = std::process::Command::new(path).arg("-version").output() {
                if out.status.success() {
                    is_ok = true;
                }
            }
            if is_ok {
                path.clone()
            } else {
                crate::minecraft::java::download_java_if_needed(&mc_base_version, &app).await?
            }
        }
    } else {
        crate::minecraft::java::download_java_if_needed(&mc_base_version, &app).await?
    };

    let mut launcher = open_launcher::Launcher::new(
        &mc_dir_str,
        &java_path,
        open_launcher::version::Version {
            minecraft_version: mc_base_version.clone(),
            loader: loader.clone(),
            loader_version: loader_version.clone(),
        },
    )
    .await;

    let mut iso_dir = mc_dir.clone();
    iso_dir.push("instances");
    iso_dir.push(&version_id);

    if !iso_dir.exists() {
        let _ = std::fs::create_dir_all(&iso_dir);
    }

    launcher.set_execution_directory(iso_dir);

    launcher.auth(auth);
    launcher.custom_resolution(
        launcher_state.screen_width as i32,
        launcher_state.screen_height as i32,
    );
    #[cfg(target_os = "macos")]
    {
        launcher.jvm_arg("-XstartOnFirstThread");
        launcher.jvm_arg("-Djava.awt.headless=false");
        launcher.jvm_arg("-Dapple.awt.UIElement=false");
    }

    launcher.jvm_arg(&format!("-Xmx{}M", launcher_state.memory_amount));

    // Modern Aikar's G1GC flags to eliminate lag spikes and optimize chunk generation
    launcher.jvm_arg("-XX:+UseG1GC");
    launcher.jvm_arg("-XX:+ParallelRefProcEnabled");
    launcher.jvm_arg("-XX:MaxGCPauseMillis=200");
    launcher.jvm_arg("-XX:+UnlockExperimentalVMOptions");
    launcher.jvm_arg("-XX:+DisableExplicitGC");
    launcher.jvm_arg("-XX:+AlwaysPreTouch");
    launcher.jvm_arg("-XX:G1NewSizePercent=30");
    launcher.jvm_arg("-XX:G1MaxNewSizePercent=40");
    launcher.jvm_arg("-XX:G1ReservePercent=20");
    launcher.jvm_arg("-XX:G1HeapRegionSize=8M");

    if !launcher_state.jvm_arguments.is_empty() {
        for arg in launcher_state.jvm_arguments.split_whitespace() {
            if is_safe_jvm_arg(arg) {
                launcher.jvm_arg(arg);
            } else {
                eprintln!(
                    "[SECURITY] Filtered out potentially dangerous JVM argument: {}",
                    arg
                );
            }
        }
    }

    let mut progress = launcher.on_progress();
    let app_clone = app.clone();

    tokio::spawn(async move {
        let mut last_emit = std::time::Instant::now()
            .checked_sub(std::time::Duration::from_millis(200))
            .unwrap_or_else(std::time::Instant::now);
        let mut last_status = String::new();

        while let Ok(prog) = progress.recv().await {
            let percentage = if prog.total > 0 {
                prog.current as f32 / prog.total as f32
            } else {
                0.0
            };

            let (base, scale) = match prog.task.as_str() {
                "checking_assets" | "downloading_assets" => (0.3, 0.3),
                "checking_libraries" | "downloading_libraries" | "post_processing" => (0.6, 0.3),
                "checking_natives" | "extracting_natives" => (0.9, 0.1),
                _ => (0.0, 1.0),
            };

            let global_percentage = base + scale * percentage;

            let now = std::time::Instant::now();
            let is_finished = prog.total > 0 && prog.current >= prog.total;
            let status_changed = prog.task != last_status;
            let elapsed_ms = now.duration_since(last_emit).as_millis();

            if is_finished || status_changed || elapsed_ms >= 50 {
                last_emit = now;
                last_status = prog.task.clone();

                let detail = if prog.task == "downloading_assets" {
                    let current_mb = prog.current as f32 / 1_048_576.0;
                    let total_mb = prog.total as f32 / 1_048_576.0;
                    Some(format!("{:.1}/{:.1} MB", current_mb, total_mb))
                } else if prog.task == "downloading_libraries" || prog.task == "extracting_natives"
                {
                    Some(format!("{}/{}", prog.current, prog.total))
                } else {
                    None
                };

                let _ = app_clone.emit(
                    "launch-progress",
                    LaunchProgressPayload {
                        status: prog.task,
                        progress: global_percentage,
                        detail,
                    },
                );
            }
        }
    });

    app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "installing_version".to_string(),
            progress: 0.1,
            detail: None,
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
            detail: None,
        },
    )
    .map_err(|e| e.to_string())?;
    launcher.install_assets().await.map_err(|e| e.to_string())?;

    app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "installing_libraries".to_string(),
            progress: 0.6,
            detail: None,
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
            detail: None,
        },
    )
    .map_err(|e| e.to_string())?;

    let mut command = launcher.command().map_err(|e| e.to_string())?;

    println!("[LAUNCH] {:?}", command);

    command.stdout(std::process::Stdio::piped());
    command.stderr(std::process::Stdio::piped());

    let mut child = command.spawn().map_err(|e| e.to_string())?;

    let session_logs = Arc::new(Mutex::new(Vec::<String>::new()));
    let start_time = std::time::Instant::now();
    let version_id_clone = version_id.clone();
    let memory_amount = launcher_state.memory_amount;

    let app_clone_out = app.clone();
    let session_logs_out = session_logs.clone();
    if let Some(stdout) = child.stdout.take() {
        std::thread::spawn(move || {
            use std::io::{BufRead, BufReader};
            let reader = BufReader::new(stdout);
            for line in reader.lines().flatten() {
                println!("[MC STDOUT] {}", line);
                if let Ok(mut lock) = session_logs_out.lock() {
                    if lock.len() < 2000 {
                        lock.push(line.clone());
                    }
                }
                let _ = app_clone_out.emit("minecraft-log", line);
            }
        });
    }

    let app_clone_err = app.clone();
    let session_logs_err = session_logs.clone();
    if let Some(stderr) = child.stderr.take() {
        std::thread::spawn(move || {
            use std::io::{BufRead, BufReader};
            let reader = BufReader::new(stderr);
            for line in reader.lines().flatten() {
                eprintln!("[MC STDERR] {}", line);
                if let Ok(mut lock) = session_logs_err.lock() {
                    if lock.len() < 2000 {
                        lock.push(line.clone());
                    }
                }
                let _ = app_clone_err.emit("minecraft-error", line);
            }
        });
    }

    let _ = app.emit(
        "launch-progress",
        LaunchProgressPayload {
            status: "success".to_string(),
            progress: 1.0,
            detail: None,
        },
    );

    let app_clone_wait = app.clone();
    let close_after_launch = launcher_state.close_after_launch;

    std::thread::spawn(move || {
        if close_after_launch {
            std::thread::sleep(std::time::Duration::from_millis(4000));
            if let Some(window) = app_clone_wait.get_webview_window("main") {
                let _ = window.hide();
            }
        }

        let exit_status = child.wait().ok();
        let duration_secs = start_time.elapsed().as_secs();

        // Record playtime
        let mut store = minecraft::playtime::PlaytimeStore::load(&app_clone_wait);
        store.add_session(&version_id_clone, duration_secs, &app_clone_wait);

        // Analyze potential crash
        let logs_combined = session_logs
            .lock()
            .map(|l| l.join("\n"))
            .unwrap_or_default();
        let exit_code = exit_status.and_then(|s| s.code());
        if let Some(diag) =
            minecraft::crash::diagnose(exit_code, &logs_combined, &version_id_clone, memory_amount)
        {
            let _ = app_clone_wait.emit("minecraft-crash-diagnostic", &diag);
            if let Some(app_state) = app_clone_wait.try_state::<AppState>() {
                if let Ok(mut lock) = app_state.last_crash.lock() {
                    *lock = Some(diag);
                }
            }
        }

        if let Some(window) = app_clone_wait.get_webview_window("main") {
            let _ = window.show();
            let _ = window.unminimize();
            let _ = window.set_focus();
        }

        if let Some(app_state) = app_clone_wait.try_state::<AppState>() {
            app_state
                .is_game_running
                .store(false, std::sync::atomic::Ordering::SeqCst);
        }

        let _ = app_clone_wait.emit(
            "launch-progress",
            LaunchProgressPayload {
                status: "finished".to_string(),
                progress: 0.0,
                detail: None,
            },
        );
    });

    Ok(())
}
