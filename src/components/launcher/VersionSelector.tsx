import { useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { AnimatePresence } from "framer-motion";
import { ChevronsUpDown, Clock, Cloud, HardDrive } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PluginSlot } from "@/components/addons/PluginSlot";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLauncherStore } from "@/state";
import { CreateInstanceModal } from "./CreateInstanceModal";
import { InstanceControls } from "./InstanceControls";

interface PlaytimeSummary {
  totalSeconds: number;
  formattedTotal: string;
  versions: Record<string, number>;
  formattedVersions: Record<string, string>;
}

export const VersionSelector = () => {
  const { state, versions, selectVersion } = useLauncherStore();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [playtimes, setPlaytimes] = useState<Record<string, string>>({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    invoke<PlaytimeSummary>("get_playtime_summary")
      .then((res) => {
        if (res && res.formattedVersions) {
          setPlaytimes(res.formattedVersions);
        }
      })
      .catch(() => {});
  }, [open, state?.selectedVersionId]);

  const localVersions = useMemo(
    () => versions.filter((v) => v.isLocal),
    [versions],
  );
  const releaseVersions = useMemo(
    () => versions.filter((v) => !v.isLocal && v.type === "release"),
    [versions],
  );
  const otherVersions = useMemo(
    () => versions.filter((v) => !v.isLocal && v.type !== "release"),
    [versions],
  );

  const availableMcVersions = useMemo(() => {
    const list = releaseVersions.map((v) => v.id);
    if (list.length === 0) {
      return [
        "1.21.4",
        "1.21.1",
        "1.20.4",
        "1.20.1",
        "1.19.2",
        "1.16.5",
        "1.12.2",
      ];
    }
    return list;
  }, [releaseVersions]);

  if (!state) return null;

  const selectedIsLocal =
    state.selectedVersionId &&
    versions.find((v) => v.id === state.selectedVersionId)?.isLocal;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <Label>{t("version.selectVersion")}</Label>
        {state.selectedVersionId && playtimes[state.selectedVersionId] && (
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Clock className="h-3 w-3" />
            <span>{playtimes[state.selectedVersionId]}</span>
          </span>
        )}
      </div>
      <div className="flex w-full items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="hover:border-primary/50 focus:ring-primary/20 w-full min-w-0 flex-1 justify-between font-normal transition-colors duration-300"
              />
            }
          >
            {state.selectedVersionId ? (
              (() => {
                const v = versions.find(
                  (v) => v.id === state.selectedVersionId,
                );
                if (!v) return <span>{state.selectedVersionId}</span>;
                return (
                  <div
                    className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left"
                    title={v.id}
                  >
                    {v.isLocal ? (
                      <HardDrive className="text-primary h-4 w-4 shrink-0" />
                    ) : (
                      <Cloud className="text-muted-foreground h-4 w-4 shrink-0" />
                    )}
                    <span className="truncate font-medium">{v.id}</span>
                  </div>
                );
              })()
            ) : (
              <span className="text-muted-foreground truncate">
                {t("version.selectVersion")}
              </span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput
                placeholder={t("version.searchPlaceholder")}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>{t("version.noVersionsFound")}</CommandEmpty>

                {localVersions.length > 0 && (
                  <CommandGroup heading={t("version.installed")}>
                    {localVersions.map((v) => (
                      <CommandItem
                        key={v.id}
                        value={v.id}
                        onSelect={async () => {
                          await selectVersion(v.id);
                          setOpen(false);
                        }}
                        data-checked={state.selectedVersionId === v.id}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <HardDrive className="text-primary h-4 w-4 shrink-0" />
                            <span className="truncate font-medium">{v.id}</span>
                          </div>
                          {playtimes[v.id] && (
                            <span className="text-muted-foreground flex items-center gap-1 font-mono text-[10px]">
                              <Clock className="h-2.5 w-2.5" />
                              <span>{playtimes[v.id]}</span>
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {releaseVersions.length > 0 && (
                  <CommandGroup heading={t("version.releases")}>
                    {releaseVersions.map((v) => (
                      <CommandItem
                        key={v.id}
                        value={v.id}
                        onSelect={async () => {
                          await selectVersion(v.id);
                          setOpen(false);
                        }}
                        data-checked={state.selectedVersionId === v.id}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <Cloud className="text-muted-foreground h-4 w-4 shrink-0" />
                            <span className="truncate">{v.id}</span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {otherVersions.length > 0 && (
                  <CommandGroup heading={t("version.snapshots")}>
                    {otherVersions.map((v) => (
                      <CommandItem
                        key={v.id}
                        value={v.id}
                        onSelect={async () => {
                          await selectVersion(v.id);
                          setOpen(false);
                        }}
                        data-checked={state.selectedVersionId === v.id}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <Cloud className="text-muted-foreground h-4 w-4 shrink-0" />
                            <span className="truncate">{v.id}</span>
                          </div>
                          <span className="text-muted-foreground text-xs capitalize">
                            {v.type}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
              <PluginSlot name="version.footer" />
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex gap-2">
          <CreateInstanceModal
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            availableMcVersions={availableMcVersions}
          />

          <AnimatePresence>
            {selectedIsLocal && (
              <InstanceControls versionId={state.selectedVersionId!} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
