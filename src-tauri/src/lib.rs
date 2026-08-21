pub mod addons;
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
use std::sync::{Arc, Mutex, OnceLock};
use std::time::Instant;
use tauri::{AppHandle, Emitter, Manager, State};

#[global_allocator]
static GLOBAL: mimalloc::MiMalloc = mimalloc::MiMalloc;

static START_TIME: OnceLock<Instant> = OnceLock::new();
static STARTUP_MEASURED: OnceLock<u64> = OnceLock::new();

pub fn init_start_time() {
    START_TIME.get_or_init(Instant::now);
}

#[tauri::command]
fn get_startup_time() -> u64 {
    *STARTUP_MEASURED.get_or_init(|| {
        START_TIME
            .get()
            .map(|t| t.elapsed().as_millis() as u64)
            .unwrap_or(0)
    })
}

#[repr(C)]
#[derive(Default)]
struct TaskVmInfo {
    virtual_size: u64,
    region_count: u32,
    page_size: u32,
    resident_size: u64,
    resident_size_peak: u64,
    device: u64,
    device_peak: u64,
    internal: u64,
    internal_peak: u64,
    external: u64,
    external_peak: u64,
    reusable: u64,
    reusable_peak: u64,
    purgeable_volatile_pmap: u64,
    purgeable_volatile_resident: u64,
    purgeable_volatile_virtual: u64,
    compressed: u64,
    compressed_peak: u64,
    compressed_lifetime: u64,
    phys_footprint: u64,
}

#[tauri::command]
fn get_app_memory_usage() -> u64 {
    #[cfg(target_os = "macos")]
    {
        use std::mem::MaybeUninit;
        const TASK_VM_INFO: libc::c_uint = 22;
        const TASK_VM_INFO_COUNT: libc::mach_msg_type_number_t = (std::mem::size_of::<TaskVmInfo>()
            / std::mem::size_of::<libc::natural_t>())
            as libc::mach_msg_type_number_t;

        let mut info = MaybeUninit::<TaskVmInfo>::uninit();
        let mut count = TASK_VM_INFO_COUNT;

        #[allow(deprecated)]
        let kret = unsafe {
            libc::task_info(
                libc::mach_task_self(),
                TASK_VM_INFO,
                info.as_mut_ptr() as libc::task_info_t,
                &mut count,
            )
        };

        if kret == libc::KERN_SUCCESS {
            let vm_info = unsafe { info.assume_init() };
            return vm_info.phys_footprint / 1024 / 1024;
        }
    }

    #[cfg(not(target_os = "macos"))]
    {
        if let Ok(pid) = sysinfo::get_current_pid() {
            let mut sys = sysinfo::System::new();
            if sys.refresh_processes_specifics(
                sysinfo::ProcessesToUpdate::Some(&[pid]),
                true,
                sysinfo::ProcessRefreshKind::nothing().with_memory(),
            ) > 0
            {
                if let Some(process) = sys.process(pid) {
                    return process.memory() / 1024 / 1024;
                }
            }
        }
    }

    0
}

pub struct AppState {
    pub launcher_state: Mutex<LauncherState>,
    pub profile_store: ProfileStore,
    pub wardrobe_store: WardrobeStore,
    pub last_crash: Mutex<Option<minecraft::crash::CrashDiag>>,
    pub is_game_running: std::sync::atomic::AtomicBool,
}

pub fn validate_safe_id(id: &str) -> Result<(), String> {
    if id.is_empty()
        || id.contains("..")
        || id.contains('/')
        || id.contains('\\')
        || id.chars().any(|c| c.is_control())
    {
        return Err("Invalid identifier".to_string());
    }
    Ok(())
}

