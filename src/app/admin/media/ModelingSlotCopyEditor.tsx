"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { updateModelingSlotCopy } from "@/app/actions/modeling-slot-copy";
import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";
import { MODELING_SLOT_LABELS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotCopyMessages } from "./ModelingSlotCopyMessages";
import { PowerBannerDescriptionEditor } from "./PowerBannerDescriptionEditor";
import {
  MODELING_TEXT_OVERLAY_BODY_FONT_MAX_PX,
  MODELING_TEXT_OVERLAY_BODY_FONT_MIN_PX,
  MODELING_TEXT_OVERLAY_TITLE_FONT_MAX_PX,
  MODELING_TEXT_OVERLAY_TITLE_FONT_MIN_PX,
} from "./modeling-text-overlay-editor.constants";

const TITLE_TEXTAREA_CLASS =
  "min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80";

type ModelingSlotCopyEditorProps = {
  slotKey: ModelingSlotKey;
  variant: "desktop" | "mobile";
  titleValue: string;
  bodyValue: string;
  mobileTitleFontSizePx: number;
  mobileBodyFontSizePx: number;
  onTitleChange: (next: string) => void;
  onBodyChange: (next: string) => void;
  onMobileTitleFontSizePxChange: (next: number) => void;
  onMobileBodyFontSizePxChange: (next: number) => void;
  onCancel: () => void;
  onSaved: () => void;
};

export function ModelingSlotCopyEditor({
  slotKey,
  variant,
  titleValue,
  bodyValue,
  mobileTitleFontSizePx,
  mobileBodyFontSizePx,
  onTitleChange,
  onBodyChange,
  onMobileTitleFontSizePxChange,
  onMobileBodyFontSizePxChange,
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
      {variant === "mobile" ? (
        <>
          <input
            type="hidden"
            name="mobileTitleFontSizePx"
            value={String(mobileTitleFontSizePx)}
          />
          <input
            type="hidden"
            name="mobileBodyFontSizePx"
            value={String(mobileBodyFontSizePx)}
          />
        </>
      ) : null}
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
        <PowerBannerDescriptionEditor
          id={`modeling-slot-body-${slotKey}`}
          ariaLabelledBy={`modeling-slot-body-label-${slotKey}`}
          value={bodyValue}
          onChange={onBodyChange}
          docFieldName="bodyDoc"
          editableClassName="whitespace-pre overflow-auto"
          normalizeInput={false}
        />
      </div>

      {variant === "mobile" ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <p className="text-sm font-semibold text-slate-800">Mobile typography</p>
          <p className="mt-1 text-xs text-slate-500">
            Adjust only mobile title and description size for this card.
          </p>

          <label className="mt-3 block text-xs font-medium text-slate-700" htmlFor="modeling-mobile-title-size">
            Mobile title size: {mobileTitleFontSizePx}px
          </label>
          <input
            id="modeling-mobile-title-size"
            type="range"
            min={MODELING_TEXT_OVERLAY_TITLE_FONT_MIN_PX}
            max={MODELING_TEXT_OVERLAY_TITLE_FONT_MAX_PX}
            value={mobileTitleFontSizePx}
            onChange={(e) => onMobileTitleFontSizePxChange(Number(e.target.value))}
            className="mt-1 w-full accent-slate-900"
          />

          <label className="mt-3 block text-xs font-medium text-slate-700" htmlFor="modeling-mobile-body-size">
            Mobile description size: {mobileBodyFontSizePx}px
          </label>
          <input
            id="modeling-mobile-body-size"
            type="range"
            min={MODELING_TEXT_OVERLAY_BODY_FONT_MIN_PX}
            max={MODELING_TEXT_OVERLAY_BODY_FONT_MAX_PX}
            value={mobileBodyFontSizePx}
            onChange={(e) => onMobileBodyFontSizePxChange(Number(e.target.value))}
            className="mt-1 w-full accent-slate-900"
          />
        </div>
      ) : null}

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
