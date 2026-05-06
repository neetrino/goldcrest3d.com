"use client";

import "@/components/landing/modeling/modeling-section-scale.css";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  updateModelingSlotCopy,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import {
  MODELING_COPY_OFFSET_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT,
} from "@/constants/modeling-specialization-copy-offset";
import {
  clampModelingMobilePreviewBodyFontPx,
  clampModelingMobilePreviewTitleFontPx,
} from "@/constants/modeling-specialization-mobile-preview-font";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingMobilePreviewFontControls } from "./ModelingMobilePreviewFontControls";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";
import { ModelingWideRangePctOffsetStepper } from "./ModelingWideRangePctOffsetStepper";

type ModelingSlotCopyEditorProps = {
  row: AdminModelingSlotRow;
};

type VerticalOffsetFieldKey =
  | "titleDesktopOffsetY"
  | "titleMobileOffsetY"
  | "bodyDesktopOffsetY"
  | "bodyMobileOffsetY";

type OffsetResetFieldKey =
  | VerticalOffsetFieldKey
  | "titleDesktopOffsetX"
  | "bodyDesktopOffsetX"
  | "titleMobileOffsetX"
  | "bodyMobileOffsetX";

type EditorDraft = {
  titleDesktop: string;
  titleMobile: string;
  bodyDesktop: string;
  bodyMobile: string;
  desktopLine1Emphasis: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  titleDesktopOffsetX: number;
  bodyDesktopOffsetX: number;
  titleMobileOffsetX: number;
  bodyMobileOffsetX: number;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
};

function toInitialDraft(row: AdminModelingSlotRow): EditorDraft {
  return {
    titleDesktop: row.titleDesktop,
    titleMobile: row.titleMobile,
    bodyDesktop: row.bodyDesktop,
    bodyMobile: row.bodyMobile,
    desktopLine1Emphasis: row.desktopLine1Emphasis,
    titleDesktopOffsetY: row.titleDesktopOffsetY,
    titleMobileOffsetY: row.titleMobileOffsetY,
    bodyDesktopOffsetY: row.bodyDesktopOffsetY,
    bodyMobileOffsetY: row.bodyMobileOffsetY,
    titleDesktopOffsetX: row.titleDesktopOffsetX,
    bodyDesktopOffsetX: row.bodyDesktopOffsetX,
    titleMobileOffsetX: row.titleMobileOffsetX,
    bodyMobileOffsetX: row.bodyMobileOffsetX,
    mobilePreviewTitleFontPx: row.mobilePreviewTitleFontPx,
    mobilePreviewBodyFontPx: row.mobilePreviewBodyFontPx,
  };
}

function offsetLabel(key: OffsetResetFieldKey): string {
  if (key === "titleDesktopOffsetY") return "Desktop title vertical";
  if (key === "titleMobileOffsetY") return "Mobile title vertical";
  if (key === "bodyDesktopOffsetY") return "Desktop description vertical";
  if (key === "bodyMobileOffsetY") return "Mobile description vertical";
  if (key === "titleDesktopOffsetX") return "Desktop title horizontal";
  if (key === "bodyDesktopOffsetX") return "Desktop description horizontal";
  if (key === "titleMobileOffsetX") return "Mobile title horizontal";
  return "Mobile description horizontal";
}

export function ModelingSlotCopyEditor({ row }: ModelingSlotCopyEditorProps) {
  const draftResetKey = [
    row.slotKey,
    row.titleDesktop,
    row.titleMobile,
    row.bodyDesktop,
    row.bodyMobile,
    row.desktopLine1Emphasis,
    row.titleDesktopOffsetY,
    row.titleMobileOffsetY,
    row.bodyDesktopOffsetY,
    row.bodyMobileOffsetY,
    row.titleDesktopOffsetX,
    row.bodyDesktopOffsetX,
    row.titleMobileOffsetX,
    row.bodyMobileOffsetX,
    row.mobilePreviewTitleFontPx,
    row.mobilePreviewBodyFontPx,
  ].join("|");
  return <ModelingSlotCopyEditorContent key={draftResetKey} row={row} />;
}

