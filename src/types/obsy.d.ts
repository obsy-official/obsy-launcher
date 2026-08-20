import type React from "react";
import type { useLauncherStore } from "@/state";
import type { useAddonStore } from "@/lib/addons/addonStore";
import type { Button } from "@/components/ui/button";
import type {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import type { Input } from "@/components/ui/input";
import type { Switch } from "@/components/ui/switch";
import type { Slider } from "@/components/ui/slider";
import type { Progress } from "@/components/ui/progress";
import type { Label } from "@/components/ui/label";

export interface ObsyUIComponents {
  Button: typeof Button;
  Dialog: typeof Dialog;
  DialogContent: typeof DialogContent;
  DialogHeader: typeof DialogHeader;
  DialogTitle: typeof DialogTitle;
  DialogTrigger: typeof DialogTrigger;
  Select: typeof Select;
  SelectContent: typeof SelectContent;
  SelectItem: typeof SelectItem;
  SelectTrigger: typeof SelectTrigger;
  SelectValue: typeof SelectValue;
  Tabs: typeof Tabs;
  TabsList: typeof TabsList;
  TabsTrigger: typeof TabsTrigger;
  TabsContent: typeof TabsContent;
  Input: typeof Input;
  Switch: typeof Switch;
  Slider: typeof Slider;
  Progress: typeof Progress;
  Label: typeof Label;
}

export interface ObsyRuntimeSDK {
  Button: typeof Button;
  useLauncherStore: typeof useLauncherStore;
  useAddonStore: typeof useAddonStore;
  ui: ObsyUIComponents;
}

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof import("react-dom");
    Obsy: ObsyRuntimeSDK;
  }
}
