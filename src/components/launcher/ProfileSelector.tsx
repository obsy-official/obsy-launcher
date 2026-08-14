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

import { motion, AnimatePresence } from "framer-motion";

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
          <SelectTrigger className="hover:border-primary/50 focus:ring-primary/20 w-full transition-all duration-300">
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
                      className="bg-muted h-5 w-5 rounded-xs shadow-sm"
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
                <SelectItem
                  key={p.id}
                  value={p.id}
                  className="hover:bg-accent transition-colors"
                >
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                />
              }
            >
              <Plus className="h-4 w-4" />
            </DialogTrigger>
          </motion.div>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t("profile.addProfileTitle")}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="offline" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="offline" className="transition-all">
                  {t("profile.offline")}
                </TabsTrigger>
                <TabsTrigger value="microsoft" className="transition-all">
                  {t("profile.microsoft")}
                </TabsTrigger>
              </TabsList>

              <div className="relative overflow-hidden">
                <TabsContent
                  value="offline"
                  className="mt-0 flex flex-col gap-4 py-4"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="username">{t("profile.username")}</Label>
                      <Input
                        id="username"
                        placeholder={t("profile.enterNickname")}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddProfile()
                        }
                        className="hover:border-primary/50 focus-visible:ring-primary/20 transition-all"
                      />
                    </div>
                    <Button
                      onClick={handleAddProfile}
                      disabled={!newUsername.trim()}
                      className="mt-2 transition-all"
                    >
                      {t("profile.addOfflineProfile")}
                    </Button>
                  </motion.div>
                </TabsContent>

                <TabsContent
                  value="microsoft"
                  className="mt-0 flex flex-col gap-4 py-4"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    {!msaData && !isMsaPolling && (
                      <Button
                        onClick={handleMsaAuth}
                        className="w-full transition-all"
                      >
                        {t("profile.addMicrosoftProfile")}
                      </Button>
                    )}
                    {msaData && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center gap-4 py-4 text-center"
                      >
                        <p className="text-muted-foreground text-sm">
                          {t("profile.microsoftLoginInstructions")}
                        </p>
                        <div className="bg-muted rounded-lg px-4 py-2 text-3xl font-bold tracking-widest shadow-inner select-all">
                          {msaData.user_code}
                        </div>
                        <Button
                          variant="outline"
                          className="hover:bg-accent mt-2 w-full transition-all"
                          onClick={() => openUrl(msaData.verification_uri)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("profile.microsoftLoginLink")}
                        </Button>
                        <div className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-sm">
                          <Loader2 className="text-primary h-4 w-4 animate-spin" />
                          {t("profile.microsoftLoginWaiting")}
                        </div>
                      </motion.div>
                    )}
                    {msaError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-destructive bg-destructive/10 mt-2 rounded-md p-2 text-center text-sm"
                      >
                        {t("profile.microsoftLoginError")}: {msaError}
                      </motion.div>
                    )}
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>

        <AnimatePresence>
          {state.selectedProfileId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="destructive"
                  size="icon"
                  title={t("profile.deleteTooltip")}
                  onClick={() => removeProfile(state.selectedProfileId!)}
                  className="hover:bg-destructive/90 transition-all hover:shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
