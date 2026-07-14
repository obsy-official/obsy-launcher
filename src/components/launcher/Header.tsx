import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLauncherStore, type Language } from "@/state";
import { SettingsDialog } from "./SettingsDialog";

export const Header = () => {
  const { state, updateState } = useLauncherStore();
  const { t } = useTranslation();

  const handleLanguageChange = (val: string | null) => {
    if (val && state) {
      updateState({ ...state, language: val as Language });
    }
  };

  return (
    <header
      data-tauri-drag-region
      className="border-border/50 bg-card/50 flex w-full cursor-default items-center justify-between border-b p-4 backdrop-blur-md select-none"
    >
      <h1
        data-tauri-drag-region
        className="text-primary pointer-events-none text-xl font-bold tracking-tight"
      >
        {t("app.title")}
      </h1>
      {state && (
        <div className="flex items-center gap-2">
          <SettingsDialog />

          <Select value={state.language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue>
                {(val: any) => (
                  <div className="flex items-center gap-2">
                    <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span>{val === "RUSSIAN" ? "Русский" : "English"}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENGLISH">English</SelectItem>
              <SelectItem value="RUSSIAN">Русский</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </header>
  );
};
