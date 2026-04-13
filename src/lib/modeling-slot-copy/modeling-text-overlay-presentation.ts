/**
 * Custom modeling overlay: line breaks come from explicit newlines (title) and HTML structure
 * (body), not from automatic wrapping when font size or viewport changes.
 *
 * @see ModelingTextOverlayEditorSurface — Admin visual editor
 * @see ModelingSlotCustomTextOverlay — live site
 */
import type { CSSProperties } from "react";

import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

export const MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS = "whitespace-pre overflow-visible";

/** Sizes the layer to content width so no max-width constraint reflows text. */
export const MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS = "w-max max-w-none overflow-visible";

/**
 * Inner frame padding for the desktop/tablet layout branch (matches live at `md+` with
 * `ModelingSlotCustomTextOverlay`’s responsive padding).
 */
export const MODELING_TEXT_OVERLAY_FRAME_PADDING_DESKTOP_CLASS =
  "px-[calc(2rem*var(--ms,1))] py-[calc(2.5rem*var(--ms,1))]";

/**
 * Inner frame padding for the mobile layout branch (matches live below `md` in the same overlay).
 */
export const MODELING_TEXT_OVERLAY_FRAME_PADDING_MOBILE_CLASS =
  "px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))]";

/**
 * Responsive overlay padding used on the live site (`ModelingSlotCustomTextOverlay` outer frame).
 */
export const MODELING_TEXT_OVERLAY_OUTER_PADDING_CLASS =
  "px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]";

/**
 * Position + font size on the layer wrapper — must match `ModelingSlotCustomTextOverlay` so
 * `w-max` boxes and % coordinates match the live site.
 */
export function getModelingTextOverlayLayerFrameStyle(
  layer: ModelingTextOverlayLayout["title"],
): CSSProperties {
  return {
    position: "absolute",
    left: `${layer.xPct}%`,
    top: `${layer.yPct}%`,
    transform: "translate(-50%, -50%)",
    fontSize: `calc(${layer.fontSizePx}px * var(--ms, 1) * var(--mt, 1))`,
  };
}
