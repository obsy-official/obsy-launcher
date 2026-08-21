import React, { useState } from "react";
import { Download, Link2, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export interface UrlInstallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (url: string) => Promise<void>;
  isFetching: boolean;
}

export const UrlInstallModal: React.FC<UrlInstallModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isFetching,
}) => {
  const { t } = useTranslation();
  const [urlInput, setUrlInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || isFetching) return;
    await onSubmit(urlInput.trim());
    setUrlInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-5 sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Link2 className="text-primary h-4 w-4" />
            {t("addons.urlDialogTitle")}
          </DialogTitle>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {t("addons.urlDialogDesc")}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={t("addons.urlInputPlaceholder")}
            className="text-xs"
            autoFocus
          />

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isFetching}
              className="cursor-pointer text-xs"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!urlInput.trim() || isFetching}
              className="flex cursor-pointer items-center gap-1.5 text-xs"
            >
              {isFetching ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>{t("addons.downloadingFromUrl")}</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>{t("addons.install")}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
