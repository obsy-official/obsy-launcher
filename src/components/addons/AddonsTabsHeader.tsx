import React from "react";
import { RefreshCw, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AddonsTabsHeaderProps {
  catalogCount: number;
  activeCount: number;
  installedCount: number;
  search: string;
  onSearchChange: (val: string) => void;
  onRefreshCatalog: () => void;
  isRefreshingCatalog: boolean;
}

export const AddonsTabsHeader: React.FC<AddonsTabsHeaderProps> = ({
  catalogCount,
  activeCount,
  installedCount,
  search,
  onSearchChange,
  onRefreshCatalog,
  isRefreshingCatalog,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-4 pb-3">
      <TabsList className="bg-muted/60 h-8.5 p-0.5">
        <TabsTrigger
          value="store"
          className="data-[state=active]:bg-background cursor-pointer px-3 text-xs"
        >
          {t("addons.tabs.store")}
          <span className="text-muted-foreground ml-1.5 font-mono text-[10px]">
            ({catalogCount})
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="installed"
          className="data-[state=active]:bg-background cursor-pointer px-3 text-xs"
        >
          {t("addons.tabs.installed")}
          <span className="text-muted-foreground ml-1.5 font-mono text-[10px]">
            ({activeCount}/{installedCount})
          </span>
        </TabsTrigger>
      </TabsList>

      <div className="flex flex-1 items-center justify-end gap-2">
        <div className="relative w-56">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-3.5 w-3.5" />
          <Input
            placeholder={t("addons.search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8.5 pl-8 text-xs"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onRefreshCatalog}
          disabled={isRefreshingCatalog}
          className="h-8.5 w-8.5 cursor-pointer"
          title={t("addons.refreshCatalog")}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isRefreshingCatalog ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
};
