import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { useLauncherStore } from "./state";
import { Header } from "./components/launcher/Header";
import { ProfileSelector } from "./components/launcher/ProfileSelector";
import { VersionSelector } from "./components/launcher/VersionSelector";
import { LaunchButton } from "./components/launcher/LaunchButton";

const App = () => {
  const { state, fetchState, fetchProfiles, fetchVersions } =
    useLauncherStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    fetchState();
    fetchProfiles();
    fetchVersions();
  }, [fetchState, fetchProfiles, fetchVersions]);

  useEffect(() => {
    if (state?.language) {
      i18n.changeLanguage(state.language === "RUSSIAN" ? "ru" : "en");
    }
  }, [state?.language, i18n]);

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {state && (
          <div className="p-6 bg-card border border-border/50 rounded-xl shadow-lg flex flex-col gap-6 w-96 max-w-full backdrop-blur-sm">
            <ProfileSelector />
            <VersionSelector />
            <LaunchButton />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
