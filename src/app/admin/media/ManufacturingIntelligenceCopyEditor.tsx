"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { updateManufacturingIntelligenceCopy } from "@/app/actions/manufacturing-intelligence-copy";
import type { ManufacturingIntelligenceCopyEntry } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.types";

import { ManufacturingIntelligenceCopyMessages } from "./ManufacturingIntelligenceCopyMessages";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { PowerBannerDescriptionEditor } from "./PowerBannerDescriptionEditor";

type ManufacturingIntelligenceCopyEditorProps = {
  initial: ManufacturingIntelligenceCopyEntry;
};

export function ManufacturingIntelligenceCopyEditor({
  initial,
}: ManufacturingIntelligenceCopyEditorProps) {
  const router = useRouter();

  const [state, formAction] = useActionState(updateManufacturingIntelligenceCopy, null);
  const [bodyHtml, setBodyHtml] = useState(initial.body);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Homepage section
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          Manufacturing Intelligence
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Edit the section heading and optional intro text. Use &quot;Save title &amp; description&quot;
          to persist changes.
        </p>
      </div>

      <form
        key={`mfg-copy-text-${initial.title}-${initial.body}`}
        action={formAction}
        className="flex flex-col gap-4"
        aria-label="Edit Manufacturing Intelligence title and description"
      >
        <input type="hidden" name="body" value={bodyHtml} />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="manufacturing-intelligence-title"
            className="text-sm font-medium text-slate-800"
          >
            Title
          </label>
          <textarea
            id="manufacturing-intelligence-title"
            name="title"
            rows={2}
            required
            defaultValue={initial.title}
            className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span
            id="manufacturing-intelligence-body-label"
            className="text-sm font-medium text-slate-800"
          >
            Description
          </span>
          <PowerBannerDescriptionEditor
            id="manufacturing-intelligence-body"
            ariaLabelledBy="manufacturing-intelligence-body-label"
            value={bodyHtml}
            onChange={setBodyHtml}
          />
          <p className="text-xs text-slate-500">
            Optional intro shown under the section title. Leave empty to hide it on the homepage.
            Use the editor for structure: line breaks, lists, emphasis, and alignment.
          </p>
        </div>

        <ManufacturingIntelligenceCopyMessages state={state} />

        <MediaFormSubmitButton pendingLabel="Saving…">
          Save title &amp; description
        </MediaFormSubmitButton>
      </form>
    </div>
  );
}
