"use client";

import { updateEngineeringProcessStep, type SiteMediaActionResult } from "@/app/actions/site-media";
import type { AdminEngineeringProcessStepRow } from "@/lib/site-media/get-site-media-admin";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";

type EngineeringProcessStepEditorProps = {
  row: AdminEngineeringProcessStepRow;
};

function EngineeringProcessStepEditor({ row }: EngineeringProcessStepEditorProps) {
  const router = useRouter();
  const [saveState, saveAction] = useActionState<SiteMediaActionResult | null, FormData>(
    updateEngineeringProcessStep,
    null,
  );

  useEffect(() => {
    if (saveState?.ok) {
      router.refresh();
    }
  }, [router, saveState?.ok]);

  return (
    <form action={saveAction} className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
      <input type="hidden" name="stepKey" value={row.key} />
      <div className="mb-4 border-b border-slate-200/80 pb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">Step {row.number}</p>
      </div>
      <div className="space-y-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            type="text"
            name="title"
            defaultValue={row.title}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            name="description"
            rows={5}
            defaultValue={row.description}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>
      </div>

      <div className="mt-4 space-y-3">
        <ModelingSlotFormMessages state={saveState} />
        <MediaFormSubmitButton pendingLabel="Saving…">Save step text</MediaFormSubmitButton>
      </div>
    </form>
  );
}

type EngineeringProcessSectionProps = {
  rows: AdminEngineeringProcessStepRow[];
};

export function EngineeringProcessSection({ rows }: EngineeringProcessSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Shared process section
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          Our Engineering Process
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          One shared content source for desktop and mobile. Updating any step text applies to both
          layouts immediately.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <EngineeringProcessStepEditor key={row.key} row={row} />
        ))}
      </div>
    </section>
  );
}
