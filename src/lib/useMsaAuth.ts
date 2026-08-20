import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { type Profile, useLauncherStore } from "@/state";

export interface MsaDeviceCode {
  device_code: string;
  user_code: string;
  verification_uri: string;
  interval: number;
  expires_in: number;
}

export function useMsaAuth(onSuccess?: (profile: Profile) => void) {
  const { fetchProfiles, selectProfile } = useLauncherStore();
  const [msaData, setMsaData] = useState<MsaDeviceCode | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string>("");

  const startAuth = async () => {
    try {
      setError("");
      setMsaData(null);
      const data = await invoke<MsaDeviceCode>("start_msa_auth");
      setMsaData(data);
      setIsPolling(true);

      const newProfile = await invoke<Profile>("poll_msa_auth", {
        deviceCode: data.device_code,
        interval: data.interval,
      });

      await fetchProfiles();
      if (newProfile?.id) {
        await selectProfile(newProfile.id);
        onSuccess?.(newProfile);
      }

      setMsaData(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsPolling(false);
    }
  };

  const reset = () => {
    setMsaData(null);
    setIsPolling(false);
    setError("");
  };

  return {
    msaData,
    isPolling,
    error,
    startAuth,
    reset,
  };
}
