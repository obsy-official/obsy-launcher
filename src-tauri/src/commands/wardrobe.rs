use crate::AppState;
use tauri::State;

#[tauri::command]
pub fn get_wardrobe(
    state: State<'_, AppState>,
) -> Result<Vec<crate::wardrobe::WardrobeSkin>, String> {
    Ok(state.wardrobe_store.load())
}

#[tauri::command]
pub fn add_skin_to_wardrobe(
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
pub fn remove_skin_from_wardrobe(state: State<'_, AppState>, id: String) -> Result<(), String> {
    state.wardrobe_store.remove_skin(&id)
}

#[tauri::command]
pub async fn apply_skin(
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

        let temp_path_str = temp_file
            .to_str()
            .ok_or_else(|| "Invalid temporary file path".to_string())?;
        let upload_res =
            crate::msa::upload_minecraft_skin(&access_token, variant, temp_path_str).await;
        let _ = std::fs::remove_file(&temp_file);
        upload_res?;

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
pub async fn refresh_profile_skin(
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
pub async fn refresh_profile_token(
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
pub async fn get_account_capes(
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
pub async fn set_active_cape(
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
