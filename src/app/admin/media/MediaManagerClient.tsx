"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { AdminSiteMediaBundle } from "@/lib/site-media/get-site-media-admin";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { OrderedGallerySection } from "./OrderedGallerySection";
import { ModelingMediaSection } from "./ModelingMediaSection";
import { ModelingTabletMediaSection } from "./ModelingTabletMediaSection";
import { ManufacturingIntelligenceSection } from "./ManufacturingIntelligenceSection";
import { PowerBannerCopySection } from "./PowerBannerCopySection";
import { FounderSectionEditor } from "./FounderSectionEditor";
import { EngineeringProcessSection } from "./EngineeringProcessSection";
import { FooterSocialLinksSection } from "./FooterSocialLinksSection";

type MediaManagerClientProps = {
  bundle: AdminSiteMediaBundle;
  powerBannerCopy: PowerBannerCopyBundle;
};

type MediaManagerTabKey =
  | "modeling"
  | "modeling-tablet"
  | "manufacturing-intelligence"
  | "manufacturing-intelligence-mobile"
  | "founder-desktop"
  | "founder-mobile"
  | "engineering-process"
  | "finished-row-1"
  | "finished-row-2"
  | "power-banner-desktop"
  | "power-banner-mobile"
  | "power-banner-tablet"
  | "footer-social-links";

const MEDIA_MANAGER_TABS: ReadonlyArray<{ key: MediaManagerTabKey; label: string }> = [
  { key: "power-banner-desktop", label: "Hero Banners — Desktop" },
  { key: "power-banner-mobile", label: "Hero Banners — Mobile" },
  { key: "power-banner-tablet", label: "Hero Banners — Tablet" },
  { key: "modeling", label: "Modeling Specialization" },
  {
    key: "modeling-tablet",
    label: "Modeling Specialization — Tablet",
  },
  { key: "manufacturing-intelligence", label: "Manufacturing Intelligence" },
  {
    key: "manufacturing-intelligence-mobile",
    label: "Manufacturing Intelligence — Mobile",
  },
  {
    key: "founder-desktop",
    label: "Founder & Lead CAD Engineer (Desktop)",
  },
  {
    key: "founder-mobile",
    label: "Founder & Lead CAD Engineer Mobile",
  },
  { key: "finished-row-1", label: "Finished Creations — top row" },
  { key: "finished-row-2", label: "Finished Creations — bottom row" },
  { key: "engineering-process", label: "Our Engineering Process" },
  { key: "footer-social-links", label: "Footer Social Links" },
];

const MEDIA_MANAGER_TAB_KEYS: readonly MediaManagerTabKey[] = MEDIA_MANAGER_TABS.map(
  (tab) => tab.key,
);

const DEFAULT_MEDIA_MANAGER_TAB: MediaManagerTabKey = MEDIA_MANAGER_TABS[0].key;

function isMediaManagerTabKey(value: string | null): value is MediaManagerTabKey {
  if (!value) return false;
  return MEDIA_MANAGER_TAB_KEYS.includes(value as MediaManagerTabKey);
}

export function MediaManagerClient({ bundle, powerBannerCopy }: MediaManagerClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modelingMeta = bundle.groupsMeta.find(
    (g) => g.key === SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
  );
  const tabFromUrl = searchParams.get("section");
  const selectedTab: MediaManagerTabKey = isMediaManagerTabKey(tabFromUrl)
    ? tabFromUrl
    : DEFAULT_MEDIA_MANAGER_TAB;

  const handleTabChange = (tab: MediaManagerTabKey) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("section", tab);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const tabs = useMemo(() => MEDIA_MANAGER_TABS, []);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Edit sections
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.key === selectedTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  tab.key === selectedTab
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {selectedTab === "modeling" ? (
        <ModelingMediaSection
          title={modelingMeta?.label ?? "Modeling Specialization"}
          description={
            modelingMeta?.description ??
            "Fixed slots for each Modeling Specialization card."
          }
          slots={bundle.modeling}
        />
      ) : null}

      {selectedTab === "modeling-tablet" ? (
        <ModelingTabletMediaSection
          title="Modeling Specialization — Tablet"
          description="Tablet-only images per slot. Tablet copy, offsets, and preview fonts are edited here. Use the main Modeling tab for desktop and mobile text only."
          slots={bundle.modeling}
        />
      ) : null}

      {selectedTab === "manufacturing-intelligence" ? (
        <ManufacturingIntelligenceSection rows={bundle.manufacturing} />
      ) : null}

      {selectedTab === "manufacturing-intelligence-mobile" ? (
        <ManufacturingIntelligenceSection rows={bundle.manufacturingMobile} variant="mobile" />
      ) : null}

      {selectedTab === "finished-row-1" ? (
        <OrderedGallerySection
          title="Finished Creations — top row"
          description="Large carousel images on the homepage. Order is the slide sequence visitors see."
          groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1}
          items={bundle.finishedRow1}
          rowContextLabel="Top row"
          recommendedSize="670 × 370 px"
        />
      ) : null}

      {selectedTab === "founder-desktop" ? (
        <FounderSectionEditor row={bundle.founderDesktop} variant="desktop" />
      ) : null}

      {selectedTab === "founder-mobile" ? (
        <FounderSectionEditor row={bundle.founderMobile} variant="mobile" />
      ) : null}

      {selectedTab === "engineering-process" ? (
        <EngineeringProcessSection rows={bundle.engineeringProcess} />
      ) : null}

      {selectedTab === "finished-row-2" ? (
        <OrderedGallerySection
          title="Finished Creations — bottom row"
          description="Smaller images paired with the top row by slide index."
          groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2}
          items={bundle.finishedRow2}
          rowContextLabel="Bottom row"
          recommendedSize="420 × 232 px"
        />
      ) : null}

      {selectedTab === "power-banner-desktop" ? (
        <PowerBannerCopySection bundle={powerBannerCopy} viewport="desktop" />
      ) : null}

      {selectedTab === "power-banner-mobile" ? (
        <PowerBannerCopySection bundle={powerBannerCopy} viewport="mobile" />
      ) : null}

      {selectedTab === "power-banner-tablet" ? (
        <PowerBannerCopySection bundle={powerBannerCopy} viewport="tablet" />
      ) : null}

      {selectedTab === "footer-social-links" ? (
        <FooterSocialLinksSection links={bundle.footerSocialLinks} />
      ) : null}
    </div>
  );
}
