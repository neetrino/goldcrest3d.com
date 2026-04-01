"use client";

import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";

import { ModelingSlotPreview } from "./ModelingSlotPreview";
import { ModelingSlotVariantUpload } from "./ModelingSlotVariantUpload";

type ModelingSlotFormProps = {
  row: AdminModelingSlotRow;
};

function ModelingSlotForm({ row }: ModelingSlotFormProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <ModelingSlotPreview row={row} />
      <ModelingSlotVariantUpload row={row} variant="desktop" />
      <ModelingSlotVariantUpload row={row} variant="mobile" />
    </div>
  );
}

type ModelingMediaSectionProps = {
  title: string;
  description: string;
  slots: AdminModelingSlotRow[];
};

export function ModelingMediaSection({
  title,
  description,
  slots,
}: ModelingMediaSectionProps) {
  return (
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
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((row) => (
          <ModelingSlotForm key={row.slotKey} row={row} />
        ))}
      </div>
    </section>
  );
}
