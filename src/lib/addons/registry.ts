import { useSyncExternalStore } from "react";
import { useLauncherStore } from "@/state";
import { addGameLog } from "@/lib/logger";
import type {
  AddonApi,
  AddonManifest,
  AddonPermission,
  AddonSlotName,
  BeforeLaunchHook,
  EventCallback,
  LaunchContext,
  ObsyAddon,
  SlotComponentProps,
  SlotItem,
} from "./types";

const EMPTY_SLOTS: SlotItem[] = [];

class AddonRegistry {
  private slots: Map<string, SlotItem> = new Map();
  private cachedSlots: Map<AddonSlotName, SlotItem[]> = new Map();
  private eventListeners: Map<string, Set<EventCallback>> = new Map();
  private activeAddons: Map<string, { addon: ObsyAddon; api: AddonApi }> =
    new Map();
  private listeners: Set<() => void> = new Set();

  // Inter-Addon Services Locator
  private services: Map<string, unknown> = new Map();

  // Launch Hooks
  private beforeLaunchHooks: Map<string, Set<BeforeLaunchHook>> = new Map();

  // Crash Tracking
  private crashCounts: Map<string, number> = new Map();

  private recomputeCache() {
    const newCache = new Map<AddonSlotName, SlotItem[]>();
    for (const item of this.slots.values()) {
      const existing = newCache.get(item.slotName) || [];
      existing.push(item);
      newCache.set(item.slotName, existing);
    }

    for (const list of newCache.values()) {
      list.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    }

    this.cachedSlots = newCache;
  }

