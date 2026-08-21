import React from "react";
import {
  ArrowUpCircle,
  Boxes,
  RefreshCw,
  Settings,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { AddonManifest } from "@/lib/addons/types";
import { AddonTrustBadge } from "./AddonTrustBadge";

export interface InstalledAddonCardProps {
  manifest: AddonManifest;
  catalog: AddonManifest[];
  enabled: boolean;
  hasUpdate?: boolean;
  latestVersion?: string;
  onUpdate: (id: string) => void;
  onSettings: (manifest: AddonManifest) => void;
  onReinstall: (manifest: AddonManifest) => void;
  onUninstall: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

export const InstalledAddonCard: React.FC<InstalledAddonCardProps> = ({
  manifest,
  catalog,
  enabled,
  hasUpdate,
  latestVersion,
  onUpdate,
  onSettings,
  onReinstall,
  onUninstall,
  onToggle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-border/40 bg-card/60 flex items-center justify-between gap-4 rounded-xl border p-3.5 backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
            enabled
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-muted text-muted-foreground border-border/40 opacity-60"
          }`}
        >
          <Boxes className="h-4 w-4" />
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground text-sm font-semibold">
              {manifest.name}
            </span>
            <span className="text-muted-foreground font-mono text-[10px]">
              v{manifest.version}
            </span>
            {hasUpdate && latestVersion && (
              <span className="rounded border border-emerald-500/30 bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400">
                {t("addons.updateAvailable")}: v{latestVersion}
              </span>
            )}
            <span className="text-muted-foreground flex items-center gap-1.5 text-[10px]">
              <span>• {manifest.author}</span>
              <AddonTrustBadge addon={manifest} catalog={catalog} />
            </span>
          </div>
          <p className="text-muted-foreground max-w-md truncate text-xs">
            {manifest.description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {hasUpdate && (
          <Button
            size="sm"
            onClick={() => onUpdate(manifest.id)}
            className="flex h-7 cursor-pointer items-center gap-1 bg-emerald-600 px-2 text-xs text-white shadow-sm hover:bg-emerald-500"
          >
            <ArrowUpCircle className="h-3.5 w-3.5" />
            <span>{t("addons.update")}</span>
          </Button>
        )}

        {manifest.configSchema && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSettings(manifest)}
            className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
            title={t("addons.settings")}
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onReinstall(manifest)}
          className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8 cursor-pointer"
          title={t("addons.reinstall")}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onUninstall(manifest.id)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
          title={t("addons.uninstall")}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <Switch
          checked={enabled}
          onCheckedChange={(checked) => onToggle(manifest.id, checked)}
        />
      </div>
    </div>
  );
};
