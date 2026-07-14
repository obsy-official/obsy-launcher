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
import { type Profile, useLauncherStore } from "@/state";
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

      const newProfile = await invoke<Profile>("poll_msa_auth", {
        deviceCode: data.device_code,
        interval: data.interval,
      });

      await fetchProfiles();
      if (newProfile && newProfile.id) {
        selectProfile(newProfile.id);
      }

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
                      className="bg-muted h-5 w-5 rounded-xs"
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
                      className="bg-muted h-5 w-5 rounded-xs"
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
            <Plus className="h-4 w-4" />
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
                    <p className="text-muted-foreground text-sm">
                      {t("profile.microsoftLoginInstructions")}
                    </p>
                    <div className="bg-muted rounded-lg px-4 py-2 text-3xl font-bold tracking-widest select-all">
                      {msaData.user_code}
                    </div>
                    <Button
                      variant="outline"
                      className="mt-2 w-full"
                      onClick={() => openUrl(msaData.verification_uri)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("profile.microsoftLoginLink")}
                    </Button>
                    <div className="text-muted-foreground mt-4 flex animate-pulse items-center justify-center gap-2 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("profile.microsoftLoginWaiting")}
                    </div>
                  </div>
                )}
                {msaError && (
                  <div className="text-destructive mt-2 text-center text-sm">
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
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