  private notify() {
    this.recomputeCache();
    for (const listener of this.listeners) {
      listener();
    }
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSlots(slotName: AddonSlotName): SlotItem[] {
    return this.cachedSlots.get(slotName) || EMPTY_SLOTS;
  }

  public registerSlot(
    addonId: string,
    slotName: AddonSlotName,
    componentId: string,
    component: React.ComponentType<SlotComponentProps>,
    priority = 0,
  ) {
    const fullId = `${addonId}:${componentId}`;
    this.slots.set(fullId, {
      id: fullId,
      addonId,
      slotName,
      component,
      priority,
    });
    this.notify();
  }

  public unregisterSlot(addonId: string, componentId: string) {
    const fullId = `${addonId}:${componentId}`;
    if (this.slots.delete(fullId)) {
      this.notify();
    }
  }

  public unregisterAllSlotsForAddon(addonId: string) {
    let changed = false;
    for (const [key, item] of this.slots.entries()) {
      if (item.addonId === addonId) {
        this.slots.delete(key);
        changed = true;
      }
    }
    if (changed) {
      this.notify();
    }
  }

  // Crash Reporting & Safe Mode
  public reportAddonCrash(addonId: string, error: Error) {
    const current = (this.crashCounts.get(addonId) || 0) + 1;
    this.crashCounts.set(addonId, current);

    addGameLog(
      "error",
      `[Addon:${addonId}] Crash reported (${current}x): ${error.message}`,
    );

    if (current >= 3) {
      addGameLog(
        "error",
        `[Addon:${addonId}] Disabled automatically due to repeated crashes (Safe Mode)`,
      );
      this.deactivateAddon(addonId);
    }
  }

  public getCrashCount(addonId: string): number {
    return this.crashCounts.get(addonId) || 0;
  }

  // Launch Middleware Pipeline
  public registerBeforeLaunchHook(
    addonId: string,
    hook: BeforeLaunchHook,
  ): () => void {
    if (!this.beforeLaunchHooks.has(addonId)) {
      this.beforeLaunchHooks.set(addonId, new Set());
    }
    const hooks = this.beforeLaunchHooks.get(addonId)!;
    hooks.add(hook);

    return () => {
      hooks.delete(hook);
      if (hooks.size === 0) {
        this.beforeLaunchHooks.delete(addonId);
      }
    };
  }

  public async runBeforeLaunchHooks(context: LaunchContext): Promise<boolean> {
    let isAborted = false;
    let abortReason = "";
    let abortingAddon = "";

    context.abort = (reason: string) => {
      isAborted = true;
      abortReason = reason;
    };

    const allHooks: {
      addonId: string;
      hook: (ctx: LaunchContext) => Promise<void> | void;
    }[] = [];
    for (const [addonId, hooks] of this.beforeLaunchHooks.entries()) {
      for (const hook of hooks) {
        allHooks.push({ addonId, hook });
      }
    }

    await Promise.allSettled(
      allHooks.map(async ({ addonId, hook }) => {
        try {
          await hook(context);
          if (isAborted && !abortingAddon) {
            abortingAddon = addonId;
          }
        } catch (err) {
          console.error(
            `Error in beforeLaunch hook for addon '${addonId}':`,
            err,
          );
          addGameLog(
            "error",
            `[Addon:${addonId}] Error in onBeforeLaunch: ${err}`,
          );
        }
      }),
    );

    if (isAborted) {
      addGameLog(
        "error",
        `[LaunchAborted] Addon '${abortingAddon || "Unknown"}' stopped game launch: ${abortReason}`,
      );
      return false;
    }

    return true;
  }

  // Inter-Addon Services
  public provideService<T = unknown>(
    addonId: string,
    serviceName: string,
    serviceInstance: T,
  ) {
    const key = `${addonId}:${serviceName}`;
    this.services.set(key, serviceInstance);
    // Also provide short name if not occupied
    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, serviceInstance);
    }
  }

  public consumeService<T = unknown>(serviceName: string): T | undefined {
    return this.services.get(serviceName) as T | undefined;
  }

  public hasService(serviceName: string): boolean {
    return this.services.has(serviceName);
  }

  // Permission enforcement
  private assertPermission(
    manifest: AddonManifest,
    permission: AddonPermission,
    actionName: string,
  ) {
    if (!manifest.permissions || !manifest.permissions.includes(permission)) {
      const msg = `[Security] Addon '${manifest.name}' attempted unauthorized action '${actionName}' without permission '${permission}'`;
      addGameLog("error", msg);
      console.warn(msg);
      throw new Error(msg);
    }
  }

  // Events API
  public on<T = unknown>(
    eventName: string,
    callback: EventCallback<T>,
  ): () => void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    const set = this.eventListeners.get(eventName)!;
    set.add(callback as EventCallback);

    return () => {
      set.delete(callback as EventCallback);
      if (set.size === 0) {
        this.eventListeners.delete(eventName);
      }
    };
  }

  public emit<T = unknown>(eventName: string, payload?: T) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(payload);
        } catch (err) {
          console.error(`Error in event listener for ${eventName}:`, err);
        }
      }
    }
  }

  // Storage sandbox
  private createStorage(addonId: string) {
    const prefix = `obsy:addon:${addonId}:`;
    return {
      get: <T = unknown>(key: string, defaultValue?: T): T | undefined => {
        try {
          const raw = localStorage.getItem(`${prefix}${key}`);
          return raw !== null ? JSON.parse(raw) : defaultValue;
        } catch {
          return defaultValue;
        }
      },
      set: <T = unknown>(key: string, value: T): void => {
        try {
          localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
        } catch (e) {
          console.error(`Failed to write addon storage for ${addonId}:`, e);
        }
      },
      remove: (key: string): void => {
        localStorage.removeItem(`${prefix}${key}`);
      },
      clear: (): void => {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(prefix)) {
            keysToRemove.push(key);
          }
        }
        for (const k of keysToRemove) {
          localStorage.removeItem(k);
        }
      },
    };
  }

  // Build isolated AddonApi with permission enforcement
  public createApi(manifest: AddonManifest): AddonApi {
    const addonId = manifest.id;
    const storage = this.createStorage(addonId);

    return {
      addonId,
      manifest,
      game: {
        getSelectedProfile: () => {
          this.assertPermission(
            manifest,
            "game:profiles",
            "getSelectedProfile",
          );
          const state = useLauncherStore.getState();
          if (!state.state?.selectedProfileId) return null;
          const prof =
            state.profiles.find(
              (p) => p.id === state.state?.selectedProfileId,
            ) ?? null;
          if (!prof) return null;
          // Redact sensitive authentication tokens from addon API
          return {
            ...prof,
            access_token: undefined,
            refresh_token: undefined,
          };
        },
        getSelectedVersion: () => {
          this.assertPermission(
            manifest,
            "game:profiles",
            "getSelectedVersion",
          );
          const state = useLauncherStore.getState();
          if (!state.state?.selectedVersionId) return null;
          return (
            state.versions.find(
              (v) => v.id === state.state?.selectedVersionId,
            ) ?? null
          );
        },
        getLauncherState: () => {
          return useLauncherStore.getState().state;
        },
        onBeforeLaunch: (hook) => {
          this.assertPermission(manifest, "game:lifecycle", "onBeforeLaunch");
          return this.registerBeforeLaunchHook(addonId, hook);
        },
      },
      ui: {
        registerSlot: (slotName, componentId, component, priority) => {
          this.assertPermission(manifest, "ui:slots", "registerSlot");
          this.registerSlot(
            addonId,
            slotName,
            componentId,
            component,
            priority,
          );
        },
        unregisterSlot: (componentId) => {
          this.unregisterSlot(addonId, componentId);
        },
        showToast: (message, type = "info") => {
          addGameLog(
            type === "error" ? "error" : "info",
            `[Addon:${manifest.name}] ${message}`,
          );
        },
      },
      events: {
        on: (eventName, callback) => this.on(eventName, callback),
        emit: (eventName, payload) => this.emit(eventName, payload),
      },
      storage: {
        get: (key, def) => {
          this.assertPermission(manifest, "storage:local", "storage.get");
          return storage.get(key, def);
        },
        set: (key, val) => {
          this.assertPermission(manifest, "storage:local", "storage.set");
          storage.set(key, val);
        },
        remove: (key) => {
          this.assertPermission(manifest, "storage:local", "storage.remove");
          storage.remove(key);
        },
        clear: () => {
          this.assertPermission(manifest, "storage:local", "storage.clear");
          storage.clear();
        },
      },
      logger: {
        info: (msg: string) => addGameLog("info", `[${manifest.name}] ${msg}`),
        warn: (msg: string) =>
          addGameLog("info", `[${manifest.name} WARN] ${msg}`),
        error: (msg: string) =>
          addGameLog("error", `[${manifest.name} ERROR] ${msg}`),
      },
      services: {
        provide: (name, instance) =>
          this.provideService(addonId, name, instance),
        consume: (name) => this.consumeService(name),
        has: (name) => this.hasService(name),
      },
    };
  }

  // Lifecycle
  public async activateAddon(addon: ObsyAddon) {
    const addonId = addon.manifest.id;
    if (this.activeAddons.has(addonId)) {
      return;
    }

    const api = this.createApi(addon.manifest);
    try {
      await addon.activate(api);
      this.activeAddons.set(addonId, { addon, api });
      api.logger.info(`Activated v${addon.manifest.version}`);
    } catch (err) {
      console.error(`Failed to activate addon ${addonId}:`, err);
      api.logger.error(`Activation failed: ${err}`);
      this.reportAddonCrash(addonId, err as Error);
    }
  }

  public async deactivateAddon(addonId: string) {
    const active = this.activeAddons.get(addonId);
    if (!active) return;

    try {
      if (active.addon.deactivate) {
        await active.addon.deactivate(active.api);
      }
    } catch (err) {
      console.error(`Error during addon ${addonId} deactivation:`, err);
    } finally {
      this.unregisterAllSlotsForAddon(addonId);
      this.beforeLaunchHooks.delete(addonId);
      this.activeAddons.delete(addonId);
      active.api.logger.info(`Deactivated`);
    }
  }

  public isAddonActive(addonId: string): boolean {
    return this.activeAddons.has(addonId);
  }

  public getActiveApi(addonId: string): AddonApi | undefined {
    return this.activeAddons.get(addonId)?.api;
  }
}

export const addonRegistry = new AddonRegistry();

export function useAddonSlots(slotName: AddonSlotName): SlotItem[] {
  return useSyncExternalStore(
    addonRegistry.subscribe,
    () => addonRegistry.getSlots(slotName),
    () => addonRegistry.getSlots(slotName),
  );
}
