"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { AdminSiteMediaBundle } from "@/lib/site-media/get-site-media-admin";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { OrderedGallerySection } from "./OrderedGallerySection";
import { ModelingMediaSection } from "./ModelingMediaSection";
import { ManufacturingIntelligenceSection } from "./ManufacturingIntelligenceSection";
import { PowerBannerCopySection } from "./PowerBannerCopySection";

type MediaManagerClientProps = {
  bundle: AdminSiteMediaBundle;
  powerBannerCopy: PowerBannerCopyBundle;
};

type MediaManagerTabKey =
  | "modeling"
  | "manufacturing-intelligence"
  | "finished-row-1"
  | "finished-row-2"
  | "power-banner-copy";

const MEDIA_MANAGER_TAB_KEYS: readonly MediaManagerTabKey[] = [
  "modeling",
  "manufacturing-intelligence",
  "finished-row-1",
  "finished-row-2",
  "power-banner-copy",
];

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
    : "modeling";

  const handleTabChange = (tab: MediaManagerTabKey) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("section", tab);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const tabs = useMemo(
    () => [
      { key: "modeling" as const, label: "Modeling Specialization" },
      { key: "manufacturing-intelligence" as const, label: "Manufacturing Intelligence" },
      { key: "finished-row-1" as const, label: "Finished Creations — top row" },
      { key: "finished-row-2" as const, label: "Finished Creations — bottom row" },
      { key: "power-banner-copy" as const, label: "Hero text" },
    ],
    [],
  );

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

      {selectedTab === "manufacturing-intelligence" ? (
        <ManufacturingIntelligenceSection rows={bundle.manufacturing} />
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

      {selectedTab === "power-banner-copy" ? <PowerBannerCopySection bundle={powerBannerCopy} /> : null}
    </div>
  );
}
