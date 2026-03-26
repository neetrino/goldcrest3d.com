"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  upsertModelingSlotImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";

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

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <p className="font-semibold text-slate-900 text-sm">{row.label}</p>
        <p className="text-xs text-slate-500">
          Slot: <code className="rounded bg-slate-100 px-1">{row.slotKey}</code>
        </p>
      </div>
      <div className="relative h-32 w-full overflow-hidden rounded-md bg-slate-100">
        {row.displayUrl ? (
          <Image
            src={row.displayUrl}
            alt={row.altText || "Preview"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-500">
            No R2 upload yet — the site uses the built-in fallback asset
          </div>
        )}
      </div>
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        <span>New file (PNG, JPEG, WebP, GIF, max 15 MB)</span>
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
        {row.itemId ? "Replace image" : "Upload image"}
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
