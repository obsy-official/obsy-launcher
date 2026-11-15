pub mod addons;
pub mod auth;
pub mod commands;
pub mod minecraft;
pub mod msa;
pub mod open_launcher;
pub mod state;
pub mod wardrobe;

use crate::auth::ProfileStore;
use crate::state::LauncherState;
use crate::wardrobe::WardrobeStore;
use std::sync::{Mutex, OnceLock};
use std::time::Instant;
use tauri::Manager;

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

pub fn appimage_env_overrides() -> Vec<(&'static str, Option<std::ffi::OsString>)> {
    #[cfg(target_os = "linux")]
    if std::env::var_os("APPIMAGE").is_some() || std::env::var_os("APPDIR").is_some() {
        return [
            "LD_LIBRARY_PATH",
            "XDG_DATA_DIRS",
            "GIO_EXTRA_MODULES",
            "GTK_PATH",
            "GDK_PIXBUF_MODULE_FILE",
            "GDK_PIXBUF_MODULEDIR",
        ]
        .into_iter()
        .map(|var| {
            let orig_key = format!("{}_ORIG", var);
            (var, std::env::var_os(&orig_key))
        })
        .collect();
    }
    Vec::new()
}

pub fn open_path_or_url(app: &tauri::AppHandle, target: &str, is_url: bool) -> Result<(), String> {
    #[cfg(target_os = "linux")]
    if std::env::var_os("APPIMAGE").is_some() || std::env::var_os("APPDIR").is_some() {
        let mut cmd = std::process::Command::new("xdg-open");
        cmd.arg(target);
        for (var, orig) in appimage_env_overrides() {
            if let Some(val) = orig {
                cmd.env(var, val);
            } else {
                cmd.env_remove(var);
            }
        }
        cmd.spawn().map_err(|e| e.to_string())?;
        return Ok(());
    }

    use tauri_plugin_opener::OpenerExt;
    if is_url {
        app.opener()
            .open_url(target, None::<&str>)
            .map_err(|e| e.to_string())
    } else {
        app.opener()
            .open_path(target, None::<&str>)
            .map_err(|e| e.to_string())
    }
}

#[tauri::command]
fn open_external_url(url: String, app: tauri::AppHandle) -> Result<(), String> {
    if !url.starts_with("https://") && !url.starts_with("http://") {
        return Err("Invalid URL scheme".to_string());
    }
    open_path_or_url(&app, &url, true)
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
            commands::profiles::get_launcher_state,
            commands::profiles::update_launcher_state,
            commands::profiles::get_profiles,
            commands::profiles::add_offline_profile,
            commands::profiles::select_profile,
            commands::profiles::remove_profile,
            commands::profiles::get_versions,
            commands::profiles::select_version,
            commands::launch::launch_game,
            commands::launch::is_game_running,
            commands::msa::start_msa_auth,
            commands::msa::poll_msa_auth,
            commands::wardrobe::get_wardrobe,
            commands::wardrobe::add_skin_to_wardrobe,
            commands::wardrobe::remove_skin_from_wardrobe,
            commands::wardrobe::apply_skin,
            commands::wardrobe::refresh_profile_skin,
            commands::wardrobe::refresh_profile_token,
            commands::wardrobe::get_account_capes,
            commands::wardrobe::set_active_cape,
            commands::instances::open_version_folder,
            commands::instances::delete_instance,
            commands::instances::create_instance,
            commands::instances::download_instance_file,
            commands::instances::read_instance_zip_entry,
            commands::instances::extract_instance_zip_folder,
            commands::instances::delete_instance_file,
            get_startup_time,
            get_app_memory_usage,
            commands::diagnostics::get_playtime_summary,
            commands::diagnostics::get_last_crash_diagnostics,
            commands::diagnostics::apply_crash_action,
            open_external_url,
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
        let expected_hash = addons::get_embedded_catalog_checksum("skin-3d-viewer")
            .expect("skin-3d-viewer should exist in embedded catalog.json");
        assert!(!addons::is_verified_addon("unknown-addon", None));
        assert!(!addons::is_verified_addon(
            "unknown-addon",
            Some(expected_hash)
        ));
        assert!(!addons::is_verified_addon(
            "skin-3d-viewer",
            Some("fake_hash")
        ));
        assert!(addons::is_verified_addon(
            "skin-3d-viewer",
            Some(expected_hash)
        ));
    }
}
