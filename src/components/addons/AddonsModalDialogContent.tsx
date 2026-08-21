import React, { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useTranslation } from "react-i18next";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { useAddonStore } from "@/lib/addons/addonStore";
import type { AddonManifest } from "@/lib/addons/types";
import { AddonSecurityReviewModal } from "./AddonSecurityReviewModal";
import { AddonSettingsModal } from "./AddonSettingsModal";
import { AddonsDialogHeader } from "./AddonsDialogHeader";
import { AddonsTabsHeader } from "./AddonsTabsHeader";
import { InstalledTabContent } from "./InstalledTabContent";
import { StoreTabContent, type StoreCategoryItem } from "./StoreTabContent";
import { UrlInstallModal } from "./UrlInstallModal";
import { Activity, Layers, Palette, Wrench, Zap } from "lucide-react";

export const AddonsModalDialogContent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    installedAddons,
    catalog,
    installAddon,
    installFromArchive,
    installFromBytes,
    fetchArchiveFromUrl,
    updateAddon,
    refreshCatalog,
    uninstallAddon,
    toggleAddon,
    isInstalled,
    isEnabled,
    isLoading,
    isRefreshingCatalog,
  } = useAddonStore();

  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [activeSettingsManifest, setActiveSettingsManifest] =
    useState<AddonManifest | null>(null);

  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);

  const [securityReview, setSecurityReview] = useState<{
    manifest: AddonManifest;
    file?: File;
    bytes?: number[];
  } | null>(null);

  const handleInstall = async (addon: AddonManifest) => {
    setInstallingId(addon.id);
    setUploadError(null);
    try {
      await installAddon(addon);
    } catch (e: any) {
      console.error("Install addon failed:", e);
      setUploadError(e?.message || String(e));
    } finally {
      setInstallingId(null);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    try {
      const buffer = await file.arrayBuffer();
      const bytes = Array.from(new Uint8Array(buffer));
      const diskInfo = await invoke<any>("inspect_addon_archive", {
        archiveBytes: bytes,
      });

      const manifest: AddonManifest = {
        id: diskInfo.id,
        name: diskInfo.name,
        version: diskInfo.version,
        description: diskInfo.description,
        author: diskInfo.author,
        category: (diskInfo.category as any) || "utility",
        icon: diskInfo.icon,
        sizeBytes: diskInfo.sizeBytes,
        permissions: (diskInfo.permissions as any[]) || [],
        tags: diskInfo.tags || [],
      };

      setSecurityReview({ manifest, file });
    } catch (err: any) {
      setUploadError(err?.toString() || "Failed to inspect addon zip archive");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlSubmit = async (url: string) => {
    setUploadError(null);
    setIsFetchingUrl(true);
    try {
      const { manifest, bytes } = await fetchArchiveFromUrl(url);
      setUrlModalOpen(false);
      setSecurityReview({ manifest, bytes });
    } catch (err: any) {
      setUploadError(
        err?.message || err?.toString() || t("addons.downloadError"),
      );
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const installedCount = Object.keys(installedAddons).length;
  const activeCount = Object.values(installedAddons).filter(
    (a) => a.enabled,
  ).length;

  const categories: StoreCategoryItem[] = [
    { id: "all", label: t("addons.categories.all"), icon: Layers },
    { id: "utility", label: t("addons.categories.utility"), icon: Wrench },
    {
      id: "integration",
      label: t("addons.categories.integration"),
      icon: Activity,
    },
    {
      id: "customization",
      label: t("addons.categories.customization"),
      icon: Palette,
    },
    {
      id: "performance",
      label: t("addons.categories.performance"),
      icon: Zap,
    },
  ];

  const filteredCatalog = catalog.filter((addon) => {
    const matchesSearch =
      addon.name.toLowerCase().includes(search.toLowerCase()) ||
      addon.description.toLowerCase().includes(search.toLowerCase()) ||
      (addon.tags &&
        addon.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        ));

    const matchesCategory =
      selectedCategory === "all" || addon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedList = Object.values(installedAddons).filter((item) => {
    const matchesSearch =
      item.manifest.name.toLowerCase().includes(search.toLowerCase()) ||
      item.manifest.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <DialogContent className="flex h-[550px] max-h-[86vh] flex-col overflow-hidden p-5 sm:max-w-[780px]">
      <AddonsDialogHeader
        onOpenUrl={() => setUrlModalOpen(true)}
        onOpenFile={() => fileInputRef.current?.click()}
        fileInputRef={fileInputRef}
        onFileSelect={handleFileSelect}
      />

      {uploadError && (
        <div className="bg-destructive/10 text-destructive border-destructive/20 mt-2 flex items-center justify-between rounded-lg border p-2.5 text-xs">
          <span>{uploadError}</span>
          <button
            onClick={() => setUploadError(null)}
            className="cursor-pointer font-bold"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
      )}

      <Tabs defaultValue="store" className="flex min-h-0 flex-1 flex-col pt-2">
        <AddonsTabsHeader
          catalogCount={catalog.length}
          activeCount={activeCount}
          installedCount={installedCount}
          search={search}
          onSearchChange={setSearch}
          onRefreshCatalog={() => refreshCatalog()}
          isRefreshingCatalog={isRefreshingCatalog}
        />

        <StoreTabContent
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          filteredCatalog={filteredCatalog}
          catalog={catalog}
          installedAddons={installedAddons}
          installingId={installingId}
          isLoading={isLoading}
          onInstall={handleInstall}
          onUpdate={updateAddon}
          onSettings={setActiveSettingsManifest}
          onUninstall={uninstallAddon}
          onToggle={toggleAddon}
          isInstalled={isInstalled}
          isEnabled={isEnabled}
        />

        <InstalledTabContent
          installedList={installedList}
          catalog={catalog}
          onUpdate={updateAddon}
          onSettings={setActiveSettingsManifest}
          onInstall={handleInstall}
          onUninstall={uninstallAddon}
          onToggle={toggleAddon}
        />
      </Tabs>

      <AddonSettingsModal
        manifest={activeSettingsManifest}
        open={!!activeSettingsManifest}
        onOpenChange={(openState) => {
          if (!openState) setActiveSettingsManifest(null);
        }}
      />

      <UrlInstallModal
        open={urlModalOpen}
        onOpenChange={setUrlModalOpen}
        onSubmit={handleUrlSubmit}
        isFetching={isFetchingUrl}
      />

      <AddonSecurityReviewModal
        manifest={securityReview?.manifest || null}
        archiveBytes={null}
        open={!!securityReview}
        onOpenChange={(openState) => {
          if (!openState) setSecurityReview(null);
        }}
        onConfirm={async () => {
          if (securityReview) {
            try {
              if (securityReview.bytes) {
                await installFromBytes(
                  securityReview.bytes,
                  securityReview.manifest,
                );
              } else if (securityReview.file) {
                await installFromArchive(securityReview.file);
              }
              setSecurityReview(null);
            } catch (err: any) {
              setUploadError(
                err?.message ||
                  err?.toString() ||
                  "Failed to install addon from archive",
              );
            }
          }
        }}
        isLoading={isLoading}
      />
    </DialogContent>
  );
};
