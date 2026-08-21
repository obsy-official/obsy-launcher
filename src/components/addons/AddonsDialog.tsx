import React, { useState } from "react";
import { Boxes } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAddonStore } from "@/lib/addons/addonStore";
import { AddonsModalDialogContent } from "./AddonsModalDialogContent";

export const AddonsDialog: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const installedCount = Object.keys(
    useAddonStore((s) => s.installedAddons),
  ).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-border/40 bg-card/40 hover:border-primary/40 hover:bg-accent/40 flex h-9 cursor-pointer items-center gap-2 px-3 text-xs backdrop-blur-sm transition-colors"
          />
        }
      >
        <Boxes className="text-primary h-4 w-4" />
        <span className="font-semibold">{t("addons.title")}</span>
        {installedCount > 0 && (
          <span className="bg-primary/20 text-primary flex h-4 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold">
            {installedCount}
          </span>
        )}
      </DialogTrigger>

      <AddonsModalDialogContent />
    </Dialog>
  );
};
