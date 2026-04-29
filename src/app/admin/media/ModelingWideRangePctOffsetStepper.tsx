"use client";

import {
  clampModelingTabletCopyOffset,
  MODELING_COPY_OFFSET_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT,
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT,
} from "@/constants/modeling-specialization-copy-offset";

export type ModelingWideRangePctOffsetStepperVariant = "vertical" | "horizontal";

type ModelingWideRangePctOffsetStepperProps = {
  value: number;
  disabled: boolean;
  variant: ModelingWideRangePctOffsetStepperVariant;
  numericInputId: string;
  onValueChange: (next: number) => void;
};

/**
 * Admin stepper for modeling copy offsets in % (wide tablet range).
 * Used for tablet X/Y and desktop title/description horizontal positioning.
 */
export function ModelingWideRangePctOffsetStepper({
  value,
  disabled,
  variant,
  numericInputId,
  onValueChange,
}: ModelingWideRangePctOffsetStepperProps) {
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
