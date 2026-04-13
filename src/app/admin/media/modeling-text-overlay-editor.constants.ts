import type { CSSProperties } from "react";

/**
 * Admin visual editor only: disable landing `--ms` (container scale) and card `--mt` so
 * `fontSizePx` from sliders matches rendered CSS px (WYSIWYG for the numbers).
 * Live site still uses scaled vars from `ModelingSlotCustomTextOverlay`.
 */
export const MODELING_TEXT_OVERLAY_EDITOR_CANVAS_CSS_VARS: CSSProperties = {
  ["--ms" as string]: "1",
  ["--mt" as string]: "1",
};

/** Range inputs in the Modeling text overlay visual editor (px). */
export const MODELING_TEXT_OVERLAY_TITLE_FONT_MIN_PX = 8;
export const MODELING_TEXT_OVERLAY_TITLE_FONT_MAX_PX = 96;
export const MODELING_TEXT_OVERLAY_BODY_FONT_MIN_PX = 8;
export const MODELING_TEXT_OVERLAY_BODY_FONT_MAX_PX = 72;

/**
 * Keyboard / fine nudge step as a fraction of the overlay coordinate space (0–100%).
 * Matches `ModelingSlotCustomTextOverlay` percentage positioning.
 */
export const MODELING_TEXT_OVERLAY_EDITOR_NUDGE_PCT = 0.25;

/** Max width (px) of the desktop/tablet visual editing canvas inside the modal. */
export const MODELING_TEXT_OVERLAY_EDITOR_DESKTOP_CANVAS_MAX_WIDTH_PX = 1200;

/** Max width (px) of the mobile visual editing canvas — typical phone logical width. */
export const MODELING_TEXT_OVERLAY_EDITOR_MOBILE_CANVAS_MAX_WIDTH_PX = 430;
