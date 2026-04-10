"use client";

import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";

import { OrderedGallerySlidePreviewPane } from "./OrderedGallerySlidePreviewPane";
import { OrderedGallerySlideToolbar } from "./OrderedGallerySlideToolbar";

type OrderedGallerySlideCardProps = {
  item: AdminOrderedItemRow;
  index: number;
  total: number;
  rowContextLabel: string;
  recommendedSize: string;
  pending: boolean;
  onMove: (index: number, delta: number) => void;
  onDelete: (id: string) => void;
};

export function OrderedGallerySlideCard({
  item,
  index,
  total,
  rowContextLabel,
  recommendedSize,
  pending,
  onMove,
  onDelete,
}: OrderedGallerySlideCardProps) {
  const positionLabel = `${rowContextLabel} · slide ${index + 1}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md ring-1 ring-slate-100">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <OrderedGallerySlidePreviewPane
          item={item}
          positionLabel={positionLabel}
          index={index}
          total={total}
        />
        <OrderedGallerySlideToolbar
          item={item}
          positionLabel={positionLabel}
          rowContextLabel={rowContextLabel}
          recommendedSize={recommendedSize}
          index={index}
          total={total}
          pending={pending}
          onMove={onMove}
          onDelete={onDelete}
        />
      </div>
    </article>
  );
}
