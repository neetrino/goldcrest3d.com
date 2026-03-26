"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  upsertModelingSlotImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";
import { ModelingSlotPreview } from "./ModelingSlotPreview";
import { ModelingSlotStoredAndUpload } from "./ModelingSlotStoredAndUpload";

type ModelingSlotFormProps = {
  row: AdminModelingSlotRow;
};

function ModelingSlotForm({ row }: ModelingSlotFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
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

  const actionVerb = row.itemId ? "Replace image" : "Upload image";

  return (
    <form
      action={formAction}
      aria-label={`${actionVerb} for ${row.label}`}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100"
    >
      <ModelingSlotPreview row={row} />
      <ModelingSlotStoredAndUpload row={row} isPending={isPending} />

      <MediaFormSubmitButton pendingLabel="Uploading…">
        {row.itemId ? `Replace image` : `Upload image`}
      </MediaFormSubmitButton>

      <ModelingSlotFormMessages state={state} />
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
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {description}
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Each card is a fixed place on the site — pick a file and upload; changes go live
          right after a successful upload.
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
