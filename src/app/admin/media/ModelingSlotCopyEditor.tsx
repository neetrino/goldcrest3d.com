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
  const [bodyMobileHtml, setBodyMobileHtml] = useState(initial.bodyMobile);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  return (
    <form
      key={`modeling-slot-copy-${slotKey}-${initial.body}-${initial.bodyMobile}`}
      action={formAction}
      className="mt-4 flex flex-col gap-4 border-t border-slate-200/80 pt-4"
      aria-label={`Edit title and descriptions for ${label}`}
    >
      <input type="hidden" name="slotKey" value={slotKey} />
      <input type="hidden" name="body" value={bodyHtml} />
      <input type="hidden" name="bodyMobile" value={bodyMobileHtml} />

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

      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/90 bg-slate-50/50 p-3">
        <span
          id={`modeling-slot-body-desktop-label-${slotKey}`}
          className="text-sm font-semibold text-slate-900"
        >
          Desktop / tablet description
        </span>
        <p className="text-xs text-slate-500">
          Shown from the <span className="font-medium text-slate-600">md</span> breakpoint upward
          (tablet and desktop). Same sanitizer as hero banners.
        </p>
        <SiteRichHtmlEditor
          id={`modeling-slot-body-desktop-${slotKey}`}
          ariaLabelledBy={`modeling-slot-body-desktop-label-${slotKey}`}
          value={bodyHtml}
          onChange={setBodyHtml}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/90 bg-white p-3">
        <span
          id={`modeling-slot-body-mobile-label-${slotKey}`}
          className="text-sm font-semibold text-slate-900"
        >
          Mobile description
        </span>
        <p className="text-xs text-slate-500">
          Optional. Shown below <span className="font-medium text-slate-600">md</span> only. Leave
          empty to use the desktop / tablet text on phones as well.
        </p>
        <SiteRichHtmlEditor
          id={`modeling-slot-body-mobile-${slotKey}`}
          ariaLabelledBy={`modeling-slot-body-mobile-label-${slotKey}`}
          value={bodyMobileHtml}
          onChange={setBodyMobileHtml}
        />
      </div>

      <ModelingSlotCopyMessages state={state} />

      <MediaFormSubmitButton pendingLabel="Saving…">Save title &amp; descriptions</MediaFormSubmitButton>
    </form>
  );
}
