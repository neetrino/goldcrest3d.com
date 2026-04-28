"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  updateModelingTabletSlotCopy,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";

const MIN_OFFSET_Y = -300;
const MAX_OFFSET_Y = 300;
const NUDGE_STEP_Y = 4;

type ModelingTabletSlotCopyEditorProps = {
  row: AdminModelingSlotRow;
};

function clampOffset(value: number): number {
  return Math.min(MAX_OFFSET_Y, Math.max(MIN_OFFSET_Y, Math.round(value)));
}

export function ModelingTabletSlotCopyEditor({ row }: ModelingTabletSlotCopyEditorProps) {
  const router = useRouter();
  const [titleTabletOffsetY, setTitleTabletOffsetY] = useState(row.titleTabletOffsetY);
  const [bodyTabletOffsetY, setBodyTabletOffsetY] = useState(row.bodyTabletOffsetY);
  const [state, formAction, isPending] = useActionState<
    SiteMediaActionResult | null,
    FormData
  >(updateModelingTabletSlotCopy, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [router, state?.ok]);

  const showEmphasisField = row.slotKey === MODELING_SLOT_KEYS.HIGH_JEWELRY;

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-xl border border-slate-200/90 bg-white p-4">
      <input type="hidden" name="slotKey" value={row.slotKey} />
      <input type="hidden" name="titleTabletOffsetY" value={String(titleTabletOffsetY)} />
      <input type="hidden" name="bodyTabletOffsetY" value={String(bodyTabletOffsetY)} />

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

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Title offset (px)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPending}
              className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
              onClick={() =>
                setTitleTabletOffsetY((v) => clampOffset(v - NUDGE_STEP_Y))
              }
            >
              −
            </button>
            <span className="min-w-[3rem] text-center text-sm">{titleTabletOffsetY}</span>
            <button
              type="button"
              disabled={isPending}
              className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
              onClick={() =>
                setTitleTabletOffsetY((v) => clampOffset(v + NUDGE_STEP_Y))
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Body offset (px)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPending}
              className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
              onClick={() =>
                setBodyTabletOffsetY((v) => clampOffset(v - NUDGE_STEP_Y))
              }
            >
              −
            </button>
            <span className="min-w-[3rem] text-center text-sm">{bodyTabletOffsetY}</span>
            <button
              type="button"
              disabled={isPending}
              className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
              onClick={() =>
                setBodyTabletOffsetY((v) => clampOffset(v + NUDGE_STEP_Y))
              }
            >
              +
            </button>
          </div>
        </div>
      </div>

      <ModelingSlotFormMessages state={state} />
      <MediaFormSubmitButton pendingLabel="Saving…">Save tablet copy</MediaFormSubmitButton>
    </form>
  );
}
