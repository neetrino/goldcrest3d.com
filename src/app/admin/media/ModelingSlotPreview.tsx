"use client";

import Image from "next/image";

import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import {
  framingFingerprint,
  framingToCoverImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

import { ImageFramingEditor } from "./ImageFramingEditor";

type ModelingSlotPreviewProps = {
  row: AdminModelingSlotRow;
};

export function ModelingSlotPreview({ row }: ModelingSlotPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/80 shadow-inner">
      <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2">
        <PreviewPane
          label="Desktop / tablet preview"
          url={row.displayUrl}
          emptyMessage="No desktop image — default asset on site"
          framing={row.desktopFraming}
        />
        <PreviewPane
          label="Mobile preview"
          url={row.displayUrlMobile ?? row.displayUrl}
          emptyMessage={
            row.displayUrl
              ? "No separate mobile — falls back to desktop"
              : "No mobile image — default asset on site"
          }
          isFallback={!row.displayUrlMobile && Boolean(row.displayUrl)}
          framing={row.displayUrlMobile ? row.mobileFraming : row.desktopFraming}
        />
      </div>
      {row.itemId && row.displayUrl ? (
        <div className="border-t border-slate-200 bg-white px-3 py-3">
          <ImageFramingEditor
            key={`${row.slotKey}-desktop-${framingFingerprint(row.desktopFraming)}`}
            imageUrl={row.displayUrl}
            initialFraming={row.desktopFraming}
            aspectClassName="aspect-[16/10]"
            target={{ kind: "modeling", slotId: row.slotKey, variant: "desktop" }}
            enabled
          />
        </div>
      ) : null}
      {row.itemId && row.displayUrlMobile ? (
        <div className="border-t border-slate-200 bg-white px-3 py-3">
          <ImageFramingEditor
            key={`${row.slotKey}-mobile-${framingFingerprint(row.mobileFraming)}`}
            imageUrl={row.displayUrlMobile}
            initialFraming={row.mobileFraming}
            aspectClassName="aspect-[16/10]"
            target={{ kind: "modeling", slotId: row.slotKey, variant: "mobile" }}
            enabled
          />
        </div>
      ) : null}
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

type PreviewPaneProps = {
  label: string;
  url: string | null;
  emptyMessage: string;
  isFallback?: boolean;
  framing: ImageFraming | null;
};

function PreviewPane({ label, url, emptyMessage, isFallback, framing }: PreviewPaneProps) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100/80">
      <p className="border-b border-slate-200/80 bg-white/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-600">
        {label}
        {isFallback ? (
          <span className="ml-1.5 font-normal normal-case text-slate-500">(same as desktop)</span>
        ) : null}
      </p>
      <div className="relative aspect-[16/10] w-full min-h-[140px]">
        {url ? (
          <Image
            src={url}
            alt=""
            fill
            className="object-cover"
            style={framing ? framingToCoverImageStyle(framing) : undefined}
            sizes="(max-width: 768px) 100vw, min(260px, 40vw)"
          />
        ) : (
          <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 px-3 text-center">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
              {emptyMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
