import type { CSSProperties } from "react";

/** Normalized focal point (percent) and zoom for cover-style crops inside a fixed frame. */
export type ImageFraming = {
  focusX: number;
  focusY: number;
  zoom: number;
};

export const DEFAULT_IMAGE_FRAMING: ImageFraming = {
  focusX: 50,
  focusY: 50,
  zoom: 1,
};

const MIN_FOCUS = 0;
const MAX_FOCUS = 100;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export function clampImageFraming(input: Partial<ImageFraming> | null | undefined): ImageFraming {
  const base = { ...DEFAULT_IMAGE_FRAMING, ...input };
  return {
    focusX: clampNumber(base.focusX, MIN_FOCUS, MAX_FOCUS),
    focusY: clampNumber(base.focusY, MIN_FOCUS, MAX_FOCUS),
    zoom: clampNumber(base.zoom, MIN_ZOOM, MAX_ZOOM),
  };
}

function clampNumber(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) {
    return min;
  }
  return Math.min(max, Math.max(min, n));
}

/** Styles for Next/Image with `fill` + `object-cover` inside an overflow-hidden frame. */
export function framingToCoverImageStyle(framing: ImageFraming): CSSProperties {
  const f = clampImageFraming(framing);
  return {
    objectFit: "cover",
    objectPosition: `${f.focusX}% ${f.focusY}%`,
    transform: `scale(${f.zoom})`,
    transformOrigin: "center center",
  };
}

/**
 * CSS background layers that approximate the same framing as {@link framingToCoverImageStyle}
 * for components that use `background-image` instead of `<Image />`.
 */
export function framingToBackgroundImageStyle(
  imageUrl: string,
  framing: ImageFraming,
  fallbackColor: string,
): CSSProperties {
  const f = clampImageFraming(framing);
  const size = f.zoom <= 1.001 ? "cover" : `${f.zoom * 100}%`;
  return {
    backgroundImage: `url("${imageUrl}")`,
    backgroundColor: fallbackColor,
    backgroundPosition: `${f.focusX}% ${f.focusY}%`,
    backgroundSize: size,
    backgroundRepeat: "no-repeat",
  };
}

/** Stable key for React `key` when admin-saved framing reloads from the server. */
export function framingFingerprint(framing: ImageFraming | null | undefined): string {
  if (!framing) {
    return "none";
  }
  const f = clampImageFraming(framing);
  return `${f.focusX.toFixed(2)}-${f.focusY.toFixed(2)}-${f.zoom.toFixed(3)}`;
}

export function parseImageFramingJson(raw: unknown): ImageFraming | null {
  if (raw === null || raw === undefined || typeof raw !== "object") {
    return null;
  }
  const o = raw as Record<string, unknown>;
  const focusX = typeof o.focusX === "number" ? o.focusX : DEFAULT_IMAGE_FRAMING.focusX;
  const focusY = typeof o.focusY === "number" ? o.focusY : DEFAULT_IMAGE_FRAMING.focusY;
  const zoom = typeof o.zoom === "number" ? o.zoom : DEFAULT_IMAGE_FRAMING.zoom;
  return clampImageFraming({ focusX, focusY, zoom });
}
