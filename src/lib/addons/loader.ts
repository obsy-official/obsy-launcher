import { invoke } from "@tauri-apps/api/core";
import { addGameLog } from "@/lib/logger";
import type { ObsyAddon } from "./types";

export async function loadAddonFromDisk(
  addonId: string,
): Promise<ObsyAddon | null> {
  try {
    // 1. Read JavaScript bundle
    const jsCode = await invoke<string>("read_addon_file", {
      addonId,
      fileName: "index.js",
    });

    if (!jsCode) {
      const msg = `[AddonLoader] No JavaScript code found for addon '${addonId}'`;
      console.warn(msg);
      addGameLog("error", msg);
      return null;
    }

    // 2. Optional CSS injection
    try {
      const cssCode = await invoke<string>("read_addon_file", {
        addonId,
        fileName: "style.css",
      });

      if (cssCode) {
        injectAddonStyle(addonId, cssCode);
      }
    } catch {
      // CSS is optional
    }

    // 3. Try Data URI dynamic import
    try {
      const dataUri =
        "data:text/javascript;charset=utf-8," + encodeURIComponent(jsCode);
      const module = await import(/* @vite-ignore */ dataUri);
      const addonInstance: ObsyAddon = module.default || module;

      if (addonInstance && typeof addonInstance.activate === "function") {
        return addonInstance;
      }
    } catch (dataErr) {
      console.warn(
        `[AddonLoader] Data URI import failed for '${addonId}', trying Function fallback:`,
        dataErr,
      );
    }

    // 4. Try Blob URL dynamic import
    try {
      const blob = new Blob([jsCode], { type: "text/javascript" });
      const blobUrl = URL.createObjectURL(blob);
      try {
        const module = await import(/* @vite-ignore */ blobUrl);
        const addonInstance: ObsyAddon = module.default || module;

        if (addonInstance && typeof addonInstance.activate === "function") {
          return addonInstance;
        }
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    } catch (blobErr) {
      console.warn(
        `[AddonLoader] Blob import failed for '${addonId}', trying Function eval:`,
        blobErr,
      );
    }

    // 5. Universal Function Evaluation Fallback (bypasses all WebKit/Tauri Blob/MIME sandbox restrictions)
    try {
      let cleanCode = jsCode.trim();
      if (cleanCode.includes("export default")) {
        cleanCode = cleanCode.replace(/export\s+default\s+/, "return ");
      }

      const factory = new Function(cleanCode);
      const addonInstance = factory();

      if (
        addonInstance &&
        (typeof addonInstance.activate === "function" || addonInstance.manifest)
      ) {
        return addonInstance;
      }
    } catch (fnErr) {
      console.error(
        `[AddonLoader] Function evaluation failed for '${addonId}':`,
        fnErr,
      );
    }

    throw new Error(`Addon '${addonId}' does not export a valid ObsyAddon`);
  } catch (error: any) {
    const errorMsg = `[AddonLoader] Failed to load addon '${addonId}': ${error?.message || error}`;
    console.error(errorMsg, error);
    addGameLog("error", errorMsg);
    return null;
  }
}

export function injectAddonStyle(addonId: string, cssContent: string) {
  const styleId = `obsy-addon-style-${addonId}`;
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.dataset.addon = addonId;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = cssContent;
}

export function removeAddonStyle(addonId: string) {
  const styleId = `obsy-addon-style-${addonId}`;
  const styleEl = document.getElementById(styleId);
  if (styleEl) {
    styleEl.remove();
  }
}
