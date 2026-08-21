import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";
import { fetchRemoteCatalog, getCachedCatalog } from "./catalog";
import { addonRegistry } from "./registry";
import { loadAddonFromDisk, removeAddonStyle } from "./loader";
import type { AddonManifest, InstalledAddon } from "./types";

interface StoredAddonState {
  id: string;
  enabled: boolean;
  installedAt: number;
}

interface AddonDiskInfo {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  category: string;
  icon?: string;
  sizeBytes: number;
  minLauncherVersion?: string;
  permissions: string[];
  tags: string[];
  hasJs: boolean;
  hasCss: boolean;
  checksum?: string;
  verified?: boolean;
}

const STORAGE_KEY = "obsy:installed_addons:v3";

interface AddonStateStore {
  installedAddons: Record<string, InstalledAddon>;
  catalog: AddonManifest[];
  isInitialized: boolean;
  isLoading: boolean;
  isRefreshingCatalog: boolean;
  catalogFromCache: boolean;

  initAddons: () => Promise<void>;
  refreshCatalog: (registryUrl?: string) => Promise<void>;
  fetchArchiveFromUrl: (
    url: string,
  ) => Promise<{ manifest: AddonManifest; bytes: number[] }>;
  installFromBytes: (
    bytes: number[],
    customManifest?: AddonManifest,
  ) => Promise<void>;
  installAddon: (manifest: AddonManifest) => Promise<void>;
  installFromArchive: (file: File) => Promise<void>;
  updateAddon: (id: string) => Promise<void>;
  uninstallAddon: (id: string) => Promise<void>;
  toggleAddon: (id: string, enabled: boolean) => Promise<void>;
  isInstalled: (id: string) => boolean;
  isEnabled: (id: string) => boolean;
}

