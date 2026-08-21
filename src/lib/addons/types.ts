import type React from "react";
import type { Profile, MinecraftVersion, LauncherState } from "@/state";

export type AddonCategory =
  "utility" | "integration" | "customization" | "performance";

export type AddonPermission =
  | "game:lifecycle"
  | "game:profiles"
  | "game:launch"
  | "fs:instances"
  | "ui:slots"
  | "ui:notifications"
  | "storage:local"
  | "network:fetch";

export type ConfigFieldType = "boolean" | "string" | "number" | "select";

export interface ConfigFieldBase {
  type: ConfigFieldType;
  label: string;
  description?: string;
}

export interface BooleanConfigField extends ConfigFieldBase {
  type: "boolean";
  default: boolean;
}

export interface StringConfigField extends ConfigFieldBase {
  type: "string";
  default: string;
  placeholder?: string;
}

export interface NumberConfigField extends ConfigFieldBase {
  type: "number";
  default: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectConfigField extends ConfigFieldBase {
  type: "select";
  default: string;
  options: { label: string; value: string }[] | string[];
}

export type ConfigField =
  | BooleanConfigField
  | StringConfigField
  | NumberConfigField
  | SelectConfigField;

export type ConfigSchema = Record<string, ConfigField>;

export type AddonTrustLevel = "official" | "community" | "custom";

export interface AddonManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  category: AddonCategory;
  icon?: string;
  sizeBytes: number;
  minLauncherVersion?: string;
  maxLauncherVersion?: string;
  permissions: AddonPermission[];
  tags?: string[];
  homepage?: string;
  downloadUrl?: string;
  checksum?: string;
  changelog?: string;
  dependencies?: Record<string, string>;
  configSchema?: ConfigSchema;
  verified?: boolean;
  trustLevel?: AddonTrustLevel;
}

export function getAddonTrustLevel(addon: {
  author?: string;
  verified?: boolean;
}): AddonTrustLevel {
  if (addon.verified) {
    if (
      addon.author === "Obsy Team" ||
      addon.author === "Obsy Design Studio" ||
      addon.author === "Obsy QA Team"
    ) {
      return "official";
    }
    return "community";
  }
  return "custom";
}

export type AddonSlotName =
  | "header.actions"
  | "dashboard.widgets"
  | "dashboard.side"
  | "settings.tabs"
  | "game.launch-controls"
  | "version.footer";

export interface SlotComponentProps {
  api: AddonApi;
  addonId: string;
}

export interface SlotItem {
  id: string;
  addonId: string;
  slotName: AddonSlotName;
  priority?: number;
  component: React.ComponentType<SlotComponentProps>;
}

export type EventCallback<T = unknown> = (payload: T) => void;

export interface LaunchContext {
  versionId: string;
  profileId: string;
  jvmArguments: string[];
  environment: Record<string, string>;
  gameDir?: string;
  abort?: (reason: string) => void;
}

export type BeforeLaunchHook = (context: LaunchContext) => void | Promise<void>;

export interface AddonGameContext {
  getSelectedProfile: () => Profile | null;
  getSelectedVersion: () => MinecraftVersion | null;
  getLauncherState: () => LauncherState | null;
  onBeforeLaunch: (hook: BeforeLaunchHook) => () => void;
}

export interface AddonUiContext {
  registerSlot: (
    slotName: AddonSlotName,
    componentId: string,
    component: React.ComponentType<SlotComponentProps>,
    priority?: number,
  ) => void;
  unregisterSlot: (componentId: string) => void;
  showToast: (message: string, type?: "info" | "success" | "error") => void;
}

export interface AddonEventsContext {
  on: <T = unknown>(
    eventName: string,
    callback: EventCallback<T>,
  ) => () => void;
  emit: <T = unknown>(eventName: string, payload?: T) => void;
}

export interface AddonStorageContext {
  get: <T = unknown>(key: string, defaultValue?: T) => T | undefined;
  set: <T = unknown>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export interface AddonLoggerContext {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

export interface AddonServicesContext {
  provide: <T = unknown>(serviceName: string, serviceInstance: T) => void;
  consume: <T = unknown>(serviceName: string) => T | undefined;
  has: (serviceName: string) => boolean;
}

export interface AddonApi {
  addonId: string;
  manifest: AddonManifest;
  game: AddonGameContext;
  ui: AddonUiContext;
  events: AddonEventsContext;
  storage: AddonStorageContext;
  logger: AddonLoggerContext;
  services: AddonServicesContext;
}

export interface ObsyAddon {
  manifest: AddonManifest;
  activate: (api: AddonApi) => void | Promise<void>;
  deactivate?: (api: AddonApi) => void | Promise<void>;
}

export interface InstalledAddon {
  manifest: AddonManifest;
  enabled: boolean;
  installedAt: number;
  instance?: ObsyAddon;
  failureCount?: number;
  hasUpdate?: boolean;
  latestVersion?: string;
}
