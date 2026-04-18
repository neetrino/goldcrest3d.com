"use client";

import { useEffect, useMemo, useState } from "react";

import type {
  ModelingSlotCopyBundle,
  ModelingSlotCopyEntry,
} from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import {
  MODELING_SLOT_KEYS,
  type ModelingSlotKey,
} from "@/lib/site-media/site-media.registry";
import {
  ModelingBlockBridal,
  ModelingBlockHeritage,
  ModelingBlockHighJewelry,
  ModelingBlockHipHop,
  ModelingBlockMechanical,
  ModelingBlockPortrait,
} from "@/components/landing/modeling";
import { MODELING_SPECIALIZATION_CARD_TEXT_MT } from "@/lib/modeling-slot-copy/modeling-text-overlay-presentation";

import { ModelingSlotCopyEditor } from "./ModelingSlotCopyEditor";
import { ModelingSlotPreview } from "./ModelingSlotPreview";
import { ModelingSlotVariantUpload } from "./ModelingSlotVariantUpload";

type ModelingSlotFormProps = {
  row: AdminModelingSlotRow;
  onOpenCopyEditor: (slotKey: ModelingSlotKey, variant: "desktop" | "mobile") => void;
};

function ModelingSlotForm({ row, onOpenCopyEditor }: ModelingSlotFormProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          {row.label}
        </p>
        <p className="mt-1 text-xs text-slate-500">Slot: {row.slotKey}</p>
      </div>
      <ModelingSlotPreview
        row={row}
        onEditDesktopCopy={() => onOpenCopyEditor(row.slotKey, "desktop")}
        onEditMobileCopy={() => onOpenCopyEditor(row.slotKey, "mobile")}
      />
      <ModelingSlotVariantUpload row={row} variant="desktop" />
      <ModelingSlotVariantUpload row={row} variant="mobile" />
    </div>
  );
}

type ModelingMediaSectionProps = {
  title: string;
  description: string;
  slots: AdminModelingSlotRow[];
  slotCopy: ModelingSlotCopyBundle;
};

export function ModelingMediaSection({
  title,
  description,
  slots,
  slotCopy,
}: ModelingMediaSectionProps) {
  const [editingTarget, setEditingTarget] = useState<{
    slotKey: ModelingSlotKey;
    variant: "desktop" | "mobile";
  } | null>(null);

  const editingRow = useMemo(
    () => (editingTarget ? slots.find((row) => row.slotKey === editingTarget.slotKey) ?? null : null),
    [editingTarget, slots],
  );
  const editingCopy = editingTarget ? slotCopy[editingTarget.slotKey] : null;

  return (
    <>
      <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
        <div className="border-b border-slate-200/80 pb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            {description}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Each block has two slots — desktop/tablet and mobile. Upload both for best results;
            if mobile is omitted, the desktop file is used on small screens. Changes go live after
            a successful upload (refresh the homepage if needed).
          </p>
          <p className="mt-3 text-sm text-slate-500">
            To edit text, click the image preview on a card. The popup editor contains only title
            and description fields.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {slots.map((row) => (
            <ModelingSlotForm
              key={row.slotKey}
              row={row}
              onOpenCopyEditor={(slotKey, variant) => setEditingTarget({ slotKey, variant })}
            />
          ))}
        </div>
      </section>
      {editingRow && editingCopy && editingTarget ? (
        <ModelingCopyModal
          row={editingRow}
          copy={editingCopy}
          variant={editingTarget.variant}
          onClose={() => setEditingTarget(null)}
        />
      ) : null}
    </>
  );
}

type ModelingCopyModalProps = {
  row: AdminModelingSlotRow;
  copy: ModelingSlotCopyEntry;
  variant: "desktop" | "mobile";
  onClose: () => void;
};

