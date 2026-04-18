"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useState } from "react";

import { updatePowerBannerMobileCopy } from "@/app/actions/power-banner-mobile-copy";
import { DEFAULT_POWER_BANNER_MOBILE_HERO_TEXT_LAYOUT } from "@/lib/power-banner-copy/power-banner-mobile-hero-text-defaults";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import { POWER_BANNER_ADMIN_LABELS } from "@/lib/power-banner-copy/power-banner-defaults";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { PowerBannerDescriptionEditor } from "./PowerBannerDescriptionEditor";
import { PowerBannerMobileCopyMessages } from "./PowerBannerMobileCopyMessages";
import { PowerBannerMobileHeroImageEditor } from "./PowerBannerMobileHeroImageEditor";
import { PowerBannerMobileHeroTextVisualEditor } from "./PowerBannerMobileHeroTextVisualEditor";

type PowerBannerMobileCopyEditorProps = {
  bannerKey: PowerBannerKey;
  initial: PowerBannerCopyEntry;
};

export function PowerBannerMobileCopyEditor({
  bannerKey,
  initial,
}: PowerBannerMobileCopyEditorProps) {
  const router = useRouter();
  const meta = POWER_BANNER_ADMIN_LABELS[bannerKey];

  const [state, formAction] = useActionState(updatePowerBannerMobileCopy, null);
  const [mobileBodyHtml, setMobileBodyHtml] = useState(initial.mobileBody);
  const [mobileTitle, setMobileTitle] = useState(initial.mobileTitle);
  const [useVisualText, setUseVisualText] = useState(() => initial.heroTextLayoutMobile != null);
  const [textLayout, setTextLayout] = useState(
    () => initial.heroTextLayoutMobile ?? DEFAULT_POWER_BANNER_MOBILE_HERO_TEXT_LAYOUT,
  );

  const savedLayoutFingerprint = useMemo(
    () => (initial.heroTextLayoutMobile ? JSON.stringify(initial.heroTextLayoutMobile) : "none"),
    [initial.heroTextLayoutMobile],
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">Mobile hero</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">{meta.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{meta.hint}</p>
      </div>

      <PowerBannerMobileHeroImageEditor
        key={`${initial.mobileBgSrc}-${initial.heroImageMobileR2Key ?? ""}-${initial.heroImageFramingMobile?.zoom ?? ""}`}
        bannerKey={bannerKey}
        mobilePreviewSrc={initial.mobileBgSrc}
        heroImageMobileR2Key={initial.heroImageMobileR2Key}
        heroImageFramingMobile={initial.heroImageFramingMobile}
      />

      <form
        key={`power-banner-mobile-text-${bannerKey}-${initial.mobileBody}-${savedLayoutFingerprint}`}
        action={formAction}
        className="flex flex-col gap-4"
        aria-label={`Edit mobile hero content for ${meta.name}`}
      >
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <input type="hidden" name="mobileBody" value={mobileBodyHtml} />
        <input type="hidden" name="useHeroVisualTextLayout" value={useVisualText ? "1" : "0"} />
        <input
          type="hidden"
          name="heroTextLayoutMobile"
          value={useVisualText ? JSON.stringify(textLayout) : ""}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor={`power-banner-mobile-title-${bannerKey}`} className="text-sm font-medium text-slate-800">
            Mobile title
          </label>
          <textarea
            id={`power-banner-mobile-title-${bannerKey}`}
            name="mobileTitle"
            rows={2}
            value={mobileTitle}
            onChange={(e) => setMobileTitle(e.target.value)}
            className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
            placeholder="Optional mobile-only title"
          />
          <p className="text-xs text-slate-500">
            Optional. Empty value keeps mobile title intentionally blank and does not affect desktop/tablet.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span id={`power-banner-mobile-body-label-${bannerKey}`} className="text-sm font-medium text-slate-800">
            Mobile description
          </span>
          <PowerBannerDescriptionEditor
            id={`power-banner-mobile-body-${bannerKey}`}
            ariaLabelledBy={`power-banner-mobile-body-label-${bannerKey}`}
            value={mobileBodyHtml}
            onChange={setMobileBodyHtml}
            docFieldName="mobileBodyDoc"
          />
          <p className="text-xs text-slate-500">
            Optional mobile-only rich text. Leave empty if this slide should have no mobile description.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-slate-50/50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Visual text layout</p>
              <p className="mt-1 max-w-prose text-xs text-slate-500">
                Place the mobile title and description on the hero preview. The frame uses the same aspect ratio
                (20:37) and padding as the live mobile hero, and positions are saved as percentages of that
                frame — what you see here matches the public site.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
              <input
                type="checkbox"
                checked={useVisualText}
                onChange={(e) => {
                  const on = e.target.checked;
                  setUseVisualText(on);
                  if (on) {
                    setTextLayout(initial.heroTextLayoutMobile ?? DEFAULT_POWER_BANNER_MOBILE_HERO_TEXT_LAYOUT);
                  }
                }}
                className="h-4 w-4 rounded border-slate-300 text-[#e2c481] focus:ring-[#e2c481]"
              />
              Use visual text layout
            </label>
          </div>
          {useVisualText ? (
            <PowerBannerMobileHeroTextVisualEditor
              bannerKey={bannerKey}
              layout={textLayout}
              onLayoutChange={setTextLayout}
              mobileBgSrc={initial.mobileBgSrc}
              mobileFraming={initial.heroImageFramingMobile}
              titleText={mobileTitle}
              bodyHtml={mobileBodyHtml}
              onTitleChange={setMobileTitle}
              onBodyHtmlChange={setMobileBodyHtml}
            />
          ) : null}
        </div>

        <PowerBannerMobileCopyMessages state={state} />

        <MediaFormSubmitButton pendingLabel="Saving...">Save mobile content</MediaFormSubmitButton>
      </form>
    </div>
  );
}
