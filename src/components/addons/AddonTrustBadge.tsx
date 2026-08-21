import React from "react";
import { ShieldCheck, CheckCircle2, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getAddonTrustLevel, type AddonManifest } from "@/lib/addons/types";

export interface AddonTrustBadgeProps {
  addon: { id?: string; author?: string; verified?: boolean };
  catalog: AddonManifest[];
}

export const AddonTrustBadge: React.FC<AddonTrustBadgeProps> = ({
  addon,
  catalog,
}) => {
  const { t } = useTranslation();
  const catalogItem = catalog.find((c) => c.id === addon.id);
  const isVerified = addon.verified ?? catalogItem !== undefined;
  const level = getAddonTrustLevel({ ...addon, verified: isVerified });

  if (level === "official") {
    return (
      <span
        title={t("addons.trustLevels.official")}
        className="inline-flex items-center gap-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400"
      >
        <ShieldCheck className="h-3 w-3" />
        <span>{t("addons.trustBadge.official")}</span>
      </span>
    );
  }
  if (level === "community") {
    return (
      <span
        title={t("addons.trustLevels.community")}
        className="inline-flex items-center gap-0.5 rounded border border-sky-500/30 bg-sky-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-sky-400"
      >
        <CheckCircle2 className="h-3 w-3" />
        <span>{t("addons.trustBadge.community")}</span>
      </span>
    );
  }
  return (
    <span
      title={t("addons.trustLevels.custom")}
      className="inline-flex items-center gap-0.5 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-amber-400"
    >
      <ShieldAlert className="h-3 w-3" />
      <span>{t("addons.trustBadge.custom")}</span>
    </span>
  );
};