function ModelingCopyModal({ row, copy, variant, onClose }: ModelingCopyModalProps) {
  const isDesktopVariant = variant === "desktop";
  const [viewportWidthPx, setViewportWidthPx] = useState(1920);
  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidthPx(window.innerWidth);
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const sectionWidthPx = Math.min(1920, Math.max(320, viewportWidthPx - 40));
  const modelingScale = Math.min(1, Math.max(0.5, sectionWidthPx / 1920));
  const desktopGridGapPx = 8 * modelingScale;
  const desktopCardWidthPx = Math.round((sectionWidthPx - desktopGridGapPx) / 2);
  const mobileCardWidthPx = Math.max(280, Math.round(viewportWidthPx - 24));
  const previewWidthPx = isDesktopVariant ? desktopCardWidthPx : mobileCardWidthPx;
  const modalMaxWidthPx = Math.min(
    1200,
    Math.max(560, previewWidthPx + 48),
  );
  const [titleDraft, setTitleDraft] = useState(
    isDesktopVariant ? copy.title : copy.titleMobile,
  );
  const [bodyDraft, setBodyDraft] = useState(
    isDesktopVariant ? copy.body : copy.bodyMobile,
  );
  const previewCopy = useMemo<ModelingSlotCopyEntry>(
    () => ({
      ...copy,
      // Keep preview synchronized with the active draft across breakpoints.
      // Without this, desktop editing can appear correct in a narrow modal (mobile branch)
      // while saving an empty desktop field, causing missing text on the live desktop page.
      title: titleDraft,
      titleMobile: titleDraft,
      body: bodyDraft,
      bodyMobile: bodyDraft,
    }),
    [bodyDraft, copy, titleDraft],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
        style={{ maxWidth: `${modalMaxWidthPx}px` }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="min-h-0 overflow-y-auto pr-1">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
              {row.label}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Update {isDesktopVariant ? "Desktop / tablet" : "Mobile"} title and description.
            </p>
          </div>
          <div className="mb-5 rounded-xl border border-slate-200 bg-slate-100 p-2">
            <div
              className="mx-auto w-full modeling-specialization-card-text-scale"
              style={{
              ["--ms" as string]: String(isDesktopVariant ? modelingScale : 1),
              ["--mt" as string]: String(MODELING_SPECIALIZATION_CARD_TEXT_MT),
                maxWidth: `${previewWidthPx}px`,
              }}
            >
              <ModelingLiveCardPreview row={row} copy={previewCopy} variant={variant} />
            </div>
          </div>

          <ModelingSlotCopyEditor
            key={row.slotKey}
            slotKey={row.slotKey}
            variant={variant}
            titleValue={titleDraft}
            bodyValue={bodyDraft}
            onTitleChange={setTitleDraft}
            onBodyChange={setBodyDraft}
            onCancel={onClose}
            onSaved={onClose}
          />
        </div>
      </div>
    </div>
  );
}

type ModelingLiveCardPreviewProps = {
  row: AdminModelingSlotRow;
  copy: ModelingSlotCopyEntry;
  variant: "desktop" | "mobile";
};

function ModelingLiveCardPreview({ row, copy, variant }: ModelingLiveCardPreviewProps) {
  const isDesktopVariant = variant === "desktop";
  const imageUrlDesktop = isDesktopVariant
    ? row.displayUrl
    : row.displayUrlMobile ?? row.displayUrl;
  const imageUrlMobile = isDesktopVariant
    ? row.displayUrl
    : row.displayUrlMobile ?? row.displayUrl;
  const imageFramingDesktop = isDesktopVariant ? row.desktopFraming : row.mobileFraming;
  const imageFramingMobile = isDesktopVariant ? row.desktopFraming : row.mobileFraming;

  if (!imageUrlDesktop) {
    return (
      <div className="flex aspect-[83/43] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 text-sm text-slate-500">
        Upload a {isDesktopVariant ? "desktop" : "mobile"} image to see the live overlay preview.
      </div>
    );
  }
  const desktopImageUrl = imageUrlDesktop;
  const mobileImageUrl = imageUrlMobile ?? imageUrlDesktop;

  switch (row.slotKey) {
    case MODELING_SLOT_KEYS.HIP_HOP:
      return (
        <ModelingBlockHipHop
          copy={copy}
          imageUrlDesktop={desktopImageUrl}
          imageUrlMobile={mobileImageUrl}
          imageFramingDesktop={imageFramingDesktop}
          imageFramingMobile={imageFramingMobile}
          independentTitleDescription
          adminPreviewLeftOrigin
        />
      );
    case MODELING_SLOT_KEYS.BRIDAL:
      return (
        <ModelingBlockBridal
          copy={copy}
          imageUrlDesktop={desktopImageUrl}
          imageUrlMobile={mobileImageUrl}
          imageFramingDesktop={imageFramingDesktop}
          imageFramingMobile={imageFramingMobile}
          independentTitleDescription
          adminPreviewLeftOrigin
        />
      );
    case MODELING_SLOT_KEYS.PORTRAIT:
      return (
        <ModelingBlockPortrait
          copy={copy}
          imageUrlDesktop={desktopImageUrl}
          imageUrlMobile={mobileImageUrl}
          imageFramingDesktop={imageFramingDesktop}
          imageFramingMobile={imageFramingMobile}
          adminPreviewLeftOrigin
        />
      );
    case MODELING_SLOT_KEYS.MECHANICAL:
      return (
        <ModelingBlockMechanical
          copy={copy}
          imageUrlDesktop={desktopImageUrl}
          imageUrlMobile={mobileImageUrl}
          imageFramingDesktop={imageFramingDesktop}
          imageFramingMobile={imageFramingMobile}
          adminPreviewLeftOrigin
        />
      );
    case MODELING_SLOT_KEYS.HERITAGE:
      return (
        <ModelingBlockHeritage
          copy={copy}
          imageUrlDesktop={desktopImageUrl}
          imageUrlMobile={mobileImageUrl}
          imageFramingDesktop={imageFramingDesktop}
          imageFramingMobile={imageFramingMobile}
          adminPreviewLeftOrigin
        />
      );
    case MODELING_SLOT_KEYS.HIGH_JEWELRY:
      return (
        <ModelingBlockHighJewelry
          copy={copy}
          imageUrlDesktop={desktopImageUrl}
          imageUrlMobile={mobileImageUrl}
          imageFramingDesktop={imageFramingDesktop}
          imageFramingMobile={imageFramingMobile}
          adminPreviewLeftOrigin
        />
      );
    default:
      return null;
  }
}
