use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;
use uuid::Uuid;
use keyring::Entry;
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

fn get_encryption_key(store_path: &PathBuf) -> String {
    if let Ok(entry) = Entry::new("obsy-launcher", "profile-encryption-key") {
        if let Ok(password) = entry.get_password() {
            return password;
        }
        let key = Uuid::new_v4().to_string() + &Uuid::new_v4().to_string();
        if entry.set_password(&key).is_ok() {
            return key;
        }
    }
    
    let key_path = store_path.with_file_name("profiles.key");
    if key_path.exists() {
        if let Ok(key) = fs::read_to_string(&key_path) {
            return key;
        }
    }
    
    let key = Uuid::new_v4().to_string() + &Uuid::new_v4().to_string();
    let _ = fs::write(&key_path, &key);
    key
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
    pub slim: bool,
    pub capes: Vec<MinecraftCape>,
    pub access_token: Option<String>,
    pub refresh_token: Option<String>,
}

impl Profile {
    pub fn new_offline(username: String) -> Self {
        let id = Uuid::new_v3(&Uuid::NAMESPACE_OID, format!("OfflinePlayer:{}", username).as_bytes()).to_string();
        Self {
            id,
            username,
            microsoft: false,
            skin_png: None,
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
    pub fn new(app_handle: &tauri::AppHandle) -> Self {
        let mut path = app_handle.path().app_config_dir().unwrap();
        path.push("profiles.json");
        Self { path }
    }

    pub fn load(&self) -> Vec<Profile> {
        if self.path.exists() {
            if let Ok(contents) = fs::read_to_string(&self.path) {
                // First try to parse as plaintext (migration path)
                if let Ok(profiles) = serde_json::from_str::<Vec<Profile>>(&contents) {
                    // It was plaintext! Let's re-save it encrypted in the background.
                    let _ = self.save(&profiles);
                    return profiles;
                }
                
                // If it's not plaintext, try to decrypt it
                let key = get_encryption_key(&self.path);
                let mc = new_magic_crypt!(key, 256);
                
                if let Ok(decrypted) = mc.decrypt_base64_to_string(&contents) {
                    if let Ok(profiles) = serde_json::from_str(&decrypted) {
                        return profiles;
                    }
                }
            }
        }
        vec![]
    }

    pub fn save(&self, profiles: &[Profile]) -> Result<(), String> {
        if let Some(parent) = self.path.parent() {
            let _ = fs::create_dir_all(parent);
        }
        let json_contents = serde_json::to_string_pretty(profiles).map_err(|e| e.to_string())?;
        
        let key = get_encryption_key(&self.path);
        let mc = new_magic_crypt!(key, 256);
        let encrypted = mc.encrypt_str_to_base64(json_contents);
        
        fs::write(&self.path, encrypted).map_err(|e| e.to_string())?;
        Ok(())
    }
}
