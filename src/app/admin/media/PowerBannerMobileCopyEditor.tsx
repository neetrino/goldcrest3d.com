"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { updatePowerBannerMobileCopy } from "@/app/actions/power-banner-mobile-copy";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import { POWER_BANNER_ADMIN_LABELS } from "@/lib/power-banner-copy/power-banner-defaults";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { PowerBannerDescriptionEditor } from "./PowerBannerDescriptionEditor";
import { PowerBannerMobileCopyMessages } from "./PowerBannerMobileCopyMessages";
import { PowerBannerMobileHeroImageEditor } from "./PowerBannerMobileHeroImageEditor";

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
        key={`${initial.mobileBgSrc}-${initial.heroImageMobileR2Key ?? ""}`}
        bannerKey={bannerKey}
        mobilePreviewSrc={initial.mobileBgSrc}
        heroImageMobileR2Key={initial.heroImageMobileR2Key}
      />

      <form
        key={`power-banner-mobile-text-${bannerKey}-${initial.mobileBody}`}
        action={formAction}
        className="flex flex-col gap-4"
        aria-label={`Edit mobile hero content for ${meta.name}`}
      >
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <input type="hidden" name="mobileBody" value={mobileBodyHtml} />

        <div className="flex flex-col gap-2">
          <label htmlFor={`power-banner-mobile-title-${bannerKey}`} className="text-sm font-medium text-slate-800">
            Mobile title
          </label>
          <textarea
            id={`power-banner-mobile-title-${bannerKey}`}
            name="mobileTitle"
            rows={2}
            defaultValue={initial.mobileTitle}
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
          />
          <p className="text-xs text-slate-500">
            Optional mobile-only rich text. Leave empty if this slide should have no mobile description.
          </p>
        </div>

        <PowerBannerMobileCopyMessages state={state} />

        <MediaFormSubmitButton pendingLabel="Saving...">Save mobile content</MediaFormSubmitButton>
      </form>
    </div>
  );
}
