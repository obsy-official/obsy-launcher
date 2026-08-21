import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AddonManifest, ConfigField } from "@/lib/addons/types";
import { Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ConfigFieldRow } from "./ConfigFieldRow";

export interface AddonSettingsModalProps {
  manifest: AddonManifest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddonSettingsModal: React.FC<AddonSettingsModalProps> = ({
  manifest,
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation();

  if (!manifest || !manifest.configSchema) return null;

  const storagePrefix = `obsy:addon:${manifest.id}:`;

  const getStoredValue = (key: string, field: ConfigField): unknown => {
    try {
      const raw = localStorage.getItem(`${storagePrefix}${key}`);
      return raw !== null ? JSON.parse(raw) : field.default;
    } catch {
      return field.default;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden p-6 sm:max-w-[480px]">
        <DialogHeader className="border-border/40 border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 text-primary border-primary/20 flex h-8 w-8 items-center justify-center rounded-lg border">
              <Settings2 className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                {t("addons.settingsTitle")} {manifest.name}
              </DialogTitle>
              <p className="text-muted-foreground text-xs">
                v{manifest.version}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex max-h-[400px] flex-1 flex-col gap-4 overflow-y-auto py-3 pr-1">
          {Object.entries(manifest.configSchema).map(([key, field]) => {
            return (
              <ConfigFieldRow
                key={key}
                fieldKey={key}
                field={field}
                storagePrefix={storagePrefix}
                initialValue={getStoredValue(key, field)}
                addonManifest={manifest}
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
