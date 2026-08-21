import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";

export type Language = "ENGLISH" | "RUSSIAN";
export type Theme = "LIGHT" | "DARK";

export interface LauncherState {
  scale: number;
  language: Language;
  theme: Theme;
  memoryAmount: number;
  autoMemory: boolean;
  screenWidth: number;
  screenHeight: number;
  fullscreen: boolean;
  jvmArguments: string;
  javaPath: string | null;
  closeAfterLaunch: boolean;
  releaseFilter: boolean;
  moddedFilter: boolean;
  snapshotFilter: boolean;
  legacyFilter: boolean;
  selectedProfileId: string | null;
  selectedVersionId: string | null;
}

export interface MinecraftVersion {
  id: string;
  type: string;
  isLocal: boolean;
  releaseTime: string | null;
}

export interface Profile {
  id: string;
  username: string;
  microsoft: boolean;
  skinPng: string | null;
  slim: boolean;
}

export interface MinecraftCape {
  id: string;
  state: string;
  url: string;
  alias?: string | null;
  base64?: string | null;
}

export interface WardrobeSkin {
  id: string;
  name: string;
  base64Data: string;
  slim: boolean;
  profileId: string | null;
}

interface LauncherStore {
  state: LauncherState | null;
  profiles: Profile[];
  versions: MinecraftVersion[];
  wardrobe: WardrobeSkin[];
  startupTimeMs: number | null;
  appMemoryMb: number | null;
  fetchStartupTime: () => Promise<void>;
  fetchAppMemory: () => Promise<void>;
  fetchState: () => Promise<void>;
  updateState: (newState: LauncherState) => Promise<void>;
  fetchProfiles: () => Promise<void>;
  addOfflineProfile: (username: string) => Promise<void>;
  selectProfile: (id: string) => Promise<void>;
  removeProfile: (id: string) => Promise<void>;
  fetchVersions: () => Promise<void>;
  selectVersion: (id: string) => Promise<void>;
  openVersionFolder: (versionId: string) => Promise<void>;
  deleteInstance: (versionId: string) => Promise<void>;
  fetchWardrobe: () => Promise<void>;
  refreshProfileSkin: (profileId: string) => Promise<void>;
  refreshProfileToken: (profileId: string) => Promise<void>;
  addSkinToWardrobe: (
    fileBytes: number[],
    name: string,
    slim: boolean,
    profileId: string,
  ) => Promise<void>;
  removeSkinFromWardrobe: (id: string) => Promise<void>;
  applySkin: (profileId: string, skinId: string) => Promise<void>;
  getAccountCapes: (profileId: string) => Promise<MinecraftCape[]>;
  setActiveCape: (profileId: string, capeId: string | null) => Promise<void>;
}

/**
 * Safely invokes a Tauri backend command with centralized error logging.
 */
async function safeInvoke<T>(
  cmd: string,
  args?: Record<string, unknown>,
  fallback?: T,
): Promise<T | undefined> {
  try {
    return await invoke<T>(cmd, args);
  } catch (error) {
    console.error(`[Obsy State] Error in "${cmd}":`, error);
    return fallback;
  }
}

