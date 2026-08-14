use super::events;
use super::utils::{try_download_file, LauncherError};
use super::Launcher;
use sha1::Digest;
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

        self.emit_progress("checking_assets", "", 0, 0);

        let assets_dir = self.game_dir.join("assets");
        let indexes_dir = assets_dir.join("indexes");
        let objects_dir = assets_dir.join("objects");

        fs::create_dir_all(&indexes_dir).await?;
        fs::create_dir_all(&objects_dir).await?;

        self.fix_log4j_vulnerability().await?;

        let index_path = indexes_dir.join(&format!(
            "{}.json",
            self.version.profile["assets"].as_str().unwrap()
        ));

        if !index_path.exists() {
            let index_url = self.version.profile["assetIndex"]["url"].as_str().unwrap();
            let index_data = reqwest::get(index_url).await?.text().await?;
            fs::write(&index_path, index_data).await?;
        }

        let index: serde_json::Value =
            serde_json::from_str(&fs::read_to_string(&index_path).await?)?;

        let mut readdir = fs::read_dir(&objects_dir).await?;
        while let Some(file) = readdir.next_entry().await? {
            let path = file.path();
            if path.is_file() {
                let hash = path.file_name().unwrap().to_str().unwrap().to_string();

                if !index["objects"]
                    .as_object()
                    .unwrap()
                    .values()
                    .any(|object| object["hash"].as_str().unwrap() == &hash)
                    || format!("{:x}", sha1::Sha1::digest(&fs::read(&path).await?)) != hash
                {
                    fs::remove_file(&path).await?;
                }
            }
        }

        let mut total: u64 = 0;
        let mut objects_to_download = vec![];

        for (name, object) in index["objects"].as_object().unwrap() {
            let object = object.as_object().unwrap();
            let hash = object["hash"].as_str().unwrap().to_string();

            let object_path = objects_dir.join(&hash[..2]).join(&hash);

            if !object_path.exists() {
                total += object["size"].as_u64().unwrap();
                objects_to_download.push({
                    let mut object = object.clone();
                    object.insert(
                        "name".to_string(),
                        serde_json::Value::String(name.to_string()),
                    );
                    object
                });
            }
        }

        if !objects_to_download.is_empty() {
            self.emit_progress("downloading_assets", "", total, 0);
        }

        let client = reqwest::Client::new();
        let semaphore = std::sync::Arc::new(tokio::sync::Semaphore::new(50));
        let mut tasks = vec![];
        let current_progress = std::sync::Arc::new(std::sync::atomic::AtomicU64::new(0));

        for object in objects_to_download {
            let name = object["name"].as_str().unwrap().to_string();
            let hash = object["hash"].as_str().unwrap().to_string();
            let size = object["size"].as_u64().unwrap();
            let object_path = objects_dir.join(&hash[..2]).join(&hash);

            let client = client.clone();
            let semaphore = semaphore.clone();
            let current_progress = current_progress.clone();
            let progress_sender = self.progress_sender.clone();

            let is_legacy = self.version.profile["assets"].as_str().unwrap() == "legacy"
                || self.version.profile["assets"].as_str().unwrap() == "pre-1.6";
            let resources_path = if is_legacy {
                Some(self.game_dir.join("resources").join(&name))
            } else {
                None
            };

            tasks.push(tokio::spawn(async move {
                let _permit = semaphore.acquire().await.unwrap();
                fs::create_dir_all(object_path.parent().unwrap()).await?;

                let object_url = format!(
                    "https://resources.download.minecraft.net/{}",
                    hash[..2].to_string() + "/" + &hash
                );

                try_download_file(&client, &object_url, &object_path, &hash, 3).await?;

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
                    fs::create_dir_all(resources_path.parent().unwrap()).await?;
                    fs::copy(&object_path, &resources_path).await?;
                }

                Ok::<(), Box<dyn Error + Send + Sync>>(())
            }));
        }

        for task in tasks {
            task.await.unwrap()?;
        }

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
                let log4j = reqwest::get(&log4j_url).await?.bytes().await?;
                fs::create_dir_all(log4j_path.parent().unwrap()).await?;
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
