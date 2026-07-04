import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLauncherStore } from "@/state";

export const LaunchButton = () => {
  const { state } = useLauncherStore();
  const { t } = useTranslation();

  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState("");
  const [launchProgress, setLaunchProgress] = useState(0);

  useEffect(() => {
    const unlisten = listen("launch-progress", (event) => {
      const payload = event.payload as { status: string; progress: number };
      setLaunchStatus(payload.status);
      setLaunchProgress(payload.progress * 100);
      if (payload.status === "success") {
        setTimeout(() => {
          setIsLaunching(false);
          setLaunchStatus("");
          setLaunchProgress(0);
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
    try {
      await invoke("launch_game", {
        profileId: state.selectedProfileId,
        versionId: state.selectedVersionId,
      });
    } catch (error) {
      console.error(error);
      setIsLaunching(false);
    }
  };

  if (!state) return null;

  return (
    <div className="pt-4 flex flex-col gap-3">
      <Button
        size="lg"
        className="w-full text-lg font-bold h-14 uppercase"
        disabled={
          !state.selectedProfileId || !state.selectedVersionId || isLaunching
        }
        onClick={handleLaunch}
      >
        {isLaunching ? (
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-sm font-normal">
              {t(`launch.${launchStatus}`)} {Math.round(launchProgress)}%
            </span>
            <Progress value={launchProgress} className="h-1.5 w-full" />
          </div>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2 fill-current" />
            {t("launch.play")}
          </>
        )}
      </Button>
    </div>
  );
};