function loadStoredConfig(): StoredAddonState[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveStoredConfig(addons: Record<string, InstalledAddon>) {
  try {
    const serialized: StoredAddonState[] = Object.values(addons).map(
      (item) => ({
        id: item.manifest.id,
        enabled: item.enabled,
        installedAt: item.installedAt,
      }),
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (e) {
    console.error("Failed to save installed addons configuration:", e);
  }
}

function applyUpdateFlags(
  installed: Record<string, InstalledAddon>,
  catalog: AddonManifest[],
): Record<string, InstalledAddon> {
  const updated: Record<string, InstalledAddon> = {};
  const catalogMap = new Map(catalog.map((c) => [c.id, c]));

  for (const [id, item] of Object.entries(installed)) {
    const remote = catalogMap.get(id);
    if (remote && remote.version && remote.version !== item.manifest.version) {
      updated[id] = {
        ...item,
        hasUpdate: true,
        latestVersion: remote.version,
      };
    } else {
      updated[id] = {
        ...item,
        hasUpdate: false,
        latestVersion: undefined,
      };
    }
  }

  return updated;
}

export const useAddonStore = create<AddonStateStore>((set, get) => ({
  installedAddons: {},
  catalog: getCachedCatalog(),
  isInitialized: false,
  isLoading: false,
  isRefreshingCatalog: false,
  catalogFromCache: true,

  initAddons: async () => {
    if (get().isInitialized) return;

    const stored = loadStoredConfig();
    const storedMap = new Map(stored.map((s) => [s.id, s]));
    let installed: Record<string, InstalledAddon> = {};
    const activations: Promise<void>[] = [];

    try {
      const diskAddons = await invoke<AddonDiskInfo[]>(
        "get_installed_addons_from_disk",
      );

      const loaded = await Promise.all(
        diskAddons.map(async (diskAddon) => {
          const instance = await loadAddonFromDisk(diskAddon.id);
          return { diskAddon, instance };
        }),
      );

      for (const { diskAddon, instance } of loaded) {
        const isStored = storedMap.get(diskAddon.id);
        const enabled = isStored ? isStored.enabled : true;
        const catalogItem = get().catalog.find((c) => c.id === diskAddon.id);
        const isVerified =
          diskAddon.verified ??
          catalogItem?.verified ??
          catalogItem !== undefined;

        const manifest: AddonManifest = {
          id: diskAddon.id,
          name: diskAddon.name,
          version: diskAddon.version,
          description: diskAddon.description,
          author: diskAddon.author,
          category: (diskAddon.category as any) || "utility",
          icon: diskAddon.icon,
          sizeBytes: diskAddon.sizeBytes,
          permissions: (diskAddon.permissions as any[]) || [],
          tags: diskAddon.tags,
          checksum: diskAddon.checksum || catalogItem?.checksum,
          configSchema: catalogItem?.configSchema,
          verified: isVerified,
        };

        installed[diskAddon.id] = {
          manifest,
          enabled,
          installedAt: isStored?.installedAt || Date.now(),
          instance: instance || undefined,
        };

        if (enabled && instance) {
          activations.push(addonRegistry.activateAddon(instance));
        }
      }
    } catch (e) {
      console.warn("Could not read addons from disk:", e);
    }

    installed = applyUpdateFlags(installed, get().catalog);
    set({ installedAddons: installed, isInitialized: true });
    await Promise.all(activations);

    setTimeout(() => {
      get().refreshCatalog().catch(console.error);
    }, 500);
  },

  refreshCatalog: async (registryUrl?: string) => {
    set({ isRefreshingCatalog: true });
    try {
      const { addons, fromCache } = await fetchRemoteCatalog(registryUrl);
      const currentInstalled = get().installedAddons;
      const updatedInstalled = applyUpdateFlags(currentInstalled, addons);

      set({
        catalog: addons,
        catalogFromCache: fromCache,
        installedAddons: updatedInstalled,
      });
    } catch (err) {
      console.warn("[AddonStore] Failed to refresh catalog:", err);
    } finally {
      set({ isRefreshingCatalog: false });
    }
  },

  fetchArchiveFromUrl: async (url: string) => {
    set({ isLoading: true });
    try {
      let bytes: number[];

      // Try via Tauri native downloader first (handles CORS, redirects, streaming)
      try {
        bytes = await invoke<number[]>("download_addon_archive_bytes", {
          downloadUrl: url,
        });
      } catch {
        // Fallback to browser fetch
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch from URL: HTTP ${res.status}`);
        }
        const buf = await res.arrayBuffer();
        bytes = Array.from(new Uint8Array(buf));
      }

      const diskInfo = await invoke<AddonDiskInfo>("inspect_addon_archive", {
        archiveBytes: bytes,
      });

      const catalogItem = get().catalog.find((c) => c.id === diskInfo.id);
      const isVerified =
        diskInfo.verified ?? catalogItem?.verified ?? catalogItem !== undefined;

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
        checksum: diskInfo.checksum || catalogItem?.checksum,
        verified: isVerified,
      };

      return { manifest, bytes };
    } finally {
      set({ isLoading: false });
    }
  },

  installFromBytes: async (bytes: number[], customManifest?: AddonManifest) => {
    set({ isLoading: true });
    try {
      const diskInfo = await invoke<AddonDiskInfo>(
        "install_addon_from_archive_bytes",
        {
          archiveBytes: bytes,
          expectedChecksum: customManifest?.checksum,
        },
      );

      const catalogItem = get().catalog.find((c) => c.id === diskInfo.id);
      const isVerified =
        diskInfo.verified ??
        customManifest?.verified ??
        catalogItem?.verified ??
        catalogItem !== undefined;

      const manifest: AddonManifest = customManifest || {
        id: diskInfo.id,
        name: diskInfo.name,
        version: diskInfo.version,
        description: diskInfo.description,
        author: diskInfo.author,
        category: (diskInfo.category as any) || "utility",
        icon: diskInfo.icon,
        sizeBytes: diskInfo.sizeBytes,
        permissions: (diskInfo.permissions as any[]) || [],
        tags: diskInfo.tags,
        checksum: diskInfo.checksum || catalogItem?.checksum,
        verified: isVerified,
      };

      if (addonRegistry.isAddonActive(diskInfo.id)) {
        await addonRegistry.deactivateAddon(diskInfo.id);
      }

      const instance = await loadAddonFromDisk(diskInfo.id);

      const current = get().installedAddons;
      const updated: Record<string, InstalledAddon> = {
        ...current,
        [diskInfo.id]: {
          manifest,
          enabled: true,
          installedAt: Date.now(),
          instance: instance || undefined,
          hasUpdate: false,
        },
      };

      set({ installedAddons: updated });
      saveStoredConfig(updated);

      if (instance) {
        await addonRegistry.activateAddon(instance);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  installAddon: async (manifest: AddonManifest) => {
    set({ isLoading: true });
    try {
      if (manifest.downloadUrl) {
        let bytes: number[] | null = null;

        // Try Tauri native downloader
        try {
          bytes = await invoke<number[]>("download_addon_archive_bytes", {
            downloadUrl: manifest.downloadUrl,
          });
        } catch {
          const res = await fetch(manifest.downloadUrl);
          if (!res.ok) {
            throw new Error(`Failed to download addon: HTTP ${res.status}`);
          }
          const buf = await res.arrayBuffer();
          bytes = Array.from(new Uint8Array(buf));
        }

        await invoke<AddonDiskInfo>("install_addon_from_archive_bytes", {
          archiveBytes: bytes,
          expectedChecksum: manifest.checksum,
        });
      }

      if (addonRegistry.isAddonActive(manifest.id)) {
        await addonRegistry.deactivateAddon(manifest.id);
      }

      const instance = await loadAddonFromDisk(manifest.id);

      const current = get().installedAddons;
      const updated: Record<string, InstalledAddon> = {
        ...current,
        [manifest.id]: {
          manifest,
          enabled: true,
          installedAt: Date.now(),
          instance: instance || undefined,
          hasUpdate: false,
        },
      };

      set({ installedAddons: updated });
      saveStoredConfig(updated);

      if (instance) {
        await addonRegistry.activateAddon(instance);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  updateAddon: async (id: string) => {
    const catalogItem = get().catalog.find((c) => c.id === id);
    if (!catalogItem) return;
    await get().installAddon(catalogItem);
  },

  installFromArchive: async (file: File) => {
    set({ isLoading: true });
    try {
      const buffer = await file.arrayBuffer();
      const bytes = Array.from(new Uint8Array(buffer));
      await get().installFromBytes(bytes);
    } catch (err) {
      console.error("Failed to install addon from archive:", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  uninstallAddon: async (id: string) => {
    const current = { ...get().installedAddons };
    if (!current[id]) return;

    await addonRegistry.deactivateAddon(id);
    removeAddonStyle(id);

    try {
      await invoke("uninstall_addon_files", { addonId: id });
    } catch (e) {
      console.warn("Could not delete addon files from disk:", e);
    }

    delete current[id];

    set({ installedAddons: current });
    saveStoredConfig(current);
  },

  toggleAddon: async (id: string, enabled: boolean) => {
    const current = get().installedAddons;
    const item = current[id];
    if (!item) return;

    let instance = item.instance;
    if (enabled && !instance) {
      const loaded = await loadAddonFromDisk(id);
      if (loaded) instance = loaded;
    }

    const updated: Record<string, InstalledAddon> = {
      ...current,
      [id]: {
        ...item,
        enabled,
        instance,
      },
    };

    set({ installedAddons: updated });
    saveStoredConfig(updated);

    if (enabled && instance) {
      await addonRegistry.activateAddon(instance);
    } else {
      await addonRegistry.deactivateAddon(id);
      removeAddonStyle(id);
    }
  },

  isInstalled: (id: string) => {
    return !!get().installedAddons[id];
  },

  isEnabled: (id: string) => {
    return !!get().installedAddons[id]?.enabled;
  },
}));
