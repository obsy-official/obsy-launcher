export interface LogEntry {
  id: string;
  type: "log" | "error" | "warn" | "info";
  message: string;
  timestamp: string;
}

export const globalLogs: LogEntry[] = [];
let listeners: ((logs: LogEntry[]) => void)[] = [];

let counter = 0;
const nextId = () => `${Date.now()}-${++counter}`;

export const notifyListeners = () => {
  listeners.forEach((l) => l([...globalLogs]));
};

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;
const originalInfo = console.info;

export const addGameLog = (type: LogEntry["type"], message: string) => {
  globalLogs.push({
    id: nextId(),
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

const intercept = (
  type: LogEntry["type"],
  originalFn: (...args: unknown[]) => void,
  ...args: unknown[]
) => {
  originalFn(...args);
  if (!import.meta.env.DEV) return;
  const message = args
    .map((a) => {
      if (a instanceof Error) return a.stack || a.message;
      if (typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");

  globalLogs.push({
    id: nextId(),
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

export const subscribeLogs = (listener: (logs: LogEntry[]) => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
