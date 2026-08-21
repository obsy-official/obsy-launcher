import React from "react";
import { Boxes, Link2, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface AddonsDialogHeaderProps {
  onOpenUrl: () => void;
  onOpenFile: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddonsDialogHeader: React.FC<AddonsDialogHeaderProps> = ({
  onOpenUrl,
  onOpenFile,
  fileInputRef,
  onFileSelect,
}) => {
  const { t } = useTranslation();

  return (
    <DialogHeader className="border-border/40 border-b pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold">
              {t("addons.title")}
            </DialogTitle>
            <p className="text-muted-foreground text-xs">
              {t("addons.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pr-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={onFileSelect}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenUrl}
            className="hover:bg-primary/10 hover:text-primary flex h-8 cursor-pointer items-center gap-1.5 text-xs font-medium"
            title={t("addons.installUrl")}
          >
            <Link2 className="h-3.5 w-3.5" />
            <span>{t("addons.installUrlBtn")}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFile}
            className="hover:bg-primary/10 hover:text-primary flex h-8 cursor-pointer items-center gap-1.5 text-xs font-medium"
            title={t("addons.installZip")}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{t("addons.installZipBtn")}</span>
          </Button>
        </div>
      </div>
    </DialogHeader>
  );
};
