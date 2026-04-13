"use client";

import Image from "next/image";

import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";
import { framingToCoverImageStyle } from "@/lib/site-media/image-framing";

type OrderedGallerySlidePreviewPaneProps = {
  item: AdminOrderedItemRow;
  positionLabel: string;
  index: number;
  total: number;
};

export function OrderedGallerySlidePreviewPane({
  item,
  positionLabel,
  index,
  total,
}: OrderedGallerySlidePreviewPaneProps) {
  return (
    <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
      <div className="relative aspect-video w-full min-h-[200px] bg-gradient-to-b from-slate-50 to-slate-100/90">
        {item.displayUrl ? (
          <Image
            src={item.displayUrl}
            alt={`Gallery preview — ${positionLabel}`}
            fill
            className="object-cover"
            style={
              item.framing ? framingToCoverImageStyle(item.framing) : undefined
            }
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ) : (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="text-sm font-medium text-slate-600">No image yet</p>
            <p className="max-w-xs text-xs text-slate-500">
              Upload a file in the panel on the right.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-900 px-4 py-3 text-white">
        <div>
          <p className="text-sm font-semibold">{positionLabel}</p>
          <p className="text-xs text-white/75">
            Position {index + 1} of {total}
          </p>
        </div>
        <details className="text-[11px] text-white/65">
          <summary className="cursor-pointer hover:text-white/90">Details</summary>
          <p className="mt-1 max-w-[200px] font-mono text-[10px] leading-relaxed">
            id {item.id.slice(0, 8)}â€¦ Â· {item.slotKey}
          </p>
        </details>
      </div>
    </div>
  );
}
