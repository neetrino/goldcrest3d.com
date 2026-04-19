"use client";

import {
  getManufacturingDetailPhotoLayoutClassName,
  MANUFACTURING_SPECIALIZATION_ITEMS,
  resolveManufacturingDetailImageDimensions,
  type ManufacturingSpecializationId,
} from "@/constants/manufacturing-specialization";
import {
  updateManufacturingIntelligenceItem,
  updateManufacturingIntelligenceMobileItem,
  upsertManufacturingIntelligenceImage,
  upsertManufacturingIntelligenceMobileImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminManufacturingItemRow } from "@/lib/site-media/get-site-media-admin";
import { getManufacturingImageTransformCssValue } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PointerEventHandler } from "react";
import { useActionState, useEffect, useRef, useState } from "react";

import { ImageUploadControl } from "./ImageUploadControl";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";
import {
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const MIN_OFFSET = -400;
const MAX_OFFSET = 400;
const NUDGE_STEP = 12;

type TransformState = {
  zoom: number;
  offsetX: number;
  offsetY: number;
};

const MANUFACTURING_LAYOUT_BY_ID = new Map(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item) => {
    const dims = resolveManufacturingDetailImageDimensions(item.detailPhotoLayout);
    return [item.id, dims] as const;
  }),
);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeTransform(transform: TransformState): TransformState {
  return {
    zoom: clamp(transform.zoom, MIN_ZOOM, MAX_ZOOM),
    offsetX: clamp(transform.offsetX, MIN_OFFSET, MAX_OFFSET),
    offsetY: clamp(transform.offsetY, MIN_OFFSET, MAX_OFFSET),
  };
}

function toInitialTransform(row: AdminManufacturingItemRow): TransformState {
  return normalizeTransform({
    zoom: row.zoom,
    offsetX: row.offsetX,
    offsetY: row.offsetY,
  });
}

type ManufacturingItemEditorProps = {
  row: AdminManufacturingItemRow;
  variant: ManufacturingSectionVariant;
};

type ManufacturingSectionVariant = "desktop" | "mobile";

const SECTION_META: Record<
  ManufacturingSectionVariant,
  {
    badge: string;
    title: string;
    description: string;
  }
> = {
  desktop: {
    badge: "Desktop manufacturing",
    title: "Manufacturing Intelligence",
    description:
      "Edit desktop accordion text and detail images. Preview uses the same transform logic as the live section.",
  },
  mobile: {
    badge: "Mobile manufacturing",
    title: "Manufacturing Intelligence — Mobile",
    description:
      "Edit mobile-only Manufacturing Intelligence copy and images. Saved values render only on mobile devices.",
  },
};

function ManufacturingItemEditor({ row, variant }: ManufacturingItemEditorProps) {
  const router = useRouter();
  const [transform, setTransform] = useState<TransformState>(toInitialTransform(row));
  const draggingRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  const [saveState, saveAction, savePending] = useActionState<
    SiteMediaActionResult | null,
    FormData
  >(variant === "mobile" ? updateManufacturingIntelligenceMobileItem : updateManufacturingIntelligenceItem, null);
  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return variant === "mobile"
        ? upsertManufacturingIntelligenceMobileImage(row.id, formData)
        : upsertManufacturingIntelligenceImage(row.id, formData);
    },
    null,
  );

  useEffect(() => {
    if (saveState?.ok || uploadState?.ok) {
      router.refresh();
    }
  }, [router, saveState?.ok, uploadState?.ok]);

  useEffect(() => {
    setTransform(toInitialTransform(row));
  }, [row.id, row.zoom, row.offsetX, row.offsetY]);

  useEffect(() => {
    return () => {
      draggingRef.current = null;
    };
  }, []);

  const layoutMeta = MANUFACTURING_LAYOUT_BY_ID.get(row.id as ManufacturingSpecializationId);
  const imageClassName = layoutMeta
    ? getManufacturingDetailPhotoLayoutClassName(layoutMeta.photoLayout)
    : "";
  const imageWidth = layoutMeta?.widthPx ?? 980;
  const imageHeight = layoutMeta?.heightPx ?? 653;

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!row.displayUrl || event.button !== 0) return;
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

  const currentFileName = formatR2ObjectDisplayName(row.imageObjectKey);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 border-b border-slate-200/80 pb-4">
        <h3 className="text-base font-semibold text-slate-900">{row.label}</h3>
      </div>

      <form action={uploadAction} className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
        <p className="text-sm font-semibold text-slate-900">Image</p>
        {currentFileName ? (
          <p className="mt-1 text-xs text-slate-600">
            <span className="font-medium text-slate-700">Stored file:</span>{" "}
            <span className="break-all text-slate-800">{currentFileName}</span>
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">No file uploaded for this item yet.</p>
        )}
        <p className="mt-2 text-xs text-slate-500">
          {SITE_MEDIA_FORMATS_LABEL} · max {SITE_MEDIA_MAX_SIZE_MB} MB
        </p>
        <div className="mt-3">
          <ImageUploadControl
            disabled={uploadPending}
            stableDomId={`gc-manufacturing-${variant}-upload-${row.id}`}
          />
        </div>
        <div className="mt-4">
          <MediaFormSubmitButton pendingLabel="Uploading…">
            {row.imageObjectKey ? "Replace image" : "Upload image"}
          </MediaFormSubmitButton>
        </div>
        <div className="mt-3">
          <ModelingSlotFormMessages state={uploadState} />
        </div>
      </form>

      <form action={saveAction} className="mt-4 space-y-4 rounded-xl border border-slate-200/90 bg-white p-4">
        <input type="hidden" name="itemId" value={row.id} />
        <input type="hidden" name="zoom" value={transform.zoom.toFixed(3)} />
        <input type="hidden" name="offsetX" value={Math.round(transform.offsetX)} />
        <input type="hidden" name="offsetY" value={Math.round(transform.offsetY)} />

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            type="text"
            name="title"
            defaultValue={row.title}
            disabled={savePending}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            name="description"
            rows={5}
            defaultValue={row.description}
            disabled={savePending}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Image alt text</span>
          <input
            type="text"
            name="imageAlt"
            defaultValue={row.imageAlt}
            disabled={savePending}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

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
            {row.displayUrl ? (
              <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                <div style={{ transform: getManufacturingImageTransformCssValue(transform) }}>
                  <Image
                    src={row.displayUrl}
                    alt={row.imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    sizes="420px"
                    className={`manufacturing-intelligence-photo-detail relative max-h-full ${imageClassName}`}
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center text-xs text-slate-500">
                Upload an image to preview transform controls.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Zoom ({transform.zoom.toFixed(2)}x)
            </span>
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
              disabled={savePending}
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
            onClick={() => setTransform(toInitialTransform(row))}
            className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset transform
          </button>
        </div>

        <ModelingSlotFormMessages state={saveState} />
        <MediaFormSubmitButton pendingLabel="Saving…">Save text and transform</MediaFormSubmitButton>
      </form>
    </div>
  );
}

type ManufacturingIntelligenceSectionProps = {
  rows: AdminManufacturingItemRow[];
  variant?: ManufacturingSectionVariant;
};

export function ManufacturingIntelligenceSection({
  rows,
  variant = "desktop",
}: ManufacturingIntelligenceSectionProps) {
  const meta = SECTION_META[variant];
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">{meta.badge}</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{meta.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {meta.description}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {rows.map((row) => (
          <ManufacturingItemEditor key={`${variant}-${row.id}`} row={row} variant={variant} />
        ))}
      </div>
    </section>
  );
}
