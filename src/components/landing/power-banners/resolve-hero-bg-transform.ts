import type { CSSProperties } from "react";

import { parseHeroSlideLayoutMeta } from "@/lib/site-media/visual-layout-meta";

import {
  SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX,
  SECTION1_HERO_BG_NUDGE_DOWN_PX,
  SECTION1_HERO_BG_SCALE,
  SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX,
  SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX,
  SECTION2_HERO_BG_SCALE,
} from "./power-banners-layout.constants";

export function resolveModelingHeroDesktopBgTransform(
  layoutMeta: unknown | null,
): Pick<CSSProperties, "transform" | "transformOrigin"> {
  const parsed = parseHeroSlideLayoutMeta(layoutMeta)?.desktop;
  if (parsed) {
    return {
      transform: `translate(${parsed.offsetX}px, ${parsed.offsetY}px) scale(${parsed.scale})`,
      transformOrigin: "center center",
    };
  }
  return {
    transform: `translateY(-${SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX}px) scale(${SECTION1_HERO_BG_SCALE})`,
    transformOrigin: "center center",
  };
}

export function resolveModelingHeroDesktopObjectPosition(
  layoutMeta: unknown | null,
): string {
  const parsed = parseHeroSlideLayoutMeta(layoutMeta)?.desktop;
  if (parsed?.objectPosition) {
    return parsed.objectPosition;
  }
  return `center calc(50% + ${SECTION1_HERO_BG_NUDGE_DOWN_PX}px)`;
}

export function resolveRenderingHeroDesktopBgTransform(
  layoutMeta: unknown | null,
): Pick<CSSProperties, "transform" | "transformOrigin"> {
  const parsed = parseHeroSlideLayoutMeta(layoutMeta)?.desktop;
  if (parsed) {
    return {
      transform: `translate(${parsed.offsetX}px, ${parsed.offsetY}px) scale(${parsed.scale})`,
      transformOrigin: "center center",
    };
  }
  return {
    transform: `translateX(-${SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX}px) translateY(-${SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX}px) scale(${SECTION2_HERO_BG_SCALE})`,
    transformOrigin: "center center",
  };
}

export function resolveDesignHeroDesktopBgTransform(
  layoutMeta: unknown | null,
): Pick<CSSProperties, "transform" | "transformOrigin"> {
  const parsed = parseHeroSlideLayoutMeta(layoutMeta)?.desktop;
  if (parsed) {
    return {
      transform: `translate(${parsed.offsetX}px, ${parsed.offsetY}px) scale(${parsed.scale})`,
      transformOrigin: "center center",
    };
  }
  return {
    transform: "translate(0px, 0px) scale(1)",
    transformOrigin: "center center",
  };
}

export function resolveHeroMobileBgTransform(
  layoutMeta: unknown | null,
): Pick<CSSProperties, "transform" | "transformOrigin"> | undefined {
  const parsed = parseHeroSlideLayoutMeta(layoutMeta)?.mobile;
  if (!parsed) {
    return undefined;
  }
  return {
    transform: `translate(${parsed.offsetX}px, ${parsed.offsetY}px) scale(${parsed.scale})`,
    transformOrigin: "center center",
  };
}
