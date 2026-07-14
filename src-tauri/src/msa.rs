use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tokio::time::sleep;

const CLIENT_ID: &str = "c36a9fb6-4f2a-41ff-90bd-ae7cc92031eb";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DeviceCodeResponse {
    pub user_code: String,
    pub device_code: String,
    pub verification_uri: String,
    pub expires_in: u64,
    pub interval: u64,
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TokenResponse {
    pub access_token: String,
    pub refresh_token: String,
}

pub async fn refresh_msa_token(refresh_token: &str) -> Result<TokenResponse, String> {
    let client = Client::new();
    let res = client
        .post("https://login.live.com/oauth20_token.srf")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(format!(
            "client_id={}&grant_type=refresh_token&refresh_token={}",
            CLIENT_ID, refresh_token
        ))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let status = res.status();
    let body: serde_json::Value = res.json().await.map_err(|e| e.to_string())?;

    if status.is_success() {
        let access_token = body["access_token"]
            .as_str()
            .unwrap_or_default()
            .to_string();
        let new_refresh_token = body["refresh_token"]
            .as_str()
            .unwrap_or_default()
            .to_string();
        return Ok(TokenResponse {
            access_token,
            refresh_token: new_refresh_token,
        });
    }

    Err(body["error_description"]
        .as_str()
        .unwrap_or("Failed to refresh token")
        .to_string())
}

pub async fn start_device_code_flow() -> Result<DeviceCodeResponse, String> {
    let client = Client::new();
    let res = client
        .post("https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(format!(
            "client_id={}&scope=XboxLive.signin+offline_access",
            CLIENT_ID
        ))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Err(format!(
            "Failed to start device code flow: {}",
            res.status()
        ));
    }

    res.json::<DeviceCodeResponse>()
        .await
        .map_err(|e| e.to_string())
}

pub async fn poll_device_code(device_code: &str, interval: u64) -> Result<TokenResponse, String> {
    let client = Client::new();
    loop {
        sleep(Duration::from_secs(interval)).await;

        let res = client
            .post("https://login.microsoftonline.com/consumers/oauth2/v2.0/token")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(format!("client_id={}&grant_type=urn:ietf:params:oauth:grant-type:device_code&device_code={}", CLIENT_ID, device_code))
            .send()
            .await
            .map_err(|e| e.to_string())?;

        let status = res.status();
        let body: serde_json::Value = res.json().await.map_err(|e| e.to_string())?;

        if status.is_success() {
            let access_token = body["access_token"]
                .as_str()
                .unwrap_or_default()
                .to_string();
            let refresh_token = body["refresh_token"]
                .as_str()
                .unwrap_or_default()
                .to_string();
            return Ok(TokenResponse {
                access_token,
                refresh_token,
            });
        }

        if let Some(error) = body["error"].as_str() {
            if error != "authorization_pending" {
                return Err(format!("Auth failed: {}", error));
            }
        }
    }
}

