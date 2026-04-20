import type {
  PowerBannerKey,
  PowerBannerViewport,
} from "./power-banner-keys";
import { normalizeManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  SECTION1_HERO_BG_MOBILE_PATH,
  SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX,
  SECTION1_HERO_BG_NUDGE_DOWN_PX,
  SECTION1_HERO_BG_SCALE,
  SECTION2_HERO_BG_MOBILE_PATH,
  SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX,
  SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX,
  SECTION2_HERO_BG_SCALE,
  SECTION3_HERO_BG_MOBILE_PATH,
} from "@/components/landing/power-banners/power-banners-layout.constants";

/** Canonical copy when no DB row exists — matches previous hardcoded hero text. */
export const POWER_BANNER_DEFAULT_COPY: Record<
  PowerBannerViewport,
  Record<PowerBannerKey, { title: string; body: string }>
> = {
  desktop: {
    MODELING: {
      title: "3D Production-Ready Modeling",
      body: "Engineered for casting, printing and precise stone setting. Every micron accounted for.",
    },
    RENDERING: {
      title: "Jewelry Rendering",
      body: "High-resolution assets for brand presentation and global sales. Perfection in every light ray.",
    },
    DESIGN: {
      title: "Jewelry Design",
      body: "Concept-to-CAD development for legacy collection building. Your vision, engineered.",
    },
  },
  mobile: {
    MODELING: {
      title: "3D Production-Ready Modeling",
      body: "Engineered for casting, printing and precise stone setting. Every micron accounted for.",
    },
    RENDERING: {
      title: "Jewelry Rendering",
      body: "High-resolution assets for brand presentation and global sales. Perfection in every light ray.",
    },
    DESIGN: {
      title: "Jewelry Design",
      body: "Concept-to-CAD development for legacy collection building. Your vision, engineered.",
    },
  },
};

export const POWER_BANNER_DEFAULT_MEDIA: Record<
  PowerBannerViewport,
  Record<PowerBannerKey, { imageSrc: string; imageAlt: string }>
> = {
  desktop: {
    MODELING: {
      imageSrc: LANDING_IMAGES.heroModeling,
      imageAlt: "3D Production-Ready Modeling hero banner",
    },
    RENDERING: {
      imageSrc: LANDING_IMAGES.heroRendering,
      imageAlt: "Jewelry Rendering hero banner",
    },
    DESIGN: {
      imageSrc: LANDING_IMAGES.heroDesign,
      imageAlt: "Jewelry Design hero banner",
    },
  },
  mobile: {
    MODELING: {
      imageSrc: SECTION1_HERO_BG_MOBILE_PATH,
      imageAlt: "3D Production-Ready Modeling hero banner",
    },
    RENDERING: {
      imageSrc: SECTION2_HERO_BG_MOBILE_PATH,
      imageAlt: "Jewelry Rendering hero banner",
    },
    DESIGN: {
      imageSrc: SECTION3_HERO_BG_MOBILE_PATH,
      imageAlt: "Jewelry Design hero banner",
    },
  },
};

export const POWER_BANNER_DEFAULT_TRANSFORMS: Record<
  PowerBannerViewport,
  Record<PowerBannerKey, ReturnType<typeof normalizeManufacturingImageTransform>>
> = {
  desktop: {
    MODELING: normalizeManufacturingImageTransform({
      zoom: SECTION1_HERO_BG_SCALE,
      offsetX: 0,
      offsetY: -(SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX - SECTION1_HERO_BG_NUDGE_DOWN_PX),
    }),
    RENDERING: normalizeManufacturingImageTransform({
      zoom: SECTION2_HERO_BG_SCALE,
      offsetX: -SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX,
      offsetY: -SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX,
    }),
    DESIGN: normalizeManufacturingImageTransform({
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    }),
  },
  mobile: {
    MODELING: normalizeManufacturingImageTransform({
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    }),
    RENDERING: normalizeManufacturingImageTransform({
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    }),
    DESIGN: normalizeManufacturingImageTransform({
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    }),
  },
};

/** Admin section labels — maps each banner to its hero identity. */
export const POWER_BANNER_ADMIN_LABELS: Record<
  PowerBannerKey,
  { name: string; hint: string }
> = {
  MODELING: {
    name: "3D Production-Ready Modeling",
    hint: "First hero slide (modeling).",
  },
  RENDERING: {
    name: "Jewelry Rendering",
    hint: "Second hero slide (rendering).",
  },
  DESIGN: {
    name: "Jewelry Design",
    hint: "Third hero slide (design).",
  },
};
