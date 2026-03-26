"use client";

import Image from "next/image";

import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";

type ModelingSlotPreviewProps = {
  row: AdminModelingSlotRow;
};

export function ModelingSlotPreview({ row }: ModelingSlotPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/80 shadow-inner">
      <div className="relative aspect-[16/10] w-full min-h-[180px]">
        {row.displayUrl ? (
          <Image
            src={row.displayUrl}
            alt={`Preview for ${row.label}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, min(520px, 40vw)"
            unoptimized
          />
        ) : (
          <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
              Default site image
            </span>
            <p className="max-w-[240px] text-sm text-slate-600">
              No custom image yet — visitors see the built-in placeholder for this block.
            </p>
          </div>
        )}
      </div>
      <div className="border-t border-slate-200/80 bg-slate-900 px-4 py-3 text-white">
        <p className="text-[15px] font-semibold leading-snug">{row.label}</p>
        <details className="mt-1.5 text-[11px] text-white/70">
          <summary className="cursor-pointer select-none text-white/80 hover:text-white">
            Technical details
          </summary>
          <p className="mt-1 font-mono text-[10px] text-white/60">Slot: {row.slotKey}</p>
        </details>
      </div>
    </div>
  );
}
