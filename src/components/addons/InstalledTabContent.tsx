import React from "react";
import { Boxes } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TabsContent } from "@/components/ui/tabs";
import type { AddonManifest } from "@/lib/addons/types";
import { InstalledAddonCard } from "./InstalledAddonCard";

export interface InstalledTabContentProps {
  installedList: any[];
  catalog: AddonManifest[];
  onUpdate: (id: string) => void;
  onSettings: (addon: AddonManifest) => void;
  onInstall: (addon: AddonManifest) => void;
  onUninstall: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

export const InstalledTabContent: React.FC<InstalledTabContentProps> = ({
  installedList,
  catalog,
  onUpdate,
  onSettings,
  onInstall,
  onUninstall,
  onToggle,
}) => {
  const { t } = useTranslation();

  return (
    <TabsContent
      value="installed"
      className="mt-0 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
        {installedList.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-16">
            <Boxes className="h-10 w-10 opacity-30" />
            <span className="text-sm font-medium">
              {t("addons.noInstalled")}
            </span>
            <p className="text-muted-foreground max-w-xs text-center text-xs">
              {t("addons.noInstalledDesc")}
            </p>
          </div>
        ) : (
          installedList.map((item) => {
            const { manifest, enabled, hasUpdate, latestVersion } = item;
            const catalogItem = catalog.find((c) => c.id === manifest.id);

            return (
              <InstalledAddonCard
                key={manifest.id}
                manifest={manifest}
                catalog={catalog}
                enabled={enabled}
                hasUpdate={hasUpdate}
                latestVersion={latestVersion}
                onUpdate={onUpdate}
                onSettings={onSettings}
                onReinstall={(m) => {
                  const target = catalogItem || m;
                  onInstall(target);
                }}
                onUninstall={onUninstall}
                onToggle={onToggle}
              />
            );
          })
        )}
      </div>
    </TabsContent>
  );
};
