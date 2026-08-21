import React from "react";
import { FolderOpen, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
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
import { useLauncherStore } from "@/state";

export interface InstanceControlsProps {
  versionId: string;
}

export const InstanceControls: React.FC<InstanceControlsProps> = ({
  versionId,
}) => {
  const { t } = useTranslation();
  const { openVersionFolder, deleteInstance } = useLauncherStore();

  return (
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
          onClick={() => openVersionFolder(versionId)}
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
              variant="destructive"
              size="icon"
              title={t("version.deleteInstance")}
              className="hover:bg-destructive/90 transition-colors hover:shadow-md"
            />
          }
        >
          <Trash2 className="h-4 w-4" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("version.deleteInstance")}</DialogTitle>
            <DialogDescription>{t("version.confirmDelete")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              {t("common.cancel")}
            </DialogClose>
            <DialogClose
              render={
                <Button
                  variant="destructive"
                  onClick={() => deleteInstance(versionId)}
                />
              }
            >
              {t("version.delete")}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </m.div>
  );
};
