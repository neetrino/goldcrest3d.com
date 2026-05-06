"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  updateModelingSlotCopy,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import {
  clampModelingCopyOffset,
  MODELING_COPY_OFFSET_NUDGE_PCT,
  MODELING_COPY_OFFSET_VERTICAL_QUICK_DELTAS_PCT,
  MODELING_COPY_OFFSET_Y_MAX_PCT,
  MODELING_COPY_OFFSET_Y_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT,
} from "@/constants/modeling-specialization-copy-offset";
import {
  clampModelingMobilePreviewBodyFontPx,
  clampModelingMobilePreviewTitleFontPx,
} from "@/constants/modeling-specialization-mobile-preview-font";
import {
  clampModelingTabletPreviewBodyFontPx,
  clampModelingTabletPreviewTitleFontPx,
} from "@/constants/modeling-specialization-tablet-preview-font";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingMobilePreviewFontControls } from "./ModelingMobilePreviewFontControls";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";
import { ModelingTabletPreviewFontControls } from "./ModelingTabletPreviewFontControls";
import { ModelingWideRangePctOffsetStepper } from "./ModelingWideRangePctOffsetStepper";

export type ModelingSlotCopyEditorMode = "full" | "tabletOnly";

type ModelingSlotCopyEditorProps = {
  row: AdminModelingSlotRow;
  /** `tabletOnly`: modal shows tablet copy/offsets/fonts only (used on Modeling — Tablet tab). */
  mode?: ModelingSlotCopyEditorMode;
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
  | "bodyMobileOffsetX"
  | "titleTabletOffsetY"
  | "bodyTabletOffsetY"
  | "titleTabletOffsetX"
  | "bodyTabletOffsetX";

type EditorDraft = {
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  bodyDesktop: string;
  bodyMobile: string;
  bodyTablet: string;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  titleDesktopOffsetX: number;
  bodyDesktopOffsetX: number;
  titleMobileOffsetX: number;
  bodyMobileOffsetX: number;
  titleTabletOffsetY: number;
  bodyTabletOffsetY: number;
  titleTabletOffsetX: number;
  bodyTabletOffsetX: number;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
  tabletPreviewTitleFontPx: number;
  tabletPreviewBodyFontPx: number;
};

function toInitialDraft(row: AdminModelingSlotRow): EditorDraft {
  return {
    titleDesktop: row.titleDesktop,
    titleMobile: row.titleMobile,
    titleTablet: row.titleTablet,
    bodyDesktop: row.bodyDesktop,
    bodyMobile: row.bodyMobile,
    bodyTablet: row.bodyTablet,
    desktopLine1Emphasis: row.desktopLine1Emphasis,
    tabletLine1Emphasis: row.tabletLine1Emphasis,
    titleDesktopOffsetY: row.titleDesktopOffsetY,
    titleMobileOffsetY: row.titleMobileOffsetY,
    bodyDesktopOffsetY: row.bodyDesktopOffsetY,
    bodyMobileOffsetY: row.bodyMobileOffsetY,
    titleDesktopOffsetX: row.titleDesktopOffsetX,
    bodyDesktopOffsetX: row.bodyDesktopOffsetX,
    titleMobileOffsetX: row.titleMobileOffsetX,
    bodyMobileOffsetX: row.bodyMobileOffsetX,
    titleTabletOffsetY: row.titleTabletOffsetY,
    bodyTabletOffsetY: row.bodyTabletOffsetY,
    titleTabletOffsetX: row.titleTabletOffsetX,
    bodyTabletOffsetX: row.bodyTabletOffsetX,
    mobilePreviewTitleFontPx: row.mobilePreviewTitleFontPx,
    mobilePreviewBodyFontPx: row.mobilePreviewBodyFontPx,
    tabletPreviewTitleFontPx: row.tabletPreviewTitleFontPx,
    tabletPreviewBodyFontPx: row.tabletPreviewBodyFontPx,
  };
}

type ModelingCopyVerticalOffsetControlsProps = {
  field: VerticalOffsetFieldKey;
  valuePct: number;
  disabled: boolean;
  onNudge: (delta: number) => void;
};

function ModelingCopyVerticalOffsetControls({
  field,
  valuePct,
  disabled,
  onNudge,
}: ModelingCopyVerticalOffsetControlsProps) {
  const stepperClassName =
    "rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onNudge(-MODELING_COPY_OFFSET_NUDGE_PCT)}
        className={stepperClassName}
      >
        Up
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onNudge(MODELING_COPY_OFFSET_NUDGE_PCT)}
        className={stepperClassName}
      >
        Down
      </button>
      {MODELING_COPY_OFFSET_VERTICAL_QUICK_DELTAS_PCT.map((delta) => (
        <button
          key={`${field}-${delta}`}
          type="button"
          disabled={disabled}
          onClick={() => onNudge(delta)}
          className={stepperClassName}
        >
          {String(delta)}
        </button>
      ))}
      <span className="text-xs text-slate-500">{valuePct}%</span>
    </div>
  );
}

