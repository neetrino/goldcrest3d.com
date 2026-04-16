"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  clearPowerBannerHeroImage,
  uploadPowerBannerHeroImage,
  type PowerBannerHeroImageActionResult,
} from "@/app/actions/power-banner-hero-image";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";
import {
  DEFAULT_IMAGE_FRAMING,
  framingFingerprint,
  framingToCoverImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

import { ImageFramingEditor } from "./ImageFramingEditor";
import { ImageUploadControl } from "./ImageUploadControl";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import {
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";

type PowerBannerHeroImageEditorProps = {
  bannerKey: PowerBannerKey;
  desktopPreviewSrc: string;
  heroImageR2Key: string | null;
  heroImageFraming: ImageFraming | null;
};

function HeroImageMessages({ state }: { state: PowerBannerHeroImageActionResult | null }) {
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
        Hero image updated — the homepage reflects this change.
      </p>
    );
  }
  return null;
}

export function PowerBannerHeroImageEditor({
  bannerKey,
  desktopPreviewSrc,
  heroImageR2Key,
  heroImageFraming,
}: PowerBannerHeroImageEditorProps) {
  const router = useRouter();
  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: PowerBannerHeroImageActionResult | null,
      formData: FormData,
    ): Promise<PowerBannerHeroImageActionResult | null> => {
      return uploadPowerBannerHeroImage(_prev, formData);
    },
    null,
  );

  const [clearState, clearAction, clearPending] = useActionState(
    async (
      _prev: PowerBannerHeroImageActionResult | null,
      formData: FormData,
    ): Promise<PowerBannerHeroImageActionResult | null> => {
      return clearPowerBannerHeroImage(_prev, formData);
    },
    null,
  );

  useEffect(() => {
    if (uploadState?.ok || clearState?.ok) {
      router.refresh();
    }
  }, [uploadState?.ok, clearState?.ok, router]);

  const storedName = formatR2ObjectDisplayName(heroImageR2Key);
  const usingCustom = Boolean(heroImageR2Key);
  const previewFraming = usingCustom
    ? heroImageFraming ?? DEFAULT_IMAGE_FRAMING
    : null;

  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
      <div className="mb-4 border-b border-slate-200/80 pb-3">
        <p className="text-sm font-semibold text-slate-900">Banner image</p>
        <p className="mt-1 text-xs text-slate-600">
          Shown on desktop/tablet hero for this slide. Mobile uses its own editor below. Custom
          uploads follow the same crop rules as the live site ({SITE_MEDIA_FORMATS_LABEL}, max{" "}
          {SITE_MEDIA_MAX_SIZE_MB} MB).
        </p>
      </div>

      <div className="relative mb-4 aspect-[21/9] w-full max-w-2xl overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <Image
          src={desktopPreviewSrc}
          alt=""
          fill
          unoptimized={desktopPreviewSrc.startsWith("/")}
          sizes="(max-width: 768px) 100vw, 672px"
          className={
            previewFraming ? "object-cover" : "object-cover object-center"
          }
          style={
            previewFraming ? framingToCoverImageStyle(previewFraming) : undefined
          }
        />
      </div>

      {storedName ? (
        <p className="mb-3 text-xs text-slate-600">
          <span className="font-medium text-slate-700">Stored file:</span>{" "}
          <span className="break-all text-slate-800">{storedName}</span>
        </p>
      ) : (
        <p className="mb-3 text-xs text-slate-500">
          Using the built-in site artwork for this slide (not uploaded to storage).
        </p>
      )}

      <form action={uploadAction} className="space-y-3">
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-slate-800">
            {usingCustom ? "Replace banner image" : "Upload a custom banner image"}
          </p>
          <ImageUploadControl
            disabled={uploadPending}
            stableDomId={`gc-power-banner-upload-${bannerKey}`}
          />
        </div>
        <HeroImageMessages state={uploadState} />
        <MediaFormSubmitButton pendingLabel="Uploading…">
          {usingCustom ? "Replace image" : "Upload image"}
        </MediaFormSubmitButton>
      </form>

      {usingCustom ? (
        <>
          <ImageFramingEditor
            key={`${bannerKey}-${framingFingerprint(heroImageFraming)}`}
            imageUrl={desktopPreviewSrc}
            initialFraming={heroImageFraming}
            aspectClassName="aspect-[21/9]"
            target={{ kind: "powerBanner", bannerKey }}
            enabled={!uploadPending && !clearPending}
          />
          <form action={clearAction} className="mt-4 border-t border-slate-200/80 pt-4">
          <input type="hidden" name="bannerKey" value={bannerKey} />
          <p className="mb-2 text-xs text-slate-600">
            Remove the uploaded file and restore the original built-in hero artwork for this slide.
          </p>
          <HeroImageMessages state={clearState} />
          <button
            type="submit"
            disabled={clearPending}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {clearPending ? "Resetting…" : "Restore built-in image"}
          </button>
        </form>
        </>
      ) : null}
    </div>
  );
}
