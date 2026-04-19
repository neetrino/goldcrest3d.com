"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { updatePowerBannerCopy } from "@/app/actions/power-banner-copy";
import { upsertHeroBannerImage, type SiteMediaActionResult } from "@/app/actions/site-media";
import type {
  PowerBannerKey,
  PowerBannerViewport,
} from "@/lib/power-banner-copy/power-banner-keys";
import { POWER_BANNER_ADMIN_LABELS } from "@/lib/power-banner-copy/power-banner-defaults";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";

import { ImageUploadControl } from "./ImageUploadControl";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";
import { PowerBannerCopyMessages } from "./PowerBannerCopyMessages";
import { SITE_MEDIA_FORMATS_LABEL, SITE_MEDIA_MAX_SIZE_MB } from "./media-manager.constants";

type PowerBannerCopyEditorProps = {
  viewport: PowerBannerViewport;
  bannerKey: PowerBannerKey;
  initial: PowerBannerCopyEntry;
};

export function PowerBannerCopyEditor({
  viewport,
  bannerKey,
  initial,
}: PowerBannerCopyEditorProps) {
  const router = useRouter();
  const meta = POWER_BANNER_ADMIN_LABELS[bannerKey];
  const viewportLabel = viewport === "desktop" ? "Desktop" : "Mobile";

  const [state, formAction, savePending] = useActionState(updatePowerBannerCopy, null);
  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return upsertHeroBannerImage(bannerKey, viewport, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok || uploadState?.ok) {
      router.refresh();
    }
  }, [state?.ok, uploadState?.ok, router]);

  const currentFileName = formatR2ObjectDisplayName(initial.imageObjectKey);

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6"
      aria-label={`Edit ${viewportLabel.toLowerCase()} hero banner for ${meta.name}`}
    >
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          {viewportLabel} hero banner
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          {meta.name}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{meta.hint}</p>
      </div>

      <form action={uploadAction} className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
        <p className="text-sm font-semibold text-slate-900">{viewportLabel} image</p>
        {currentFileName ? (
          <p className="mt-1 text-xs text-slate-600">
            <span className="font-medium text-slate-700">Stored file:</span>{" "}
            <span className="break-all text-slate-800">{currentFileName}</span>
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">Using default {viewportLabel.toLowerCase()} hero image.</p>
        )}
        <p className="mt-2 text-xs text-slate-500">
          {SITE_MEDIA_FORMATS_LABEL} · max {SITE_MEDIA_MAX_SIZE_MB} MB
        </p>
        <div className="mt-3">
          <ImageUploadControl
            disabled={uploadPending}
            stableDomId={`gc-power-banner-${viewport}-upload-${bannerKey}`}
          />
        </div>
        <div className="mt-4">
          <MediaFormSubmitButton pendingLabel="Uploading…">
            {initial.imageObjectKey ? `Replace ${viewportLabel.toLowerCase()} image` : `Upload ${viewportLabel.toLowerCase()} image`}
          </MediaFormSubmitButton>
        </div>
        <div className="mt-3">
          <ModelingSlotFormMessages state={uploadState} />
        </div>
      </form>

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <input type="hidden" name="viewport" value={viewport} />

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`power-banner-title-${bannerKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Title
          </label>
          <textarea
            id={`power-banner-title-${bannerKey}`}
            name="title"
            rows={2}
            required
            disabled={savePending}
            defaultValue={initial.title}
            className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
          <p className="text-xs text-slate-500">
            Edit text for {viewportLabel.toLowerCase()} hero rendering only.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`power-banner-body-${bannerKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Description
          </label>
          <textarea
            id={`power-banner-body-${bannerKey}`}
            name="body"
            rows={5}
            required
            disabled={savePending}
            defaultValue={initial.body}
            className="min-h-[8rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
          <p className="text-xs text-slate-500">
            Line breaks apply only to the {viewportLabel.toLowerCase()} hero version.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`power-banner-image-alt-${bannerKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Image alt text
          </label>
          <input
            id={`power-banner-image-alt-${bannerKey}`}
            name="imageAlt"
            type="text"
            required
            disabled={savePending}
            defaultValue={initial.imageAlt}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>

        <PowerBannerCopyMessages state={state} />

        <MediaFormSubmitButton pendingLabel="Saving…">Save banner text</MediaFormSubmitButton>
      </form>
    </div>
  );
}
