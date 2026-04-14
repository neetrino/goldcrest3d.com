"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  clearManufacturingSpecializationItemImage,
  uploadManufacturingSpecializationItemImage,
  type ManufacturingSpecializationItemImageActionResult,
} from "@/app/actions/manufacturing-specialization-item-image";
import { updateManufacturingSpecializationItemCopy } from "@/app/actions/manufacturing-specialization-item-copy";
import type { ManufacturingSpecializationItemAdminEntry } from "@/lib/manufacturing-specialization-items/get-manufacturing-specialization-items";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";
import {
  DEFAULT_IMAGE_FRAMING,
  framingFingerprint,
  framingToCoverImageStyle,
} from "@/lib/site-media/image-framing";

import { ImageFramingEditor } from "./ImageFramingEditor";
import { ImageUploadControl } from "./ImageUploadControl";
import { ManufacturingSpecializationItemCopyMessages } from "./ManufacturingSpecializationItemCopyMessages";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import {
  MANUFACTURING_DETAIL_ADMIN_FRAME_MAX_CLASS,
  MANUFACTURING_DETAIL_ADMIN_IMAGE_FRAME_CLASS,
  MANUFACTURING_DETAIL_ADMIN_IMAGE_SIZES,
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";
import { PowerBannerDescriptionEditor } from "./PowerBannerDescriptionEditor";

/** Same 6:5 box as `SectionManufacturing` image frame + admin bounded preview. */
const PREVIEW_ASPECT = "aspect-[750/625]";

type ManufacturingItemEditorProps = {
  entry: ManufacturingSpecializationItemAdminEntry;
};

function ItemImageMessages({ state }: { state: ManufacturingSpecializationItemImageActionResult | null }) {
  if (state && !state.ok) {
    return (
      <p
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        role="alert"
      >
        {state.error}
      </p>
    );
  }
  if (state?.ok) {
    return (
      <p
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900"
        role="status"
      >
        Image updated.
      </p>
    );
  }
  return null;
}

export function ManufacturingItemEditor({ entry }: ManufacturingItemEditorProps) {
  const router = useRouter();
  const [copyState, copyAction] = useActionState(updateManufacturingSpecializationItemCopy, null);
  const [bodyHtml, setBodyHtml] = useState(entry.formBody);

  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: ManufacturingSpecializationItemImageActionResult | null,
      formData: FormData,
    ): Promise<ManufacturingSpecializationItemImageActionResult | null> => {
      return uploadManufacturingSpecializationItemImage(_prev, formData);
    },
    null,
  );

  const [clearState, clearAction, clearPending] = useActionState(
    async (
      _prev: ManufacturingSpecializationItemImageActionResult | null,
      formData: FormData,
    ): Promise<ManufacturingSpecializationItemImageActionResult | null> => {
      return clearManufacturingSpecializationItemImage(_prev, formData);
    },
    null,
  );

  useEffect(() => {
    if (copyState?.ok || uploadState?.ok || clearState?.ok) {
      router.refresh();
    }
  }, [copyState?.ok, uploadState?.ok, clearState?.ok, router]);

  const imageState = uploadState ?? clearState;
  const storedName = formatR2ObjectDisplayName(entry.heroImageR2Key);
  const usingCustom = Boolean(entry.heroImageR2Key);
  const previewFraming =
    entry.heroImageFraming != null
      ? entry.heroImageFraming
      : usingCustom
        ? DEFAULT_IMAGE_FRAMING
        : null;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="border-b border-slate-200/80 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          {entry.canonicalLabel}
        </p>
        <p className="mt-1 font-mono text-[11px] text-slate-500">{entry.itemKey}</p>
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
        <div className="mb-4 border-b border-slate-200/80 pb-3">
          <p className="text-sm font-semibold text-slate-900">Detail image</p>
          <p className="mt-1 text-xs text-slate-600">
            Shown when this row is selected in the accordion. Custom uploads use the same rules as
            elsewhere ({SITE_MEDIA_FORMATS_LABEL}, max {SITE_MEDIA_MAX_SIZE_MB} MB). Without an
            upload, the built-in artwork for this row is used on the site.
          </p>
        </div>

        <div className={`mb-4 ${MANUFACTURING_DETAIL_ADMIN_IMAGE_FRAME_CLASS}`}>
          <Image
            src={entry.desktopPreviewSrc}
            alt=""
            fill
            unoptimized={entry.desktopPreviewSrc.startsWith("/")}
            sizes={MANUFACTURING_DETAIL_ADMIN_IMAGE_SIZES}
            className={previewFraming ? "object-cover" : "object-cover object-center"}
            style={previewFraming ? framingToCoverImageStyle(previewFraming) : undefined}
          />
        </div>

        {storedName ? (
          <p className="mb-3 text-xs text-slate-600">
            <span className="font-medium text-slate-700">Stored file:</span>{" "}
            <span className="break-all text-slate-800">{storedName}</span>
          </p>
        ) : (
          <p className="mb-3 text-xs text-slate-500">
            Using built-in image on the public site (not uploaded to storage).
          </p>
        )}

        <form action={uploadAction} className="space-y-3">
          <input type="hidden" name="itemKey" value={entry.itemKey} />
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-800">
              {usingCustom ? "Replace image" : "Upload custom image"}
            </p>
            <ImageUploadControl
              disabled={uploadPending}
              stableDomId={`gc-mfg-item-upload-${entry.itemKey}`}
              previewContainerClassName={MANUFACTURING_DETAIL_ADMIN_IMAGE_FRAME_CLASS}
            />
          </div>
          <ItemImageMessages state={imageState} />
          <MediaFormSubmitButton pendingLabel="Uploading…">
            {usingCustom ? "Replace image" : "Upload image"}
          </MediaFormSubmitButton>
        </form>

        {entry.desktopPreviewSrc ? (
          <div
            className={`mt-4 w-full ${MANUFACTURING_DETAIL_ADMIN_FRAME_MAX_CLASS} mx-auto min-h-0`}
          >
            <ImageFramingEditor
              key={`mfg-item-framing-${entry.itemKey}-${entry.editorSyncKey}-${framingFingerprint(entry.heroImageFraming)}`}
              imageUrl={entry.desktopPreviewSrc}
              initialFraming={entry.heroImageFraming}
              aspectClassName={PREVIEW_ASPECT}
              target={{ kind: "manufacturingItem", itemKey: entry.itemKey }}
              enabled={!uploadPending && !clearPending}
              previewSizes={MANUFACTURING_DETAIL_ADMIN_IMAGE_SIZES}
            />
          </div>
        ) : null}

        {usingCustom ? (
          <form action={clearAction} className="mt-4 border-t border-slate-200/80 pt-4">
            <input type="hidden" name="itemKey" value={entry.itemKey} />
            <p className="mb-2 text-xs text-slate-600">
              Remove the upload and restore the original built-in image for this row on the
              homepage.
            </p>
            <ItemImageMessages state={clearState} />
            <button
              type="submit"
              disabled={clearPending}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {clearPending ? "Resetting…" : "Restore built-in image"}
            </button>
          </form>
        ) : null}
      </div>

      <form
        key={`mfg-item-copy-${entry.itemKey}-${entry.formTitle}-${entry.formBody}`}
        action={copyAction}
        className="flex flex-col gap-4"
        aria-label={`Edit copy for ${entry.canonicalLabel}`}
      >
        <input type="hidden" name="itemKey" value={entry.itemKey} />
        <input type="hidden" name="body" value={bodyHtml} />

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`mfg-item-title-${entry.itemKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Title
          </label>
          <textarea
            id={`mfg-item-title-${entry.itemKey}`}
            name="title"
            rows={2}
            required
            defaultValue={entry.formTitle}
            className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span
            id={`mfg-item-body-label-${entry.itemKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Description
          </span>
          <PowerBannerDescriptionEditor
            id={`mfg-item-body-${entry.itemKey}`}
            ariaLabelledBy={`mfg-item-body-label-${entry.itemKey}`}
            value={bodyHtml}
            onChange={setBodyHtml}
          />
          <p className="text-xs text-slate-500">
            Rich text for the expanded accordion panel. Line breaks and lists are preserved on the
            homepage.
          </p>
        </div>

        <ManufacturingSpecializationItemCopyMessages state={copyState} />

        <MediaFormSubmitButton pendingLabel="Saving…">Save title &amp; description</MediaFormSubmitButton>
      </form>
    </div>
  );
}
