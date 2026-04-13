import {
  type ImageFraming,
  parseImageFramingJson,
} from "./image-framing";

/** Stored in `SiteMediaItem.layoutMeta` for modeling slots (desktop + optional mobile). */
export type SiteMediaLayoutMeta = {
  desktopFraming?: ImageFraming;
  mobileFraming?: ImageFraming;
  /** Single-image slots (gallery rows) use `framing` only. */
  framing?: ImageFraming;
};

export function parseSiteMediaLayoutMeta(raw: unknown | null): SiteMediaLayoutMeta | null {
  if (raw === null || raw === undefined || typeof raw !== "object") {
    return null;
  }
  const o = raw as Record<string, unknown>;
  const desktopFraming = parseImageFramingJson(o.desktopFraming);
  const mobileFraming = parseImageFramingJson(o.mobileFraming);
  const framing = parseImageFramingJson(o.framing);
  if (!desktopFraming && !mobileFraming && !framing) {
    return null;
  }
  return {
    ...(desktopFraming ? { desktopFraming } : {}),
    ...(mobileFraming ? { mobileFraming } : {}),
    ...(framing ? { framing } : {}),
  };
}

export function buildGalleryLayoutMeta(framing: ImageFraming): SiteMediaLayoutMeta {
  return { framing };
}

export function buildModelingLayoutMetaPatch(
  prev: unknown | null,
  variant: "desktop" | "mobile",
  framing: ImageFraming,
): SiteMediaLayoutMeta {
  const existing = parseSiteMediaLayoutMeta(prev) ?? {};
  if (variant === "desktop") {
    return { ...existing, desktopFraming: framing };
  }
  return { ...existing, mobileFraming: framing };
}
