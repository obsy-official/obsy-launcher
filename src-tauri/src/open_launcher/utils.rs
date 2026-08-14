use async_recursion::async_recursion;
use serde_json::Value;
use sha1::Digest;
use std::error::Error;
use tokio::fs;
use tokio::io::AsyncWriteExt;
use tokio_util::compat::TokioAsyncWriteCompatExt;

#[derive(Debug)]
pub struct LauncherError(pub String);

impl std::fmt::Display for LauncherError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl Error for LauncherError {}

impl From<LauncherError> for Box<dyn Error + Send> {
    fn from(error: LauncherError) -> Self {
        Box::new(error) as Box<dyn Error + Send>
    }
}

#[async_recursion]
pub(crate) async fn try_download_file(
    client: &reqwest::Client,
    url: &str,
    path: &std::path::Path,
    hash: &str,
    retries: u32,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    let url = url.replace(std::path::MAIN_SEPARATOR_STR, "/");
    let url = url.as_str();

    let response = client.get(url).send().await?;
    let data = response.bytes().await?;

    let mut file = fs::File::create(path).await?;
    file.write_all(&data).await?;
    file.sync_all().await?;
    file.flush().await?;

    if hash.len() != 40 {
        return Ok(());
    }

    let downloaded_hash = format!("{:x}", sha1::Sha1::digest(&fs::read(path).await?));

    if downloaded_hash != hash {
        if retries > 0 {
            fs::remove_file(path).await?;
            try_download_file(client, url, path, hash, retries - 1).await?;
        } else {
            return Err(Box::from(LauncherError(format!(
                "Failed to download file: {}",
                path.display()
            ))));
        }
    }

    Ok(())
}

pub(crate) fn get_os() -> String {
    match std::env::consts::OS {
        "windows" => "windows".to_string(),
        "macos" => "osx".to_string(),
        "linux" => "linux".to_string(),
        _ => std::env::consts::OS.to_string(),
    }
}

pub(crate) fn parse_mc_version(id: &str) -> (u32, u32, u32) {
    let mut target = id;
    if let Some(idx) = id.rfind("1.") {
        target = &id[idx..];
    }

    let parts: Vec<&str> = target.split('.').collect();
    if parts.len() >= 2 {
        let major = parts[0]
            .chars()
            .filter(|c| c.is_ascii_digit())
            .collect::<String>()
            .parse::<u32>()
            .unwrap_or(1);
        let minor = parts[1]
            .chars()
            .take_while(|c| c.is_ascii_digit())
            .collect::<String>()
            .parse::<u32>()
            .unwrap_or(0);
        let patch = if parts.len() >= 3 {
            parts[2]
                .chars()
                .take_while(|c| c.is_ascii_digit())
                .collect::<String>()
                .parse::<u32>()
                .unwrap_or(0)
        } else {
            0
        };
        (major, minor, patch)
    } else {
        (1, 0, 0)
    }
}

pub(crate) async fn extract_file(
    zip_path: &std::path::Path,
    file_name: &str,
    extract_path: &std::path::Path,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    if extract_path.exists() {
        return Ok(());
    }

    let archive = async_zip::tokio::read::fs::ZipFileReader::new(zip_path).await?;

    for i in 0..archive.file().entries().len() {
        let entry_name = archive
            .file()
            .entries()
            .get(i)
            .unwrap()
            .filename()
            .as_str()?;

        if entry_name == file_name {
            if archive.file().entries().get(i).unwrap().dir()? {
                fs::create_dir_all(extract_path).await?;
            } else {
                let mut reader = archive.reader_without_entry(i).await?;
                if let Some(parent) = extract_path.parent() {
                    if !parent.exists() {
                        fs::create_dir_all(parent).await?;
                    }
                }

                let writer = fs::OpenOptions::new()
                    .write(true)
                    .create_new(true)
                    .open(&extract_path)
                    .await?;

                futures_lite::io::copy(&mut reader, &mut writer.compat_write()).await?;

                return Ok(());
            }
        }
    }

    Ok(())
}

pub(crate) async fn extract_all(
    zip_path: &std::path::Path,
    extract_path: &std::path::Path,
) -> Result<Vec<Value>, Box<dyn Error + Send + Sync>> {
    let archive = async_zip::tokio::read::fs::ZipFileReader::new(zip_path).await?;
    let mut extracted = vec![];

    for i in 0..archive.file().entries().len() {
        let entry = archive.file().entries().get(i).unwrap();
        let raw_filename = entry.filename().as_str()?;

        // Prevent Zip Slip vulnerability by sanitizing path components
        let entry_path = std::path::Path::new(raw_filename);
        if entry_path.is_absolute()
            || entry_path.components().any(|c| {
                matches!(
                    c,
                    std::path::Component::ParentDir
                        | std::path::Component::RootDir
                        | std::path::Component::Prefix(_)
                )
            })
        {
            continue;
        }

        let path = extract_path.join(entry_path);

        if path.exists() {
            extracted.push(serde_json::json!({
                "path": path,
                "hash": format!("{:x}", sha1::Sha1::digest(&fs::read(&path).await?)),
            }));
            continue;
        }

        if raw_filename.ends_with(".git")
            || raw_filename.ends_with(".sha1")
            || raw_filename.starts_with("META-INF")
        {
            continue;
        }

        if entry.dir()? {
            fs::create_dir_all(path).await?;
        } else {
            let mut reader = archive.reader_without_entry(i).await?;
            if let Some(parent) = path.parent() {
                if !parent.exists() {
                    fs::create_dir_all(parent).await?;
                }
            }

            let writer = fs::OpenOptions::new()
                .write(true)
                .create_new(true)
                .open(&path)
                .await?;

            futures_lite::io::copy(&mut reader, &mut writer.compat_write()).await?;

            extracted.push(serde_json::json!({
                "path": path,
                "hash": format!("{:x}", sha1::Sha1::digest(&fs::read(&path).await?)),
            }));
        }
    }

    Ok(extracted)
}