function offsetLabel(key: OffsetResetFieldKey): string {
  if (key === "titleDesktopOffsetY") return "Desktop title vertical";
  if (key === "titleMobileOffsetY") return "Mobile title vertical";
  if (key === "bodyDesktopOffsetY") return "Desktop description vertical";
  if (key === "bodyMobileOffsetY") return "Mobile description vertical";
  if (key === "titleDesktopOffsetX") return "Desktop title horizontal";
  if (key === "bodyDesktopOffsetX") return "Desktop description horizontal";
  if (key === "titleMobileOffsetX") return "Mobile title horizontal";
  if (key === "bodyMobileOffsetX") return "Mobile description horizontal";
  if (key === "titleTabletOffsetY") return "Tablet title vertical";
  if (key === "bodyTabletOffsetY") return "Tablet description vertical";
  if (key === "titleTabletOffsetX") return "Tablet title horizontal";
  return "Tablet description horizontal";
}

export function ModelingSlotCopyEditor({
  row,
  mode = "full",
}: ModelingSlotCopyEditorProps) {
  const draftResetKey = [
    row.slotKey,
    mode,
    row.titleDesktop,
    row.titleMobile,
    row.titleTablet,
    row.bodyDesktop,
    row.bodyMobile,
    row.bodyTablet,
    row.desktopLine1Emphasis,
    row.tabletLine1Emphasis,
    row.titleDesktopOffsetY,
    row.titleMobileOffsetY,
    row.bodyDesktopOffsetY,
    row.bodyMobileOffsetY,
    row.titleDesktopOffsetX,
    row.bodyDesktopOffsetX,
    row.titleMobileOffsetX,
    row.bodyMobileOffsetX,
    row.titleTabletOffsetY,
    row.bodyTabletOffsetY,
    row.titleTabletOffsetX,
    row.bodyTabletOffsetX,
    row.mobilePreviewTitleFontPx,
    row.mobilePreviewBodyFontPx,
    row.tabletPreviewTitleFontPx,
    row.tabletPreviewBodyFontPx,
  ].join("|");
  return <ModelingSlotCopyEditorContent key={draftResetKey} row={row} mode={mode} />;
}