export const useLauncherStore = create<LauncherStore>((set, get) => ({
  state: null,
  profiles: [],
  versions: [],
  wardrobe: [],
  startupTimeMs: null,
  appMemoryMb: null,

  fetchStartupTime: async () => {
    if (get().startupTimeMs !== null) return;
    const ms = await safeInvoke<number>(
      "get_startup_time",
      undefined,
      Math.round(performance.now()),
    );
    if (ms !== undefined && ms > 0) set({ startupTimeMs: ms });
  },

  fetchAppMemory: async () => {
    const mb = await safeInvoke<number>("get_app_memory_usage", undefined, 0);
    if (mb && mb > 0) set({ appMemoryMb: mb });
  },

  fetchState: async () => {
    const state = await safeInvoke<LauncherState>("get_launcher_state");
    if (state) set({ state });
  },

  updateState: async (newState) => {
    set({ state: newState });
    await safeInvoke("update_launcher_state", { newState });
  },

  fetchProfiles: async () => {
    const profiles = await safeInvoke<Profile[]>("get_profiles", undefined, []);
    if (profiles) set({ profiles });
  },

  addOfflineProfile: async (username: string) => {
    const profiles = await safeInvoke<Profile[]>("add_offline_profile", {
      username,
    });
    if (profiles) {
      set({ profiles });
      const newProfile = profiles.find((p) => p.username === username);
      if (newProfile) {
        await get().selectProfile(newProfile.id);
      }
    }
  },

  selectProfile: async (id: string) => {
    await safeInvoke("select_profile", { id });
    const currentState = get().state;
    if (currentState) {
      set({ state: { ...currentState, selectedProfileId: id } });
    }
  },

  removeProfile: async (id: string) => {
    const profiles = await safeInvoke<Profile[]>("remove_profile", { id });
    if (profiles) {
      set({ profiles });
      const currentState = get().state;
      if (currentState?.selectedProfileId === id) {
        set({ state: { ...currentState, selectedProfileId: null } });
      }
    }
  },

  fetchVersions: async () => {
    const versions = await safeInvoke<MinecraftVersion[]>(
      "get_versions",
      undefined,
      [],
    );
    if (versions) set({ versions });
  },

  selectVersion: async (id: string) => {
    await safeInvoke("select_version", { id });
    const currentState = get().state;
    if (currentState) {
      set({ state: { ...currentState, selectedVersionId: id } });
    }
  },

  openVersionFolder: async (versionId: string) => {
    await safeInvoke("open_version_folder", { versionId });
  },

  deleteInstance: async (versionId: string) => {
    await safeInvoke("delete_instance", { versionId });
    await get().fetchVersions();
    const currentState = get().state;
    if (currentState?.selectedVersionId === versionId) {
      set({ state: { ...currentState, selectedVersionId: null } });
    }
  },

  fetchWardrobe: async () => {
    const wardrobe = await safeInvoke<WardrobeSkin[]>(
      "get_wardrobe",
      undefined,
      [],
    );
    if (wardrobe) set({ wardrobe });
  },

  refreshProfileSkin: async (profileId: string) => {
    await safeInvoke("refresh_profile_skin", { profileId });
    await get().fetchProfiles();
  },

  refreshProfileToken: async (profileId: string) => {
    await safeInvoke("refresh_profile_token", { profileId });
    await get().fetchProfiles();
  },

  addSkinToWardrobe: async (
    fileBytes: number[],
    name: string,
    slim: boolean,
    profileId: string,
  ) => {
    try {
      await invoke("add_skin_to_wardrobe", {
        fileBytes,
        name,
        slim,
        profileId,
      });
      await get().fetchWardrobe();
    } catch (error) {
      console.error("[Obsy State] Failed to add skin to wardrobe:", error);
      throw error;
    }
  },

  removeSkinFromWardrobe: async (id: string) => {
    await safeInvoke("remove_skin_from_wardrobe", { id });
    await get().fetchWardrobe();
  },

  applySkin: async (profileId: string, skinId: string) => {
    try {
      await invoke("apply_skin", { profileId, skinId });
      await get().fetchProfiles();
    } catch (error) {
      console.error("[Obsy State] Failed to apply skin:", error);
      throw error;
    }
  },

  getAccountCapes: async (profileId: string) => {
    const capes = await safeInvoke<MinecraftCape[]>(
      "get_account_capes",
      { profileId },
      [],
    );
    return capes || [];
  },

  setActiveCape: async (profileId: string, capeId: string | null) => {
    try {
      await invoke("set_active_cape", { profileId, capeId });
    } catch (error) {
      console.error("[Obsy State] Failed to set active cape:", error);
      throw error;
    }
  },
}));
