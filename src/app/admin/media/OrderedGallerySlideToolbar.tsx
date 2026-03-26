"use client";

import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";

import { GallerySlideReorderButtons } from "./GallerySlideReorderButtons";
import { ReplaceOrderedGalleryImageForm } from "./ReplaceOrderedGalleryImageForm";

type OrderedGallerySlideToolbarProps = {
  item: AdminOrderedItemRow;
  positionLabel: string;
  index: number;
  total: number;
  pending: boolean;
  onMove: (index: number, delta: number) => void;
  onDelete: (id: string) => void;
};

export function OrderedGallerySlideToolbar({
  item,
  positionLabel,
  index,
  total,
  pending,
  onMove,
  onDelete,
}: OrderedGallerySlideToolbarProps) {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start gap-2">
        <GallerySlideReorderButtons
          index={index}
          total={total}
          pending={pending}
          onMove={onMove}
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => onDelete(item.id)}
          className="ml-auto inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-900 transition hover:bg-red-100 disabled:opacity-50"
        >
          Remove
        </button>
      </div>
      {pending ? (
        <p className="text-xs text-slate-500" aria-live="polite">
          Updating gallery…
        </p>
      ) : null}
      <ReplaceOrderedGalleryImageForm item={item} positionLabel={positionLabel} />
    </div>
  );
}
