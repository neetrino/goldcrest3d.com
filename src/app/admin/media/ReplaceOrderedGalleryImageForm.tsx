"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  replaceOrderedGalleryImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";

type ReplaceOrderedGalleryImageFormProps = {
  item: AdminOrderedItemRow;
  positionLabel: string;
};

export function ReplaceOrderedGalleryImageForm({
  item,
  positionLabel,
}: ReplaceOrderedGalleryImageFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(
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
      aria-label={`Replace image ${positionLabel}`}
      className="space-y-2 rounded-md border border-slate-200 bg-slate-50/80 p-3"
    >
      <p className="text-xs font-semibold text-slate-800">
        Replace image · {positionLabel}
      </p>
      {currentFileName ? (
        <p className="text-xs text-slate-600">
          Current file:{" "}
          <code className="break-all rounded bg-white px-1 py-0.5 text-slate-800">
            {currentFileName}
          </code>
        </p>
      ) : (
        <p className="text-xs text-slate-500">No R2 file — upload to set this image.</p>
      )}
      <div className="flex flex-wrap items-end gap-2">
        <label className="text-xs text-slate-600">
          New file (PNG, JPEG, WebP, GIF)
          <input
            name="file"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="mt-1 block w-full max-w-xs text-sm"
            required
          />
        </label>
        <button
          type="submit"
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-800 hover:bg-slate-50"
        >
          Upload
        </button>
      </div>
      {state && !state.ok && (
        <span className="block text-xs text-red-600">{state.error}</span>
      )}
      {state?.ok && <span className="text-xs text-emerald-700">OK</span>}
    </form>
  );
}
