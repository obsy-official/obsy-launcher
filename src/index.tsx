import React, { Suspense } from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Switch } from "./components/ui/switch";
import { Slider } from "./components/ui/slider";
import { Progress } from "./components/ui/progress";
import { Label } from "./components/ui/label";
import { useLauncherStore } from "./state";
import { useAddonStore } from "./lib/addons/addonStore";

// Expose React runtime and components to dynamically imported external addons
window.React = React;
window.ReactDOM = ReactDOM;
window.Obsy = {
  Button,
  useLauncherStore,
  useAddonStore,
  ui: {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Input,
    Switch,
    Slider,
    Progress,
    Label,
  },
};

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
