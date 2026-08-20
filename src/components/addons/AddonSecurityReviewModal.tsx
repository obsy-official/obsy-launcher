import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AddonManifest, AddonPermission } from "@/lib/addons/types";
import {
  ShieldCheck,
  ShieldAlert,
  Gamepad2,
  Globe,
  HardDrive,
  Layout,
  FolderTree,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface AddonSecurityReviewModalProps {
  manifest: AddonManifest | null;
  archiveBytes: number[] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const PERMISSION_CONFIG: Record<
  AddonPermission,
  {
    key: string;
    icon: React.ComponentType<{ className?: string }>;
    highRisk?: boolean;
  }
> = {
  "game:lifecycle": {
    key: "gameLifecycle",
    icon: Gamepad2,
    highRisk: true,
  },
  "game:launch": {
    key: "gameLaunch",
    icon: Gamepad2,
  },
  "game:profiles": {
    key: "gameProfiles",
    icon: UserCheck,
  },
  "network:fetch": {
    key: "networkFetch",
    icon: Globe,
  },
  "storage:local": {
    key: "storageLocal",
    icon: HardDrive,
  },
  "ui:slots": {
    key: "uiSlots",
    icon: Layout,
  },
  "ui:notifications": {
    key: "uiNotifications",
    icon: CheckCircle2,
  },
  "fs:instances": {
    key: "fsInstances",
    icon: FolderTree,
    highRisk: true,
  },
};

export const AddonSecurityReviewModal: React.FC<
  AddonSecurityReviewModalProps
> = ({ manifest, open, onOpenChange, onConfirm, isLoading = false }) => {
  const { t } = useTranslation();

  if (!manifest) return null;

  const isVerified =
    manifest.author === "Obsy Team" ||
    manifest.author === "Obsy Design Studio" ||
    manifest.author === "Obsy QA Team";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col overflow-hidden p-6 sm:max-w-[500px]">
        <DialogHeader className="border-border/40 border-b pb-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                isVerified
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-400"
              }`}
            >
              {isVerified ? (
                <ShieldCheck className="h-5 w-5" />
              ) : (
                <ShieldAlert className="h-5 w-5" />
              )}
            </div>
            <div>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <span>{t("addons.securityTitle")}</span>
                {isVerified && (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{t("addons.verified")}</span>
                  </span>
                )}
              </DialogTitle>
              <p className="text-muted-foreground text-xs">
                {t("addons.securitySubtitle")}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Addon details banner */}
        <div className="border-border/40 bg-card/60 mt-2 flex items-center justify-between rounded-xl border p-3.5">
          <div className="flex flex-col">
            <span className="text-foreground text-sm font-semibold">
              {manifest.name}
            </span>
            <span className="text-muted-foreground text-xs">
              {t("common.author")}: {manifest.author} • v{manifest.version}
            </span>
          </div>
          <span className="text-muted-foreground bg-muted/40 border-border/30 rounded-md border px-2 py-1 font-mono text-xs">
            {Math.round(manifest.sizeBytes / 1024)} KB
          </span>
        </div>

        {!isVerified && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            <span className="mb-0.5 block font-semibold">
              {t("addons.thirdPartyWarningTitle")}
            </span>
            {t("addons.thirdPartyWarningDesc")}
          </div>
        )}

        {/* Requested permissions list */}
        <div className="mt-1 flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t("addons.requestedPermissions")}
          </span>

          <div className="flex max-h-[220px] flex-col gap-2 overflow-y-auto pr-1">
            {manifest.permissions.length === 0 ? (
              <div className="text-muted-foreground py-2 text-xs italic">
                {t("addons.noPermissionsRequired")}
              </div>
            ) : (
              manifest.permissions.map((perm) => {
                const conf = PERMISSION_CONFIG[perm];
                const label = conf
                  ? t(`addons.permissions.${conf.key}.label`)
                  : perm;
                const desc = conf
                  ? t(`addons.permissions.${conf.key}.desc`)
                  : "";
                const Icon = conf?.icon || ShieldCheck;
                const isHighRisk = conf?.highRisk;

                return (
                  <div
                    key={perm}
                    className={`flex items-start gap-2.5 rounded-lg border p-2.5 ${
                      isHighRisk
                        ? "border-amber-500/30 bg-amber-500/5"
                        : "border-border/30 bg-card/40"
                    }`}
                  >
                    <Icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        isHighRisk ? "text-amber-400" : "text-primary"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="text-foreground flex items-center gap-1.5 text-xs font-semibold">
                        <span>{label}</span>
                        <code className="text-muted-foreground bg-muted/40 rounded px-1 font-mono text-[10px]">
                          {perm}
                        </code>
                      </span>
                      {desc && (
                        <span className="text-muted-foreground mt-0.5 text-[11px] leading-tight">
                          {desc}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-border/40 mt-2 flex items-center justify-end gap-2.5 border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="cursor-pointer text-xs"
          >
            {t("common.cancel")}
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className="cursor-pointer text-xs font-semibold shadow-md"
          >
            {isLoading ? t("addons.installing") : t("addons.allowAndInstall")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
