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
import { openUrl } from "@tauri-apps/plugin-opener";
import { ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, m } from "framer-motion";
import { ProfileAvatar } from "./ProfileAvatar";
import { useMsaAuth } from "@/lib/useMsaAuth";

export const ProfileSelector = () => {
  const { state, profiles, selectProfile, addOfflineProfile, removeProfile } =
    useLauncherStore();
  const { t } = useTranslation();

  const [newUsername, setNewUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    msaData,
    isPolling: isMsaPolling,
    error: msaError,
    startAuth: handleMsaAuth,
    reset: resetMsaAuth,
  } = useMsaAuth(() => {
    setIsDialogOpen(false);
  });

  if (!state) return null;

  const handleAddProfile = () => {
    const trimmed = newUsername.trim();
    if (trimmed) {
      addOfflineProfile(trimmed);
      setNewUsername("");
      setIsDialogOpen(false);
    }
  };

  const selectedProfile = profiles.find(
    (p) => p.id === state.selectedProfileId,
  );

  return (
    <div className="flex flex-col gap-2">
      <Label>{t("profile.selectProfile")}</Label>
      <div className="flex gap-2">
        <Select
          value={state.selectedProfileId ?? undefined}
          onValueChange={(val) => {
            if (val) selectProfile(val as string);
          }}
        >
          <SelectTrigger className="hover:border-primary/50 focus:ring-primary/20 w-full transition-colors duration-300">
            {selectedProfile ? (
              <div className="flex items-center gap-2 pl-1">
                <ProfileAvatar username={selectedProfile.username} />
                <span className="font-medium">
                  {selectedProfile.username}{" "}
                  <span className="text-muted-foreground text-xs">
                    {selectedProfile.microsoft
                      ? t("profile.microsoft")
                      : t("profile.offline")}
                  </span>
                </span>
              </div>
            ) : (
              <SelectValue placeholder={t("profile.selectAccount")} />
            )}
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
                    <ProfileAvatar username={p.username} />
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
              resetMsaAuth();
            }
          }}
        >
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
          </m.div>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t("profile.addProfileTitle")}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="offline" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="offline" className="transition-colors">
                  {t("profile.offline")}
                </TabsTrigger>
                <TabsTrigger value="microsoft" className="transition-colors">
                  {t("profile.microsoft")}
                </TabsTrigger>
              </TabsList>

              <div className="relative overflow-hidden">
                <TabsContent
                  value="offline"
                  className="mt-0 flex flex-col gap-4 py-4"
                >
                  <m.div
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
                        className="hover:border-primary/50 focus-visible:ring-primary/20 transition-colors"
                      />
                    </div>
                    <Button
                      onClick={handleAddProfile}
                      disabled={!newUsername.trim()}
                      className="mt-2 transition-colors"
                    >
                      {t("profile.addOfflineProfile")}
                    </Button>
                  </m.div>
                </TabsContent>

                <TabsContent
                  value="microsoft"
                  className="mt-0 flex flex-col gap-4 py-4"
                >
                  <m.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    {!msaData && !isMsaPolling && (
                      <Button
                        onClick={handleMsaAuth}
                        className="w-full transition-colors"
                      >
                        {t("profile.addMicrosoftProfile")}
                      </Button>
                    )}
                    {msaData && (
                      <m.div
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
                          className="hover:bg-accent mt-2 w-full transition-colors"
                          onClick={() => openUrl(msaData.verification_uri)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("profile.microsoftLoginLink")}
                        </Button>
                        <div className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-sm">
                          <Loader2 className="text-primary h-4 w-4 animate-spin" />
                          {t("profile.microsoftLoginWaiting")}
                        </div>
                      </m.div>
                    )}
                    {msaError && (
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-destructive bg-destructive/10 mt-2 rounded-md p-2 text-center text-sm"
                      >
                        {t("profile.microsoftLoginError")}: {msaError}
                      </m.div>
                    )}
                  </m.div>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>

        <AnimatePresence>
          {state.selectedProfileId && (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="destructive"
                  size="icon"
                  title={t("profile.deleteTooltip")}
                  onClick={() => removeProfile(state.selectedProfileId!)}
                  className="hover:bg-destructive/90 transition-colors hover:shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
