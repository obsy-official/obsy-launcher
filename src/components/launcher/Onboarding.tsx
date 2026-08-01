import { Button } from "@/components/ui/button";
import { useLauncherStore } from "@/state";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  UserCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProfileSelector } from "./ProfileSelector";

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const { profiles } = useLauncherStore();

  useEffect(() => {
    const playStartupSound = () => {
      try {
        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const playNote = (
          freq: number,
          startTime: number,
          duration: number,
          volume: number = 0.08,
        ) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

          gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
          gain.gain.linearRampToValueAtTime(
            volume,
            ctx.currentTime + startTime + 1.0,
          );
          gain.gain.setTargetAtTime(0, ctx.currentTime + startTime + 1.0, 1.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + startTime);
          osc.stop(ctx.currentTime + startTime + duration);
        };

        const baseVol = 0.08;
        playNote(261.63, 0, 6.0, baseVol); // C4 (Base)
        playNote(392.0, 0.2, 6.0, baseVol * 0.8); // G4
        playNote(493.88, 0.4, 6.0, baseVol * 0.7); // B4
        playNote(587.33, 0.6, 6.0, baseVol * 0.6); // D5
        playNote(783.99, 0.8, 6.0, baseVol * 0.4); // G5 (Shimmer)
      } catch (e) {
        console.error("Audio play failed", e);
      }
    };

    playStartupSound();
  }, []);
  const handleNext = () => setStep((s) => s + 1);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", bounce: 0.3 },
    },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-border/50 bg-card flex max-w-md flex-col items-center justify-center gap-6 rounded-2xl border p-10 text-center shadow-2xl"
          >
            <div className="bg-primary/10 text-primary flex h-24 w-24 items-center justify-center rounded-full">
              <Gamepad2 className="h-12 w-12" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                {t("onboarding.welcome")}
              </h1>
              <p className="text-muted-foreground">
                {t("onboarding.description")}
              </p>
            </div>
            <Button
              size="lg"
              className="mt-4 w-full cursor-pointer"
              onClick={handleNext}
            >
              {t("onboarding.getStarted")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-border/50 bg-card flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl border p-10 shadow-2xl"
          >
            <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full">
              <UserCircle2 className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold">
                {t("onboarding.profilesTitle")}
              </h2>
              <p className="text-muted-foreground text-sm">
                {t("onboarding.profilesDesc")}
              </p>
            </div>
            <div className="border-border/50 bg-background w-full rounded-xl border p-4 shadow-inner">
              <ProfileSelector />
            </div>
            <Button
              size="lg"
              className="mt-4 w-full cursor-pointer"
              variant={profiles.length > 0 ? "default" : "secondary"}
              onClick={handleNext}
            >
              {t("onboarding.continue")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-border/50 bg-card flex max-w-md flex-col items-center justify-center gap-6 rounded-2xl border p-10 text-center shadow-2xl"
          >
            <div className="bg-primary/10 text-primary flex h-24 w-24 items-center justify-center rounded-full">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div>
              <h2 className="mb-2 text-3xl font-bold">
                {t("onboarding.readyTitle")}
              </h2>
              <p className="text-muted-foreground">
                {t("onboarding.readyDesc")}
              </p>
            </div>
            <Button
              size="lg"
              className="mt-4 w-full cursor-pointer"
              onClick={onComplete}
            >
              {t("onboarding.finish")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
