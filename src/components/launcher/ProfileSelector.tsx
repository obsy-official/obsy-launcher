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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLauncherStore } from "@/state";
import { invoke } from "@tauri-apps/api/core";
import { openUrl } from "@tauri-apps/plugin-opener";
import { ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ProfileSelector = () => {
  const {
    state,
    profiles,
    selectProfile,
    addOfflineProfile,
    removeProfile,
    fetchProfiles,
  } = useLauncherStore();
  const { t } = useTranslation();

  const [newUsername, setNewUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [msaData, setMsaData] = useState<any>(null);
  const [isMsaPolling, setIsMsaPolling] = useState(false);
  const [msaError, setMsaError] = useState("");

  if (!state) return null;

  const handleAddProfile = () => {
    if (newUsername.trim()) {
      addOfflineProfile(newUsername.trim());
      setNewUsername("");
      setIsDialogOpen(false);
    }
  };

  const handleMsaAuth = async () => {
    try {
      setMsaError("");
      setMsaData(null);
      const data: any = await invoke("start_msa_auth");
      setMsaData(data);
      setIsMsaPolling(true);

      await invoke("poll_msa_auth", {
        deviceCode: data.device_code,
        interval: data.interval,
      });

      await fetchProfiles();
      setIsDialogOpen(false);
      setMsaData(null);
    } catch (e: any) {
      setMsaError(e.toString());
    } finally {
      setIsMsaPolling(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{t("profile.selectProfile")}</Label>
      <div className="flex gap-2">
        <Select
          value={state.selectedProfileId ?? null}
          onValueChange={(val) => {
            if (val) selectProfile(val as string);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("profile.selectAccount")}>
              {(val: any) => {
                if (!val) return null;
                const p = profiles.find((p) => p.id === val);
                if (!p) return null;
                return (
                  <div className="flex items-center gap-2 pl-1">
                    <img
                      src={`https://mc-heads.net/avatar/${p.username}/32`}
                      alt={p.username}
                      className="w-5 h-5 bg-muted rounded-xs"
                    />
                    <span>
                      {p.username}{" "}
                      <span className="text-muted-foreground text-xs">
                        {p.microsoft
                          ? t("profile.microsoft")
                          : t("profile.offline")}
                      </span>
                    </span>
                  </div>
                );
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {profiles.length === 0 ? (
              <SelectItem value="none" disabled>
                {t("profile.noProfiles")}
              </SelectItem>
            ) : (
              profiles.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://mc-heads.net/avatar/${p.username}/32`}
                      alt={p.username}
                      className="w-5 h-5 bg-muted rounded-xs"
                    />
                    <span>
                      {p.username}{" "}
                      <span className="text-muted-foreground text-xs">
                        {p.microsoft
                          ? t("profile.microsoft")
                          : t("profile.offline")}
                      </span>
                    </span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setMsaData(null);
              setMsaError("");
            }
          }}
        >
          <DialogTrigger render={<Button variant="outline" size="icon" />}>
            <Plus className="w-4 h-4" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Profile</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="offline" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="offline">
                  {t("profile.offline")}
                </TabsTrigger>
                <TabsTrigger value="microsoft">
                  {t("profile.microsoft")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="offline" className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username">{t("profile.username")}</Label>
                  <Input
                    id="username"
                    placeholder={t("profile.enterNickname")}
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddProfile()}
                  />
                </div>
                <Button
                  onClick={handleAddProfile}
                  disabled={!newUsername.trim()}
                  className="mt-2"
                >
                  {t("profile.addOfflineProfile")}
                </Button>
              </TabsContent>

              <TabsContent
                value="microsoft"
                className="flex flex-col gap-4 py-4"
              >
                {!msaData && !isMsaPolling && (
                  <Button onClick={handleMsaAuth} className="w-full">
                    {t("profile.addMicrosoftProfile")}
                  </Button>
                )}
                {msaData && (
                  <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("profile.microsoftLoginInstructions")}
                    </p>
                    <div className="text-3xl font-bold tracking-widest bg-muted py-2 px-4 rounded-lg select-all">
                      {msaData.user_code}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => openUrl(msaData.verification_uri)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("profile.microsoftLoginLink")}
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4 animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("profile.microsoftLoginWaiting")}
                    </div>
                  </div>
                )}
                {msaError && (
                  <div className="text-destructive text-sm text-center mt-2">
                    {t("profile.microsoftLoginError")}: {msaError}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {state.selectedProfileId && (
          <Button
            variant="destructive"
            size="icon"
            title={t("profile.deleteTooltip")}
            onClick={() => removeProfile(state.selectedProfileId!)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
