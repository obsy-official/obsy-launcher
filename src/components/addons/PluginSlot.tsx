import React from "react";
import { addonRegistry, useAddonSlots } from "@/lib/addons/registry";
import { PluginErrorBoundary } from "./PluginErrorBoundary";
import type { AddonSlotName } from "@/lib/addons/types";

interface PluginSlotProps {
  name: AddonSlotName;
  className?: string;
  wrapperClassName?: string;
}

export const PluginSlot: React.FC<PluginSlotProps> = ({
  name,
  className = "",
  wrapperClassName = "",
}) => {
  const slotItems = useAddonSlots(name);

  if (slotItems.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {slotItems.map((item) => {
        const Component = item.component;
        const api = addonRegistry.getActiveApi(item.addonId);
        if (!api) return null;

        return (
          <div key={item.id} className={wrapperClassName}>
            <PluginErrorBoundary addonId={item.addonId} slotName={name}>
              <Component api={api} addonId={item.addonId} />
            </PluginErrorBoundary>
          </div>
        );
      })}
    </div>
  );
};
