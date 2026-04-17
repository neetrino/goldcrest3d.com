"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import { saveManagedHomeSection } from "@/app/actions/managed-home";
import { PowerBanners } from "@/components/landing/PowerBanners";
import { SectionFounder } from "@/components/landing/SectionFounder";
import { SectionManufacturing } from "@/components/landing/SectionManufacturing";
import { SectionModeling } from "@/components/landing/SectionModeling";
import { SectionPhilosophy } from "@/components/landing/SectionPhilosophy";
import { SectionProcess } from "@/components/landing/SectionProcess";
import { buildManufacturingItemsForDisplay } from "@/lib/managed-home/build-manufacturing-items";
import { MANAGED_HOME_SECTION_KEYS } from "@/lib/managed-home/managed-home-section-keys";
import type { ManagedHomeBundle } from "@/lib/managed-home/managed-home-schemas";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { LandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

import { Manager2HeroPanel } from "./Manager2HeroPanel";
import {
  FounderEditor,
  ManufacturingEditor,
  ModelingEditor,
  PhilosophyEditor,
} from "./Manager2SectionEditors";
import { ProcessEditor } from "./Manager2ProcessEditor";

const TABS = [
  { id: "hero" as const, label: "HERO (slides)" },
  { id: "philosophy" as const, label: "Philosophy" },
  { id: "modeling" as const, label: "Modeling" },
  { id: "manufacturing" as const, label: "Manufacturing" },
  { id: "founder" as const, label: "Founder" },
  { id: "process" as const, label: "Process" },
];

type Manager2ClientProps = {
  initialManaged: ManagedHomeBundle;
  powerBannerCopy: PowerBannerCopyBundle;
  siteMedia: LandingSiteMedia;
};

export function Manager2Client({
  initialManaged,
  powerBannerCopy,
  siteMedia,
}: Manager2ClientProps) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("hero");
  const [draft, setDraft] = useState<ManagedHomeBundle>(initialManaged);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setDraft(initialManaged);
  }, [initialManaged]);

  const manufacturingItems = useMemo(
    () =>
      buildManufacturingItemsForDisplay(
        draft.manufacturing,
        siteMedia.manufacturing,
      ),
    [draft.manufacturing, siteMedia.manufacturing],
  );

  function saveSection(
    key:
      | typeof MANAGED_HOME_SECTION_KEYS.PHILOSOPHY
      | typeof MANAGED_HOME_SECTION_KEYS.MODELING
      | typeof MANAGED_HOME_SECTION_KEYS.MANUFACTURING
      | typeof MANAGED_HOME_SECTION_KEYS.FOUNDER
      | typeof MANAGED_HOME_SECTION_KEYS.PROCESS,
  ) {
    setMsg(null);
    const payload =
      key === MANAGED_HOME_SECTION_KEYS.PHILOSOPHY
        ? draft.philosophy
        : key === MANAGED_HOME_SECTION_KEYS.MODELING
          ? draft.modeling
          : key === MANAGED_HOME_SECTION_KEYS.MANUFACTURING
            ? draft.manufacturing
            : key === MANAGED_HOME_SECTION_KEYS.FOUNDER
              ? draft.founder
              : draft.process;
    startTransition(async () => {
      const r = await saveManagedHomeSection(key, payload);
      setMsg(r.ok ? "Saved." : r.error);
      if (r.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === t.id
                ? "bg-[#e2c481] text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          {tab === "hero" ? (
            <>
              <p className="text-sm text-slate-600">
                Adjust backgrounds and transforms per slide. Titles and descriptions use the
                same Power Banner copy as Media Manager — edit them there if needed.
              </p>
              <Manager2HeroPanel hero={siteMedia.hero} />
            </>
          ) : null}

          {tab === "philosophy" ? (
            <PhilosophyEditor
              value={draft.philosophy}
              onChange={(next) =>
                setDraft((d) => ({ ...d, philosophy: next }))
              }
              onSave={() =>
                saveSection(MANAGED_HOME_SECTION_KEYS.PHILOSOPHY)
              }
              pending={pending}
            />
          ) : null}

          {tab === "modeling" ? (
            <ModelingEditor
              value={draft.modeling}
              onChange={(next) => setDraft((d) => ({ ...d, modeling: next }))}
              onSave={() => saveSection(MANAGED_HOME_SECTION_KEYS.MODELING)}
              pending={pending}
            />
          ) : null}

          {tab === "manufacturing" ? (
            <ManufacturingEditor
              value={draft.manufacturing}
              onChange={(next) =>
                setDraft((d) => ({ ...d, manufacturing: next }))
              }
              onSave={() =>
                saveSection(MANAGED_HOME_SECTION_KEYS.MANUFACTURING)
              }
              pending={pending}
            />
          ) : null}

          {tab === "founder" ? (
            <FounderEditor
              value={draft.founder}
              onChange={(next) => setDraft((d) => ({ ...d, founder: next }))}
              onSave={() => saveSection(MANAGED_HOME_SECTION_KEYS.FOUNDER)}
              pending={pending}
            />
          ) : null}

          {tab === "process" ? (
            <ProcessEditor
              value={draft.process}
              onChange={(next) => setDraft((d) => ({ ...d, process: next }))}
              onSave={() => saveSection(MANAGED_HOME_SECTION_KEYS.PROCESS)}
              pending={pending}
            />
          ) : null}

          {msg ? (
            <p className="text-sm font-medium text-slate-700">{msg}</p>
          ) : null}
        </div>

        <div className="min-w-0 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Live preview (same components as the site)
          </p>
          <div className="max-h-[min(80vh,900px)] overflow-auto rounded-xl border border-slate-200 bg-white shadow-inner">
            {tab === "hero" ? (
              <div className="origin-top scale-[0.65] max-md:scale-[0.45]">
                <PowerBanners
                  powerBannerCopy={powerBannerCopy}
                  hero={siteMedia.hero}
                />
              </div>
            ) : null}
            {tab === "philosophy" ? (
              <SectionPhilosophy content={draft.philosophy} />
            ) : null}
            {tab === "modeling" ? (
              <SectionModeling
                modeling={siteMedia.modeling}
                content={draft.modeling}
              />
            ) : null}
            {tab === "manufacturing" ? (
              <SectionManufacturing
                sectionTitle={draft.manufacturing.sectionTitle}
                items={manufacturingItems}
              />
            ) : null}
            {tab === "founder" ? (
              <SectionFounder
                content={draft.founder}
                founderPhoto={siteMedia.founderPhoto}
              />
            ) : null}
            {tab === "process" ? (
              <SectionProcess content={draft.process} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
