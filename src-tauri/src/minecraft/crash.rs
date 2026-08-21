use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CrashAction {
    pub kind: String,
    pub label: String,
    pub arg: String,
    pub hint: String,
}

impl CrashAction {
    pub fn new(kind: &str, label: &str, arg: &str, hint: &str) -> Self {
        Self {
            kind: kind.to_string(),
            label: label.to_string(),
            arg: arg.to_string(),
            hint: hint.to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct CrashDiag {
    pub has_crashed: bool,
    pub exit_code: Option<i32>,
    pub reason: String,
    pub tail: String,
    pub culprits: Vec<String>,
    pub actions: Vec<CrashAction>,
}

#[derive(PartialEq, Debug)]
pub struct ModFault {
    pub name: String,
    pub wrong_version: bool,
}

fn quoted_after(line: &str, marker: &str) -> Option<String> {
    let rest = line.split_once(marker)?.1;
    let start = rest.find('\'')? + 1;
    let end = rest[start..].find('\'')? + start;
    let name = rest[start..end].trim();
    if !name.is_empty() && name.len() <= 60 {
        Some(name.to_string())
    } else {
        None
    }
}

const GAME_REQ_MARKERS: [&str; 6] = [
    " of minecraft",
    "'minecraft'",
    "'neoforge'",
    "'forge'",
    "'fabricloader'",
    "'fabric loader'",
];

pub fn extract_mod_faults(text: &str) -> Vec<ModFault> {
    let mut out: Vec<ModFault> = vec![];
    for line in text.lines() {
        let low = line.to_lowercase();
        let fault = if low.contains("requested by:") {
            quoted_after(line, "Requested by:").map(|name| ModFault {
                wrong_version: GAME_REQ_MARKERS
                    .iter()
                    .any(|r| low.split("requested by:").next().unwrap_or("").contains(r)),
                name,
            })
        } else if low.contains("requires") && low.contains("mod '") {
            quoted_after(line, "Mod ").map(|name| ModFault {
                wrong_version: GAME_REQ_MARKERS.iter().any(|r| low.contains(r)),
                name,
            })
        } else {
            None
        };

        if let Some(f) = fault {
            if !out.iter().any(|existing| existing.name == f.name) {
                out.push(f);
            }
        }
    }
    out
}

pub fn diagnose(
    exit_code: Option<i32>,
    log_text: &str,
    mc_version: &str,
    current_ram_mb: i32,
) -> Option<CrashDiag> {
    // If exit code is 0 and no obvious fatal exception, not a crash
    let is_bad_exit = exit_code.map(|c| c != 0).unwrap_or(false);
    let low = log_text.to_lowercase();

    let has_fatal_error = low.contains("outofmemoryerror")
        || low.contains("unsupportedclassversionerror")
        || low.contains("a fatal error has been detected")
        || low.contains("incompatiblemodsexception")
        || low.contains("duplicatemodsexception")
        || low.contains("could not find required mod")
        || low.contains("minecraft has crashed")
        || is_bad_exit;

    if !has_fatal_error {
        return None;
    }

    let mut actions: Vec<CrashAction> = vec![];
    let mut culprits: Vec<String> = vec![];
    let mut reason = String::from("The game exited unexpectedly.");

    let tail_lines: Vec<&str> = log_text.lines().rev().take(12).collect();
    let tail = tail_lines
        .into_iter()
        .rev()
        .collect::<Vec<&str>>()
        .join("\n");

    if low.contains("outofmemoryerror") || low.contains("insufficient memory") {
        reason = "Minecraft ran out of allocated memory (OutOfMemoryError).".to_string();
        let target_ram = (current_ram_mb + 2048).clamp(2048, 16384);
        actions.push(CrashAction::new(
            "set-ram",
            &format!("Allocate {} GB RAM", target_ram / 1024),
            &target_ram.to_string(),
            "Increase memory allocation for smoother gameplay",
        ));
    } else if low.contains("unsupportedclassversionerror")
        || low.contains("compiled by a more recent version of the java")
    {
        let required_java = crate::minecraft::java::get_required_java_version(mc_version);
        reason = format!(
            "Java version mismatch. Minecraft {} requires Java {}.",
            mc_version, required_java
        );
        actions.push(CrashAction::new(
            "install-java",
            &format!("Use Recommended Java {}", required_java),
            &required_java.to_string(),
            "Download or switch to the required Java version",
        ));
    } else {
        let faults = extract_mod_faults(log_text);
        if !faults.is_empty() {
            let names: Vec<&str> = faults.iter().map(|f| f.name.as_str()).collect();
            reason = format!("Mod loading issue detected with: {}", names.join(", "));
            for f in &faults {
                culprits.push(f.name.clone());
                actions.push(CrashAction::new(
                    "disable-mod",
                    &format!("Disable \"{}\"", f.name),
                    &f.name,
                    if f.wrong_version {
                        "Mod is built for a different game/loader version"
                    } else {
                        "Mod has unmet dependencies"
                    },
                ));
            }
        } else if low.contains("igdrcl") || low.contains("nvoglv") || low.contains("atio6axx") {
            reason = "Crash detected inside your graphics card driver.".to_string();
            actions.push(CrashAction::new(
                "open-url",
                "Update GPU Drivers",
                "https://www.nvidia.com/Download/index.aspx",
                "Driver crash detected — consider updating GPU drivers",
            ));
        }
    }

    actions.push(CrashAction::new(
        "open-folder",
        "Open Game Directory",
        "",
        "Open the .minecraft folder to inspect logs or configs",
    ));

    Some(CrashDiag {
        has_crashed: true,
        exit_code,
        reason,
        tail,
        culprits,
        actions,
    })
}

pub fn disable_mod_file(mc_dir: &Path, mod_query: &str) -> Result<String, String> {
    let mods_dir = mc_dir.join("mods");
    if !mods_dir.exists() {
        return Err("Mods directory not found".to_string());
    }

    let q = mod_query.to_lowercase();
    let entries = std::fs::read_dir(&mods_dir).map_err(|e| e.to_string())?;

    for entry in entries.flatten() {
        let path = entry.path();
        if path.is_file() {
            let fname = path.file_name().unwrap_or_default().to_string_lossy();
            if fname.to_lowercase().contains(&q) && fname.ends_with(".jar") {
                let disabled_path = mods_dir.join(format!("{}.disabled", fname));
                std::fs::rename(&path, &disabled_path).map_err(|e| e.to_string())?;
                return Ok(format!("Disabled mod: {}", fname));
            }
        }
    }

    Err(format!(
        "Could not find .jar file matching \"{}\"",
        mod_query
    ))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_fabric_fault() {
        let sample = "net.fabricmc.loader.impl.FormattedException: Some error\n - Mod 'Sodium' (sodium) requires version 1.20.1 of minecraft, but only 1.21 is present!";
        let faults = extract_mod_faults(sample);
        assert_eq!(faults.len(), 1);
        assert_eq!(faults[0].name, "Sodium");
        assert!(faults[0].wrong_version);
    }

    #[test]
    fn test_diagnose_oom() {
        let sample = "java.lang.OutOfMemoryError: Java heap space";
        let diag = diagnose(Some(1), sample, "1.20.4", 2048);
        assert!(diag.is_some());
        let d = diag.unwrap();
        assert!(d.actions.iter().any(|a| a.kind == "set-ram"));
    }
}
