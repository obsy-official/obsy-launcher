use super::events;
use super::utils::{get_http_client, try_download_file, LauncherError};
use super::Launcher;
use std::error::Error;
use tokio::fs;

impl Launcher {
    /// Install assets for the current version
    pub async fn install_assets(&mut self) -> Result<(), Box<dyn Error + Send + Sync>> {
        if self.version.profile.is_null() {
            return Err(Box::from(LauncherError(
                "Please install a version before installing assets".to_string(),
            )));
        }

        self.fix_log4j_vulnerability().await?;

        let asset_index_name = self.version.profile["assets"]
            .as_str()
            .unwrap_or("legacy")
            .to_string();
        let assets_dir = self.game_dir.join("assets");
        let indexes_dir = assets_dir.join("indexes");
        let objects_dir = assets_dir.join("objects");

        let marker_path = indexes_dir.join(&format!("{}.installed", asset_index_name));
        let index_path = indexes_dir.join(&format!("{}.json", asset_index_name));

        // Fast-path: if this asset index is already fully installed and verified, skip
        if marker_path.exists() && index_path.exists() {
            return Ok(());
        }

        self.emit_progress("checking_assets", "", 0, 0);

        fs::create_dir_all(&indexes_dir).await?;
        fs::create_dir_all(&objects_dir).await?;

        let client = get_http_client();

        if !index_path.exists() {
            if let Some(index_url) = self.version.profile["assetIndex"]["url"].as_str() {
                let index_data = client.get(index_url).send().await?.text().await?;
                fs::write(&index_path, index_data).await?;
            }
        }

        let index: serde_json::Value =
            serde_json::from_str(&fs::read_to_string(&index_path).await?)?;

        let mut total: u64 = 0;
        let mut objects_to_download = vec![];

        if let Some(objects) = index["objects"].as_object() {
            for (name, object) in objects {
                let object = object.as_object().unwrap();
                let hash = object["hash"].as_str().unwrap().to_string();

                let object_path = objects_dir.join(&hash[..2]).join(&hash);

                if !object_path.exists() {
                    total += object["size"].as_u64().unwrap_or(0);
                    let mut obj_map = object.clone();
                    obj_map.insert(
                        "name".to_string(),
                        serde_json::Value::String(name.to_string()),
                    );
                    objects_to_download.push(obj_map);
                }
            }
        }

        if !objects_to_download.is_empty() {
            self.emit_progress("downloading_assets", "", total, 0);

            for i in 0u8..=255 {
                let _ = fs::create_dir_all(objects_dir.join(format!("{:02x}", i))).await;
            }
        }

        let semaphore = std::sync::Arc::new(tokio::sync::Semaphore::new(50));
        let mut tasks = vec![];
        let current_progress = std::sync::Arc::new(std::sync::atomic::AtomicU64::new(0));

        let is_legacy = asset_index_name == "legacy" || asset_index_name == "pre-1.6";

        for object in objects_to_download {
            let name = object["name"].as_str().unwrap().to_string();
            let hash = object["hash"].as_str().unwrap().to_string();
            let size = object["size"].as_u64().unwrap_or(0);
            let object_path = objects_dir.join(&hash[..2]).join(&hash);

            let semaphore = semaphore.clone();
            let current_progress = current_progress.clone();
            let progress_sender = self.progress_sender.clone();

            let resources_path = if is_legacy {
                Some(self.game_dir.join("resources").join(&name))
            } else {
                None
            };

            tasks.push(tokio::spawn(async move {
                let _permit = semaphore.acquire().await.unwrap();

                let object_url = format!(
                    "https://resources.download.minecraft.net/{}/{}",
                    &hash[..2],
                    &hash
                );

                try_download_file(get_http_client(), &object_url, &object_path, &hash, 3).await?;

                let current =
                    current_progress.fetch_add(size, std::sync::atomic::Ordering::SeqCst) + size;
                let _ = progress_sender.send(events::Progress {
                    task: "downloading_assets".to_string(),
                    file: name,
                    total,
                    current,
                });

                // Old versions of Minecraft do not use the hashed asset structure,
                // so we copy them into legacy folders directly to support them.
                if let Some(resources_path) = resources_path {
                    if let Some(parent) = resources_path.parent() {
                        fs::create_dir_all(parent).await?;
                    }
                    fs::copy(&object_path, &resources_path).await?;
                }

                Ok::<(), Box<dyn Error + Send + Sync>>(())
            }));
        }

        for task in tasks {
            task.await.unwrap()?;
        }

        // Write completion marker so future launches skip verification
        let _ = fs::write(&marker_path, b"1").await;

        Ok(())
    }

    async fn fix_log4j_vulnerability(&mut self) -> Result<(), Box<dyn Error + Send + Sync>> {
        // Apply the official Mojang Log4j patch dynamically since older
        // game versions are still vulnerable.
        if self.version.profile["logging"].is_object()
            && self.version.profile["logging"]["client"].is_object()
        {
            let (_major, minor, patch) = super::utils::parse_mc_version(&self.version.id);
            if (minor == 18 && patch > 0) || minor > 18 {
                return Ok(());
            }

            let log4j_path = self.game_dir.join("assets").join("log_configs").join(
                self.version.profile["logging"]["client"]["file"]["id"]
                    .as_str()
                    .unwrap(),
            );

            if !log4j_path.exists() {
                let log4j_url = self.version.profile["logging"]["client"]["file"]["url"]
                    .as_str()
                    .unwrap()
                    .to_string();
                let client = get_http_client();
                let log4j = client.get(&log4j_url).send().await?.bytes().await?;
                if let Some(parent) = log4j_path.parent() {
                    fs::create_dir_all(parent).await?;
                }
                fs::write(&log4j_path, log4j).await?;
            }

            let log4j_arg = self.version.profile["logging"]["client"]["argument"]
                .as_str()
                .unwrap()
                .replace("${path}", log4j_path.to_str().unwrap());
            self.args.push(log4j_arg);

            if (minor == 18 && patch == 0) || minor == 17 {
                self.args
                    .push("-Dlog4j2.formatMsgNoLookups=true".to_string());
            }
        }

        Ok(())
    }
}
