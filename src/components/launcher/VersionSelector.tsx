import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLauncherStore } from "@/state";
import { Cloud, HardDrive, FolderOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

import { motion, AnimatePresence } from "framer-motion";

export const VersionSelector = () => {
  const { state, versions, selectVersion, openVersionFolder } =
    useLauncherStore();
  const { t } = useTranslation();

  if (!state) return null;

  return (
    <div className="flex flex-col gap-2">
      <Label>{t("version.selectVersion")}</Label>
      <div className="flex gap-2">
        <Select
          value={state.selectedVersionId ?? undefined}
          onValueChange={(val) => {
            if (val) selectVersion(val);
          }}
        >
          <SelectTrigger className="hover:border-primary/50 focus:ring-primary/20 w-full transition-all duration-300">
            <SelectValue placeholder={t("version.selectVersion")}>
              {(val: any) => {
                if (!val) return null;
                const v = versions.find((v) => v.id === val);
                if (!v) return <span>{val}</span>;
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
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {versions.length === 0 ? (
              <SelectItem value="none" disabled>
                {t("version.noVersions")}
              </SelectItem>
            ) : (
              versions.map((v) => (
                <SelectItem
                  key={v.id}
                  value={v.id}
                  className="hover:bg-accent transition-colors"
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
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <AnimatePresence>
          {state.selectedVersionId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openVersionFolder(state.selectedVersionId!)}
                  title={t("version.openFolder")}
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
