"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { updateModelingSlotCopy } from "@/app/actions/modeling-slot-copy";
import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";
import { MODELING_SLOT_LABELS } from "@/lib/site-media/site-media.registry";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotCopyMessages } from "./ModelingSlotCopyMessages";
import { SiteRichHtmlEditor } from "./SiteRichHtmlEditor";

type ModelingSlotCopyEditorProps = {
  slotKey: ModelingSlotKey;
  initial: ModelingSlotCopyEntry;
};

export function ModelingSlotCopyEditor({ slotKey, initial }: ModelingSlotCopyEditorProps) {
  const router = useRouter();
  const label = MODELING_SLOT_LABELS[slotKey];

  const [state, formAction] = useActionState(updateModelingSlotCopy, null);
  const [bodyHtml, setBodyHtml] = useState(initial.body);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  return (
    <form
      key={`modeling-slot-copy-${slotKey}-${initial.body}`}
      action={formAction}
      className="mt-4 flex flex-col gap-4 border-t border-slate-200/80 pt-4"
      aria-label={`Edit title and description for ${label}`}
    >
      <input type="hidden" name="slotKey" value={slotKey} />
      <input type="hidden" name="body" value={bodyHtml} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`modeling-slot-title-${slotKey}`}
          className="text-sm font-medium text-slate-800"
        >
          Title
        </label>
        <textarea
          id={`modeling-slot-title-${slotKey}`}
          name="title"
          rows={2}
          required
          defaultValue={initial.title}
          className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
        />
        <p className="text-xs text-slate-500">
          Use a line break in the title when you want multiple lines (same behavior as hero banners).
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span
          id={`modeling-slot-body-label-${slotKey}`}
          className="text-sm font-medium text-slate-800"
        >
          Description
        </span>
        <SiteRichHtmlEditor
          id={`modeling-slot-body-${slotKey}`}
          ariaLabelledBy={`modeling-slot-body-label-${slotKey}`}
          value={bodyHtml}
          onChange={setBodyHtml}
        />
        <p className="text-xs text-slate-500">
          Same editor as hero banners: structure with paragraphs, lists, emphasis, and alignment. Saved
          HTML is sanitized and rendered on the public site.
        </p>
      </div>

      <ModelingSlotCopyMessages state={state} />

      <MediaFormSubmitButton pendingLabel="Saving…">Save title &amp; description</MediaFormSubmitButton>
    </form>
  );
}
