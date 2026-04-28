"use client";

import type { PowerBannerViewport } from "@/lib/power-banner-copy/power-banner-keys";
import {
  clampPowerBannerCopyOffsetPx,
  POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP,
} from "@/lib/power-banner-copy/power-banner-copy-offsets.constants";

const STEP = POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP;

const SECTION_COPY: Record<
  PowerBannerViewport,
  { heading: string; description: string }
> = {
  desktop: {
    heading: "Desktop text position",
    description:
      "Title, description, and Get a Quote for large screens (lg breakpoint and above). Saved only on the desktop hero row — separate from tablet and mobile rows.",
  },
  mobile: {
    heading: "Mobile text position",
    description:
      "Adjustments apply on the default mobile hero layout. Saved only on the mobile hero row — separate from desktop and tablet.",
  },
  tablet: {
    heading: "Tablet text position",
    description:
      "768px–1023px layout. Saved only on the tablet hero row — separate from desktop and mobile.",
  },
};

type AxisOffsets = {
  x: number;
  y: number;
};

type PowerBannerCopyPositionControlsProps = {
  viewport: PowerBannerViewport;
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
      y: clampPowerBannerCopyOffsetPx(value.y + delta),
    });
  const nudgeX = (delta: number) =>
    onChange({
      ...value,
      x: clampPowerBannerCopyOffsetPx(value.x + delta),
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
 * Per-viewport hero text positioning (title, description, CTA). Each viewport row in
 * `PowerBannerCopy` stores its own X/Y offsets independently.
 */
export function PowerBannerCopyPositionControls({
  viewport,
  title,
  body,
  cta,
  onChangeTitle,
  onChangeBody,
  onChangeCta,
}: PowerBannerCopyPositionControlsProps) {
  const copy = SECTION_COPY[viewport];
  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
      <p className="text-sm font-semibold text-slate-900">{copy.heading}</p>
      <p className="mt-1 text-xs text-slate-600">{copy.description}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PositionRow label="Title" value={title} onChange={onChangeTitle} />
        <PositionRow label="Description" value={body} onChange={onChangeBody} />
        <PositionRow label="Get a Quote button" value={cta} onChange={onChangeCta} />
      </div>
    </div>
  );
}
