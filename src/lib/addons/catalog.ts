import type { AddonManifest } from "./types";
import localCatalog from "../../../addons/catalog.json";

export const DEFAULT_REMOTE_REGISTRY_URL =
  "https://raw.githubusercontent.com/obsy-official/obsy-launcher/main/addons/catalog.json";

const CATALOG_STORAGE_KEY = "obsy:addons_catalog:v2";

export function getCachedCatalog(): AddonManifest[] {
  let list: AddonManifest[] = [];
  if (import.meta.env.DEV) {
    list = localCatalog as AddonManifest[];
  } else {
    try {
      const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed;
        }
      }
    } catch (e) {
      console.warn("[AddonCatalog] Failed to read cached catalog:", e);
    }
  }
  return list.map((item) => ({ ...item, verified: true }));
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
  if (import.meta.env.DEV) {
    return { addons: localCatalog as AddonManifest[], fromCache: false };
  }

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
        const verifiedAddons = remoteAddons.map((item) => ({
          ...item,
          verified: true,
        }));
        saveCachedCatalog(verifiedAddons);
        return { addons: verifiedAddons, fromCache: false };
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
