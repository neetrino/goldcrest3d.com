"use client";

import {
  MODELING_MOBILE_PREVIEW_BODY_FONT_PX_DEFAULT,
  MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX,
  MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN,
  MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_DEFAULT,
  MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX,
  MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN,
} from "@/constants/modeling-specialization-mobile-preview-font";

type ModelingMobilePreviewFontControlsProps = {
  titleFontPx: number;
  bodyFontPx: number;
  disabled: boolean;
  onTitleFontPxChange: (value: number) => void;
  onBodyFontPxChange: (value: number) => void;
};

export function ModelingMobilePreviewFontControls({
  titleFontPx,
  bodyFontPx,
  disabled,
  onTitleFontPxChange,
  onBodyFontPxChange,
}: ModelingMobilePreviewFontControlsProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-3">
      <p className="text-xs font-medium text-slate-800">Mobile preview text size</p>
      <p className="mt-1 text-[11px] leading-snug text-slate-500">
        Adjusts the mobile column below and the live site below the <span className="font-medium">md</span>{" "}
        breakpoint. Desktop preview and tablet/desktop copy on the site stay on the default sizes.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-700">Title (px)</span>
          <input
            type="range"
            min={MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN}
            max={MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX}
            step={1}
            value={titleFontPx}
            disabled={disabled}
            onChange={(event) => onTitleFontPxChange(Number(event.target.value))}
            className="w-full accent-slate-800 disabled:opacity-60"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500">
              {titleFontPx}px (default {MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_DEFAULT}px)
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onTitleFontPxChange(MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_DEFAULT)}
              className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-700">Description (px)</span>
          <input
            type="range"
            min={MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN}
            max={MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX}
            step={1}
            value={bodyFontPx}
            disabled={disabled}
            onChange={(event) => onBodyFontPxChange(Number(event.target.value))}
            className="w-full accent-slate-800 disabled:opacity-60"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500">
              {bodyFontPx}px (default {MODELING_MOBILE_PREVIEW_BODY_FONT_PX_DEFAULT}px)
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onBodyFontPxChange(MODELING_MOBILE_PREVIEW_BODY_FONT_PX_DEFAULT)}
              className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
