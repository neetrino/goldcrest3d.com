"use client";

import {
  updateFounderSectionContent,
  upsertFounderSectionImage,
  type FounderSectionVariant,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import { getManufacturingImageTransformCssValue } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type { AdminFounderSectionRow } from "@/lib/site-media/get-site-media-admin";
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

type FounderSectionEditorProps = {
  row: AdminFounderSectionRow;
  variant: FounderSectionVariant;
};

const SECTION_META: Record<FounderSectionVariant, { badge: string; title: string; description: string }> = {
  desktop: {
    badge: "Founder desktop",
    title: "Founder & Lead CAD Engineer (Desktop)",
    description: "Desktop-only content and image transform controls for the Founder section.",
  },
  mobile: {
    badge: "Founder mobile",
    title: "Founder & Lead CAD Engineer Mobile",
    description: "Mobile-only content and image transform controls for the Founder section.",
  },
};

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

function toInitialTransform(row: AdminFounderSectionRow): TransformState {
  return normalizeTransform({
    zoom: row.image.transform.zoom,
    offsetX: row.image.transform.offsetX,
    offsetY: row.image.transform.offsetY,
  });
}

export function FounderSectionEditor({ row, variant }: FounderSectionEditorProps) {
  const router = useRouter();
  const meta = SECTION_META[variant];
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
  >(
    async (prevState, formData) => updateFounderSectionContent(variant, prevState, formData),
    null,
  );
  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => upsertFounderSectionImage(variant, formData),
    null,
  );

  useEffect(() => {
    if (saveState?.ok || uploadState?.ok) {
      router.refresh();
    }
  }, [router, saveState?.ok, uploadState?.ok]);

  useEffect(() => {
    setTransform(toInitialTransform(row));
  }, [row.image.transform.zoom, row.image.transform.offsetX, row.image.transform.offsetY]);

  useEffect(
    () => () => {
      draggingRef.current = null;
    },
    [],
  );

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!row.image.src || event.button !== 0) return;
    event.preventDefault();
    draggingRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: transform.offsetX,
      startOffsetY: transform.offsetY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const drag = draggingRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setTransform(
      normalizeTransform({
        zoom: transform.zoom,
        offsetX: drag.startOffsetX + (event.clientX - drag.startX),
        offsetY: drag.startOffsetY + (event.clientY - drag.startY),
      }),
    );
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (draggingRef.current?.pointerId !== event.pointerId) return;
    draggingRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
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
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">{meta.badge}</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{meta.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{meta.description}</p>
      </div>

      <form action={uploadAction} className="mt-6 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
        <p className="text-sm font-semibold text-slate-900">Image</p>
        {currentFileName ? (
          <p className="mt-1 text-xs text-slate-600">
            <span className="font-medium text-slate-700">Stored file:</span>{" "}
            <span className="break-all text-slate-800">{currentFileName}</span>
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">No file uploaded for this section yet.</p>
        )}
        <p className="mt-2 text-xs text-slate-500">
          {SITE_MEDIA_FORMATS_LABEL} · max {SITE_MEDIA_MAX_SIZE_MB} MB
        </p>
        <div className="mt-3">
          <ImageUploadControl disabled={uploadPending} stableDomId={`gc-founder-${variant}-upload`} />
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
        <input type="hidden" name="zoom" value={transform.zoom.toFixed(3)} />
        <input type="hidden" name="offsetX" value={Math.round(transform.offsetX)} />
        <input type="hidden" name="offsetY" value={Math.round(transform.offsetY)} />

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Heading</span>
          <input type="text" name="heading" defaultValue={row.heading} disabled={savePending} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input type="text" name="name" defaultValue={row.name} disabled={savePending} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Bio paragraph 1</span>
          <textarea name="bioP1" rows={4} defaultValue={row.bioParagraphs[0]} disabled={savePending} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Bio paragraph 2</span>
          <textarea name="bioP2" rows={4} defaultValue={row.bioParagraphs[1]} disabled={savePending} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80" />
        </label>
        {variant === "mobile" ? (
          <>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">Bio paragraph 3</span>
              <textarea name="bioP3" rows={4} defaultValue={row.bioParagraphs[2]} disabled={savePending} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">Bio paragraph 4</span>
              <textarea name="bioP4" rows={4} defaultValue={row.bioParagraphs[3]} disabled={savePending} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80" />
            </label>
          </>
        ) : (
          <>
            <input type="hidden" name="bioP3" value={row.bioParagraphs[2]} />
            <input type="hidden" name="bioP4" value={row.bioParagraphs[3]} />
          </>
        )}

        <input type="hidden" name="yearsValue" value={row.stats.yearsValue} />
        <input type="hidden" name="yearsCaption" value={row.stats.yearsCaption} />
        <input type="hidden" name="projectsValue" value={row.stats.projectsValue} />
        <input type="hidden" name="projectsCaption" value={row.stats.projectsCaption} />
        <input type="hidden" name="imageAlt" value={row.image.alt} />

        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-sm font-medium text-slate-800">Preview (matches live transform)</p>
          <p className="mt-1 text-xs text-slate-500">Drag image to reposition. Use slider/buttons for fine control.</p>
          <div className="relative mx-auto mt-3 aspect-[750/625] w-full max-w-[420px] touch-none overflow-hidden rounded-md bg-white" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
            <div className="absolute inset-0" style={{ transform: getManufacturingImageTransformCssValue(transform) }}>
              <Image src={row.image.src} alt={row.image.alt} fill sizes="420px" className="object-cover object-center" />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Zoom ({transform.zoom.toFixed(2)}x)</span>
            <input type="range" min={MIN_ZOOM} max={MAX_ZOOM} step={0.01} value={transform.zoom} onChange={(event) => setTransform((prev) => normalizeTransform({ ...prev, zoom: Number(event.target.value) }))} disabled={savePending} className="w-full accent-slate-800" />
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
          <button type="button" onClick={() => nudge(0, -NUDGE_STEP)} className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">Up</button>
          <button type="button" onClick={() => nudge(-NUDGE_STEP, 0)} className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">Left</button>
          <button type="button" onClick={() => nudge(NUDGE_STEP, 0)} className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">Right</button>
          <button type="button" onClick={() => nudge(0, NUDGE_STEP)} className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">Down</button>
          <button type="button" onClick={() => setTransform(toInitialTransform(row))} className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">Reset transform</button>
        </div>

        <ModelingSlotFormMessages state={saveState} />
        <MediaFormSubmitButton pendingLabel="Saving…">Save text and transform</MediaFormSubmitButton>
      </form>
    </section>
  );
}
