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

export function resolveRenderingSubtitleDisplay(body: string): {
  desktopLine1: string;
  desktopLine2: string;
  mobileLines: string[];
} {
  const trimmed = body.trim();
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) ===
      normalizeForCompare(POWER_BANNER_DEFAULT_COPY.RENDERING.body)
  ) {
    return {
      desktopLine1: RENDERING_SUBTITLE_LINE1,
      desktopLine2: RENDERING_SUBTITLE_LINE2,
      mobileLines: [
        RENDERING_SUBTITLE_MOBILE_LINE1,
        RENDERING_SUBTITLE_MOBILE_LINE2,
        RENDERING_SUBTITLE_MOBILE_LINE3,
        RENDERING_SUBTITLE_MOBILE_LINE4,
      ],
    };
  }
  const parts = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    return { desktopLine1: "", desktopLine2: "", mobileLines: [] };
  }
  if (parts.length === 1) {
    return {
      desktopLine1: parts[0],
      desktopLine2: "",
      mobileLines: [parts[0]],
    };
  }
  return {
    desktopLine1: parts[0],
    desktopLine2: parts.slice(1).join(" "),
    mobileLines: parts,
  };
}

export function resolveDesignSubtitleDisplay(body: string): {
  line1: string;
  line2: string;
} {
  const trimmed = body.trim();
  if (
    !trimmed.includes("\n") &&
    normalizeForCompare(trimmed) ===
      normalizeForCompare(POWER_BANNER_DEFAULT_COPY.DESIGN.body)
  ) {
    return { line1: DESIGN_SUBTITLE_LINE1, line2: DESIGN_SUBTITLE_LINE2 };
  }
  if (trimmed.includes("\n")) {
    const parts = trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const line1 = parts[0] ?? "";
    const line2 = parts.slice(1).join(" ");
    return { line1, line2 };
  }
  return { line1: trimmed, line2: "" };
}
