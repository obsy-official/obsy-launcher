import {
  Terminal,
  AlertTriangle,
  Wrench,
  FolderOpen,
  ExternalLink,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { globalLogs, subscribeLogs, type LogEntry } from "@/lib/logger";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

interface CrashAction {
  kind: string;
  label: string;
  arg: string;
  hint: string;
}

interface CrashDiag {
  hasCrashed: boolean;
  exitCode?: number;
  reason: string;
  tail: string;
  culprits: string[];
  actions: CrashAction[];
}

const getActionIcon = (kind: string) => {
  switch (kind) {
    case "set-ram":
    case "install-java":
      return <Cpu className="h-3.5 w-3.5" />;
    case "open-folder":
      return <FolderOpen className="h-3.5 w-3.5" />;
    case "open-url":
      return <ExternalLink className="h-3.5 w-3.5" />;
    default:
      return <Wrench className="h-3.5 w-3.5" />;
  }
};

export const ConsoleDialog = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<LogEntry[]>(globalLogs);
  const [diag, setDiag] = useState<CrashDiag | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeLogs((newLogs) => {
      setLogs(newLogs);
    });
  }, []);

  useEffect(() => {
    invoke<CrashDiag | null>("get_last_crash_diagnostics")
      .then((res) => {
        if (res && res.hasCrashed) {
          setDiag(res);
        }
      })
      .catch(() => {});

    const unlisten = listen<CrashDiag>(
      "minecraft-crash-diagnostic",
      (event) => {
        setDiag(event.payload);
      },
    );

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleApplyAction = async (action: CrashAction) => {
    try {
      setIsApplying(true);
      const res = await invoke<string>("apply_crash_action", {
        kind: action.kind,
        arg: action.arg,
      });
      setActionFeedback(
        res || t("crash.actionSuccess", { message: action.label }),
      );
    } catch (err: any) {
      setActionFeedback(err?.toString() || t("crash.actionFailed"));
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="relative h-9 w-9" />
        }
      >
        <Terminal className="h-4 w-4" />
        {diag && diag.hasCrashed && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="border-border bg-background max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between pr-4">
            <DialogTitle className="flex items-center gap-2">
              <Terminal className="text-primary h-4 w-4" />
              {t("console.title")}
            </DialogTitle>
          </div>
        </DialogHeader>

        {diag && diag.hasCrashed && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-red-300">
                  <span>{t("crash.detected")}</span>
                  {diag.exitCode !== undefined && (
                    <span className="rounded border border-red-800/40 bg-red-950/60 px-2 py-0.5 font-mono text-xs text-red-300">
                      Exit code: {diag.exitCode}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-red-200/90">
                  {diag.reason}
                </p>

                {actionFeedback && (
                  <div className="mt-2 flex items-center gap-1.5 rounded border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{actionFeedback}</span>
                  </div>
                )}

                {diag.actions && diag.actions.length > 0 && (
                  <div className="pt-2">
                    <div className="mb-1.5 text-[11px] font-medium tracking-wider text-red-300/80 uppercase">
                      {t("crash.quickFixes")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {diag.actions.map((act) => (
                        <Button
                          key={`${act.kind}-${act.label}`}
                          size="sm"
                          variant="secondary"
                          disabled={isApplying}
                          onClick={() => handleApplyAction(act)}
                          className="bg-background/80 hover:bg-background border-border h-7 gap-1.5 border text-xs"
                          title={act.hint}
                        >
                          {getActionIcon(act.kind)}
                          {act.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="border-border/40 h-[55vh] min-h-[280px] overflow-y-auto rounded-md border bg-black/90 p-4 font-mono text-xs break-words text-green-400 select-text"
        >
          {logs.map((log) => (
            <div key={log.id} className="mb-2">
              <span className="text-gray-500">[{log.timestamp}]</span>{" "}
              <span
                className={
                  log.type === "error"
                    ? "text-red-500"
                    : log.type === "warn"
                      ? "text-yellow-500"
                      : log.type === "info"
                        ? "text-blue-400"
                        : "text-gray-200"
                }
              >
                {log.message}
              </span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-500">{t("console.empty")}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
