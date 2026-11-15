use keyring::Entry;
use magic_crypt::{new_magic_crypt, MagicCryptTrait};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use uuid::Uuid;

fn read_file_key(store_path: &Path) -> Option<String> {
    let key_path = store_path.with_file_name("profiles.key");
    if key_path.exists() {
        return fs::read_to_string(&key_path).ok().filter(|k| !k.is_empty());
    }
    None
}

fn write_file_key(store_path: &Path, key: &str) {
    let key_path = store_path.with_file_name("profiles.key");
    if let Some(parent) = key_path.parent() {
        let _ = fs::create_dir_all(parent);
    }
    let _ = fs::write(&key_path, key);
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        if let Ok(metadata) = fs::metadata(&key_path) {
            let mut perms = metadata.permissions();
            perms.set_mode(0o600);
            let _ = fs::set_permissions(&key_path, perms);
        }
    }
}

fn get_encryption_key(store_path: &Path) -> String {
    let file_key = read_file_key(store_path);

    if let Ok(entry) = Entry::new("obsy-launcher", "profile-encryption-key") {
        if let Ok(password) = entry.get_password() {
            return password;
        }
        if let Some(existing) = file_key {
            let _ = entry.set_password(&existing);
            return existing;
        }
        let key = Uuid::new_v4().to_string() + &Uuid::new_v4().to_string();
        if entry.set_password(&key).is_ok() {
            return key;
        }
    }

    if let Some(existing) = file_key {
        return existing;
    }

    let key = Uuid::new_v4().to_string() + &Uuid::new_v4().to_string();
    write_file_key(store_path, &key);
    key
}

fn try_decrypt_profiles(contents: &str, key: &str) -> Option<Vec<Profile>> {
    let mc = new_magic_crypt!(key, 256);
    let decrypted = mc.decrypt_base64_to_string(contents).ok()?;
    serde_json::from_str(&decrypted).ok()
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct MinecraftCape {
    pub id: String,
    pub url: String,
    pub alias: String,
    pub active: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    pub id: String,
    pub username: String,
    pub microsoft: bool,
    pub skin_png: Option<String>,
    pub cape_png: Option<String>,
    pub slim: bool,
    pub capes: Vec<MinecraftCape>,
    pub access_token: Option<String>,
    pub refresh_token: Option<String>,
}

impl Profile {
    pub fn new_offline(username: String) -> Self {
        let id = Uuid::new_v3(
            &Uuid::NAMESPACE_OID,
            format!("OfflinePlayer:{}", username).as_bytes(),
        )
        .to_string();
        let skin_png = Some(format!("https://minotar.net/skin/{}", username));
        Self {
            id,
            username,
            microsoft: false,
            skin_png,
            cape_png: None,
            slim: false,
            capes: vec![],
            access_token: None,
            refresh_token: None,
        }
    }
}

pub struct ProfileStore {
    path: PathBuf,
}

impl ProfileStore {
    pub fn new(_app_handle: &tauri::AppHandle) -> Self {
        let path = crate::minecraft::versions::get_minecraft_dir().join("profiles.json");
        Self { path }
    }

    pub fn load(&self) -> Vec<Profile> {
        if self.path.exists() {
            if let Ok(contents) = fs::read_to_string(&self.path) {
                let primary_key = get_encryption_key(&self.path);
                if let Some(profiles) = try_decrypt_profiles(&contents, &primary_key) {
                    return profiles;
                }
                if let Some(file_key) = read_file_key(&self.path) {
                    if file_key != primary_key {
                        if let Some(profiles) = try_decrypt_profiles(&contents, &file_key) {
                            return profiles;
                        }
                    }
                }
                if !contents.trim().is_empty() {
                    let backup_path = self.path.with_file_name("profiles.json.bak");
                    if !backup_path.exists() {
                        let _ = fs::copy(&self.path, &backup_path);
                    }
                }
            }
        }
        vec![]
    }

    pub fn save(&self, profiles: &[Profile]) -> Result<(), String> {
        if let Some(parent) = self.path.parent() {
            fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        let json_contents = serde_json::to_string_pretty(profiles).map_err(|e| e.to_string())?;

        let key = get_encryption_key(&self.path);
        let mc = new_magic_crypt!(key, 256);
        let encrypted = mc.encrypt_str_to_base64(json_contents);

        fs::write(&self.path, encrypted).map_err(|e| e.to_string())?;
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            if let Ok(metadata) = fs::metadata(&self.path) {
                let mut perms = metadata.permissions();
                perms.set_mode(0o600);
                let _ = fs::set_permissions(&self.path, perms);
            }
        }
        Ok(())
    }
}
