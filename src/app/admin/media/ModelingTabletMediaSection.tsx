"use client";

import Image from "next/image";

import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";

import { ModelingSlotCopyEditor } from "./ModelingSlotCopyEditor";
import { ModelingSlotVariantUpload } from "./ModelingSlotVariantUpload";

type ModelingTabletSlotFormProps = {
  row: AdminModelingSlotRow;
};

function ModelingTabletSlotForm({ row }: ModelingTabletSlotFormProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/80 shadow-inner">
        <p className="border-b border-slate-200/80 bg-white/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-600">
          Tablet preview
        </p>
        <div className="relative aspect-[16/10] w-full min-h-[140px] bg-slate-100">
          {row.displayUrlTablet ? (
            <Image
              src={row.displayUrlTablet}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-xs text-slate-500">
              No tablet image yet — site uses the default placeholder until you upload.
            </div>
          )}
        </div>
        <div className="border-t border-slate-200/80 bg-slate-900 px-4 py-3 text-white">
          <p className="text-[15px] font-semibold leading-snug">{row.label}</p>
          <p className="mt-1 font-mono text-[10px] text-white/60">Slot: {row.slotKey}</p>
        </div>
      </div>
      <ModelingSlotCopyEditor row={row} mode="tabletOnly" />
      <ModelingSlotVariantUpload row={row} variant="tablet" />
    </div>
  );
}

type ModelingTabletMediaSectionProps = {
  title: string;
  description: string;
  slots: AdminModelingSlotRow[];
};

export function ModelingTabletMediaSection({
  title,
  description,
  slots,
}: ModelingTabletMediaSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>
        <p className="mt-3 text-sm text-slate-500">
          Upload tablet-only images below. <span className="font-medium">Tablet text content</span>{" "}
          opens a tablet-only editor (755px–1023px). For desktop and mobile copy, use{" "}
          <span className="font-medium">Text content</span> on the main Modeling Specialization tab.
          Tablet images do not fall back to other breakpoints at runtime.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((row) => (
          <ModelingTabletSlotForm key={row.slotKey} row={row} />
        ))}
      </div>
    </section>
  );
}
