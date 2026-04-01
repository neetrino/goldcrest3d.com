"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  replaceOrderedGalleryImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";

import { ImageUploadControl } from "./ImageUploadControl";
import {
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";

type ReplaceOrderedGalleryImageFormProps = {
  item: AdminOrderedItemRow;
  positionLabel: string;
};

export function ReplaceOrderedGalleryImageForm({
  item,
  positionLabel,
}: ReplaceOrderedGalleryImageFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return replaceOrderedGalleryImage(item.id, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  const currentFileName = formatR2ObjectDisplayName(item.r2ObjectKey);

  return (
    <form
      action={formAction}
      aria-label={`Replace image for ${positionLabel}`}
      className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/90 p-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">Replace image</p>
        <span className="text-xs text-slate-500">{positionLabel}</span>
      </div>
      {currentFileName ? (
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">Current file:</span>{" "}
          <span className="break-all">{currentFileName}</span>
        </p>
      ) : (
        <p className="text-xs text-amber-800/90">
          No file yet — upload to show this slide on the site.
        </p>
      )}
      <p className="text-xs text-slate-500">
        {SITE_MEDIA_FORMATS_LABEL} · max {SITE_MEDIA_MAX_SIZE_MB} MB
      </p>
      <ImageUploadControl
        disabled={isPending}
        stableDomId={`gc-ordered-replace-${item.id}`}
      />
      <MediaFormSubmitButton
        pendingLabel="Replacing…"
        className="inline-flex min-h-[2.5rem] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Replace image
      </MediaFormSubmitButton>
      {state && !state.ok ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900">
          Image updated.
        </p>
      ) : null}
    </form>
  );
}