function ModelingSlotCopyEditorContent({ row }: ModelingSlotCopyEditorProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draft, setDraft] = useState<EditorDraft>(() => toInitialDraft(row));
  const [state, formAction, isPending] = useActionState<
    SiteMediaActionResult | null,
    FormData
  >(updateModelingSlotCopy, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [router, state?.ok]);
  const isDialogVisible = isModalOpen && !state?.ok;

  const showEmphasisField = row.slotKey === MODELING_SLOT_KEYS.HIGH_JEWELRY;

  return (
    <form
      action={formAction}
      className="rounded-xl border border-slate-200/90 bg-white p-4"
      aria-label={`Edit text content for ${row.label}`}
    >
      <input type="hidden" name="slotKey" value={row.slotKey} />
      <input type="hidden" name="titleDesktopOffsetY" value={draft.titleDesktopOffsetY} />
      <input type="hidden" name="titleMobileOffsetY" value={draft.titleMobileOffsetY} />
      <input type="hidden" name="bodyDesktopOffsetY" value={draft.bodyDesktopOffsetY} />
      <input type="hidden" name="bodyMobileOffsetY" value={draft.bodyMobileOffsetY} />
      <input type="hidden" name="titleDesktopOffsetX" value={String(draft.titleDesktopOffsetX)} />
      <input type="hidden" name="bodyDesktopOffsetX" value={String(draft.bodyDesktopOffsetX)} />
      <input type="hidden" name="titleMobileOffsetX" value={String(draft.titleMobileOffsetX)} />
      <input type="hidden" name="bodyMobileOffsetX" value={String(draft.bodyMobileOffsetX)} />
      <input
        type="hidden"
        name="mobilePreviewTitleFontPx"
        value={String(draft.mobilePreviewTitleFontPx)}
      />
      <input
        type="hidden"
        name="mobilePreviewBodyFontPx"
        value={String(draft.mobilePreviewBodyFontPx)}
      />
      <div className="rounded-lg border border-slate-200 bg-slate-50/70">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition hover:bg-slate-100/70"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">Text content</p>
            <p className="mt-0.5 text-xs text-slate-600">
              Click to open editor in full screen.
            </p>
          </div>
          <span className="text-slate-500">⤢</span>
        </button>
      </div>

      {isDialogVisible ? (
        <div
          className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-slate-900/70 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Text content editor for ${row.label}`}
        >
          <div className="max-h-[96vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">Text content</p>
                <p className="text-xs text-slate-600">{row.label}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <p className="mb-4 text-sm text-slate-600">
                Each line break creates a new visual line. Leave fields empty to hide text on the
                site.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Desktop title</span>
                  <textarea
                    name="titleDesktop"
                    rows={3}
                    value={draft.titleDesktop}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, titleDesktop: event.target.value }))
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">Desktop title vertical (%)</span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.titleDesktopOffsetY}
                      disabled={isPending}
                      variant="vertical"
                      numericInputId={`desktop-title-oty-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, titleDesktopOffsetY: next }))
                      }
                    />
                  </div>
                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">
                      Desktop title horizontal (%)
                    </span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.titleDesktopOffsetX}
                      disabled={isPending}
                      variant="horizontal"
                      numericInputId={`desktop-title-otx-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, titleDesktopOffsetX: next }))
                      }
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Mobile title</span>
                  <textarea
                    name="titleMobile"
                    rows={3}
                    value={draft.titleMobile}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, titleMobile: event.target.value }))
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">Mobile title vertical (%)</span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.titleMobileOffsetY}
                      disabled={isPending}
                      variant="vertical"
                      numericInputId={`mobile-title-oty-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, titleMobileOffsetY: next }))
                      }
                    />
                  </div>
                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">
                      Mobile title horizontal (%)
                    </span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.titleMobileOffsetX}
                      disabled={isPending}
                      variant="horizontal"
                      numericInputId={`mobile-title-otx-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, titleMobileOffsetX: next }))
                      }
                    />
                  </div>
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Desktop description</span>
                  <textarea
                    name="bodyDesktop"
                    rows={10}
                    value={draft.bodyDesktop}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, bodyDesktop: event.target.value }))
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">
                      Desktop description vertical (%)
                    </span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.bodyDesktopOffsetY}
                      disabled={isPending}
                      variant="vertical"
                      numericInputId={`desktop-body-oty-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, bodyDesktopOffsetY: next }))
                      }
                    />
                  </div>
                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">
                      Desktop description horizontal (%)
                    </span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.bodyDesktopOffsetX}
                      disabled={isPending}
                      variant="horizontal"
                      numericInputId={`desktop-body-otx-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, bodyDesktopOffsetX: next }))
                      }
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Mobile description</span>
                  <textarea
                    name="bodyMobile"
                    rows={10}
                    value={draft.bodyMobile}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, bodyMobile: event.target.value }))
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">
                      Mobile description vertical (%)
                    </span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.bodyMobileOffsetY}
                      disabled={isPending}
                      variant="vertical"
                      numericInputId={`mobile-body-oty-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, bodyMobileOffsetY: next }))
                      }
                    />
                  </div>
                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-700">
                      Mobile description horizontal (%)
                    </span>
                    <ModelingWideRangePctOffsetStepper
                      value={draft.bodyMobileOffsetX}
                      disabled={isPending}
                      variant="horizontal"
                      numericInputId={`mobile-body-otx-${row.slotKey}`}
                      onValueChange={(next) =>
                        setDraft((prev) => ({ ...prev, bodyMobileOffsetX: next }))
                      }
                    />
                  </div>
                </label>
              </div>

              {showEmphasisField ? (
                <label className="mt-4 flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Desktop highlighted fragment
                  </span>
                  <input
                    type="text"
                    name="desktopLine1Emphasis"
                    value={draft.desktopLine1Emphasis}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        desktopLine1Emphasis: event.target.value,
                      }))
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                </label>
              ) : (
                <input type="hidden" name="desktopLine1Emphasis" value="" />
              )}

              <p className="mt-4 text-xs text-slate-600">
                Desktop and mobile vertical and horizontal offsets share the same % range and step
                sizes ({MODELING_TABLET_COPY_OFFSET_MIN_PCT}…{MODELING_TABLET_COPY_OFFSET_MAX_PCT}; ±
                {MODELING_COPY_OFFSET_NUDGE_PCT}, ±{MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT}, ±
                {MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT}). Values are stored separately from the
                Tablet tab.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-sm font-semibold text-slate-900">Live position preview</p>
                <p className="mt-1 text-xs text-slate-500">
                  Vertical and horizontal use the steppers above (range {MODELING_TABLET_COPY_OFFSET_MIN_PCT}…
                  {MODELING_TABLET_COPY_OFFSET_MAX_PCT}). Preview updates instantly.
                </p>
                <div className="mt-3">
                  <ModelingMobilePreviewFontControls
                    titleFontPx={draft.mobilePreviewTitleFontPx}
                    bodyFontPx={draft.mobilePreviewBodyFontPx}
                    disabled={isPending}
                    onTitleFontPxChange={(next) =>
                      setDraft((prev) => ({
                        ...prev,
                        mobilePreviewTitleFontPx: clampModelingMobilePreviewTitleFontPx(next),
                      }))
                    }
                    onBodyFontPxChange={(next) =>
                      setDraft((prev) => ({
                        ...prev,
                        mobilePreviewBodyFontPx: clampModelingMobilePreviewBodyFontPx(next),
                      }))
                    }
                  />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Desktop preview
                    </p>
                    {/* Same translate math as landing (ModelingCardFullBleed + --ms from modeling-section-scale). */}
                    <div className="modeling-specialization-cq modeling-specialization-scale relative mt-2 min-h-[180px] overflow-hidden rounded-md border border-slate-100 bg-slate-50 p-3">
                      <h4
                        className="max-w-full break-words whitespace-pre-wrap text-base font-semibold text-slate-900 transition-transform duration-150"
                        style={{
                          transform: `translateX(calc(${draft.titleDesktopOffsetX} * 1% * var(--ms, 1))) translateY(calc(${draft.titleDesktopOffsetY} * 1% * var(--ms, 1)))`,
                        }}
                      >
                        {draft.titleDesktop || "Desktop title"}
                      </h4>
                      <p
                        className="mt-2 max-w-full break-words whitespace-pre-wrap text-sm text-slate-700 transition-transform duration-150"
                        style={{
                          transform: `translateX(calc(${draft.bodyDesktopOffsetX} * 1% * var(--ms, 1))) translateY(calc(${draft.bodyDesktopOffsetY} * 1% * var(--ms, 1)))`,
                        }}
                      >
                        {draft.bodyDesktop || "Desktop description"}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Mobile preview
                    </p>
                    <div className="modeling-specialization-cq modeling-specialization-scale relative mt-2 min-h-[180px] overflow-hidden rounded-md border border-slate-100 bg-slate-50 p-3">
                      <h4
                        className="max-w-full break-words whitespace-pre-wrap font-semibold text-slate-900 transition-transform duration-150"
                        style={{
                          transform: `translateX(calc(${draft.titleMobileOffsetX} * 1% * var(--ms, 1))) translateY(calc(${draft.titleMobileOffsetY} * 1% * var(--ms, 1)))`,
                          fontSize: `${draft.mobilePreviewTitleFontPx}px`,
                          lineHeight: 1.3,
                        }}
                      >
                        {draft.titleMobile || "Mobile title"}
                      </h4>
                      <p
                        className="mt-2 max-w-full break-words whitespace-pre-wrap text-slate-700 transition-transform duration-150"
                        style={{
                          transform: `translateX(calc(${draft.bodyMobileOffsetX} * 1% * var(--ms, 1))) translateY(calc(${draft.bodyMobileOffsetY} * 1% * var(--ms, 1)))`,
                          fontSize: `${draft.mobilePreviewBodyFontPx}px`,
                          lineHeight: 1.35,
                        }}
                      >
                        {draft.bodyMobile || "Mobile description"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      "titleDesktopOffsetY",
                      "titleMobileOffsetY",
                      "bodyDesktopOffsetY",
                      "bodyMobileOffsetY",
                      "titleDesktopOffsetX",
                      "bodyDesktopOffsetX",
                      "titleMobileOffsetX",
                      "bodyMobileOffsetX",
                    ] as OffsetResetFieldKey[]
                  ).map((field) => (
                    <button
                      key={field}
                      type="button"
                      onClick={() => setDraft((prev) => ({ ...prev, [field]: 0 }))}
                      className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Reset {offsetLabel(field)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <MediaFormSubmitButton pendingLabel="Saving…">Save text content</MediaFormSubmitButton>
              </div>

              <ModelingSlotFormMessages state={state} />
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
