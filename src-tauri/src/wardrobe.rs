use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WardrobeSkin {
    pub id: String,
    pub name: String,
    pub base64_data: String,
    pub slim: bool,
    pub profile_id: Option<String>,
}

pub struct WardrobeStore {
    path: PathBuf,
}

impl WardrobeStore {
    pub fn new(_app_handle: &tauri::AppHandle) -> Self {
        let path = crate::minecraft::versions::get_minecraft_dir().join("wardrobe.json");
        Self { path }
    }

    pub fn load(&self) -> Vec<WardrobeSkin> {
        if self.path.exists() {
            if let Ok(contents) = fs::read_to_string(&self.path) {
                if let Ok(skins) = serde_json::from_str(&contents) {
                    return skins;
                }
            }
        }
        vec![]
    }

    pub fn save(&self, skins: &[WardrobeSkin]) -> Result<(), String> {
        if let Some(parent) = self.path.parent() {
            let _ = fs::create_dir_all(parent);
        }
        let json_contents = serde_json::to_string_pretty(skins).map_err(|e| e.to_string())?;
        fs::write(&self.path, json_contents).map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn add_skin(
        &self,
        file_bytes: Vec<u8>,
        name: String,
        slim: bool,
        profile_id: String,
    ) -> Result<WardrobeSkin, String> {
        let mut skins = self.load();

        let id = Uuid::new_v4().to_string();
        use base64::{engine::general_purpose, Engine as _};
        let base64_data = format!(
            "data:image/png;base64,{}",
            general_purpose::STANDARD.encode(&file_bytes)
        );

        let skin = WardrobeSkin {
            id,
            name,
            base64_data,
            slim,
            profile_id: Some(profile_id),
        };

        skins.push(skin.clone());
        self.save(&skins)?;

        Ok(skin)
    }

    pub fn remove_skin(&self, id: &str) -> Result<(), String> {
        let mut skins = self.load();
        if let Some(index) = skins.iter().position(|s| s.id == id) {
            skins.remove(index);
            self.save(&skins)?;
        }
        Ok(())
    }
}
