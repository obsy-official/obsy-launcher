import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { Play, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLauncherStore } from "@/state";

import { m, AnimatePresence } from "framer-motion";

export const LaunchButton = () => {
  const { state, versions } = useLauncherStore();
  const { t } = useTranslation();

  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState("");
  const [launchProgress, setLaunchProgress] = useState(0);
  const [launchDetail, setLaunchDetail] = useState("");

  const selectedVersion = versions.find(
    (v) => v.id === state?.selectedVersionId,
  );
  const isDownloaded = selectedVersion?.isLocal ?? false;

  useEffect(() => {
    const unlisten = listen("launch-progress", (event) => {
      const payload = event.payload as {
        status: string;
        progress: number;
        detail?: string;
      };
      setLaunchStatus(payload.status);
      setLaunchProgress(payload.progress * 100);
      if (payload.detail) {
        setLaunchDetail(payload.detail);
      } else {
        setLaunchDetail("");
      }
      if (payload.status === "success") {
        setTimeout(() => {
          setIsLaunching(false);
          setLaunchStatus("");
          setLaunchProgress(0);
          setLaunchDetail("");
        }, 2000);
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const handleLaunch = async () => {
    if (!state?.selectedProfileId || !state?.selectedVersionId) return;
    setIsLaunching(true);
    setLaunchStatus("starting");
    setLaunchProgress(0);
    setLaunchDetail("");
    try {
      await invoke("launch_game", {
        profileId: state.selectedProfileId,
        versionId: state.selectedVersionId,
      });
      useLauncherStore.getState().fetchVersions();
    } catch (error) {
      console.error(error);
      alert(`Launch error: ${error}`);
      setIsLaunching(false);
    }
  };

  if (!state) return null;

  return (
    <div className="mt-auto flex flex-col gap-3 pt-4">
      <m.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Button
          size="lg"
          className="hover:bg-primary/90 h-14 w-full text-lg font-bold uppercase shadow-md transition-colors duration-300 hover:shadow-xl"
          disabled={
            !state.selectedProfileId || !state.selectedVersionId || isLaunching
          }
          onClick={handleLaunch}
        >
          <AnimatePresence mode="wait">
            {isLaunching ? (
              <m.div
                key="launching"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex w-full flex-col items-center gap-1"
              >
                <span className="text-sm font-normal">
                  {t(`launch.${launchStatus}`)} {Math.round(launchProgress)}%{" "}
                  {launchDetail ? `(${launchDetail})` : ""}
                </span>
                <Progress
                  value={launchProgress}
                  className="h-1.5 w-full transition-[width]"
                />
              </m.div>
            ) : (
              <m.div
                key={isDownloaded ? "play" : "download"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                {isDownloaded ? (
                  <Play className="mr-2 h-5 w-5 fill-current" />
                ) : (
                  <Download className="mr-2 h-5 w-5" />
                )}
                {isDownloaded ? t("launch.play") : t("launch.download")}
              </m.div>
            )}
          </AnimatePresence>
        </Button>
      </m.div>
    </div>
  );
};
