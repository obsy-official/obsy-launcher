import { Terminal } from "lucide-react";
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

export const ConsoleDialog = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<LogEntry[]>(globalLogs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeLogs((newLogs) => {
      setLogs(newLogs);
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="ghost" size="icon" className="h-9 w-9" />}
      >
        <Terminal className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="border-border bg-background max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("console.title")}</DialogTitle>
        </DialogHeader>
        <div
          ref={scrollRef}
          className="h-[60vh] min-h-[300px] overflow-y-auto rounded-md bg-black/90 p-4 font-mono text-xs break-words text-green-400 select-text"
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
