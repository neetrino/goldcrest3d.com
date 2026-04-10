"use client";

import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";
import {
  SITE_MEDIA_GROUP_KEYS,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";

import { ORDERED_GALLERY_MAX_ITEMS } from "./media-manager.constants";
import { OrderedGalleryAddForm } from "./OrderedGalleryAddForm";
import { OrderedGallerySlideCard } from "./OrderedGallerySlideCard";
import { useOrderedGalleryActions } from "./useOrderedGalleryActions";

type OrderedGallerySectionProps = {
  title: string;
  description: string;
  groupKey: SiteMediaGroupKey;
  items: AdminOrderedItemRow[];
  /** Short label for “which row” (e.g. Top row / Bottom row) — shown in UI. */
  rowContextLabel: string;
  /** Recommended upload dimensions shown near upload controls. */
  recommendedSize: string;
};

export function OrderedGallerySection({
  title,
  description,
  groupKey,
  items,
  rowContextLabel,
  recommendedSize,
}: OrderedGallerySectionProps) {
  const orderedIds = items.map((i) => i.id);
  const { pending, move, onDelete } = useOrderedGalleryActions({
    groupKey,
    orderedIds,
  });
  const remainingSlots = ORDERED_GALLERY_MAX_ITEMS - items.length;

  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <OrderedGalleryAddForm
          groupKey={groupKey}
          canAdd={items.length < ORDERED_GALLERY_MAX_ITEMS}
          rowLabel={rowContextLabel}
          recommendedSize={recommendedSize}
        />

        {items.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-800">No images in this row yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Use “Add image” above — or the homepage will keep using its default artwork until
              you upload.
            </p>
          </div>
        ) : null}

        {items.map((item, index) => (
          <OrderedGallerySlideCard
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            rowContextLabel={rowContextLabel}
            recommendedSize={recommendedSize}
            pending={pending}
            onMove={move}
            onDelete={onDelete}
          />
        ))}

        {items.length > 0 && remainingSlots > 0 ? (
          <p className="text-center text-xs text-slate-500">
            You can add {remainingSlots} more image{remainingSlots === 1 ? "" : "s"} to this row
            (max {ORDERED_GALLERY_MAX_ITEMS}).
          </p>
        ) : null}
      </div>
    </section>
  );
}

type FinishedCreationsGalleryProps = {
  row1: AdminOrderedItemRow[];
  row2: AdminOrderedItemRow[];
};

export function FinishedCreationsGallery({
  row1,
  row2,
}: FinishedCreationsGalleryProps) {
  return (
    <div className="space-y-10">
      <OrderedGallerySection
        title="Finished Creations — top row"
        description="Large carousel images on the homepage. Order is the slide sequence visitors see."
        groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1}
        items={row1}
        rowContextLabel="Top row"
        recommendedSize="670 × 370 px"
      />
      <OrderedGallerySection
        title="Finished Creations — bottom row"
        description="Smaller images paired with the top row by slide index."
        groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2}
        items={row2}
        rowContextLabel="Bottom row"
        recommendedSize="420 × 232 px"
      />
    </div>
  );
}
