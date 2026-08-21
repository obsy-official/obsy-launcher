import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { listen } from "@tauri-apps/api/event";
import { Header } from "./components/launcher/Header";
import { addGameLog } from "./lib/logger";
import { LaunchButton } from "./components/launcher/LaunchButton";
import { ProfileSelector } from "./components/launcher/ProfileSelector";
import { VersionSelector } from "./components/launcher/VersionSelector";
import { Onboarding } from "./components/launcher/Onboarding";
import "./i18n";
import { useLauncherStore } from "./state";
import { useAddonStore } from "./lib/addons/addonStore";
import { PluginSlot } from "./components/addons/PluginSlot";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
} from "framer-motion";

const App = () => {
  const {
    state,
    fetchState,
    fetchProfiles,
    fetchVersions,
    fetchStartupTime,
    fetchAppMemory,
    refreshProfileSkin,
    refreshProfileToken,
  } = useLauncherStore();
  const { t, i18n } = useTranslation();
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem("hasCompletedOnboarding") !== "true";
  });

  useEffect(() => {
    let isMounted = true;

    const checkForAppUpdates = async () => {
      try {
        const update = await check();
        if (update && isMounted) {
          setUpdateStatus(
            t("updater.downloading", { version: update.version }),
          );
          let downloaded = 0;
          let contentLength = 0;
          await update.downloadAndInstall((event) => {
            if (!isMounted) return;
            switch (event.event) {
              case "Started":
                contentLength = event.data.contentLength || 0;
                break;
              case "Progress":
                downloaded += event.data.chunkLength;
                if (contentLength > 0) {
                  setUpdateStatus(
                    t("updater.downloadingProgress", {
                      version: update.version,
                      progress: Math.round((downloaded / contentLength) * 100),
                    }),
                  );
                }
                break;
              case "Finished":
                setUpdateStatus(t("updater.restarting"));
                break;
            }
          });

          if (isMounted) {
            await relaunch();
          }
        }
      } catch (error) {
        console.error("Failed to check for updates", error);
      }
    };

    checkForAppUpdates();
    useAddonStore.getState().initAddons();
    fetchStartupTime().then(() => {
      const ms = useLauncherStore.getState().startupTimeMs;
      if (ms) {
        addGameLog("info", `[Obsy] Launcher initialized in ${ms} ms`);
      }
    });
    fetchAppMemory();
    fetchState();
    fetchProfiles();
    fetchVersions();

    const memInterval = setInterval(() => {
      fetchAppMemory();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(memInterval);
    };
  }, [
    t,
    fetchState,
    fetchProfiles,
    fetchVersions,
    fetchStartupTime,
    fetchAppMemory,
  ]);

  useEffect(() => {
    const unlistenLog = listen<string>("minecraft-log", (event) => {
      addGameLog("info", `[Minecraft] ${event.payload}`);
    });
    const unlistenErr = listen<string>("minecraft-error", (event) => {
      addGameLog("error", `[Minecraft] ${event.payload}`);
    });

    return () => {
      unlistenLog.then((f) => f());
      unlistenErr.then((f) => f());
    };
  }, []);

  useEffect(() => {
    if (state?.language) {
      i18n.changeLanguage(state.language === "RUSSIAN" ? "ru" : "en");
    }
  }, [state?.language, i18n]);

  useEffect(() => {
    if (state?.selectedProfileId) {
      refreshProfileToken(state.selectedProfileId);
      refreshProfileSkin(state.selectedProfileId);
    }
  }, [state?.selectedProfileId, refreshProfileSkin, refreshProfileToken]);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="bg-background text-foreground flex h-screen w-screen flex-col overflow-hidden font-sans">
          {showOnboarding && (
            <Onboarding
              onComplete={() => {
                localStorage.setItem("hasCompletedOnboarding", "true");
                setShowOnboarding(false);
              }}
            />
          )}
          <Header />
          <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-4">
            <PluginSlot name="dashboard.widgets" className="mb-3" />
            <AnimatePresence>
              {state && (
                <m.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  className="flex max-w-full flex-row items-stretch gap-6"
                >
                  <div className="bg-card border-border/50 relative flex w-96 max-w-full flex-col gap-6 overflow-hidden rounded-xl border p-6 shadow-2xl backdrop-blur-md">
                    <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
                    {updateStatus && (
                      <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary relative z-10 animate-pulse text-center text-sm font-medium"
                      >
                        {updateStatus}
                      </m.div>
                    )}
                    <div className="relative z-10 flex h-full flex-col gap-6">
                      <ProfileSelector />
                      <VersionSelector />
                      <LaunchButton />
                    </div>
                  </div>

                  {/* Side Slot: Extensible for 3D Skin Viewer and custom side widgets */}
                  <PluginSlot name="dashboard.side" />
                </m.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
};

export default App;
