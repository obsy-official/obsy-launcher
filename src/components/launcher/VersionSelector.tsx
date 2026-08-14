import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLauncherStore } from "@/state";
import {
  ChevronsUpDown,
  Cloud,
  FolderOpen,
  HardDrive,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { AnimatePresence, m } from "framer-motion";

export const VersionSelector = () => {
  const { state, versions, selectVersion, openVersionFolder, deleteInstance } =
    useLauncherStore();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  if (!state) return null;

  return (
    <div className="flex flex-col gap-2">
      <Label>{t("version.selectVersion")}</Label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="hover:border-primary/50 focus:ring-primary/20 flex-1 justify-between font-normal transition-colors duration-300"
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
                  <div className="flex items-center gap-2">
                    {v.isLocal ? (
                      <HardDrive className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Cloud className="text-muted-foreground h-4 w-4" />
                    )}
                    <span>
                      {v.id}{" "}
                      <span className="text-muted-foreground ml-1 text-xs capitalize">
                        ({v.type})
                      </span>
                    </span>
                  </div>
                );
              })()
            ) : (
              <span className="text-muted-foreground">
                {t("version.selectVersion")}
              </span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent
            className="w-[--anchor-width] p-0"
            align="start"
            side="bottom"
            collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
          >
            <Command>
              <CommandInput placeholder={t("version.searchVersion")} />
              <CommandList className="max-h-[calc(var(--available-height)-60px)]">
                <CommandEmpty>{t("version.noVersions")}</CommandEmpty>
                <CommandGroup>
                  {versions.map((v) => (
                    <CommandItem
                      key={v.id}
                      value={v.id}
                      onSelect={(currentValue) => {
                        selectVersion(currentValue);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                      data-checked={state.selectedVersionId === v.id}
                    >
                      <div className="flex items-center gap-2">
                        {v.isLocal ? (
                          <HardDrive className="text-muted-foreground h-4 w-4" />
                        ) : (
                          <Cloud className="text-muted-foreground h-4 w-4" />
                        )}
                        <span>
                          {v.id}{" "}
                          <span className="text-muted-foreground ml-1 text-xs capitalize">
                            ({v.type})
                          </span>
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <AnimatePresence>
          {state.selectedVersionId &&
            versions.find((v) => v.id === state.selectedVersionId)?.isLocal && (
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex gap-2"
              >
                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openVersionFolder(state.selectedVersionId!)}
                    title={t("version.openFolder")}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </m.div>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        title={t("version.deleteInstance")}
                        className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                      />
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("version.deleteInstance")}</DialogTitle>
                      <DialogDescription>
                        {t("version.confirmDelete")}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        {t("version.cancel")}
                      </DialogClose>
                      <DialogClose
                        render={
                          <Button
                            variant="destructive"
                            onClick={() =>
                              deleteInstance(state.selectedVersionId!)
                            }
                          />
                        }
                      >
                        {t("version.delete")}
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </m.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};
