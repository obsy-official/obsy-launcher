import type { AddonManifest } from "./types";

export const DEFAULT_REMOTE_REGISTRY_URL =
  "https://raw.githubusercontent.com/obsy-official/obsy-launcher/main/addons/catalog.json";

const CATALOG_STORAGE_KEY = "obsy:addons_catalog:v2";

export function getCachedCatalog(): AddonManifest[] {
  try {
    const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("[AddonCatalog] Failed to read cached catalog:", e);
  }
  return [];
}

export function saveCachedCatalog(catalog: AddonManifest[]) {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
  } catch (e) {
    console.warn("[AddonCatalog] Failed to save catalog cache:", e);
  }
}

export async function fetchRemoteCatalog(
  registryUrl: string = DEFAULT_REMOTE_REGISTRY_URL,
): Promise<{ addons: AddonManifest[]; fromCache: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(registryUrl, {
      signal: controller.signal,
      cache: "no-cache",
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const remoteAddons: AddonManifest[] = Array.isArray(data)
        ? data
        : data.addons || [];

      if (remoteAddons.length > 0) {
        saveCachedCatalog(remoteAddons);
        return { addons: remoteAddons, fromCache: false };
      }
    }
  } catch (err) {
    console.warn(
      `[AddonCatalog] Remote catalog fetch failed from ${registryUrl}, using cache:`,
      err,
    );
  }

  return { addons: getCachedCatalog(), fromCache: true };
}

export function getAddonManifestById(
  id: string,
  catalog: AddonManifest[] = getCachedCatalog(),
): AddonManifest | undefined {
  return catalog.find((a) => a.id === id);
}
