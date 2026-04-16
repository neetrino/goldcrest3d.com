"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  updateEngineeringProcessCopy,
  type EngineeringProcessCopyActionResult,
} from "@/app/actions/engineering-process-copy";
import type {
  EngineeringProcessCopyEntry,
  EngineeringProcessStepEntry,
} from "@/lib/engineering-process-copy/engineering-process-copy.types";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";

type EngineeringProcessEditorProps = {
  initial: EngineeringProcessCopyEntry;
};

function Messages({ state }: { state: EngineeringProcessCopyActionResult | null }) {
  if (state && !state.ok) {
    return (
      <p
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        role="alert"
      >
        {state.error}
      </p>
    );
  }
  if (state?.ok) {
    return (
      <p
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900"
        role="status"
      >
        Text saved.
      </p>
    );
  }
  return null;
}

type StepCardProps = {
  step: EngineeringProcessStepEntry;
  index: number;
};

function StepCard({ step, index }: StepCardProps) {
  const prefix = `step${index + 1}`;

  return (
    <fieldset className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
      <legend className="px-1 text-sm font-semibold text-slate-900">Step {step.num}</legend>

      <div className="mt-2 grid gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${prefix}-title`} className="text-sm font-medium text-slate-800">
            Title
          </label>
          <textarea
            id={`${prefix}-title`}
            name={`${prefix}Title`}
            rows={2}
            defaultValue={step.title}
            className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${prefix}-description`} className="text-sm font-medium text-slate-800">
            Description
          </label>
          <textarea
            id={`${prefix}-description`}
            name={`${prefix}Description`}
            rows={4}
            defaultValue={step.description}
            className="min-h-[6rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>
      </div>
    </fieldset>
  );
}

export function EngineeringProcessEditor({ initial }: EngineeringProcessEditorProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateEngineeringProcessCopy, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [router, state?.ok]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Homepage section
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          Our Engineering Process
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Manage section title and step copy for desktop and mobile layouts.
        </p>
      </div>

      <form
        key={JSON.stringify(initial)}
        action={formAction}
        className="flex flex-col gap-5"
        aria-label="Edit Engineering Process section copy"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="engineering-process-section-title" className="text-sm font-medium text-slate-800">
            Section title
          </label>
          <textarea
            id="engineering-process-section-title"
            name="sectionTitle"
            rows={2}
            defaultValue={initial.sectionTitle}
            className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>

        <div className="grid gap-4">
          {initial.steps.map((step, index) => (
            <StepCard key={step.num} step={step} index={index} />
          ))}
        </div>

        <Messages state={state} />

        <MediaFormSubmitButton pendingLabel="Saving...">
          Save process content
        </MediaFormSubmitButton>
      </form>
    </div>
  );
}

