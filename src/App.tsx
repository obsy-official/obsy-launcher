import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/launcher/Header";
import { LaunchButton } from "./components/launcher/LaunchButton";
import { ProfileSelector } from "./components/launcher/ProfileSelector";
import { SkinViewer } from "./components/launcher/SkinViewer";
import { SkinWardrobe } from "./components/launcher/SkinWardrobe";
import { VersionSelector } from "./components/launcher/VersionSelector";
import "./i18n";
import { useLauncherStore } from "./state";

const App = () => {
  const {
    state,
    profiles,
    fetchState,
    fetchProfiles,
    fetchVersions,
    refreshProfileSkin,
  } = useLauncherStore();
  const { i18n } = useTranslation();
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [isSkinLoading, setIsSkinLoading] = useState(false);

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
                  setUpdateStatus(
                    `Downloading update ${update.version}: ${Math.round((downloaded / contentLength) * 100)}%`,
                  );
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

  useEffect(() => {
    if (state?.selectedProfileId) {
      setIsSkinLoading(true);
      refreshProfileSkin(state.selectedProfileId).finally(() => {
        setIsSkinLoading(false);
      });
    }
  }, [state?.selectedProfileId, refreshProfileSkin]);

  const selectedProfile = state?.selectedProfileId
    ? profiles.find((p) => p.id === state.selectedProfileId)
    : null;
  const finalSkinUrl = selectedProfile?.skinPng;

  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col font-sans">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        {state && (
          <div className="flex max-w-full flex-row items-stretch gap-6">
            <div className="bg-card border-border/50 flex w-96 max-w-full flex-col gap-6 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
              {updateStatus && (
                <div className="text-accent animate-pulse text-center text-sm font-medium">
                  {updateStatus}
                </div>
              )}
              <ProfileSelector />
              <VersionSelector />
              <LaunchButton />
            </div>

            {selectedProfile && (
              <div className="bg-card border-border/50 relative hidden w-64 flex-col items-center justify-between rounded-xl border p-6 shadow-lg backdrop-blur-sm md:flex">
                {isSkinLoading ? (
                  <div className="flex w-full flex-1 items-center justify-center">
                    <Loader2 className="text-accent h-8 w-8 animate-spin" />
                  </div>
                ) : finalSkinUrl ? (
                  <SkinViewer
                    skinUrl={finalSkinUrl}
                    slim={selectedProfile.slim}
                    width={160}
                    height={260}
                  />
                ) : (
                  <div className="text-muted-foreground flex w-full flex-1 items-center justify-center text-center text-sm">
                    Скин не найден
                  </div>
                )}
                <SkinWardrobe />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
