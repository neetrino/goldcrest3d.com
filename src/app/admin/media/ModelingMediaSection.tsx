"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  upsertModelingSlotImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";

type ModelingSlotFormProps = {
  row: AdminModelingSlotRow;
};

function ModelingSlotForm({ row }: ModelingSlotFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return upsertModelingSlotImage(row.slotKey, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  const currentFileName = formatR2ObjectDisplayName(row.r2ObjectKey);

  return (
    <form
      action={formAction}
      aria-label={`Change image for ${row.label}`}
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="overflow-hidden rounded-lg border-2 border-slate-300 bg-slate-100 shadow-md ring-1 ring-slate-200/90">
        <div className="relative aspect-[16/10] w-full min-h-[200px]">
          {row.displayUrl ? (
            <Image
              src={row.displayUrl}
              alt={`Current image for ${row.label}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, min(520px, 40vw)"
              unoptimized
            />
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center px-3 text-center text-sm text-slate-500">
              No R2 upload yet — on the site this slot uses the built-in fallback image
            </div>
          )}
        </div>
        <div className="border-t border-slate-200/80 bg-slate-900/90 px-3 py-2.5 text-white">
          <p className="text-sm font-semibold leading-snug">{row.label}</p>
          <p className="mt-0.5 text-xs text-white/80">
            Slot <code className="rounded bg-white/10 px-1 py-0.5">{row.slotKey}</code>
          </p>
        </div>
      </div>
      <div className="rounded-md border border-amber-200/90 bg-amber-50/80 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900/90">
          You are editing this preview
        </p>
        <p className="mt-1 text-xs text-slate-700">
          The photo above is what visitors see for this block (or the fallback if empty).
        </p>
      </div>
      {currentFileName ? (
        <p className="text-xs text-slate-600">
          Current file in storage:{" "}
          <code className="break-all rounded bg-slate-100 px-1 py-0.5 text-slate-800">
            {currentFileName}
          </code>
        </p>
      ) : (
        <p className="text-xs text-slate-500">No file in R2 for this slot yet.</p>
      )}
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        <span>New file for «{row.label}» (PNG, JPEG, WebP, GIF, max 15 MB)</span>
        <input
          name="file"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="text-sm file:mr-2 file:rounded file:border-0 file:bg-amber-500/15 file:px-2 file:py-1"
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-[var(--foreground)] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {row.itemId ? `Replace «${row.label}»` : `Upload for «${row.label}»`}
      </button>
      {state && !state.ok && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="text-sm text-emerald-700" role="status">
          Saved.
        </p>
      )}
    </form>
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
    <section className="rounded-xl border border-slate-200 bg-[#fafafa] p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((row) => (
          <ModelingSlotForm key={row.slotKey} row={row} />
        ))}
      </div>
    </section>
  );
}
