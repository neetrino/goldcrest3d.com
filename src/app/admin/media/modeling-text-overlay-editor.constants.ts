import type { CSSProperties } from "react";

import { MODELING_SPECIALIZATION_CARD_TEXT_MT } from "@/lib/modeling-slot-copy/modeling-text-overlay-presentation";

/**
 * Admin visual editor: lock `--ms` to 1 (below `sm` on the site it is 1; desktop baseline uses 1 in editor).
 * Set `--mt` to the same value as `.modeling-specialization-card-text-scale` so overlay font sizes and
 * layout match the public-facing overlay rendering.
 */
export const MODELING_TEXT_OVERLAY_EDITOR_CANVAS_CSS_VARS: CSSProperties = {
  ["--ms" as string]: "1",
  ["--mt" as string]: String(MODELING_SPECIALIZATION_CARD_TEXT_MT),
};

/** Range inputs in the Modeling text overlay visual editor (px). */
export const MODELING_TEXT_OVERLAY_TITLE_FONT_MIN_PX = 8;
export const MODELING_TEXT_OVERLAY_TITLE_FONT_MAX_PX = 96;
export const MODELING_TEXT_OVERLAY_BODY_FONT_MIN_PX = 8;
export const MODELING_TEXT_OVERLAY_BODY_FONT_MAX_PX = 72;

/**
 * Keyboard / fine nudge step as a fraction of the overlay coordinate space (0–100%).
 * Matches the shared overlay percentage positioning.
 */
export const MODELING_TEXT_OVERLAY_EDITOR_NUDGE_PCT = 0.25;

/**
 * Reference viewport and section padding — same as `SectionModeling` (`md:px-5`) at a full-width shell.
 * Used to match one grid column width to the live Modeling Specialization cards.
 */
const MODELING_EDITOR_VIEWPORT_REF_PX = 1920;
const MODELING_EDITOR_SECTION_PADDING_X_PX = 20;

/** Container query width: viewport minus horizontal section padding. */
const MODELING_EDITOR_CQ_REF_PX =
  MODELING_EDITOR_VIEWPORT_REF_PX - MODELING_EDITOR_SECTION_PADDING_X_PX * 2;

/** `--ms` from `modeling-section-scale.css`: `100cqw / 1920px` (capped). */
const MODELING_EDITOR_MS_AT_CQ = MODELING_EDITOR_CQ_REF_PX / MODELING_EDITOR_VIEWPORT_REF_PX;

/** Lg grid column gap ≈ `0.5rem * --ms` (1rem = 16px), see `SectionModeling` grid. */
const MODELING_EDITOR_LG_GAP_PX = 8 * MODELING_EDITOR_MS_AT_CQ;

/**
 * One desktop card width — half of `(cqWidth − gap)` for the 2-column grid.
 * Modal + inline preview use this so WYSIWYG matches the homepage card size.
 */
export const MODELING_TEXT_OVERLAY_EDITOR_DESKTOP_CANVAS_MAX_WIDTH_PX = Math.round(
  (MODELING_EDITOR_CQ_REF_PX - MODELING_EDITOR_LG_GAP_PX) / 2,
);

/**
 * Mobile modeling card — `SectionModeling` uses `px-3` (12px × 2); grid is one column below `sm`.
 * Reference viewport 375px (common CSS width) → content width matches a full-width card column.
 * Height on site follows `aspect-[360/259]` (`modeling-card.constants` / Figma).
 */
const MODELING_EDITOR_MOBILE_VIEWPORT_REF_PX = 375;
const MODELING_EDITOR_MOBILE_SECTION_PADDING_X_TOTAL_PX = 24;

/** One mobile card width — matches live column at the reference viewport. */
export const MODELING_TEXT_OVERLAY_EDITOR_MOBILE_CANVAS_MAX_WIDTH_PX =
  MODELING_EDITOR_MOBILE_VIEWPORT_REF_PX - MODELING_EDITOR_MOBILE_SECTION_PADDING_X_TOTAL_PX;
