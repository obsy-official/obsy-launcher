use crate::auth::Profile;
use crate::{msa, AppState};
use tauri::State;

#[tauri::command]
pub async fn start_msa_auth() -> Result<msa::DeviceCodeResponse, String> {
    msa::start_device_code_flow().await
}

#[tauri::command]
pub async fn poll_msa_auth(
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
