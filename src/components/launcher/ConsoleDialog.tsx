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

interface LogEntry {
  type: "log" | "error" | "warn" | "info";
  message: string;
  timestamp: string;
}

const globalLogs: LogEntry[] = [];
let listeners: ((logs: LogEntry[]) => void)[] = [];

const notifyListeners = () => {
  listeners.forEach((l) => l([...globalLogs]));
};

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;
const originalInfo = console.info;

export const addGameLog = (type: LogEntry["type"], message: string) => {
  globalLogs.push({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
  if (globalLogs.length > 1000) globalLogs.shift();
  notifyListeners();

  if (import.meta.env.DEV) {
    if (type === "error") originalError(message);
    else if (type === "warn") originalWarn(message);
    else if (type === "info") originalInfo(message);
    else originalLog(message);
  }
};

const intercept = (type: LogEntry["type"], originalFn: any, ...args: any[]) => {
  originalFn(...args);
  if (!import.meta.env.DEV) return;
  const message = args
    .map((a) => {
      if (a instanceof Error) return a.stack || a.message;
      if (typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch (e) {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");

  globalLogs.push({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
  if (globalLogs.length > 1000) globalLogs.shift();
  notifyListeners();
};

console.log = (...args) => intercept("log", originalLog, ...args);
console.error = (...args) => intercept("error", originalError, ...args);
console.warn = (...args) => intercept("warn", originalWarn, ...args);
console.info = (...args) => intercept("info", originalInfo, ...args);

// Capture uncaught errors and promise rejections
window.addEventListener("error", (event) => {
  console.error("[Uncaught Error]", event.message, event.error);
});
window.addEventListener("unhandledrejection", (event) => {
  console.error("[Unhandled Rejection]", event.reason);
});

export const ConsoleDialog = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<LogEntry[]>(globalLogs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (newLogs: LogEntry[]) => {
      setLogs(newLogs);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
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
          {logs.map((log, i) => (
            <div key={i} className="mb-2">
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
