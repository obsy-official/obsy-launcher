import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLauncherStore } from "@/state";

export const SettingsDialog = () => {
  const { state, updateState, fetchVersions } = useLauncherStore();
  const { t } = useTranslation();

  if (!state) return null;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          />
        }
      >
        <Settings className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("settings.title")}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="game">{t("settings.game")}</TabsTrigger>
            <TabsTrigger value="window">{t("settings.window")}</TabsTrigger>
            <TabsTrigger value="versions">{t("settings.versions")}</TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-memory" className="flex flex-col gap-1">
                <span>{t("settings.autoMemory")}</span>
              </Label>
              <Switch
                id="auto-memory"
                checked={state.autoMemory}
                onCheckedChange={(checked) =>
                  updateState({ ...state, autoMemory: checked })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Label>{t("settings.memory")}</Label>
                <span className="text-muted-foreground text-sm">
                  {state.memoryAmount} MB
                </span>
              </div>
              <Slider
                disabled={state.autoMemory}
                value={[state.memoryAmount]}
                max={16384}
                min={512}
                step={512}
                onValueChange={(val: any) =>
                  updateState({
                    ...state,
                    memoryAmount: Array.isArray(val) ? val[0] : val,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("settings.jvmArgs")}</Label>
              <Input
                value={state.jvmArguments}
                onChange={(e) =>
                  updateState({
                    ...state,
                    jvmArguments: e.target.value,
                  })
                }
                placeholder="-Xmx4G -XX:+UseG1GC"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("settings.javaPath") || "Java Path"}</Label>
              <Input
                value={state.javaPath || ""}
                onChange={(e) =>
                  updateState({
                    ...state,
                    javaPath: e.target.value || null,
                  })
                }
                placeholder="/usr/bin/java (leave empty for default)"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="close-after-launch"
                className="flex flex-col gap-1"
              >
                <span>{t("settings.closeAfterLaunch")}</span>
              </Label>
              <Switch
                id="close-after-launch"
                checked={state.closeAfterLaunch}
                onCheckedChange={(checked) =>
                  updateState({ ...state, closeAfterLaunch: checked })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="window" className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>{t("settings.width")}</Label>
                <Input
                  type="number"
                  value={state.screenWidth}
                  onChange={(e) =>
                    updateState({
                      ...state,
                      screenWidth: parseInt(e.target.value) || 854,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>{t("settings.height")}</Label>
                <Input
                  type="number"
                  value={state.screenHeight}
                  onChange={(e) =>
                    updateState({
                      ...state,
                      screenHeight: parseInt(e.target.value) || 480,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="fullscreen" className="flex flex-col gap-1">
                <span>{t("settings.fullscreen")}</span>
              </Label>
              <Switch
                id="fullscreen"
                checked={state.fullscreen}
                onCheckedChange={(checked) =>
                  updateState({ ...state, fullscreen: checked })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="versions" className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-releases" className="flex flex-col gap-1">
                <span>{t("settings.showReleases")}</span>
              </Label>
              <Switch
                id="show-releases"
                checked={state.releaseFilter}
                onCheckedChange={(checked) => {
                  updateState({ ...state, releaseFilter: checked });
                  fetchVersions();
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-snapshots" className="flex flex-col gap-1">
                <span>{t("settings.showSnapshots")}</span>
              </Label>
              <Switch
                id="show-snapshots"
                checked={state.snapshotFilter}
                onCheckedChange={(checked) => {
                  updateState({ ...state, snapshotFilter: checked });
                  fetchVersions();
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-old" className="flex flex-col gap-1">
                <span>{t("settings.showOld")}</span>
              </Label>
              <Switch
                id="show-old"
                checked={state.legacyFilter}
                onCheckedChange={(checked) => {
                  updateState({ ...state, legacyFilter: checked });
                  fetchVersions();
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
