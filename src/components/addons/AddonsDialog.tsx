import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { invoke } from "@tauri-apps/api/core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Boxes,
  Search,
  Download,
  Trash2,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Wrench,
  Palette,
  Upload,
  RefreshCw,
  Settings,
  ShieldAlert,
  Link2,
  ArrowUpCircle,
} from "lucide-react";
import { useAddonStore } from "@/lib/addons/addonStore";
import type { AddonManifest } from "@/lib/addons/types";
import { AddonSettingsModal } from "./AddonSettingsModal";
import { AddonSecurityReviewModal } from "./AddonSecurityReviewModal";

export const AddonsDialog: React.FC = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeSettingsManifest, setActiveSettingsManifest] =
    useState<AddonManifest | null>(null);

  // URL installation state
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);

  // Security Review modal state
  const [securityReview, setSecurityReview] = useState<{
    manifest: AddonManifest;
    file?: File;
    bytes?: number[];
  } | null>(null);

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

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setUploadError(null);
    setIsFetchingUrl(true);
    try {
      const { manifest, bytes } = await fetchArchiveFromUrl(urlInput.trim());
      setUrlModalOpen(false);
      setUrlInput("");
      setSecurityReview({ manifest, bytes });
    } catch (err: any) {
      setUploadError(
        err?.message ||
          err?.toString() ||
          t("addons.downloadError", "Не удалось загрузить аддон по ссылке"),
      );
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const installedCount = Object.keys(installedAddons).length;
  const activeCount = Object.values(installedAddons).filter(
    (a) => a.enabled,
  ).length;

  const categories: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "all", label: t("addons.categories.all"), icon: Layers },
    {
      id: "utility",
      label: t("addons.categories.utility"),
      icon: Wrench,
    },
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

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-border/40 bg-card/40 hover:border-primary/40 hover:bg-accent/40 flex h-9 cursor-pointer items-center gap-2 px-3 text-xs backdrop-blur-sm transition-all"
          />
        }
      >
        <Boxes className="text-primary h-4 w-4" />
        <span className="font-semibold">{t("addons.title", "Аддоны")}</span>
        {installedCount > 0 && (
          <span className="bg-primary/20 text-primary flex h-4 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold">
            {installedCount}
          </span>
        )}
      </DialogTrigger>

      <DialogContent className="flex h-[550px] max-h-[86vh] flex-col overflow-hidden p-5 sm:max-w-[780px]">
        <DialogHeader className="border-border/40 border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-primary/20 bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl border">
                <Boxes className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold">
                  {t("addons.title")}
                </DialogTitle>
                <p className="text-muted-foreground text-[11px]">
                  {t("addons.subtitle")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUrlModalOpen(true)}
                disabled={isLoading}
                className="border-border/60 hover:bg-accent/40 flex h-8 cursor-pointer items-center gap-1.5 text-xs"
                title={t("addons.installFromUrl", "Установить по ссылке")}
              >
                <Link2 className="h-3.5 w-3.5" />
                <span>{t("addons.installFromUrl", "По ссылке")}</span>
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="border-border/60 hover:bg-accent/40 flex h-8 cursor-pointer items-center gap-1.5 text-xs"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>{t("addons.installFromFile")}</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        {uploadError && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center justify-between rounded-lg border p-2.5 text-xs">
            <span>{uploadError}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadError(null)}
              className="h-5 px-1.5 text-[10px]"
            >
              ✕
            </Button>
          </div>
        )}

        <Tabs
          defaultValue="catalog"
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 py-2">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="catalog" className="cursor-pointer text-xs">
                {t("addons.tabs.store", "Каталог")}
              </TabsTrigger>
              <TabsTrigger value="installed" className="cursor-pointer text-xs">
                {t("addons.tabs.installed", "Установленные")}
                {installedCount > 0 && (
                  <span className="bg-primary/20 py-0.2 text-primary ml-1.5 rounded-full px-1.5 font-mono text-[10px]">
                    {activeCount}/{installedCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => refreshCatalog()}
                disabled={isRefreshingCatalog}
                className="border-border/60 hover:bg-accent/40 h-8 w-8 cursor-pointer"
                title={t("addons.refreshCatalog", "Обновить каталог из сети")}
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isRefreshingCatalog ? "text-primary animate-spin" : "text-muted-foreground"}`}
                />
              </Button>

              {/* Search Input */}
              <div className="relative w-60">
                <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
                <Input
                  placeholder={t("addons.search", "Поиск аддонов...")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* STORE TAB */}
          <TabsContent
            value="catalog"
            className="mt-0 flex flex-1 flex-col gap-3 overflow-hidden"
          >
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
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

            {/* Catalog List */}
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
              {filteredCatalog.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-16">
                  <Boxes className="h-10 w-10 opacity-30" />
                  <span className="text-sm font-medium">
                    {t("addons.notFound", "Ничего не найдено")}
                  </span>
                </div>
              ) : (
                filteredCatalog.map((addon) => {
                  const installed = isInstalled(addon.id);
                  const enabled = isEnabled(addon.id);
                  const installedItem = installedAddons[addon.id];
                  const hasUpdate = installedItem?.hasUpdate;

                  const isVerified =
                    addon.author === "Obsy Team" ||
                    addon.author === "Obsy Design Studio" ||
                    addon.author === "Obsy QA Team";

                  return (
                    <div
                      key={addon.id}
                      className="border-border/40 bg-card/60 hover:border-border/70 flex items-center justify-between gap-4 rounded-xl border p-3.5 backdrop-blur-sm transition-all"
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-3.5">
                        <div className="bg-primary/10 text-primary border-primary/20 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                          {addon.category === "integration" && (
                            <Activity className="h-5 w-5" />
                          )}
                          {addon.category === "utility" && (
                            <Wrench className="h-5 w-5" />
                          )}
                          {addon.category === "customization" && (
                            <Palette className="h-5 w-5" />
                          )}
                          {addon.category === "performance" && (
                            <Zap className="h-5 w-5" />
                          )}
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
                                {t("addons.updateAvailable", "Обновление")}
                              </span>
                            )}
                            <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                              • {addon.author}
                              {isVerified ? (
                                <span title={t("addons.verifiedAuthor")}>
                                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                </span>
                              ) : (
                                <span title={t("addons.thirdPartyAuthor")}>
                                  <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                                </span>
                              )}
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
                                onClick={() => updateAddon(addon.id)}
                                className="flex h-8 cursor-pointer items-center gap-1 bg-emerald-600 text-xs text-white shadow-sm hover:bg-emerald-500"
                              >
                                <ArrowUpCircle className="h-3.5 w-3.5" />
                                <span>{t("addons.update", "Обновить")}</span>
                              </Button>
                            )}

                            {addon.configSchema && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setActiveSettingsManifest(addon)}
                                className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                                title={t("addons.settings")}
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            )}

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => installAddon(addon)}
                              className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8 cursor-pointer"
                              title={t("addons.reinstall")}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => uninstallAddon(addon.id)}
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                              title={t("addons.uninstall")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <Switch
                              checked={enabled}
                              onCheckedChange={(checked) =>
                                toggleAddon(addon.id, checked)
                              }
                            />
                          </>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => installAddon(addon)}
                            className="flex h-8 cursor-pointer items-center gap-1.5 text-xs shadow-sm"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>{t("addons.install")}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>

          {/* INSTALLED TAB */}
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
                  const isVerified =
                    manifest.author === "Obsy Team" ||
                    manifest.author === "Obsy Design Studio" ||
                    manifest.author === "Obsy QA Team";

                  return (
                    <div
                      key={manifest.id}
                      className="border-border/40 bg-card/60 flex items-center justify-between gap-4 rounded-xl border p-3.5 backdrop-blur-sm"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${
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
                            <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                              • {manifest.author}
                              {isVerified && (
                                <span title={t("addons.verifiedAuthor")}>
                                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                </span>
                              )}
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
                            onClick={() => updateAddon(manifest.id)}
                            className="flex h-7 cursor-pointer items-center gap-1 bg-emerald-600 px-2 text-xs text-white shadow-sm hover:bg-emerald-500"
                          >
                            <ArrowUpCircle className="h-3.5 w-3.5" />
                            <span>{t("addons.update", "Обновить")}</span>
                          </Button>
                        )}

                        {manifest.configSchema && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setActiveSettingsManifest(manifest)}
                            className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                            title={t("addons.settings")}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const target = catalogItem || manifest;
                            installAddon(target);
                          }}
                          className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8 cursor-pointer"
                          title={t("addons.reinstall")}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => uninstallAddon(manifest.id)}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                          title={t("addons.uninstall")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) =>
                            toggleAddon(manifest.id, checked)
                          }
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Dynamic Addon Settings Modal */}
        <AddonSettingsModal
          manifest={activeSettingsManifest}
          open={!!activeSettingsManifest}
          onOpenChange={(open) => {
            if (!open) setActiveSettingsManifest(null);
          }}
        />

        {/* Direct URL Install Dialog */}
        <Dialog open={urlModalOpen} onOpenChange={setUrlModalOpen}>
          <DialogContent className="p-5 sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Link2 className="text-primary h-4 w-4" />
                {t("addons.urlDialogTitle", "Установка аддона по ссылке")}
              </DialogTitle>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {t(
                  "addons.urlDialogDesc",
                  "Введите прямую ссылку на .zip архив аддона (например, с GitHub Releases):",
                )}
              </p>
            </DialogHeader>

            <form onSubmit={handleUrlSubmit} className="space-y-4 pt-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={t(
                  "addons.urlInputPlaceholder",
                  "https://example.com/addon.zip",
                )}
                className="text-xs"
                autoFocus
              />

              <div className="flex justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setUrlModalOpen(false)}
                  disabled={isFetchingUrl}
                  className="cursor-pointer text-xs"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!urlInput.trim() || isFetchingUrl}
                  className="flex cursor-pointer items-center gap-1.5 text-xs"
                >
                  {isFetchingUrl ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>
                        {t("addons.downloadingFromUrl", "Загрузка...")}
                      </span>
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      <span>{t("addons.install", "Загрузить")}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Security Review & Permissions Confirmation Modal */}
        <AddonSecurityReviewModal
          manifest={securityReview?.manifest || null}
          archiveBytes={null}
          open={!!securityReview}
          onOpenChange={(open) => {
            if (!open) setSecurityReview(null);
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
    </Dialog>
  );
};
