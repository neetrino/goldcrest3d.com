"use client";

import { POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP } from "@/lib/power-banner-copy/power-banner-copy-offsets.constants";

import { clampMobileCopyOffsetPx } from "./PowerBannerMobileVerticalOffsets";

const STEP = POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP;

type AxisOffsets = {
  x: number;
  y: number;
};

type PowerBannerTabletCopyPositionControlsProps = {
  title: AxisOffsets;
  body: AxisOffsets;
  cta: AxisOffsets;
  onChangeTitle: (next: AxisOffsets) => void;
  onChangeBody: (next: AxisOffsets) => void;
  onChangeCta: (next: AxisOffsets) => void;
};

function PositionRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: AxisOffsets;
  onChange: (next: AxisOffsets) => void;
}) {
  const nudgeY = (delta: number) =>
    onChange({
      ...value,
      y: clampMobileCopyOffsetPx(value.y + delta),
    });
  const nudgeX = (delta: number) =>
    onChange({
      ...value,
      x: clampMobileCopyOffsetPx(value.x + delta),
    });

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-600">{label}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Vertical
          </span>
          <button
            type="button"
            onClick={() => nudgeY(-STEP)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Up
          </button>
          <button
            type="button"
            onClick={() => nudgeY(STEP)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Down
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, y: 0 })}
            className="rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            0px Y
          </button>
          <span className="text-xs tabular-nums text-slate-600">Y {value.y}px</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Horizontal
          </span>
          <button
            type="button"
            onClick={() => nudgeX(-STEP)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => nudgeX(STEP)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Right
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, x: 0 })}
            className="rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            0px X
          </button>
          <span className="text-xs tabular-nums text-slate-600">X {value.x}px</span>
        </div>
        <button
          type="button"
          onClick={() => onChange({ x: 0, y: 0 })}
          className="rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-800 hover:bg-slate-100"
        >
          Reset position (0, 0)
        </button>
      </div>
    </div>
  );
}

/**
 * Tablet-only hero text positioning (title, description, CTA). Does not affect desktop/mobile rows.
 */
export function PowerBannerTabletCopyPositionControls({
  title,
  body,
  cta,
  onChangeTitle,
  onChangeBody,
  onChangeCta,
}: PowerBannerTabletCopyPositionControlsProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
      <p className="text-sm font-semibold text-slate-900">Tablet text position</p>
      <p className="mt-1 text-xs text-slate-600">
        Adjust title, description, and Get a Quote independently on tablet viewports only (768px–1023px).
        Horizontal and vertical offsets are stored only on the tablet hero row — desktop layout is unchanged.
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PositionRow label="Title" value={title} onChange={onChangeTitle} />
        <PositionRow label="Description" value={body} onChange={onChangeBody} />
        <PositionRow label="Get a Quote button" value={cta} onChange={onChangeCta} />
      </div>
    </div>
  );
}