function ModelingSlotCopyEditorContent({
  row,
  mode = "full",
}: ModelingSlotCopyEditorProps) {
  const tabletOnly = mode === "tabletOnly";
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
  const nudgeOffset = (field: VerticalOffsetFieldKey, delta: number) => {
    setDraft((prev) => ({
      ...prev,
      [field]: clampModelingCopyOffset(prev[field] + delta),
    }));
  };

  const saveButtonLabel = tabletOnly ? "Save tablet copy" : "Save text content";
  const triggerTitle = tabletOnly ? "Tablet text content" : "Text content";
  const triggerSubtitle = tabletOnly
    ? "Tablet viewport (755px–1023px). Click to open editor."
    : "Click to open editor in full screen.";

  return (
    <form
      action={formAction}
      className="rounded-xl border border-slate-200/90 bg-white p-4"
      aria-label={
        tabletOnly ? `Edit tablet copy for ${row.label}` : `Edit text content for ${row.label}`
      }
    >
      <input type="hidden" name="slotKey" value={row.slotKey} />
      {tabletOnly ? (
        <>
          <input type="hidden" name="titleDesktop" value={draft.titleDesktop} />
          <input type="hidden" name="titleMobile" value={draft.titleMobile} />
          <input type="hidden" name="bodyDesktop" value={draft.bodyDesktop} />
          <input type="hidden" name="bodyMobile" value={draft.bodyMobile} />
        </>
      ) : (
        <>
          <input type="hidden" name="titleTablet" value={draft.titleTablet} />
          <input type="hidden" name="bodyTablet" value={draft.bodyTablet} />
        </>
      )}
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
      <input type="hidden" name="titleTabletOffsetY" value={String(draft.titleTabletOffsetY)} />
      <input type="hidden" name="bodyTabletOffsetY" value={String(draft.bodyTabletOffsetY)} />
      <input type="hidden" name="titleTabletOffsetX" value={String(draft.titleTabletOffsetX)} />
      <input type="hidden" name="bodyTabletOffsetX" value={String(draft.bodyTabletOffsetX)} />
      <input
        type="hidden"
        name="tabletPreviewTitleFontPx"
        value={String(draft.tabletPreviewTitleFontPx)}
      />
      <input
        type="hidden"
        name="tabletPreviewBodyFontPx"
        value={String(draft.tabletPreviewBodyFontPx)}
      />
      <div className="rounded-lg border border-slate-200 bg-slate-50/70">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition hover:bg-slate-100/70"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">{triggerTitle}</p>
            <p className="mt-0.5 text-xs text-slate-600">{triggerSubtitle}</p>
          </div>
          <span className="text-slate-500">⤢</span>
        </button>
      </div>

      {isDialogVisible ? (
        <div
          className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-slate-900/70 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={
            tabletOnly ? `Tablet copy editor for ${row.label}` : `Text content editor for ${row.label}`
          }
        >
          <div
            className={`max-h-[96vh] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl ${tabletOnly ? "max-w-3xl" : "max-w-7xl"}`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {tabletOnly ? "Tablet text content" : "Text content"}
                </p>
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
                {tabletOnly
                  ? "Tablet tier only (755px–1023px). Each line break is a new line. Empty fields hide text on tablet. Desktop and mobile copy are unchanged."
                  : "Each line break creates a new visual line. Leave fields empty to hide text on the site."}
              </p>

              {tabletOnly ? (
                <div className="grid gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Tablet title</span>
                    <textarea
                      name="titleTablet"
                      rows={3}
                      value={draft.titleTablet}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, titleTablet: event.target.value }))
                      }
                      disabled={isPending}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-slate-700">
                        Tablet title vertical (%)
                      </span>
                      <ModelingWideRangePctOffsetStepper
                        value={draft.titleTabletOffsetY}
                        disabled={isPending}
                        variant="vertical"
                        numericInputId={`tablet-tab-oty-${row.slotKey}`}
                        onValueChange={(next) =>
                          setDraft((prev) => ({ ...prev, titleTabletOffsetY: next }))
                        }
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                      <span className="text-xs font-medium text-slate-700">
                        Tablet title horizontal (%)
                      </span>
                      <ModelingWideRangePctOffsetStepper
                        value={draft.titleTabletOffsetX}
                        disabled={isPending}
                        variant="horizontal"
                        numericInputId={`tablet-tab-otx-${row.slotKey}`}
                        onValueChange={(next) =>
                          setDraft((prev) => ({ ...prev, titleTabletOffsetX: next }))
                        }
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Tablet description</span>
                    <textarea
                      name="bodyTablet"
                      rows={10}
                      value={draft.bodyTablet}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, bodyTablet: event.target.value }))
                      }
                      disabled={isPending}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-slate-700">
                        Tablet description vertical (%)
                      </span>
                      <ModelingWideRangePctOffsetStepper
                        value={draft.bodyTabletOffsetY}
                        disabled={isPending}
                        variant="vertical"
                        numericInputId={`tablet-tab-oby-${row.slotKey}`}
                        onValueChange={(next) =>
                          setDraft((prev) => ({ ...prev, bodyTabletOffsetY: next }))
                        }
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                      <span className="text-xs font-medium text-slate-700">
                        Tablet description horizontal (%)
                      </span>
                      <ModelingWideRangePctOffsetStepper
                        value={draft.bodyTabletOffsetX}
                        disabled={isPending}
                        variant="horizontal"
                        numericInputId={`tablet-tab-obx-${row.slotKey}`}
                        onValueChange={(next) =>
                          setDraft((prev) => ({ ...prev, bodyTabletOffsetX: next }))
                        }
                      />
                    </div>
                  </label>
                </div>
              ) : (
                <>
              <div className="grid gap-4 lg:grid-cols-2">
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
                  <ModelingCopyVerticalOffsetControls
                    field="titleDesktopOffsetY"
                    valuePct={draft.titleDesktopOffsetY}
                    disabled={isPending}
                    onNudge={(delta) => nudgeOffset("titleDesktopOffsetY", delta)}
                  />
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
                  <ModelingCopyVerticalOffsetControls
                    field="titleMobileOffsetY"
                    valuePct={draft.titleMobileOffsetY}
                    disabled={isPending}
                    onNudge={(delta) => nudgeOffset("titleMobileOffsetY", delta)}
                  />
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

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
                  <ModelingCopyVerticalOffsetControls
                    field="bodyDesktopOffsetY"
                    valuePct={draft.bodyDesktopOffsetY}
                    disabled={isPending}
                    onNudge={(delta) => nudgeOffset("bodyDesktopOffsetY", delta)}
                  />
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
                  <ModelingCopyVerticalOffsetControls
                    field="bodyMobileOffsetY"
                    valuePct={draft.bodyMobileOffsetY}
                    disabled={isPending}
                    onNudge={(delta) => nudgeOffset("bodyMobileOffsetY", delta)}
                  />
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
                </>
              )}

              {showEmphasisField ? (
                tabletOnly ? (
                  <div className="mt-4">
                    <input
                      type="hidden"
                      name="desktopLine1Emphasis"
                      value={draft.desktopLine1Emphasis}
                    />
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-slate-700">
                        Tablet highlighted fragment
                      </span>
                      <input
                        type="text"
                        name="tabletLine1Emphasis"
                        value={draft.tabletLine1Emphasis}
                        onChange={(event) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabletLine1Emphasis: event.target.value,
                          }))
                        }
                        disabled={isPending}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="mt-4">
                    <input
                      type="hidden"
                      name="tabletLine1Emphasis"
                      value={draft.tabletLine1Emphasis}
                    />
                    <label className="flex flex-col gap-1.5">
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
                    <p className="mt-2 text-xs text-slate-500">
                      Tablet highlighted fragment is edited on the Modeling — Tablet tab.
                    </p>
                  </div>
                )
              ) : (
                <>
                  <input type="hidden" name="desktopLine1Emphasis" value="" />
                  <input type="hidden" name="tabletLine1Emphasis" value="" />
                </>
              )}

              <p className="mt-4 text-xs text-slate-600">
                {tabletOnly ? (
                  <>
                    Tablet offsets use {MODELING_TABLET_COPY_OFFSET_MIN_PCT}…
                    {MODELING_TABLET_COPY_OFFSET_MAX_PCT} (steps ±{MODELING_COPY_OFFSET_NUDGE_PCT}, ±
                    {MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT}, ±
                    {MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT}).
                  </>
                ) : (
                  <>
                    Desktop and mobile vertical offsets use {MODELING_COPY_OFFSET_Y_MIN_PCT}…
                    {MODELING_COPY_OFFSET_Y_MAX_PCT} ({MODELING_COPY_OFFSET_NUDGE_PCT}% per step;
                    shortcuts {MODELING_COPY_OFFSET_VERTICAL_QUICK_DELTAS_PCT.join(", ")}). Horizontal
                    uses the steppers above. Edit tablet copy and tablet offsets on the Modeling —
                    Tablet tab.
                  </>
                )}
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-sm font-semibold text-slate-900">Live position preview</p>
                <p className="mt-1 text-xs text-slate-500">
                  {tabletOnly
                    ? "Adjust tablet title/body size below; offsets match the steppers above. Preview updates instantly."
                    : `Up/Down moves vertical text by ${MODELING_COPY_OFFSET_NUDGE_PCT}% per click; shortcut buttons add that many percentage points (clamped to ${MODELING_COPY_OFFSET_Y_MIN_PCT}…${MODELING_COPY_OFFSET_Y_MAX_PCT}%). Horizontal uses the stepper above. Preview updates instantly.`}
                </p>
                {tabletOnly ? (
                  <>
                    <div className="mt-3">
                      <ModelingTabletPreviewFontControls
                        titleFontPx={draft.tabletPreviewTitleFontPx}
                        bodyFontPx={draft.tabletPreviewBodyFontPx}
                        disabled={isPending}
                        onTitleFontPxChange={(next) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabletPreviewTitleFontPx: clampModelingTabletPreviewTitleFontPx(next),
                          }))
                        }
                        onBodyFontPxChange={(next) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabletPreviewBodyFontPx: clampModelingTabletPreviewBodyFontPx(next),
                          }))
                        }
                      />
                    </div>
                    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Tablet preview
                      </p>
                      <div className="relative mt-2 min-h-[180px] overflow-hidden rounded-md border border-slate-100 bg-slate-50 p-3">
                        <h4
                          className="whitespace-pre-wrap font-semibold text-slate-900 transition-transform duration-150"
                          style={{
                            transform: `translate(${draft.titleTabletOffsetX}%, ${draft.titleTabletOffsetY}%)`,
                            fontSize: `${draft.tabletPreviewTitleFontPx}px`,
                            lineHeight: 1.3,
                          }}
                        >
                          {draft.titleTablet || "Tablet title"}
                        </h4>
                        <p
                          className="mt-2 whitespace-pre-wrap text-slate-700 transition-transform duration-150"
                          style={{
                            transform: `translate(${draft.bodyTabletOffsetX}%, ${draft.bodyTabletOffsetY}%)`,
                            fontSize: `${draft.tabletPreviewBodyFontPx}px`,
                            lineHeight: 1.35,
                          }}
                        >
                          {draft.bodyTablet || "Tablet description"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(
                        [
                          "titleTabletOffsetY",
                          "bodyTabletOffsetY",
                          "titleTabletOffsetX",
                          "bodyTabletOffsetX",
                        ] as const
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
                  </>
                ) : (
                  <>
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
                      <p className="mt-2 text-xs text-slate-500">
                        Tablet preview font sizes are adjusted on the Modeling — Tablet tab.
                      </p>
                    </div>
                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                      <div className="rounded-lg border border-slate-200 bg-white p-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Desktop preview
                        </p>
                        <div className="relative mt-2 min-h-[180px] overflow-hidden rounded-md border border-slate-100 bg-slate-50 p-3">
                          <h4
                            className="whitespace-pre-wrap text-base font-semibold text-slate-900 transition-transform duration-150"
                            style={{
                              transform: `translate(${draft.titleDesktopOffsetX}%, ${draft.titleDesktopOffsetY}%)`,
                            }}
                          >
                            {draft.titleDesktop || "Desktop title"}
                          </h4>
                          <p
                            className="mt-2 whitespace-pre-wrap text-sm text-slate-700 transition-transform duration-150"
                            style={{
                              transform: `translate(${draft.bodyDesktopOffsetX}%, ${draft.bodyDesktopOffsetY}%)`,
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
                        <div className="relative mt-2 min-h-[180px] overflow-hidden rounded-md border border-slate-100 bg-slate-50 p-3">
                          <h4
                            className="whitespace-pre-wrap font-semibold text-slate-900 transition-transform duration-150"
                            style={{
                              transform: `translate(${draft.titleMobileOffsetX}%, ${draft.titleMobileOffsetY}%)`,
                              fontSize: `${draft.mobilePreviewTitleFontPx}px`,
                              lineHeight: 1.3,
                            }}
                          >
                            {draft.titleMobile || "Mobile title"}
                          </h4>
                          <p
                            className="mt-2 whitespace-pre-wrap text-slate-700 transition-transform duration-150"
                            style={{
                              transform: `translate(${draft.bodyMobileOffsetX}%, ${draft.bodyMobileOffsetY}%)`,
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
                        ] as const
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
                  </>
                )}
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
                <MediaFormSubmitButton pendingLabel="Saving…">{saveButtonLabel}</MediaFormSubmitButton>
              </div>

              <ModelingSlotFormMessages state={state} />
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
