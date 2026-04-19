"use client";

import { useMemo, useState } from "react";

import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { AdminSiteMediaBundle } from "@/lib/site-media/get-site-media-admin";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { OrderedGallerySection } from "./OrderedGallerySection";
import { ModelingMediaSection } from "./ModelingMediaSection";
import { PowerBannerCopySection } from "./PowerBannerCopySection";

type MediaManagerClientProps = {
  bundle: AdminSiteMediaBundle;
  powerBannerCopy: PowerBannerCopyBundle;
};

type MediaManagerTabKey =
  | "modeling"
  | "finished-row-1"
  | "finished-row-2"
  | "power-banner-copy";

export function MediaManagerClient({ bundle, powerBannerCopy }: MediaManagerClientProps) {
  const modelingMeta = bundle.groupsMeta.find(
    (g) => g.key === SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
  );
  const [activeTab, setActiveTab] = useState<MediaManagerTabKey>("modeling");

  const tabs = useMemo(
    () => [
      { key: "modeling" as const, label: "Modeling Specialization" },
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
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  isActive
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

      {activeTab === "modeling" ? (
        <ModelingMediaSection
          title={modelingMeta?.label ?? "Modeling Specialization"}
          description={
            modelingMeta?.description ??
            "Fixed slots for each Modeling Specialization card."
          }
          slots={bundle.modeling}
        />
      ) : null}

      {activeTab === "finished-row-1" ? (
        <OrderedGallerySection
          title="Finished Creations — top row"
          description="Large carousel images on the homepage. Order is the slide sequence visitors see."
          groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1}
          items={bundle.finishedRow1}
          rowContextLabel="Top row"
          recommendedSize="670 × 370 px"
        />
      ) : null}

      {activeTab === "finished-row-2" ? (
        <OrderedGallerySection
          title="Finished Creations — bottom row"
          description="Smaller images paired with the top row by slide index."
          groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2}
          items={bundle.finishedRow2}
          rowContextLabel="Bottom row"
          recommendedSize="420 × 232 px"
        />
      ) : null}

      {activeTab === "power-banner-copy" ? <PowerBannerCopySection bundle={powerBannerCopy} /> : null}
    </div>
  );
}
