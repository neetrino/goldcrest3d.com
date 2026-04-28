"use client";

import { useRouter } from "next/navigation";
import type { PointerEventHandler } from "react";
import { useActionState, useEffect, useRef, useState } from "react";

import { updatePowerBannerCopy } from "@/app/actions/power-banner-copy";
import {
  updateHeroBannerTransform,
  upsertHeroBannerImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import { getManufacturingImageTransformCssValue } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
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
import {
  clampMobileCopyOffsetPx,
  PowerBannerMobileVerticalOffsets,
} from "./PowerBannerMobileVerticalOffsets";
import Image from "next/image";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const MIN_OFFSET = -400;
const MAX_OFFSET = 400;
const NUDGE_STEP = 12;
const RECOMMENDED_IMAGE_SIZE: Record<PowerBannerViewport, { width: number; height: number }> = {
  desktop: { width: 1918, height: 707 },
  mobile: { width: 367, height: 679 },
};

type TransformState = {
  zoom: number;
  offsetX: number;
  offsetY: number;
};

function clamp(value: number, min: number, max: number): number {
  const v = Number.isFinite(value) ? value : 0;
  return Math.min(max, Math.max(min, v));
}

function normalizeTransform(transform: TransformState): TransformState {
  return {
    zoom: clamp(transform.zoom, MIN_ZOOM, MAX_ZOOM),
    offsetX: clamp(transform.offsetX, MIN_OFFSET, MAX_OFFSET),
    offsetY: clamp(transform.offsetY, MIN_OFFSET, MAX_OFFSET),
  };
}

function toInitialTransform(initial: PowerBannerCopyEntry): TransformState {
  return normalizeTransform({
    zoom: initial.imageTransform.zoom,
    offsetX: initial.imageTransform.offsetX,
    offsetY: initial.imageTransform.offsetY,
  });
}

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
  const bannerTitle = initial.title.trim() || meta.name;
  const viewportLabel = viewport === "desktop" ? "Desktop" : "Mobile";
  const recommendedSize = RECOMMENDED_IMAGE_SIZE[viewport];
  const [transform, setTransform] = useState<TransformState>(toInitialTransform(initial));
  const [titleOffsetY, setTitleOffsetY] = useState(() =>
    clampMobileCopyOffsetPx(initial.titleOffsetY),
  );
  const [bodyOffsetY, setBodyOffsetY] = useState(() =>
    clampMobileCopyOffsetPx(initial.bodyOffsetY),
  );
  const [ctaOffsetY, setCtaOffsetY] = useState(() =>
    clampMobileCopyOffsetPx(initial.ctaOffsetY),
  );
  const draggingRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  const [state, formAction, savePending] = useActionState(updatePowerBannerCopy, null);
  const [transformState, transformAction, transformPending] = useActionState<
    SiteMediaActionResult | null,
    FormData
  >(updateHeroBannerTransform, null);
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
    if (state?.ok || uploadState?.ok || transformState?.ok) {
      router.refresh();
    }
  }, [state?.ok, uploadState?.ok, transformState?.ok, router]);

  useEffect(() => {
    return () => {
      draggingRef.current = null;
    };
  }, []);

  const currentFileName = formatR2ObjectDisplayName(initial.imageObjectKey);
  const imageSrc = initial.imageSrc;

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!imageSrc || event.button !== 0) return;
    event.preventDefault();
    draggingRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: transform.offsetX,
      startOffsetY: transform.offsetY,
    };
    const nextTarget = event.currentTarget;
    nextTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const drag = draggingRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    setTransform(
      normalizeTransform({
        zoom: transform.zoom,
        offsetX: drag.startOffsetX + deltaX,
        offsetY: drag.startOffsetY + deltaY,
      }),
    );
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (draggingRef.current?.pointerId === event.pointerId) {
      draggingRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const nudge = (dx: number, dy: number) => {
    setTransform((prev) =>
      normalizeTransform({
        ...prev,
        offsetX: prev.offsetX + dx,
        offsetY: prev.offsetY + dy,
      }),
    );
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6"
      aria-label={`Edit ${viewportLabel.toLowerCase()} hero banner for ${bannerTitle}`}
    >
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          {viewportLabel} hero banner
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          {bannerTitle}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{meta.hint}</p>
      </div>

      <form action={uploadAction} className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-sm font-semibold text-slate-900">{viewportLabel} image</p>
          <p className="text-xs text-slate-500">
            Recommended: {recommendedSize.width}px x {recommendedSize.height}px
          </p>
        </div>
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

      <form action={transformAction} className="space-y-4 rounded-xl border border-slate-200/90 bg-white p-4">
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <input type="hidden" name="viewport" value={viewport} />
        <input type="hidden" name="imageAlt" value={initial.imageAlt} />
        <input type="hidden" name="zoom" value={transform.zoom.toFixed(3)} />
        <input type="hidden" name="offsetX" value={Math.round(transform.offsetX)} />
        <input type="hidden" name="offsetY" value={Math.round(transform.offsetY)} />

        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-sm font-medium text-slate-800">Preview (matches live transform)</p>
          <p className="mt-1 text-xs text-slate-500">
            Drag image to reposition. Use slider/buttons for fine control.
          </p>
          <div
            className="manufacturing-intelligence-image-frame relative mx-auto mt-3 aspect-[750/625] w-full max-w-[420px] touch-none overflow-hidden rounded-md bg-white"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
              <Image
                src={imageSrc}
                alt={initial.imageAlt}
                width={980}
                height={653}
                sizes="420px"
                className="relative h-auto max-h-full w-auto max-w-none transition-transform duration-150"
                style={{
                  transform: getManufacturingImageTransformCssValue(transform),
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Zoom ({transform.zoom.toFixed(2)}x)</span>
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={0.01}
              value={transform.zoom}
              onChange={(event) =>
                setTransform((prev) =>
                  normalizeTransform({ ...prev, zoom: Number(event.target.value) }),
                )
              }
              disabled={transformPending}
              className="w-full accent-slate-800"
            />
          </label>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Horizontal</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{Math.round(transform.offsetX)} px</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Vertical</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{Math.round(transform.offsetY)} px</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <button
            type="button"
            onClick={() => nudge(0, -NUDGE_STEP)}
            className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Up
          </button>
          <button
            type="button"
            onClick={() => nudge(-NUDGE_STEP, 0)}
            className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => nudge(NUDGE_STEP, 0)}
            className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Right
          </button>
          <button
            type="button"
            onClick={() => nudge(0, NUDGE_STEP)}
            className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Down
          </button>
          <button
            type="button"
            onClick={() => setTransform(toInitialTransform(initial))}
            className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset transform
          </button>
        </div>

        <ModelingSlotFormMessages state={transformState} />
        <MediaFormSubmitButton pendingLabel="Saving…">Save image transform</MediaFormSubmitButton>
      </form>

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="bannerKey" value={bannerKey} />
        <input type="hidden" name="viewport" value={viewport} />
        <input
          type="hidden"
          name="titleOffsetY"
          value={String(clampMobileCopyOffsetPx(titleOffsetY))}
        />
        <input
          type="hidden"
          name="bodyOffsetY"
          value={String(clampMobileCopyOffsetPx(bodyOffsetY))}
        />
        <input
          type="hidden"
          name="ctaOffsetY"
          value={String(clampMobileCopyOffsetPx(ctaOffsetY))}
        />

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

        <PowerBannerMobileVerticalOffsets
          viewportLabel={viewport === "desktop" ? "Desktop" : "Mobile"}
          titleOffsetY={titleOffsetY}
          bodyOffsetY={bodyOffsetY}
          ctaOffsetY={ctaOffsetY}
          onNudgeTitle={(delta) =>
            setTitleOffsetY((prev) => clampMobileCopyOffsetPx(prev + delta))
          }
          onNudgeBody={(delta) =>
            setBodyOffsetY((prev) => clampMobileCopyOffsetPx(prev + delta))
          }
          onNudgeCta={(delta) =>
            setCtaOffsetY((prev) => clampMobileCopyOffsetPx(prev + delta))
          }
        />

        <PowerBannerCopyMessages state={state} />

        <MediaFormSubmitButton pendingLabel="Saving…">Save banner text</MediaFormSubmitButton>
      </form>
    </div>
  );
}
