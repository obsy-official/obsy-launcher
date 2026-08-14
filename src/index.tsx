import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="bg-background flex h-screen w-screen items-center justify-center" />
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>,
);
