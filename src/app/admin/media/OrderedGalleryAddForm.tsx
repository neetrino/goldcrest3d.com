"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { addOrderedGalleryImage, type SiteMediaActionResult } from "@/app/actions/site-media";
import type { SiteMediaGroupKey } from "@/lib/site-media/site-media.registry";

import { ImageUploadControl } from "./ImageUploadControl";
import {
  ORDERED_GALLERY_MAX_ITEMS,
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";

type OrderedGalleryAddFormProps = {
  groupKey: SiteMediaGroupKey;
  canAdd: boolean;
  rowLabel: string;
};

export function OrderedGalleryAddForm({
  groupKey,
  canAdd,
  rowLabel,
}: OrderedGalleryAddFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return addOrderedGalleryImage(groupKey, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  if (!canAdd) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        This row already has the maximum of {ORDERED_GALLERY_MAX_ITEMS} images. Remove one to
        add another.
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border-2 border-dashed border-amber-300/80 bg-gradient-to-br from-amber-50/90 to-white p-5 shadow-sm"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
          +
        </span>
        <div>
          <p className="text-base font-semibold text-slate-900">Add image</p>
          <p className="text-xs text-slate-600">
            {rowLabel} · {SITE_MEDIA_FORMATS_LABEL}, max {SITE_MEDIA_MAX_SIZE_MB} MB
          </p>
        </div>
      </div>
      <ImageUploadControl disabled={isPending} />
      <div className="mt-4">
        <MediaFormSubmitButton
          pendingLabel="Adding…"
          className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add to gallery
        </MediaFormSubmitButton>
      </div>
      {state && !state.ok ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900">
          Image added — it appears at the end of this row until you reorder.
        </p>
      ) : null}
    </form>
  );
}
