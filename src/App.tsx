import { useEffect, useState } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { useTranslation } from "react-i18next";
import "./i18n";
import { useLauncherStore } from "./state";
import { Header } from "./components/launcher/Header";
import { ProfileSelector } from "./components/launcher/ProfileSelector";
import { VersionSelector } from "./components/launcher/VersionSelector";
import { LaunchButton } from "./components/launcher/LaunchButton";

const App = () => {
  const { state, fetchState, fetchProfiles, fetchVersions } =
    useLauncherStore();
  const { i18n } = useTranslation();
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  useEffect(() => {
    const checkForAppUpdates = async () => {
      try {
        const update = await check();
        if (update) {
          setUpdateStatus(`Downloading update ${update.version}...`);
          let downloaded = 0;
          let contentLength = 0;
          
          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case "Started":
                contentLength = event.data.contentLength || 0;
                break;
              case "Progress":
                downloaded += event.data.chunkLength;
                if (contentLength > 0) {
                  setUpdateStatus(`Downloading update ${update.version}: ${Math.round((downloaded / contentLength) * 100)}%`);
                }
                break;
              case "Finished":
                setUpdateStatus("Update downloaded! Restarting...");
                break;
            }
          });
          
          await relaunch();
        }
      } catch (error) {
        console.error("Failed to check for updates", error);
      }
    };

    checkForAppUpdates();
    fetchState();
    fetchProfiles();
    fetchVersions();
  }, [fetchState, fetchProfiles, fetchVersions]);

  useEffect(() => {
    if (state?.language) {
      i18n.changeLanguage(state.language === "RUSSIAN" ? "ru" : "en");
    }
  }, [state?.language, i18n]);

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {state && (
          <div className="p-6 bg-card border border-border/50 rounded-xl shadow-lg flex flex-col gap-6 w-96 max-w-full backdrop-blur-sm">
            {updateStatus && (
              <div className="text-center text-sm font-medium text-accent animate-pulse">
                {updateStatus}
              </div>
            )}
            <ProfileSelector />
            <VersionSelector />
            <LaunchButton />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
