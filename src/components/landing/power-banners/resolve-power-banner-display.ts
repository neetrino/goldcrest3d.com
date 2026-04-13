import { POWER_BANNER_DEFAULT_COPY } from "@/lib/power-banner-copy/power-banner-defaults";

import {
  DESIGN_SUBTITLE_LINE1,
  DESIGN_SUBTITLE_LINE2,
  MODELING_TITLE_MOBILE_LINE1,
  MODELING_TITLE_MOBILE_LINE2,
  RENDERING_SUBTITLE_LINE1,
  RENDERING_SUBTITLE_LINE2,
  RENDERING_SUBTITLE_MOBILE_LINE1,
  RENDERING_SUBTITLE_MOBILE_LINE2,
  RENDERING_SUBTITLE_MOBILE_LINE3,
  RENDERING_SUBTITLE_MOBILE_LINE4,
} from "./power-banners-layout.constants";

function normalizeForCompare(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function resolveModelingTitleMobileLines(title: string): string[] {
  const trimmed = title.trim();
  if (trimmed.includes("\n")) {
    return trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  if (trimmed === POWER_BANNER_DEFAULT_COPY.MODELING.title) {
    return [MODELING_TITLE_MOBILE_LINE1, MODELING_TITLE_MOBILE_LINE2];
  }
  return [trimmed];
}

export function resolveModelingTitleDesktop(title: string): string {
  const trimmed = title.trim();
  return trimmed.includes("\n")
    ? trimmed
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join(" ")
    : trimmed;
}

export function resolveModelingBodyDisplay(body: string): {
  desktopParagraph: string;
  mobileLines: string[];
} {
  const trimmed = body.trim();
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) ===
      normalizeForCompare(POWER_BANNER_DEFAULT_COPY.MODELING.body)
  ) {
    return {
      desktopParagraph: trimmed,
      mobileLines: [
        "Engineered for casting, printing and",
        "precise stone setting. Every micron",
        "accounted for.",
      ],
    };
  }
  const parts = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    return { desktopParagraph: "", mobileLines: [] };
  }
  if (parts.length === 1) {
    return { desktopParagraph: parts[0], mobileLines: [parts[0]] };
  }
  return {
    desktopParagraph: parts.join(" "),
    mobileLines: parts,
  };
}

/**
 * Jewelry Rendering — default copy keeps Figma line splits + nowrap; any custom text preserves
 * one block per line (same structure on mobile and desktop), matching Modeling’s intent.
 */
export function resolveRenderingSubtitleDisplay(body: string): {
  desktopLines: string[];
  mobileLines: string[];
  /** When true, use legacy nowrap rules tuned for default hero copy only. */
  useDefaultLineBreakLayout: boolean;
} {
  const trimmed = body.trim();
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) ===
      normalizeForCompare(POWER_BANNER_DEFAULT_COPY.RENDERING.body)
  ) {
    return {
      desktopLines: [RENDERING_SUBTITLE_LINE1, RENDERING_SUBTITLE_LINE2],
      mobileLines: [
        RENDERING_SUBTITLE_MOBILE_LINE1,
        RENDERING_SUBTITLE_MOBILE_LINE2,
        RENDERING_SUBTITLE_MOBILE_LINE3,
        RENDERING_SUBTITLE_MOBILE_LINE4,
      ],
      useDefaultLineBreakLayout: true,
    };
  }
  const parts = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    return { desktopLines: [], mobileLines: [], useDefaultLineBreakLayout: false };
  }
  return {
    desktopLines: parts,
    mobileLines: parts,
    useDefaultLineBreakLayout: false,
  };
}

/**
 * Jewelry Design — default copy uses two Figma lines; custom text uses one block per line
 * (no merging extra lines into a single paragraph).
 */
export function resolveDesignSubtitleDisplay(body: string): {
  lines: string[];
  useDefaultLineBreakLayout: boolean;
} {
  const trimmed = body.trim();
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) ===
      normalizeForCompare(POWER_BANNER_DEFAULT_COPY.DESIGN.body)
  ) {
    return {
      lines: [DESIGN_SUBTITLE_LINE1, DESIGN_SUBTITLE_LINE2],
      useDefaultLineBreakLayout: true,
    };
  }
  if (trimmed.includes("\n")) {
    const parts = trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    return {
      lines: parts.length > 0 ? parts : [""],
      useDefaultLineBreakLayout: false,
    };
  }
  return { lines: [trimmed], useDefaultLineBreakLayout: false };
}