pub async fn auth_xbox_live(access_token: &str) -> Result<(String, String), String> {
    let client = Client::new();
    let res = client
        .post("https://user.auth.xboxlive.com/user/authenticate")
        .json(&serde_json::json!({
            "Properties": {
                "AuthMethod": "RPS",
                "SiteName": "user.auth.xboxlive.com",
                "RpsTicket": format!("d={}", access_token)
            },
            "RelyingParty": "http://auth.xboxlive.com",
            "TokenType": "JWT"
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body: serde_json::Value = res.json().await.map_err(|e| e.to_string())?;

    let token = body["Token"]
        .as_str()
        .ok_or("No token in XBL response")?
        .to_string();
    let uhs = body["DisplayClaims"]["xui"][0]["uhs"]
        .as_str()
        .ok_or("No uhs in XBL response")?
        .to_string();

    Ok((token, uhs))
}

pub async fn auth_xsts(xbl_token: &str) -> Result<String, String> {
    let client = Client::new();
    let res = client
        .post("https://xsts.auth.xboxlive.com/xsts/authorize")
        .json(&serde_json::json!({
            "Properties": {
                "SandboxId": "RETAIL",
                "UserTokens": [xbl_token]
            },
            "RelyingParty": "rp://api.minecraftservices.com/",
            "TokenType": "JWT"
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body: serde_json::Value = res.json().await.map_err(|e| e.to_string())?;

    if let Some(xerr) = body["XErr"].as_u64() {
        if xerr == 2148916233 {
            return Err("Account doesn't have an Xbox profile. Please create one.".into());
        } else if xerr == 2148916238 {
            return Err("Account is a child account. Please add it to a family.".into());
        }
    }

    body["Token"]
        .as_str()
        .ok_or("No token in XSTS response".into())
        .map(|s| s.to_string())
}

pub async fn auth_minecraft(uhs: &str, xsts_token: &str) -> Result<String, String> {
    let client = Client::new();
    let res = client
        .post("https://api.minecraftservices.com/authentication/login_with_xbox")
        .json(&serde_json::json!({
            "identityToken": format!("XBL3.0 x={};{}", uhs, xsts_token)
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body: serde_json::Value = res.json().await.map_err(|e| e.to_string())?;

    body["access_token"]
        .as_str()
        .ok_or("No access_token in MC response".into())
        .map(|s| s.to_string())
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MinecraftSkin {
    pub id: String,
    pub state: String,
    pub url: String,
    pub variant: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MinecraftProfile {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub skins: Vec<MinecraftSkin>,
}

pub async fn get_minecraft_profile(mc_access_token: &str) -> Result<MinecraftProfile, String> {
    let client = Client::new();
    let res = client
        .get("https://api.minecraftservices.com/minecraft/profile")
        .bearer_auth(mc_access_token)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Err("You don't own Minecraft or failed to fetch profile.".into());
    }

    res.json::<MinecraftProfile>()
        .await
        .map_err(|e| e.to_string())
}

pub async fn upload_minecraft_skin(
    access_token: &str,
    variant: &str,
    file_path: &str,
) -> Result<(), String> {
    let client = Client::new();

    let file_bytes =
        std::fs::read(file_path).map_err(|e| format!("Failed to read skin file: {}", e))?;

    let part = reqwest::multipart::Part::bytes(file_bytes)
        .file_name("skin.png")
        .mime_str("image/png")
        .map_err(|e| e.to_string())?;

    let form = reqwest::multipart::Form::new()
        .text("variant", variant.to_string())
        .part("file", part);

    let res = client
        .post("https://api.minecraftservices.com/minecraft/profile/skins")
        .bearer_auth(access_token)
        .multipart(form)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        let err = res.text().await.unwrap_or_default();
        return Err(format!("Failed to upload skin: {}", err));
    }

    Ok(())
}

pub async fn fetch_public_skin_base64(uuid: &str) -> Result<Option<(String, bool)>, String> {
    let client = Client::new();
    let res = client
        .get(format!(
            "https://sessionserver.mojang.com/session/minecraft/profile/{}",
            uuid
        ))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Ok(None);
    }

    let json: serde_json::Value = res.json().await.map_err(|e| e.to_string())?;
    let properties = json
        .get("properties")
        .and_then(|p| p.as_array())
        .ok_or("No properties")?;

    let textures_prop = properties
        .iter()
        .find(|p| p.get("name").and_then(|n| n.as_str()) == Some("textures"));
    if let Some(prop) = textures_prop {
        if let Some(value_b64) = prop.get("value").and_then(|v| v.as_str()) {
            use base64::{engine::general_purpose, Engine as _};
            let decoded = general_purpose::STANDARD
                .decode(value_b64)
                .map_err(|e| e.to_string())?;
            let decoded_str = String::from_utf8(decoded).map_err(|e| e.to_string())?;

            let textures_json: serde_json::Value =
                serde_json::from_str(&decoded_str).map_err(|e| e.to_string())?;
            if let Some(skin) = textures_json.get("textures").and_then(|t| t.get("SKIN")) {
                if let Some(url) = skin.get("url").and_then(|u| u.as_str()) {
                    let is_slim = skin
                        .get("metadata")
                        .and_then(|m| m.get("model"))
                        .and_then(|m| m.as_str())
                        == Some("slim");

                    // Download the skin image
                    let img_res = client.get(url).send().await.map_err(|e| e.to_string())?;
                    if img_res.status().is_success() {
                        let bytes = img_res.bytes().await.map_err(|e| e.to_string())?;
                        let base64_img = format!(
                            "data:image/png;base64,{}",
                            general_purpose::STANDARD.encode(&bytes)
                        );
                        return Ok(Some((base64_img, is_slim)));
                    }
                }
            }
        }
    }

    Ok(None)
}
