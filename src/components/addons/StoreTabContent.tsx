import React from "react";
import { Boxes } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TabsContent } from "@/components/ui/tabs";
import type { AddonManifest } from "@/lib/addons/types";
import { StoreAddonCard } from "./StoreAddonCard";

export interface StoreCategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StoreTabContentProps {
  categories: StoreCategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  filteredCatalog: AddonManifest[];
  catalog: AddonManifest[];
  installedAddons: Record<string, any>;
  installingId: string | null;
  isLoading: boolean;
  onInstall: (addon: AddonManifest) => void;
  onUpdate: (id: string) => void;
  onSettings: (addon: AddonManifest) => void;
  onUninstall: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
  isInstalled: (id: string) => boolean;
  isEnabled: (id: string) => boolean;
}

export const StoreTabContent: React.FC<StoreTabContentProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  filteredCatalog,
  catalog,
  installedAddons,
  installingId,
  isLoading,
  onInstall,
  onUpdate,
  onSettings,
  onUninstall,
  onToggle,
  isInstalled,
  isEnabled,
}) => {
  const { t } = useTranslation();

  return (
    <TabsContent
      value="store"
      className="mt-0 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden"
    >
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
        {filteredCatalog.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-16">
            <Boxes className="h-10 w-10 opacity-30" />
            <span className="text-sm font-medium">{t("addons.notFound")}</span>
          </div>
        ) : (
          filteredCatalog.map((addon) => (
            <StoreAddonCard
              key={addon.id}
              addon={addon}
              catalog={catalog}
              installed={isInstalled(addon.id)}
              enabled={isEnabled(addon.id)}
              hasUpdate={installedAddons[addon.id]?.hasUpdate}
              installing={installingId === addon.id}
              isLoading={isLoading}
              onInstall={onInstall}
              onUpdate={onUpdate}
              onSettings={onSettings}
              onUninstall={onUninstall}
              onToggle={onToggle}
            />
          ))
        )}
      </div>
    </TabsContent>
  );
};
