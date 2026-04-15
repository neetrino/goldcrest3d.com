"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  clearFounderSectionImage,
  uploadFounderSectionImage,
  type FounderSectionImageActionResult,
} from "@/app/actions/founder-section-image";
import {
  updateFounderSectionCopy,
  type FounderSectionCopyActionResult,
} from "@/app/actions/founder-section-copy";
import type { FounderSectionEntry } from "@/lib/founder-section/founder-section.types";
import { FOUNDER_SECTION_BUILTIN_IMAGE_SRC } from "@/lib/founder-section/founder-section-defaults";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";
import {
  DEFAULT_IMAGE_FRAMING,
  framingFingerprint,
  framingToCoverImageStyle,
} from "@/lib/site-media/image-framing";

import { ImageFramingEditor } from "./ImageFramingEditor";
import { ImageUploadControl } from "./ImageUploadControl";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { PowerBannerDescriptionEditor } from "./PowerBannerDescriptionEditor";
import {
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";

const FOUNDER_PREVIEW_FRAME_CLASS =
  "relative mx-auto aspect-[4/5] w-full max-w-[480px] min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100";
const FOUNDER_PREVIEW_SIZES = "(max-width: 1024px) 100vw, 480px";

type FounderSectionEditorProps = {
  initial: FounderSectionEntry;
};

function ImageMessages({ state }: { state: FounderSectionImageActionResult | null }) {
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

function CopyMessages({ state }: { state: FounderSectionCopyActionResult | null }) {
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
        Text saved.
      </p>
    );
  }
  return null;
}

export function FounderSectionEditor({ initial }: FounderSectionEditorProps) {
  const router = useRouter();
  const [copyState, copyAction] = useActionState(updateFounderSectionCopy, null);
  const [bodyHtml, setBodyHtml] = useState(initial.body);

  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: FounderSectionImageActionResult | null,
      formData: FormData,
    ): Promise<FounderSectionImageActionResult | null> => {
      return uploadFounderSectionImage(_prev, formData);
    },
    null,
  );

  const [clearState, clearAction, clearPending] = useActionState(
    async (
      _prev: FounderSectionImageActionResult | null,
      formData: FormData,
    ): Promise<FounderSectionImageActionResult | null> => {
      return clearFounderSectionImage(_prev, formData);
    },
    null,
  );

  useEffect(() => {
    if (copyState?.ok || uploadState?.ok || clearState?.ok) {
      router.refresh();
    }
  }, [copyState?.ok, uploadState?.ok, clearState?.ok, router]);

  const imageState = uploadState ?? clearState;
  const storedName = formatR2ObjectDisplayName(initial.heroImageR2Key);
  const usingCustom = Boolean(initial.heroImageR2Key);
  // Always show a preview: R2 upload takes priority, then the built-in portrait
  const previewSrc = initial.customImageDisplayUrl ?? FOUNDER_SECTION_BUILTIN_IMAGE_SRC;
  const previewFraming =
    initial.heroImageFraming != null
      ? initial.heroImageFraming
      : DEFAULT_IMAGE_FRAMING;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="border-b border-slate-200/80 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Founder &amp; Lead CAD Engineer
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          {initial.name}
        </h3>
      </div>

      {/* ── Photo upload + framing ── */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
        <div className="mb-4 border-b border-slate-200/80 pb-3">
          <p className="text-sm font-semibold text-slate-900">Photo</p>
          <p className="mt-1 text-xs text-slate-600">
            Upload the founder portrait. Accepted formats: {SITE_MEDIA_FORMATS_LABEL}, max{" "}
            {SITE_MEDIA_MAX_SIZE_MB}&nbsp;MB.
          </p>
        </div>

        <div className={`mb-4 ${FOUNDER_PREVIEW_FRAME_CLASS}`}>
          <Image
            src={previewSrc}
            alt=""
            fill
            sizes={FOUNDER_PREVIEW_SIZES}
            unoptimized={!initial.customImageDisplayUrl}
            className="object-cover"
            style={framingToCoverImageStyle(previewFraming)}
          />
        </div>

        {storedName ? (
          <p className="mb-3 text-xs text-slate-600">
            <span className="font-medium text-slate-700">Stored file:</span>{" "}
            <span className="break-all text-slate-800">{storedName}</span>
          </p>
        ) : (
          <p className="mb-3 text-xs text-slate-500">
            Using built-in portrait. Upload a custom photo to replace it.
          </p>
        )}

        <form action={uploadAction} className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-800">
              {usingCustom ? "Replace photo" : "Upload photo"}
            </p>
            <ImageUploadControl
              disabled={uploadPending}
              stableDomId="gc-founder-photo-upload"
              previewContainerClassName={FOUNDER_PREVIEW_FRAME_CLASS}
            />
          </div>
          <ImageMessages state={imageState} />
          <MediaFormSubmitButton pendingLabel="Uploading…">
            {usingCustom ? "Replace photo" : "Upload photo"}
          </MediaFormSubmitButton>
        </form>

        <div className="mt-4 max-w-[480px] mx-auto min-h-0 w-full">
          <ImageFramingEditor
            key={`founder-framing-${framingFingerprint(initial.heroImageFraming)}`}
            imageUrl={previewSrc}
            initialFraming={initial.heroImageFraming}
            aspectClassName="aspect-[4/5]"
            target={{ kind: "founder" }}
            enabled={!uploadPending && !clearPending}
            previewSizes={FOUNDER_PREVIEW_SIZES}
          />
        </div>

        {usingCustom ? (
          <form action={clearAction} className="mt-4 border-t border-slate-200/80 pt-4">
            <p className="mb-2 text-xs text-slate-600">
              Remove the uploaded photo from this section.
            </p>
            <ImageMessages state={clearState} />
            <button
              type="submit"
              disabled={clearPending}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {clearPending ? "Removing…" : "Remove photo"}
            </button>
          </form>
        ) : null}
      </div>

      {/* ── Text copy ── */}
      <form
        key={`founder-copy-${initial.name}-${initial.body}`}
        action={copyAction}
        className="flex flex-col gap-4"
        aria-label="Edit Founder & Lead CAD Engineer name and bio"
      >
        <input type="hidden" name="body" value={bodyHtml} />

        <div className="flex flex-col gap-2">
          <label htmlFor="founder-name" className="text-sm font-medium text-slate-800">
            Name
          </label>
          <textarea
            id="founder-name"
            name="name"
            rows={1}
            required
            defaultValue={initial.name}
            className="min-h-[2.5rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span id="founder-body-label" className="text-sm font-medium text-slate-800">
            Bio / Description
          </span>
          <PowerBannerDescriptionEditor
            id="founder-body"
            ariaLabelledBy="founder-body-label"
            value={bodyHtml}
            onChange={setBodyHtml}
          />
          <p className="text-xs text-slate-500">
            Rich text shown beneath the founder&apos;s name. Leave empty to hide on the site.
          </p>
        </div>

        <CopyMessages state={copyState} />

        <MediaFormSubmitButton pendingLabel="Saving…">
          Save name &amp; bio
        </MediaFormSubmitButton>
      </form>
    </div>
  );
}
