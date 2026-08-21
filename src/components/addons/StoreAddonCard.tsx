import React from "react";
import {
  Activity,
  ArrowUpCircle,
  Download,
  Palette,
  RefreshCw,
  Settings,
  ShieldCheck,
  Trash2,
  Wrench,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { AddonManifest } from "@/lib/addons/types";
import { formatSize } from "@/lib/utils";
import { AddonTrustBadge } from "./AddonTrustBadge";

export interface StoreAddonCardProps {
  addon: AddonManifest;
  catalog: AddonManifest[];
  installed: boolean;
  enabled: boolean;
  hasUpdate?: boolean;
  installing: boolean;
  isLoading: boolean;
  onInstall: (addon: AddonManifest) => void;
  onUpdate: (id: string) => void;
  onSettings: (addon: AddonManifest) => void;
  onUninstall: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

export const StoreAddonCard: React.FC<StoreAddonCardProps> = ({
  addon,
  catalog,
  installed,
  enabled,
  hasUpdate,
  installing,
  isLoading,
  onInstall,
  onUpdate,
  onSettings,
  onUninstall,
  onToggle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-border/40 bg-card/60 hover:border-border/70 flex items-center justify-between gap-4 rounded-xl border p-3.5 backdrop-blur-sm transition-colors">
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <div className="bg-primary/10 text-primary border-primary/20 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
          {addon.category === "integration" && <Activity className="h-5 w-5" />}
          {addon.category === "utility" && <Wrench className="h-5 w-5" />}
          {addon.category === "customization" && (
            <Palette className="h-5 w-5" />
          )}
          {addon.category === "performance" && <Zap className="h-5 w-5" />}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground text-sm font-semibold">
              {addon.name}
            </span>
            <span className="text-muted-foreground bg-muted/60 rounded px-1.5 py-0.5 font-mono text-[10px]">
              v{addon.version}
            </span>
            {hasUpdate && (
              <span className="rounded border border-emerald-500/30 bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400">
                {t("addons.updateAvailable")}
              </span>
            )}
            <span className="text-muted-foreground flex items-center gap-1.5 text-[10px]">
              <span>• {addon.author}</span>
              <AddonTrustBadge addon={addon} catalog={catalog} />
            </span>
            <span className="text-muted-foreground font-mono text-[10px]">
              ({formatSize(addon.sizeBytes)})
            </span>
          </div>

          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
            {addon.description}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {addon.permissions.map((perm) => (
              <span
                key={perm}
                className="text-muted-foreground bg-muted/40 border-border/30 flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[9px]"
              >
                <ShieldCheck className="h-2.5 w-2.5 text-emerald-400" />
                {perm}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {installed ? (
          <>
            {hasUpdate && (
              <Button
                size="sm"
                onClick={() => onUpdate(addon.id)}
                className="flex h-8 cursor-pointer items-center gap-1 bg-emerald-600 text-xs text-white shadow-sm hover:bg-emerald-500"
              >
                <ArrowUpCircle className="h-3.5 w-3.5" />
                <span>{t("addons.update")}</span>
              </Button>
            )}

            {addon.configSchema && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSettings(addon)}
                className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                title={t("addons.settings")}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              disabled={installing || isLoading}
              onClick={() => onInstall(addon)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8 cursor-pointer"
              title={t("addons.reinstall")}
            >
              <RefreshCw
                className={`h-4 w-4 ${installing ? "animate-spin" : ""}`}
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUninstall(addon.id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
              title={t("addons.uninstall")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Switch
              checked={enabled}
              onCheckedChange={(checked) => onToggle(addon.id, checked)}
            />
          </>
        ) : (
          <Button
            size="sm"
            disabled={installing || isLoading}
            onClick={() => onInstall(addon)}
            className="flex h-8 cursor-pointer items-center gap-1.5 text-xs shadow-sm"
          >
            {installing ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span>{t("addons.install")}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
