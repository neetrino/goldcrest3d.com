import {
  POWER_BANNER_DEFAULT_COPY,
  POWER_BANNER_DEFAULT_MOBILE_COPY,
} from "@/lib/power-banner-copy/power-banner-defaults";

import {
  DESIGN_SUBTITLE_LINE1,
  DESIGN_SUBTITLE_LINE2,
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

/** Mobile hero title lines — only persisted `mobileTitle` (no inference from desktop defaults). */
export function resolveModelingTitleMobileLines(title: string): string[] {
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return [];
  }
  if (trimmed.includes("\n")) {
    return trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
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

/**
 * Jewelry Rendering — line splits for default copy are evaluated against the canonical string for
 * each viewport (desktop vs mobile), so mobile text never inherits desktop-only layout rules.
 */
export function resolveRenderingSubtitleDisplay(
  body: string,
  variant: "desktop" | "mobile",
): {
  desktopLines: string[];
  mobileLines: string[];
  /** When true, use legacy nowrap rules tuned for default hero copy only. */
  useDefaultLineBreakLayout: boolean;
} {
  const trimmed = body.trim();
  const defaultBody =
    variant === "desktop"
      ? POWER_BANNER_DEFAULT_COPY.RENDERING.body
      : POWER_BANNER_DEFAULT_MOBILE_COPY.RENDERING.body;
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) === normalizeForCompare(defaultBody)
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
 * Jewelry Design — default copy uses two Figma lines when body matches the canonical string for
 * that viewport (desktop vs mobile).
 */
export function resolveDesignSubtitleDisplay(
  body: string,
  variant: "desktop" | "mobile",
): {
  lines: string[];
  useDefaultLineBreakLayout: boolean;
} {
  const trimmed = body.trim();
  const defaultBody =
    variant === "desktop"
      ? POWER_BANNER_DEFAULT_COPY.DESIGN.body
      : POWER_BANNER_DEFAULT_MOBILE_COPY.DESIGN.body;
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) === normalizeForCompare(defaultBody)
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
