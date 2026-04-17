"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { updateModelingSlotCopy } from "@/app/actions/modeling-slot-copy";
import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";
import { MODELING_SLOT_LABELS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotCopyMessages } from "./ModelingSlotCopyMessages";
import { SiteRichHtmlEditor } from "./SiteRichHtmlEditor";

const TITLE_TEXTAREA_CLASS =
  "min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80";

type ModelingSlotCopyEditorProps = {
  slotKey: ModelingSlotKey;
  variant: "desktop" | "mobile";
  titleValue: string;
  bodyValue: string;
  onTitleChange: (next: string) => void;
  onBodyChange: (next: string) => void;
  onCancel: () => void;
  onSaved: () => void;
};

export function ModelingSlotCopyEditor({
  slotKey,
  variant,
  titleValue,
  bodyValue,
  onTitleChange,
  onBodyChange,
  onCancel,
  onSaved,
}: ModelingSlotCopyEditorProps) {
  const router = useRouter();
  const label = MODELING_SLOT_LABELS[slotKey];

  const [state, formAction] = useActionState(updateModelingSlotCopy, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
      onSaved();
    }
  }, [onSaved, router, state?.ok]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4"
      aria-label={`Edit title and description for ${label}`}
    >
      <input type="hidden" name="slotKey" value={slotKey} />
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="body" value={bodyValue} />
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
          value={titleValue}
          onChange={(e) => onTitleChange(e.target.value)}
          className={TITLE_TEXTAREA_CLASS}
        />
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
          value={bodyValue}
          onChange={onBodyChange}
        />
      </div>

      <ModelingSlotCopyMessages state={state} />

      <div className="sticky bottom-0 z-10 -mx-2 border-t border-slate-200 bg-white/95 px-2 pt-3 backdrop-blur sm:-mx-1 sm:px-1">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-[2.5rem] items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <MediaFormSubmitButton
          pendingLabel="Saving…"
          className="inline-flex min-h-[2.5rem] items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
        >
          Save
        </MediaFormSubmitButton>
        </div>
      </div>
    </form>
  );
}
