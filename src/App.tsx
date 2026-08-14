import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import { Loader2 } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { listen } from "@tauri-apps/api/event";
import { Header } from "./components/launcher/Header";
import { addGameLog } from "./lib/logger";
import { LaunchButton } from "./components/launcher/LaunchButton";
import { ProfileSelector } from "./components/launcher/ProfileSelector";
import { SkinWardrobe } from "./components/launcher/SkinWardrobe";
import { VersionSelector } from "./components/launcher/VersionSelector";
import { Onboarding } from "./components/launcher/Onboarding";
import "./i18n";
import { useLauncherStore } from "./state";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
} from "framer-motion";

const SkinViewer = lazy(() =>
  import("./components/launcher/SkinViewer").then((m) => ({
    default: m.SkinViewer,
  })),
);

const App = () => {
  const {
    state,
    profiles,
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
  const [isSkinLoading, setIsSkinLoading] = useState(false);
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
                setUpdateStatus(t("updater.downloaded"));
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
    fetchState,
    fetchProfiles,
    fetchVersions,
    fetchStartupTime,
    fetchAppMemory,
    t,
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
      setIsSkinLoading(true);
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
                        className="text-accent relative z-10 animate-pulse text-center text-sm font-medium"
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

                  <AnimatePresence>
                    {selectedProfile && (
                      <m.div
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          bounce: 0.3,
                        }}
                        className="bg-card border-border/50 relative hidden w-64 flex-col items-center justify-between overflow-hidden rounded-xl border p-6 shadow-2xl backdrop-blur-md md:flex"
                      >
                        <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-bl to-transparent" />

                        <AnimatePresence mode="wait">
                          {isSkinLoading ? (
                            <m.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="relative z-10 flex w-full flex-1 items-center justify-center"
                            >
                              <Loader2 className="text-primary h-8 w-8 animate-spin" />
                            </m.div>
                          ) : finalSkinUrl ? (
                            <m.div
                              key="skin"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className="relative z-10 flex flex-1 items-center justify-center"
                            >
                              <Suspense
                                fallback={
                                  <div className="flex h-[260px] w-[160px] items-center justify-center">
                                    <Loader2 className="text-primary/40 h-6 w-6 animate-spin" />
                                  </div>
                                }
                              >
                                <SkinViewer
                                  skinUrl={finalSkinUrl}
                                  slim={selectedProfile.slim}
                                  width={160}
                                  height={260}
                                />
                              </Suspense>
                            </m.div>
                          ) : (
                            <m.div
                              key="error"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-muted-foreground relative z-10 flex w-full flex-1 items-center justify-center text-center text-sm"
                            >
                              {t("app.skinNotFound")}
                            </m.div>
                          )}
                        </AnimatePresence>
                        <div className="relative z-10 mt-4 w-full">
                          <SkinWardrobe />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
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
