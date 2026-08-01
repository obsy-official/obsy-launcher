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
import { Onboarding } from "./components/launcher/Onboarding";
import "./i18n";
import { useLauncherStore } from "./state";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const {
    state,
    profiles,
    fetchState,
    fetchProfiles,
    fetchVersions,
    refreshProfileSkin,
    refreshProfileToken,
  } = useLauncherStore();
  const { i18n } = useTranslation();
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [isSkinLoading, setIsSkinLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem("hasCompletedOnboarding") !== "true";
  });

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
      // Trigger background token refresh
      refreshProfileToken(state.selectedProfileId);

      refreshProfileSkin(state.selectedProfileId).finally(() => {
        setIsSkinLoading(false);
      });
    }
  }, [state?.selectedProfileId, refreshProfileSkin, refreshProfileToken]);

  const selectedProfile = state?.selectedProfileId
    ? profiles.find((p) => p.id === state.selectedProfileId)
    : null;
  const finalSkinUrl = selectedProfile?.skinPng;

  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col font-sans overflow-hidden">
      {showOnboarding && (
        <Onboarding
          onComplete={() => {
            localStorage.setItem("hasCompletedOnboarding", "true");
            setShowOnboarding(false);
          }}
        />
      )}
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-4 relative z-10">
        <AnimatePresence>
          {state && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="flex max-w-full flex-row items-stretch gap-6"
            >
              <div className="bg-card border-border/50 flex w-96 max-w-full flex-col gap-6 rounded-xl border p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                {updateStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent animate-pulse text-center text-sm font-medium relative z-10"
                  >
                    {updateStatus}
                  </motion.div>
                )}
                <div className="relative z-10 flex flex-col gap-6 h-full">
                  <ProfileSelector />
                  <VersionSelector />
                  <LaunchButton />
                </div>
              </div>

              <AnimatePresence>
                {selectedProfile && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="bg-card border-border/50 relative hidden w-64 flex-col items-center justify-between rounded-xl border p-6 shadow-2xl backdrop-blur-md md:flex overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
                    
                    <AnimatePresence mode="wait">
                      {isSkinLoading ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex w-full flex-1 items-center justify-center relative z-10"
                        >
                          <Loader2 className="text-primary h-8 w-8 animate-spin" />
                        </motion.div>
                      ) : finalSkinUrl ? (
                        <motion.div 
                          key="skin"
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="relative z-10 flex-1 flex items-center justify-center"
                        >
                          <SkinViewer
                            skinUrl={finalSkinUrl}
                            slim={selectedProfile.slim}
                            width={160}
                            height={260}
                          />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="error"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-muted-foreground flex w-full flex-1 items-center justify-center text-center text-sm relative z-10"
                        >
                          Скин не найден
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="relative z-10 w-full mt-4">
                      <SkinWardrobe />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
