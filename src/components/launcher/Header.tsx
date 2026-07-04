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

  const handleLanguageChange = (val: string) => {
    if (state) {
      updateState({ ...state, language: val as Language });
    }
  };

  return (
    <header
      data-tauri-drag-region
      className="w-full flex items-center justify-between p-4 border-b border-border/50 bg-card/50 backdrop-blur-md select-none cursor-default"
    >
      <h1
        data-tauri-drag-region
        className="text-xl font-bold tracking-tight text-primary pointer-events-none"
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
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
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
