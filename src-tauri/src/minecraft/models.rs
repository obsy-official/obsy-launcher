use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct MinecraftVersion {
    pub id: String,
    pub r#type: String,
    pub is_local: bool,
    pub release_time: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct MojangManifest {
    pub versions: Vec<MojangManifestVersion>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct MojangManifestVersion {
    pub id: String,
    pub r#type: String,
    #[serde(rename = "releaseTime")]
    pub release_time: String,
}
