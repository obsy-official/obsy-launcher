use serde::{Deserialize, Serialize};
use reqwest::Client;
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

pub async fn start_device_code_flow() -> Result<DeviceCodeResponse, String> {
    let client = Client::new();
    let res = client
        .post("https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(format!("client_id={}&scope=XboxLive.signin+offline_access", CLIENT_ID))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Err(format!("Failed to start device code flow: {}", res.status()));
    }

    res.json::<DeviceCodeResponse>().await.map_err(|e| e.to_string())
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
            let access_token = body["access_token"].as_str().unwrap_or_default().to_string();
            let refresh_token = body["refresh_token"].as_str().unwrap_or_default().to_string();
            return Ok(TokenResponse { access_token, refresh_token });
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
    
    let token = body["Token"].as_str().ok_or("No token in XBL response")?.to_string();
    let uhs = body["DisplayClaims"]["xui"][0]["uhs"].as_str().ok_or("No uhs in XBL response")?.to_string();
    
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
    
    body["Token"].as_str().ok_or("No token in XSTS response".into()).map(|s| s.to_string())
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
    
    body["access_token"].as_str().ok_or("No access_token in MC response".into()).map(|s| s.to_string())
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MinecraftProfile {
    pub id: String,
    pub name: String,
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

    res.json::<MinecraftProfile>().await.map_err(|e| e.to_string())
}
