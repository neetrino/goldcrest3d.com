"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactElement } from "react";

import type { ManufacturingIntelligenceCopyEntry } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.types";
import type { ManufacturingSpecializationItemAdminEntry } from "@/lib/manufacturing-specialization-items/get-manufacturing-specialization-items";
import type { ModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { AdminSiteMediaBundle } from "@/lib/site-media/get-site-media-admin";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";
import type { FounderSectionEntry } from "@/lib/founder-section/founder-section.types";
import type { EngineeringProcessCopyEntry } from "@/lib/engineering-process-copy/engineering-process-copy.types";

import { FinishedCreationsGallery } from "./OrderedGallerySection";
import { ManufacturingIntelligenceSection } from "./ManufacturingIntelligenceSection";
import { ManufacturingSpecializationItemsSection } from "./ManufacturingSpecializationItemsSection";
import { ModelingMediaSection } from "./ModelingMediaSection";
import { PowerBannerCopySection } from "./PowerBannerCopySection";
import { PowerBannerMobileCopySection } from "./PowerBannerMobileCopySection";
import { FounderSection } from "./FounderSection";
import { EngineeringProcessSection } from "./EngineeringProcessSection";

const SECTION_QUERY_PARAM = "section";

const MEDIA_MANAGER_SECTIONS = [
  { key: "power-banner-copy", label: "Power Banner" },
  { key: "power-banner-mobile-copy", label: "Power Banner Mobile" },
  { key: "modeling-media", label: "Modeling Specialization" },
  { key: "manufacturing-intelligence", label: "Manufacturing Intelligence" },
  { key: "manufacturing-specialization-items", label: "Manufacturing Specialization Items" },
  { key: "finished-creations-gallery", label: "Finished Creations Gallery" },
  { key: "founder-section", label: "Founder Section" },
  { key: "engineering-process", label: "Engineering Process" },
] as const;

type MediaManagerSectionKey = (typeof MEDIA_MANAGER_SECTIONS)[number]["key"];

const DEFAULT_MEDIA_MANAGER_SECTION: MediaManagerSectionKey = MEDIA_MANAGER_SECTIONS[0].key;
const getSectionTabId = (section: MediaManagerSectionKey): string => `media-manager-tab-${section}`;
const getSectionPanelId = (section: MediaManagerSectionKey): string =>
  `media-manager-panel-${section}`;

type MediaManagerClientProps = {
  bundle: AdminSiteMediaBundle;
  powerBannerCopy: PowerBannerCopyBundle;
  modelingSlotCopy: ModelingSlotCopyBundle;
  manufacturingIntelligenceCopy: ManufacturingIntelligenceCopyEntry;
  manufacturingSpecializationItems: ManufacturingSpecializationItemAdminEntry[];
  founderSection: FounderSectionEntry;
  engineeringProcessCopy: EngineeringProcessCopyEntry;
};

type SectionRenderContext = {
  bundle: AdminSiteMediaBundle;
  powerBannerCopy: PowerBannerCopyBundle;
  modelingSlotCopy: ModelingSlotCopyBundle;
  manufacturingIntelligenceCopy: ManufacturingIntelligenceCopyEntry;
  manufacturingSpecializationItems: ManufacturingSpecializationItemAdminEntry[];
  founderSection: FounderSectionEntry;
  engineeringProcessCopy: EngineeringProcessCopyEntry;
  modelingMetaLabel: string;
  modelingMetaDescription: string;
};

type MediaManagerTabsProps = {
  activeSection: MediaManagerSectionKey;
  onSelectSection: (section: MediaManagerSectionKey) => void;
};

const isMediaManagerSectionKey = (value: string | null): value is MediaManagerSectionKey =>
  MEDIA_MANAGER_SECTIONS.some((section) => section.key === value);

const renderSection = (
  section: MediaManagerSectionKey,
  context: SectionRenderContext,
): ReactElement => {
  if (section === "power-banner-copy") {
    return <PowerBannerCopySection bundle={context.powerBannerCopy} />;
  }

  if (section === "power-banner-mobile-copy") {
    return <PowerBannerMobileCopySection bundle={context.powerBannerCopy} />;
  }

  if (section === "modeling-media") {
    return (
      <ModelingMediaSection
        title={context.modelingMetaLabel}
        description={context.modelingMetaDescription}
        slots={context.bundle.modeling}
        slotCopy={context.modelingSlotCopy}
      />
    );
  }

  if (section === "manufacturing-intelligence") {
    return <ManufacturingIntelligenceSection initial={context.manufacturingIntelligenceCopy} />;
  }

  if (section === "manufacturing-specialization-items") {
    return <ManufacturingSpecializationItemsSection items={context.manufacturingSpecializationItems} />;
  }

  if (section === "finished-creations-gallery") {
    return (
      <FinishedCreationsGallery
        row1={context.bundle.finishedRow1}
        row2={context.bundle.finishedRow2}
      />
    );
  }

  if (section === "founder-section") {
    return <FounderSection initial={context.founderSection} />;
  }

  return <EngineeringProcessSection initial={context.engineeringProcessCopy} />;
};

function MediaManagerTabs({ activeSection, onSelectSection }: MediaManagerTabsProps) {
  return (
    <nav
      aria-label="Media Manager Sections"
      className="rounded-xl border border-slate-200 bg-white/70 p-2 shadow-sm"
    >
      <ul className="flex flex-wrap gap-2" role="tablist">
        {MEDIA_MANAGER_SECTIONS.map((section) => {
          const isActive = section.key === activeSection;

          return (
            <li key={section.key}>
              <button
                type="button"
                onClick={() => onSelectSection(section.key)}
                id={getSectionTabId(section.key)}
                className={[
                  "rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100",
                ].join(" ")}
                role="tab"
                aria-selected={isActive}
                aria-controls={getSectionPanelId(section.key)}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveMediaManagerSection({
  activeSection,
  context,
}: {
  activeSection: MediaManagerSectionKey;
  context: SectionRenderContext;
}) {
  return (
    <div
      key={activeSection}
      id={getSectionPanelId(activeSection)}
      role="tabpanel"
      aria-labelledby={getSectionTabId(activeSection)}
    >
      {renderSection(activeSection, context)}
    </div>
  );
}

export function MediaManagerClient({
  bundle,
  powerBannerCopy,
  modelingSlotCopy,
  manufacturingIntelligenceCopy,
  manufacturingSpecializationItems,
  founderSection,
  engineeringProcessCopy,
}: MediaManagerClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const modelingMeta = bundle.groupsMeta.find(
    (g) => g.key === SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
  );

  const activeSectionParam = searchParams.get(SECTION_QUERY_PARAM);
  const activeSection = isMediaManagerSectionKey(activeSectionParam)
    ? activeSectionParam
    : DEFAULT_MEDIA_MANAGER_SECTION;

  const renderContext: SectionRenderContext = {
    bundle,
    powerBannerCopy,
    modelingSlotCopy,
    manufacturingIntelligenceCopy,
    manufacturingSpecializationItems,
    founderSection,
    engineeringProcessCopy,
    modelingMetaLabel: modelingMeta?.label ?? "Modeling Specialization",
    modelingMetaDescription:
      modelingMeta?.description ?? "Fixed slots for each Modeling Specialization card.",
  };

  const onSelectSection = (section: MediaManagerSectionKey): void => {
    if (section === activeSection) return;

    const next = new URLSearchParams(searchParams.toString());
    next.set(SECTION_QUERY_PARAM, section);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <MediaManagerTabs activeSection={activeSection} onSelectSection={onSelectSection} />
      <ActiveMediaManagerSection activeSection={activeSection} context={renderContext} />
    </div>
  );
}
