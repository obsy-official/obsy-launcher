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
import { Check, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SkinViewer } from "./SkinViewer";

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
      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => setIsOpen(true)}
      >
        {t("wardrobe.changeSkin")}
      </Button>
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
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">{t("wardrobe.classic")}</SelectItem>
                  <SelectItem value="slim">{t("wardrobe.slim")}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                variant="secondary"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("wardrobe.uploadSkin")}
              </Button>
            </div>

            <div className="border-border/50 bg-muted/20 min-h-0 flex-1 overflow-y-auto rounded-md border p-2">
              <div className="grid grid-cols-3 gap-2">
                {wardrobe
                  .filter(
                    (s) => !s.profileId || s.profileId === activeProfile?.id,
                  )
                  .map((skin) => (
                    <div
                      key={skin.id}
                      className={`hover:border-primary/50 relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors ${selectedSkinId === skin.id ? "border-primary" : "bg-muted/50 border-transparent"}`}
                      onClick={() => setSelectedSkinId(skin.id)}
                    >
                      <img
                        src={skin.base64Data}
                        alt={skin.name}
                        style={{ imageRendering: "pixelated" }}
                        className="h-full w-full object-contain p-2"
                      />
                      {selectedSkinId === skin.id && (
                        <div className="bg-primary text-primary-foreground absolute top-1 right-1 rounded-full p-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="border-border/50 bg-muted/10 relative flex w-1/2 flex-col items-center gap-4 rounded-md border p-4">
            {selectedSkin ? (
              <>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSkinFromWardrobe(selectedSkin.id);
                    if (selectedSkinId === selectedSkin.id)
                      setSelectedSkinId(null);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex w-full flex-1 items-center justify-center">
                  <SkinViewer
                    skinUrl={selectedSkin.base64Data}
                    slim={selectedSkin.slim}
                    width={180}
                    height={300}
                  />
                </div>
                <div className="w-full truncate text-center text-sm font-medium">
                  {selectedSkin.name}
                </div>
                <Button
                  onClick={handleApply}
                  className="w-full"
                  disabled={!state?.selectedProfileId}
                >
                  {t("wardrobe.applySkin")}
                </Button>
              </>
            ) : (
              <div className="text-muted-foreground flex flex-1 items-center justify-center text-center text-sm">
                {t("wardrobe.emptyPreview")}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
