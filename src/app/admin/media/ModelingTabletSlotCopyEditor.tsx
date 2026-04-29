"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  updateModelingTabletSlotCopy,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import {
  clampModelingTabletCopyOffset,
  MODELING_COPY_OFFSET_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT,
} from "@/constants/modeling-specialization-copy-offset";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";

type ModelingTabletSlotCopyEditorProps = {
  row: AdminModelingSlotRow;
};

type TabletOffsetStepperProps = {
  value: number;
  disabled: boolean;
  variant: "vertical" | "horizontal";
  numericInputId: string;
  onValueChange: (next: number) => void;
};

function TabletOffsetStepper({
  value,
  disabled,
  variant,
  numericInputId,
  onValueChange,
}: TabletOffsetStepperProps) {
  const fineMinus = variant === "vertical" ? "−" : "Left";
  const finePlus = variant === "vertical" ? "+" : "Right";
  const btnClass = "rounded-lg border border-slate-200 px-2 py-1 text-sm";
  const nudgeClass = `${btnClass} min-w-[2.35rem] text-xs font-medium`;
  const applyDelta = (delta: number) => {
    onValueChange(clampModelingTabletCopyOffset(value + delta));
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          disabled={disabled}
          className={nudgeClass}
          onClick={() => applyDelta(-MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT)}
        >
          −{MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT}
        </button>
        <button
          type="button"
          disabled={disabled}
          className={nudgeClass}
          onClick={() => applyDelta(-MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT)}
        >
          −{MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT}
        </button>
        <button
          type="button"
          disabled={disabled}
          className={btnClass}
          onClick={() => applyDelta(-MODELING_COPY_OFFSET_NUDGE_PCT)}
        >
          {fineMinus}
        </button>
        <span className="min-w-[3.75rem] text-center text-sm tabular-nums">{value}%</span>
        <button
          type="button"
          disabled={disabled}
          className={btnClass}
          onClick={() => applyDelta(MODELING_COPY_OFFSET_NUDGE_PCT)}
        >
          {finePlus}
        </button>
        <button
          type="button"
          disabled={disabled}
          className={nudgeClass}
          onClick={() => applyDelta(MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT)}
        >
          +{MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT}
        </button>
        <button
          type="button"
          disabled={disabled}
          className={nudgeClass}
          onClick={() => applyDelta(MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT)}
        >
          +{MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={numericInputId} className="text-xs text-slate-600">
          Number
        </label>
        <input
          id={numericInputId}
          key={value}
          type="number"
          disabled={disabled}
          defaultValue={value}
          min={MODELING_TABLET_COPY_OFFSET_MIN_PCT}
          max={MODELING_TABLET_COPY_OFFSET_MAX_PCT}
          step={1}
          className="w-[6.5rem] rounded-lg border border-slate-200 px-2 py-1 text-sm tabular-nums"
          onBlur={(e) => {
            const n = e.currentTarget.valueAsNumber;
            if (!Number.isFinite(n)) {
              e.currentTarget.value = String(value);
              return;
            }
            onValueChange(clampModelingTabletCopyOffset(Math.trunc(n)));
          }}
        />
      </div>
    </div>
  );
}

export function ModelingTabletSlotCopyEditor({ row }: ModelingTabletSlotCopyEditorProps) {
  const router = useRouter();
  const [titleTabletOffsetY, setTitleTabletOffsetY] = useState(row.titleTabletOffsetY);
  const [bodyTabletOffsetY, setBodyTabletOffsetY] = useState(row.bodyTabletOffsetY);
  const [titleTabletOffsetX, setTitleTabletOffsetX] = useState(row.titleTabletOffsetX);
  const [bodyTabletOffsetX, setBodyTabletOffsetX] = useState(row.bodyTabletOffsetX);
  const [state, formAction, isPending] = useActionState<
    SiteMediaActionResult | null,
    FormData
  >(updateModelingTabletSlotCopy, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [router, state?.ok]);

  useEffect(() => {
    setTitleTabletOffsetY(row.titleTabletOffsetY);
    setBodyTabletOffsetY(row.bodyTabletOffsetY);
    setTitleTabletOffsetX(row.titleTabletOffsetX);
    setBodyTabletOffsetX(row.bodyTabletOffsetX);
  }, [
    row.slotKey,
    row.titleTabletOffsetY,
    row.bodyTabletOffsetY,
    row.titleTabletOffsetX,
    row.bodyTabletOffsetX,
  ]);

  const showEmphasisField = row.slotKey === MODELING_SLOT_KEYS.HIGH_JEWELRY;

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-xl border border-slate-200/90 bg-white p-4">
      <input type="hidden" name="slotKey" value={row.slotKey} />
      <input type="hidden" name="titleTabletOffsetY" value={String(titleTabletOffsetY)} />
      <input type="hidden" name="bodyTabletOffsetY" value={String(bodyTabletOffsetY)} />
      <input type="hidden" name="titleTabletOffsetX" value={String(titleTabletOffsetX)} />
      <input type="hidden" name="bodyTabletOffsetX" value={String(bodyTabletOffsetX)} />

      <div>
        <p className="text-sm font-semibold text-slate-900">Tablet copy</p>
        <p className="mt-1 text-xs text-slate-600">
          Edits apply only to tablet-sized viewports (768px–1023px). Desktop and mobile rows are
          unchanged.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`tablet-title-${row.slotKey}`} className="text-sm font-medium text-slate-800">
          Title
        </label>
        <textarea
          id={`tablet-title-${row.slotKey}`}
          name="titleTablet"
          rows={2}
          disabled={isPending}
          defaultValue={row.titleTablet}
          className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`tablet-body-${row.slotKey}`} className="text-sm font-medium text-slate-800">
          Description
        </label>
        <textarea
          id={`tablet-body-${row.slotKey}`}
          name="bodyTablet"
          rows={5}
          disabled={isPending}
          defaultValue={row.bodyTablet}
          className="min-h-[8rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
        />
      </div>

      {showEmphasisField ? (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`tablet-emphasis-${row.slotKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Line 1 emphasis (tablet)
          </label>
          <input
            id={`tablet-emphasis-${row.slotKey}`}
            name="tabletLine1Emphasis"
            type="text"
            disabled={isPending}
            defaultValue={row.tabletLine1Emphasis}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </div>
      ) : null}

      <p className="text-xs text-slate-600">
        Offsets use CSS <span className="font-mono">translate</span> in % of each text block’s own
        width/height (not the full card). Allowed range {MODELING_TABLET_COPY_OFFSET_MIN_PCT}…
        {MODELING_TABLET_COPY_OFFSET_MAX_PCT}. Steps: ±{MODELING_COPY_OFFSET_NUDGE_PCT}, ±
        {MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT}, ±{MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT}, or
        type a number and tab away. Horizontal: negative = left, positive = right.
      </p>

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Title vertical (%)</span>
          <TabletOffsetStepper
            value={titleTabletOffsetY}
            disabled={isPending}
            variant="vertical"
            numericInputId={`tablet-oty-${row.slotKey}`}
            onValueChange={setTitleTabletOffsetY}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Title horizontal (%)</span>
          <TabletOffsetStepper
            value={titleTabletOffsetX}
            disabled={isPending}
            variant="horizontal"
            numericInputId={`tablet-otx-${row.slotKey}`}
            onValueChange={setTitleTabletOffsetX}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Body vertical (%)</span>
          <TabletOffsetStepper
            value={bodyTabletOffsetY}
            disabled={isPending}
            variant="vertical"
            numericInputId={`tablet-oby-${row.slotKey}`}
            onValueChange={setBodyTabletOffsetY}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Body horizontal (%)</span>
          <TabletOffsetStepper
            value={bodyTabletOffsetX}
            disabled={isPending}
            variant="horizontal"
            numericInputId={`tablet-obx-${row.slotKey}`}
            onValueChange={setBodyTabletOffsetX}
          />
        </div>
      </div>

      <ModelingSlotFormMessages state={state} />
      <MediaFormSubmitButton pendingLabel="Saving…">Save tablet copy</MediaFormSubmitButton>
    </form>
  );
}
