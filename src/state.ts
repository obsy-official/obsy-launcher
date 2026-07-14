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
  fetchState: () => Promise<void>;
  updateState: (newState: LauncherState) => Promise<void>;
  fetchProfiles: () => Promise<void>;
  addOfflineProfile: (username: string) => Promise<void>;
  selectProfile: (id: string) => Promise<void>;
  removeProfile: (id: string) => Promise<void>;
  fetchVersions: () => Promise<void>;
  selectVersion: (id: string) => Promise<void>;
  fetchWardrobe: () => Promise<void>;
  refreshProfileSkin: (profileId: string) => Promise<void>;
  addSkinToWardrobe: (
    fileBytes: number[],
    name: string,
    slim: boolean,
    profileId: string,
  ) => Promise<void>;
  removeSkinFromWardrobe: (id: string) => Promise<void>;
  applySkin: (profileId: string, skinId: string) => Promise<void>;
}

export const useLauncherStore = create<LauncherStore>((set, get) => ({
  state: null,
  profiles: [],
  versions: [],
  wardrobe: [],
  fetchState: async () => {
    try {
      const state = await invoke<LauncherState>("get_launcher_state");
      set({ state });
    } catch (error) {
      console.error("Failed to fetch launcher state:", error);
    }
  },
  updateState: async (newState) => {
    try {
      set({ state: newState });
      await invoke("update_launcher_state", { newState });
    } catch (error) {
      console.error("Failed to update launcher state:", error);
    }
  },
  fetchProfiles: async () => {
    try {
      const profiles = await invoke<Profile[]>("get_profiles");
      set({ profiles });
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  },
  addOfflineProfile: async (username: string) => {
    try {
      const profiles = await invoke<Profile[]>("add_offline_profile", {
        username,
      });
      set({ profiles });
      const newProfile = profiles.find((p) => p.username === username);
      if (newProfile) {
        await get().selectProfile(newProfile.id);
      }
    } catch (error) {
      console.error("Failed to add profile:", error);
    }
  },
  selectProfile: async (id: string) => {
    try {
      await invoke("select_profile", { id });
      const currentState = get().state;
      if (currentState) {
        set({ state: { ...currentState, selectedProfileId: id } });
      }
    } catch (error) {
      console.error("Failed to select profile:", error);
    }
  },
  removeProfile: async (id: string) => {
    try {
      const profiles = await invoke<Profile[]>("remove_profile", { id });
      set({ profiles });
      const currentState = get().state;
      if (currentState?.selectedProfileId === id) {
        set({ state: { ...currentState, selectedProfileId: null } });
      }
    } catch (error) {
      console.error("Failed to remove profile:", error);
    }
  },
  fetchVersions: async () => {
    try {
      const versions = await invoke<MinecraftVersion[]>("get_versions");
      set({ versions });
    } catch (error) {
      console.error("Failed to fetch versions:", error);
    }
  },
  selectVersion: async (id: string) => {
    try {
      await invoke("select_version", { id });
      const currentState = get().state;
      if (currentState) {
        set({ state: { ...currentState, selectedVersionId: id } });
      }
    } catch (error) {
      console.error("Failed to select version:", error);
    }
  },
  fetchWardrobe: async () => {
    try {
      const wardrobe = await invoke<WardrobeSkin[]>("get_wardrobe");
      set({ wardrobe });
    } catch (error) {
      console.error("Failed to fetch wardrobe:", error);
    }
  },
  refreshProfileSkin: async (profileId: string) => {
    try {
      await invoke("refresh_profile_skin", { profileId });
      await get().fetchProfiles();
    } catch (error) {
      console.error("Failed to refresh profile skin:", error);
    }
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
      console.error("Failed to add skin to wardrobe:", error);
      throw error;
    }
  },
  removeSkinFromWardrobe: async (id: string) => {
    try {
      await invoke("remove_skin_from_wardrobe", { id });
      await get().fetchWardrobe();
    } catch (error) {
      console.error("Failed to remove skin from wardrobe:", error);
    }
  },
  applySkin: async (profileId: string, skinId: string) => {
    try {
      await invoke("apply_skin", { profileId, skinId });
      await get().fetchProfiles(); // Refresh profiles to get the updated skin
    } catch (error) {
      console.error("Failed to apply skin:", error);
      throw error;
    }
  },
}));
