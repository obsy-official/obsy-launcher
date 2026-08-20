import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addonRegistry } from "@/lib/addons/registry";
import type { AddonManifest, ConfigField } from "@/lib/addons/types";
import { Settings2, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AddonSettingsModalProps {
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

interface ConfigFieldRowProps {
  fieldKey: string;
  field: ConfigField;
  storagePrefix: string;
  initialValue: unknown;
  addonManifest: AddonManifest;
}

const ConfigFieldRow: React.FC<ConfigFieldRowProps> = ({
  fieldKey,
  field,
  storagePrefix,
  initialValue,
  addonManifest,
}) => {
  const [value, setValue] = useState<unknown>(initialValue);

  const saveValue = (val: unknown) => {
    setValue(val);
    try {
      localStorage.setItem(`${storagePrefix}${fieldKey}`, JSON.stringify(val));
      addonRegistry.emit(`addon:${addonManifest.id}:configChange`, {
        key: fieldKey,
        value: val,
      });
    } catch (e) {
      console.error("Failed to save addon config:", e);
    }
  };

  const resetToDefault = () => {
    saveValue(field.default);
  };

  if (field.type === "boolean") {
    return (
      <div className="border-border/40 bg-card/50 flex items-center justify-between gap-3 rounded-lg border p-3">
        <div className="flex flex-col gap-0.5">
          <Label className="text-foreground cursor-pointer text-xs font-semibold">
            {field.label}
          </Label>
          {field.description && (
            <span className="text-muted-foreground text-[11px] leading-tight">
              {field.description}
            </span>
          )}
        </div>
        <Switch
          checked={Boolean(value)}
          onCheckedChange={(checked) => saveValue(checked)}
        />
      </div>
    );
  }

  if (field.type === "number") {
    const numVal = typeof value === "number" ? value : field.default;
    const min = field.min ?? 0;
    const max = field.max ?? 100;
    const step = field.step ?? 1;

    return (
      <div className="border-border/40 bg-card/50 flex flex-col gap-2 rounded-lg border p-3">
        <div className="flex items-center justify-between">
          <Label className="text-foreground text-xs font-semibold">
            {field.label}
          </Label>
          <span className="text-primary font-mono text-xs font-medium">
            {numVal}
          </span>
        </div>
        {field.description && (
          <span className="text-muted-foreground text-[11px] leading-tight">
            {field.description}
          </span>
        )}
        <div className="pt-1">
          <Slider
            value={[numVal]}
            min={min}
            max={max}
            step={step}
            onValueChange={(val) => {
              const res = Array.isArray(val) ? val[0] : val;
              saveValue(res);
            }}
          />
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    const strVal = typeof value === "string" ? value : field.default;
    const options = Array.isArray(field.options)
      ? field.options.map((opt) =>
          typeof opt === "string" ? { label: opt, value: opt } : opt,
        )
      : [];

    return (
      <div className="border-border/40 bg-card/50 flex flex-col gap-2 rounded-lg border p-3">
        <Label className="text-foreground text-xs font-semibold">
          {field.label}
        </Label>
        {field.description && (
          <span className="text-muted-foreground text-[11px] leading-tight">
            {field.description}
          </span>
        )}
        <Select value={strVal} onValueChange={(val) => val && saveValue(val)}>
          <SelectTrigger className="bg-background h-8 text-xs">
            <SelectValue>{strVal}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // String field fallback
  const strVal = typeof value === "string" ? value : String(value ?? "");

  return (
    <div className="border-border/40 bg-card/50 flex flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <Label className="text-foreground text-xs font-semibold">
          {field.label}
        </Label>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetToDefault}
          className="text-muted-foreground hover:text-foreground h-5 w-5"
          title="Сбросить по умолчанию"
        >
          <RotateCcw className="h-2.5 w-2.5" />
        </Button>
      </div>
      {field.description && (
        <span className="text-muted-foreground text-[11px] leading-tight">
          {field.description}
        </span>
      )}
      <Input
        value={strVal}
        placeholder={field.placeholder || ""}
        onChange={(e) => saveValue(e.target.value)}
        className="bg-background h-8 text-xs"
      />
    </div>
  );
};
