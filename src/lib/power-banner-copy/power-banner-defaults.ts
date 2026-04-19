import type {
  PowerBannerKey,
  PowerBannerViewport,
} from "./power-banner-keys";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  SECTION1_HERO_BG_MOBILE_PATH,
  SECTION2_HERO_BG_MOBILE_PATH,
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
