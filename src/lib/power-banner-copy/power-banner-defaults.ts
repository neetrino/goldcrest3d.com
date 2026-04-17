import type { PowerBannerKey } from "./power-banner-keys";

/** Canonical copy when no DB row exists — matches previous hardcoded hero text. */
export const POWER_BANNER_DEFAULT_COPY: Record<
  PowerBannerKey,
  { title: string; body: string }
> = {
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
};

/** Canonical mobile hero copy when no DB row exists (bundled defaults only; not coupled to desktop saves). */
export const POWER_BANNER_DEFAULT_MOBILE_COPY: Record<
  PowerBannerKey,
  { title: string; body: string }
> = {
  MODELING: {
    title: POWER_BANNER_DEFAULT_COPY.MODELING.title,
    body: POWER_BANNER_DEFAULT_COPY.MODELING.body,
  },
  RENDERING: {
    title: POWER_BANNER_DEFAULT_COPY.RENDERING.title,
    body: POWER_BANNER_DEFAULT_COPY.RENDERING.body,
  },
  DESIGN: {
    title: POWER_BANNER_DEFAULT_COPY.DESIGN.title,
    body: POWER_BANNER_DEFAULT_COPY.DESIGN.body,
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
