"use client";

import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

import {
  MODELING_TEXT_OVERLAY_BODY_FONT_MAX_PX,
  MODELING_TEXT_OVERLAY_BODY_FONT_MIN_PX,
  MODELING_TEXT_OVERLAY_TITLE_FONT_MAX_PX,
  MODELING_TEXT_OVERLAY_TITLE_FONT_MIN_PX,
} from "./modeling-text-overlay-editor.constants";
import type { ModelingOverlayLayerKey } from "./ModelingTextOverlayEditorSurface";

type LayerKey = ModelingOverlayLayerKey;

export function ModelingTextOverlayFontSliders({
  variantLabel,
  layout,
  updateLayer,
}: {
  variantLabel: string;
  layout: ModelingTextOverlayLayout;
  updateLayer: (key: LayerKey, patch: Partial<ModelingTextOverlayLayout["title"]>) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        <span className="font-medium text-slate-800">Title size ({variantLabel})</span>
        <input
          type="range"
          min={MODELING_TEXT_OVERLAY_TITLE_FONT_MIN_PX}
          max={MODELING_TEXT_OVERLAY_TITLE_FONT_MAX_PX}
          value={layout.title.fontSizePx}
          onChange={(e) => updateLayer("title", { fontSizePx: Number(e.target.value) })}
          className="w-full accent-[#e2c481]"
        />
        <span className="font-mono text-[11px] text-slate-500">{layout.title.fontSizePx}px</span>
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        <span className="font-medium text-slate-800">Description size ({variantLabel})</span>
        <input
          type="range"
          min={MODELING_TEXT_OVERLAY_BODY_FONT_MIN_PX}
          max={MODELING_TEXT_OVERLAY_BODY_FONT_MAX_PX}
          value={layout.body.fontSizePx}
          onChange={(e) => updateLayer("body", { fontSizePx: Number(e.target.value) })}
          className="w-full accent-[#e2c481]"
        />
        <span className="font-mono text-[11px] text-slate-500">{layout.body.fontSizePx}px</span>
      </label>
    </div>
  );
}