pub fn is_safe_jvm_arg(arg: &str) -> bool {
    let lower = arg.to_lowercase();
    let dangerous_prefixes = [
        "-javaagent:",
        "-agentlib:",
        "-agentpath:",
        "-xbootclasspath",
        "-xx:onerror=",
        "-xx:onoutofmemoryerror=",
        "-xx:errorfile=",
        "-dcom.sun.management.jmxremote",
    ];
    for prefix in &dangerous_prefixes {
        if lower.starts_with(prefix) {
            return false;
        }
    }
    true
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
fn select_version(id: String, state: State<'_, AppState>, app: AppHandle) -> Result<(), String> {
    validate_safe_id(&id)?;
    let mut current_state = state.launcher_state.lock().map_err(|e| e.to_string())?;
    current_state.selected_version_id = Some(id);
    current_state.save(&app)?;
    Ok(())
}

#[derive(Clone, serde::Serialize)]
struct LaunchProgressPayload {
    status: String,
    progress: f32,
    detail: Option<String>,
}

#[tauri::command]
fn is_game_running(state: State<'_, AppState>) -> bool {
    state
        .is_game_running
        .load(std::sync::atomic::Ordering::SeqCst)
}

#[tauri::command]
async fn launch_game(
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
        cape_png: None,
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
        if let Ok(Some((base64_data, slim, cape_b64))) =
            crate::msa::fetch_public_skin_base64(&profile.id).await
        {
            profile.skin_png = Some(base64_data);
            profile.slim = slim;
            profile.cape_png = cape_b64;
            state.profile_store.save(&profiles)?;
        }
    } else {
        let client = reqwest::Client::new();
        let encoded_username = profile
            .username
            .chars()
            .map(|c| match c {
                'a'..='z' | 'A'..='Z' | '0'..='9' | '-' | '_' | '.' | '~' => c.to_string(),
                _ => format!("%{:02X}", c as u32),
            })
            .collect::<String>();
        if let Ok(res) = client
            .get(&format!("https://mc-heads.net/skin/{}", encoded_username))
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
async fn get_account_capes(
    state: State<'_, AppState>,
    profile_id: String,
) -> Result<Vec<crate::msa::MinecraftCape>, String> {
    let mut profiles = state.profile_store.load();
    let profile = profiles
        .iter_mut()
        .find(|p| p.id == profile_id)
        .ok_or("Profile not found")?;

    if !profile.microsoft {
        return Ok(Vec::new());
    }

    let mut mc_token = profile.access_token.clone();
    if let Some(refresh_token) = &profile.refresh_token {
        if let Ok(new_msa) = crate::msa::refresh_msa_token(refresh_token).await {
            if let Ok((xbl, uhs)) = crate::msa::auth_xbox_live(&new_msa.access_token).await {
                if let Ok(xsts) = crate::msa::auth_xsts(&xbl).await {
                    if let Ok(token) = crate::msa::auth_minecraft(&uhs, &xsts).await {
                        mc_token = Some(token.clone());
                        profile.access_token = Some(token);
                        profile.refresh_token = Some(new_msa.refresh_token);
                        let _ = state.profile_store.save(&profiles);
                    }
                }
            }
        }
    }

    if let Some(token) = mc_token {
        crate::msa::get_account_capes(&token).await
    } else {
        Ok(Vec::new())
    }
}

#[tauri::command]
async fn set_active_cape(
    state: State<'_, AppState>,
    profile_id: String,
    cape_id: Option<String>,
) -> Result<(), String> {
    let mut profiles = state.profile_store.load();
    let profile = profiles
        .iter_mut()
        .find(|p| p.id == profile_id)
        .ok_or("Profile not found")?;

    if !profile.microsoft {
        return Err("Capes are only supported on Microsoft accounts".into());
    }

    let mut mc_token = profile.access_token.clone();
    if let Some(refresh_token) = &profile.refresh_token {
        if let Ok(new_msa) = crate::msa::refresh_msa_token(refresh_token).await {
            if let Ok((xbl, uhs)) = crate::msa::auth_xbox_live(&new_msa.access_token).await {
                if let Ok(xsts) = crate::msa::auth_xsts(&xbl).await {
                    if let Ok(token) = crate::msa::auth_minecraft(&uhs, &xsts).await {
                        mc_token = Some(token.clone());
                        profile.access_token = Some(token);
                        profile.refresh_token = Some(new_msa.refresh_token);
                        let _ = state.profile_store.save(&profiles);
                    }
                }
            }
        }
    }

    if let Some(token) = mc_token {
        crate::msa::set_account_active_cape(&token, cape_id.as_deref()).await
    } else {
        Err("Missing access token for Microsoft profile".into())
    }
}

#[tauri::command]
fn open_version_folder(version_id: String, app: tauri::AppHandle) -> Result<(), String> {
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
fn delete_instance(
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
async fn create_instance(
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
async fn download_instance_file(
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
async fn read_instance_zip_entry(
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
async fn extract_instance_zip_folder(
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
async fn delete_instance_file(instance_id: String, subpath: String) -> Result<(), String> {
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

#[tauri::command]
fn get_playtime_summary(app: AppHandle) -> Result<minecraft::playtime::PlaytimeSummary, String> {
    Ok(minecraft::playtime::get_summary(&app))
}

#[tauri::command]
fn get_last_crash_diagnostics(
    state: State<'_, AppState>,
) -> Result<Option<minecraft::crash::CrashDiag>, String> {
    let lock = state.last_crash.lock().map_err(|e| e.to_string())?;
    Ok(lock.clone())
}

#[tauri::command]
async fn apply_crash_action(
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
            use tauri_plugin_opener::OpenerExt;
            let mc_dir = crate::minecraft::versions::get_minecraft_dir();
            app.opener()
                .open_path(mc_dir.to_string_lossy().to_string(), None::<&str>)
                .map_err(|e| e.to_string())?;
            Ok("Game folder opened".to_string())
        }
        "open-url" => {
            use tauri_plugin_opener::OpenerExt;
            app.opener()
                .open_url(arg, None::<&str>)
                .map_err(|e| e.to_string())?;
            Ok("URL opened in browser".to_string())
        }
        _ => Err(format!("Unknown crash action: {}", kind)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle();
            let mc_dir = minecraft::versions::get_minecraft_dir();
            minecraft::migration::migrate_legacy_data_if_needed(&mc_dir, Some(handle));

            let initial_state = LauncherState::load(handle);
            let profile_store = ProfileStore::new(handle);
            let wardrobe_store = WardrobeStore::new(handle);
            app.manage(AppState {
                launcher_state: Mutex::new(initial_state),
                profile_store,
                wardrobe_store,
                last_crash: Mutex::new(None),
                is_game_running: std::sync::atomic::AtomicBool::new(false),
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
            is_game_running,
            start_msa_auth,
            poll_msa_auth,
            get_wardrobe,
            add_skin_to_wardrobe,
            remove_skin_from_wardrobe,
            apply_skin,
            refresh_profile_skin,
            refresh_profile_token,
            get_account_capes,
            set_active_cape,
            open_version_folder,
            delete_instance,
            create_instance,
            download_instance_file,
            read_instance_zip_entry,
            extract_instance_zip_folder,
            delete_instance_file,
            get_startup_time,
            get_app_memory_usage,
            get_playtime_summary,
            get_last_crash_diagnostics,
            apply_crash_action,
            addons::get_installed_addons_from_disk,
            addons::read_addon_file,
            addons::uninstall_addon_files,
            addons::install_addon_from_archive_bytes,
            addons::download_and_install_addon,
            addons::download_addon_archive_bytes,
            addons::save_local_addon,
            addons::inspect_addon_archive
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;

    #[test]
    fn test_app_memory() {
        let mem = get_app_memory_usage();
        println!("\n>>> ACTUAL MEASURED MEMORY: {} MB <<<\n", mem);
        assert!(mem > 0);
    }

    #[test]
    fn test_validate_safe_id() {
        assert!(validate_safe_id("valid-addon-1").is_ok());
        assert!(validate_safe_id("skin_3d_viewer").is_ok());
        assert!(validate_safe_id("1.20.4").is_ok());

        assert!(validate_safe_id("").is_err());
        assert!(validate_safe_id("../evil").is_err());
        assert!(validate_safe_id("evil/path").is_err());
        assert!(validate_safe_id("evil\\path").is_err());
        assert!(validate_safe_id("addon\0null").is_err());
    }

    #[test]
    fn test_is_safe_jvm_arg() {
        assert!(is_safe_jvm_arg("-Xmx4G"));
        assert!(is_safe_jvm_arg("-XX:+UseG1GC"));
        assert!(is_safe_jvm_arg("-Dminecraft.launcher.brand=obsy"));

        assert!(!is_safe_jvm_arg("-javaagent:/tmp/evil.jar"));
        assert!(!is_safe_jvm_arg("-agentlib:jdwp=transport=dt_socket"));
        assert!(!is_safe_jvm_arg("-agentpath:/tmp/lib.so"));
        assert!(!is_safe_jvm_arg("-XX:OnError=curl http://attacker.com"));
        assert!(!is_safe_jvm_arg("-XX:OnOutOfMemoryError=reboot"));
        assert!(!is_safe_jvm_arg("-Xbootclasspath:/tmp/override"));
    }

    #[test]
    fn test_addons_path_sanitization() {
        let base = Path::new("/tmp/obsy_test_base");

        // Safe paths
        let safe1 = addons::sanitize_path(base, Path::new("index.js")).unwrap();
        assert_eq!(safe1, base.join("index.js"));

        let safe2 = addons::sanitize_path(base, Path::new("assets/icon.png")).unwrap();
        assert_eq!(safe2, base.join("assets/icon.png"));

        // Path traversal attempts
        assert!(addons::sanitize_path(base, Path::new("../evil.js")).is_err());
        assert!(addons::sanitize_path(base, Path::new("/etc/passwd")).is_err());
        assert!(addons::sanitize_path(base, Path::new("nested/../../evil")).is_err());

        // Zip extract paths
        assert!(addons::safe_zip_extract_path(base, "index.js").is_ok());
        assert!(addons::safe_zip_extract_path(base, "sub/dir/file.txt").is_ok());
        assert!(addons::safe_zip_extract_path(base, "../evil.js").is_err());
        assert!(addons::safe_zip_extract_path(base, "../../root.txt").is_err());
        assert!(addons::safe_zip_extract_path(base, "/absolute/path").is_err());
    }

    #[test]
    fn test_addon_verification_spoof_prevention() {
        // Unknown or spoofed author addon with invalid hash must not be verified
        assert!(!addons::is_verified_addon("unknown-addon", None));
        assert!(!addons::is_verified_addon(
            "unknown-addon",
            Some("a94caf582b190a8413ce0b154fa9f024c359a849b0c2e589add6fe3d1e779700")
        ));
        assert!(!addons::is_verified_addon(
            "skin-3d-viewer",
            Some("fake_hash")
        ));
        // Correct official addon checksum matches
        assert!(addons::is_verified_addon(
            "skin-3d-viewer",
            Some("a94caf582b190a8413ce0b154fa9f024c359a849b0c2e589add6fe3d1e779700")
        ));
    }
}
