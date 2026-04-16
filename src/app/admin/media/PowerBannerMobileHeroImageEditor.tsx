"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  clearPowerBannerMobileHeroImage,
  uploadPowerBannerMobileHeroImage,
  type PowerBannerMobileHeroImageActionResult,
} from "@/app/actions/power-banner-mobile-hero-image";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";
import {
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

type PowerBannerMobileHeroImageEditorProps = {
  bannerKey: PowerBannerKey;
  mobilePreviewSrc: string;
  heroImageMobileR2Key: string | null;
  heroImageFramingMobile: ImageFraming | null;
};

function HeroImageMessages({ state }: { state: PowerBannerMobileHeroImageActionResult | null }) {
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
        Mobile hero image updated.
      </p>
    );
  }
  return null;
}

export function PowerBannerMobileHeroImageEditor({
  bannerKey,
  mobilePreviewSrc,
  heroImageMobileR2Key,
  heroImageFramingMobile,
}: PowerBannerMobileHeroImageEditorProps) {
  const router = useRouter();
  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: PowerBannerMobileHeroImageActionResult | null,
      formData: FormData,
    ): Promise<PowerBannerMobileHeroImageActionResult | null> => {
      return uploadPowerBannerMobileHeroImage(_prev, formData);
    },
    null,
  );

  const [clearState, clearAction, clearPending] = useActionState(
    async (
      _prev: PowerBannerMobileHeroImageActionResult | null,
      formData: FormData,
    ): Promise<PowerBannerMobileHeroImageActionResult | null> => {
      return clearPowerBannerMobileHeroImage(_prev, formData);
    },
    null,
  );

  useEffect(() => {
    if (uploadState?.ok || clearState?.ok) {
      router.refresh();
    }
  }, [uploadState?.ok, clearState?.ok, router]);

  const storedName = formatR2ObjectDisplayName(heroImageMobileR2Key);
  const usingCustom = Boolean(heroImageMobileR2Key);
  const previewFraming = heroImageFramingMobile ?? null;

  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
      <div className="mb-4 border-b border-slate-200/80 pb-3">
        <p className="text-sm font-semibold text-slate-900">Mobile banner image</p>
        <p className="mt-1 text-xs text-slate-600">
          Only used on mobile breakpoints. Desktop/tablet hero visuals are not affected
          ({SITE_MEDIA_FORMATS_LABEL}, max {SITE_MEDIA_MAX_SIZE_MB} MB).
        </p>
      </div>

      <div className="relative mb-4 aspect-[9/16] w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <Image
          src={mobilePreviewSrc}
          alt=""
          fill
          unoptimized={mobilePreviewSrc.startsWith("/")}
          sizes="(max-width: 768px) 100vw, 320px"
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
        <p className="mb-3 text-xs text-slate-500">Using the built-in mobile artwork for this slide.</p>
      )}

      <form action={uploadAction} className="space-y-3">
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-slate-800">
            {usingCustom ? "Replace mobile image" : "Upload a custom mobile image"}
          </p>
          <ImageUploadControl
            disabled={uploadPending}
            stableDomId={`gc-power-banner-mobile-upload-${bannerKey}`}
          />
        </div>
        <HeroImageMessages state={uploadState} />
        <MediaFormSubmitButton pendingLabel="Uploading...">
          {usingCustom ? "Replace mobile image" : "Upload mobile image"}
        </MediaFormSubmitButton>
      </form>

      <ImageFramingEditor
        key={`${bannerKey}-mobile-${framingFingerprint(heroImageFramingMobile)}`}
        imageUrl={mobilePreviewSrc}
        initialFraming={heroImageFramingMobile}
        aspectClassName="aspect-[9/16]"
        target={{ kind: "powerBanner", bannerKey, variant: "mobile" }}
        enabled={!uploadPending && !clearPending}
        previewSizes="(max-width: 768px) 100vw, 320px"
      />
      {usingCustom ? (
        <>
          <form action={clearAction} className="mt-4 border-t border-slate-200/80 pt-4">
            <input type="hidden" name="bannerKey" value={bannerKey} />
            <p className="mb-2 text-xs text-slate-600">
              Remove the uploaded mobile file and restore the built-in mobile artwork for this slide.
            </p>
            <HeroImageMessages state={clearState} />
            <button
              type="submit"
              disabled={clearPending}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {clearPending ? "Resetting..." : "Restore built-in mobile image"}
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}
