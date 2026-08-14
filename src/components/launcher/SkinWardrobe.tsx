import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLauncherStore } from "@/state";
import { Check, Plus, Trash2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";

const SkinViewer = lazy(() =>
  import("./SkinViewer").then((m) => ({ default: m.SkinViewer })),
);

export const SkinWardrobe = () => {
  const {
    state,
    profiles,
    wardrobe,
    fetchWardrobe,
    addSkinToWardrobe,
    removeSkinFromWardrobe,
    applySkin,
  } = useLauncherStore();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkinId, setSelectedSkinId] = useState<string | null>(null);
  const [uploadSlim, setUploadSlim] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchWardrobe();
    }
  }, [isOpen, fetchWardrobe]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const bytes = Array.from(new Uint8Array(buffer));
      if (activeProfile) {
        await addSkinToWardrobe(bytes, file.name, uploadSlim, activeProfile.id);
      }
    } catch (err) {
      console.error("Failed to add skin", err);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApply = async () => {
    if (state?.selectedProfileId && selectedSkinId) {
      try {
        await applySkin(state.selectedProfileId, selectedSkinId);
        setIsOpen(false);
      } catch (err) {
        console.error("Failed to apply skin", err);
      }
    }
  };

  const selectedSkin = wardrobe.find((s) => s.id === selectedSkinId);
  const activeProfile = profiles.find((p) => p.id === state?.selectedProfileId);

  if (!activeProfile?.microsoft) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <m.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full"
      >
        <Button
          variant="outline"
          className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 mt-4 w-full transition-colors duration-300"
          onClick={() => setIsOpen(true)}
        >
          {t("wardrobe.changeSkin")}
        </Button>
      </m.div>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("wardrobe.title")}</DialogTitle>
        </DialogHeader>

        <div className="flex h-[400px] gap-6">
          <div className="flex w-1/2 flex-col gap-4">
            <input
              type="file"
              accept="image/png"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <div className="flex w-full gap-2">
              <Select
                value={uploadSlim ? "slim" : "classic"}
                onValueChange={(v) => setUploadSlim(v === "slim")}
              >
                <SelectTrigger className="hover:border-primary/50 w-[120px] transition-colors">
                  <SelectValue>
                    {uploadSlim ? t("wardrobe.slim") : t("wardrobe.classic")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">
                    {t("wardrobe.classic")}
                  </SelectItem>
                  <SelectItem value="slim">{t("wardrobe.slim")}</SelectItem>
                </SelectContent>
              </Select>
              <m.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:bg-secondary/80 w-full transition-colors"
                  variant="secondary"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t("wardrobe.uploadSkin")}
                </Button>
              </m.div>
            </div>

            <div className="border-border/50 bg-muted/20 min-h-0 flex-1 overflow-y-auto rounded-md border p-2">
              <div className="grid grid-cols-3 gap-2">
                <AnimatePresence>
                  {wardrobe.reduce<React.ReactNode[]>((acc, skin) => {
                    if (
                      skin.profileId &&
                      skin.profileId !== activeProfile?.id
                    ) {
                      return acc;
                    }
                    acc.push(
                      <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={skin.id}
                        role="button"
                        tabIndex={0}
                        aria-label={skin.name}
                        className={`hover:border-primary/50 relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors duration-300 ${selectedSkinId === skin.id ? "border-primary shadow-primary/20 shadow-md" : "bg-muted/50 border-transparent"}`}
                        onClick={() => setSelectedSkinId(skin.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedSkinId(skin.id);
                          }
                        }}
                      >
                        <img
                          src={skin.base64Data}
                          alt={skin.name}
                          style={{ imageRendering: "pixelated" }}
                          className="h-full w-full object-contain p-2"
                        />
                        <AnimatePresence>
                          {selectedSkinId === skin.id && (
                            <m.div
                              initial={{ opacity: 0, scale: 0.01 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.01 }}
                              className="bg-primary text-primary-foreground absolute top-1 right-1 rounded-full p-0.5"
                            >
                              <Check className="h-3 w-3" />
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.div>,
                    );
                    return acc;
                  }, [])}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="border-border/50 bg-muted/10 relative flex w-1/2 flex-col items-center gap-4 rounded-md border p-4">
            <AnimatePresence mode="wait">
              {selectedSkin ? (
                <m.div
                  key={selectedSkin.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full w-full flex-col items-center justify-between"
                >
                  <m.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2"
                  >
                    <Button
                      variant="destructive"
                      size="icon"
                      className="hover:bg-destructive/90 h-8 w-8 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkinFromWardrobe(selectedSkin.id);
                        if (selectedSkinId === selectedSkin.id)
                          setSelectedSkinId(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </m.div>
                  <div className="flex w-full flex-1 items-center justify-center pt-4">
                    <Suspense
                      fallback={
                        <div className="flex h-[300px] w-[180px] items-center justify-center">
                          <Loader2 className="text-primary/40 h-6 w-6 animate-spin" />
                        </div>
                      }
                    >
                      <SkinViewer
                        skinUrl={selectedSkin.base64Data}
                        slim={selectedSkin.slim}
                        width={180}
                        height={300}
                      />
                    </Suspense>
                  </div>
                  <div className="w-full truncate text-center text-sm font-medium">
                    {selectedSkin.name}
                  </div>
                  <m.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto w-full"
                  >
                    <Button
                      onClick={handleApply}
                      className="hover:bg-primary/90 w-full shadow-md transition-colors hover:shadow-lg"
                      disabled={!state?.selectedProfileId}
                    >
                      {t("wardrobe.applySkin")}
                    </Button>
                  </m.div>
                </m.div>
              ) : (
                <m.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground flex flex-1 items-center justify-center text-center text-sm"
                >
                  {t("wardrobe.emptyPreview")}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
