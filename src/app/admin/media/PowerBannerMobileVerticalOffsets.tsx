"use client";

import {
  POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MAX,
  POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MIN,
  POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP,
} from "@/lib/power-banner-copy/power-banner-copy-offsets.constants";

type PowerBannerMobileVerticalOffsetsProps = {
  /** Which hero viewport these offsets apply to (copy row + site rendering). */
  viewportLabel: "Desktop" | "Mobile";
  titleOffsetY: number;
  bodyOffsetY: number;
  ctaOffsetY: number;
  onNudgeTitle: (delta: number) => void;
  onNudgeBody: (delta: number) => void;
  onNudgeCta: (delta: number) => void;
};

function clampMobileCopyOffsetPx(value: number): number {
  const rounded = Number.isFinite(value) ? Math.round(value) : 0;
  return Math.min(
    POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MAX,
    Math.max(POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MIN, rounded),
  );
}

export function PowerBannerMobileVerticalOffsets({
  viewportLabel,
  titleOffsetY,
  bodyOffsetY,
  ctaOffsetY,
  onNudgeTitle,
  onNudgeBody,
  onNudgeCta,
}: PowerBannerMobileVerticalOffsetsProps) {
  const step = POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP;
  const surface = viewportLabel.toLowerCase();
  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
      <p className="text-sm font-semibold text-slate-900">
        {viewportLabel} vertical position
      </p>
      <p className="mt-1 text-xs text-slate-600">
        Nudge the {surface} hero title, description, and Get a Quote button independently (pixels).
        Same limits as Modeling Specialization cards.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Title</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNudgeTitle(-step)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Up
            </button>
            <button
              type="button"
              onClick={() => onNudgeTitle(step)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Down
            </button>
            <span className="text-xs text-slate-500">{titleOffsetY}px</span>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Description</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNudgeBody(-step)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Up
            </button>
            <button
              type="button"
              onClick={() => onNudgeBody(step)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Down
            </button>
            <span className="text-xs text-slate-500">{bodyOffsetY}px</span>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-3 sm:col-span-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Get a Quote button</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNudgeCta(-step)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Up
            </button>
            <button
              type="button"
              onClick={() => onNudgeCta(step)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Down
            </button>
            <span className="text-xs text-slate-500">{ctaOffsetY}px</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { clampMobileCopyOffsetPx };
