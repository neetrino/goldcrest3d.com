/**
 * Կայքի մեդիայի խմբերի և սլոտերի գրանցում — մեկ կետ նոր սեկցիաներ ավելացնելու համար։
 */

export const SITE_MEDIA_GROUP_KEYS = {
  HERO: "hero",
  FOUNDER: "founder",
  MANUFACTURING_INTELLIGENCE: "manufacturing_intelligence",
  MODELING_SPECIALIZATION: "modeling_specialization",
  FINISHED_CREATIONS_ROW1: "finished_creations_row1",
  FINISHED_CREATIONS_ROW2: "finished_creations_row2",
} as const;

export type SiteMediaGroupKey =
  (typeof SITE_MEDIA_GROUP_KEYS)[keyof typeof SITE_MEDIA_GROUP_KEYS];

export const MODELING_SLOT_KEYS = {
  HIP_HOP: "hip_hop",
  BRIDAL: "bridal",
  PORTRAIT: "portrait",
  MECHANICAL: "mechanical",
  HERITAGE: "heritage",
  HIGH_JEWELRY: "high_jewelry",
} as const;

export type ModelingSlotKey =
  (typeof MODELING_SLOT_KEYS)[keyof typeof MODELING_SLOT_KEYS];

export type SiteMediaGroupKind = "fixed_slots" | "ordered_list";

export type SiteMediaGroupDefinition = {
  key: SiteMediaGroupKey;
  label: string;
  description: string;
  kind: SiteMediaGroupKind;
  /** For ordered lists: suggested bounds (soft; admin may exceed after product decision). */
  minItems?: number;
  maxItems?: number;
};

export const SITE_MEDIA_GROUPS: readonly SiteMediaGroupDefinition[] = [
  {
    key: SITE_MEDIA_GROUP_KEYS.HERO,
    label: "Hero slides",
    description:
      "Background images for the three hero slides. Position and scale are stored per slide (Admin Manager2).",
    kind: "fixed_slots",
  },
  {
    key: SITE_MEDIA_GROUP_KEYS.FOUNDER,
    label: "Founder",
    description: "Founder section portrait — position in Admin Manager2.",
    kind: "fixed_slots",
  },
  {
    key: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
    label: "Manufacturing Intelligence",
    description: "Detail images per accordion row — optional R2 overrides.",
    kind: "fixed_slots",
  },
  {
    key: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
    label: "Modeling Specialization",
    description: "",
    kind: "fixed_slots",
  },
  {
    key: SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
    label: "Finished Creations — top row",
    description:
      "Large carousel images. Ordering matches the slider pages.",
    kind: "ordered_list",
    minItems: 1,
    maxItems: 12,
  },
  {
    key: SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
    label: "Finished Creations — bottom row",
    description: "Small images for the second row, managed as an ordered list.",
    kind: "ordered_list",
    minItems: 1,
    maxItems: 12,
  },
];

export const MODELING_SLOT_LABELS: Record<ModelingSlotKey, string> = {
  [MODELING_SLOT_KEYS.HIP_HOP]: "Hip-Hop Jewelry",
  [MODELING_SLOT_KEYS.BRIDAL]: "Bridal & Engagement",
  [MODELING_SLOT_KEYS.PORTRAIT]: "3D Portrait Jewelry",
  [MODELING_SLOT_KEYS.MECHANICAL]: "Mechanical & Lock Systems",
  [MODELING_SLOT_KEYS.HERITAGE]: "Ancient & Heritage Jewelry",
  [MODELING_SLOT_KEYS.HIGH_JEWELRY]: "High Jewelry",
};

export const ORDERED_MODELING_SLOT_KEYS: readonly ModelingSlotKey[] = [
  MODELING_SLOT_KEYS.HIP_HOP,
  MODELING_SLOT_KEYS.BRIDAL,
  MODELING_SLOT_KEYS.PORTRAIT,
  MODELING_SLOT_KEYS.MECHANICAL,
  MODELING_SLOT_KEYS.HERITAGE,
  MODELING_SLOT_KEYS.HIGH_JEWELRY,
];

/** Hero slide backgrounds — desktop + mobile R2 keys; layout in `layoutMeta`. */
export const HERO_SLOT_KEYS = {
  MODELING: "hero_modeling",
  RENDERING: "hero_rendering",
  DESIGN: "hero_design",
} as const;

export type HeroSlotKey =
  (typeof HERO_SLOT_KEYS)[keyof typeof HERO_SLOT_KEYS];

export const ORDERED_HERO_SLOT_KEYS: readonly HeroSlotKey[] = [
  HERO_SLOT_KEYS.MODELING,
  HERO_SLOT_KEYS.RENDERING,
  HERO_SLOT_KEYS.DESIGN,
];

export const HERO_SLOT_LABELS: Record<HeroSlotKey, string> = {
  [HERO_SLOT_KEYS.MODELING]: "Hero — 3D Production-Ready Modeling",
  [HERO_SLOT_KEYS.RENDERING]: "Hero — Jewelry Rendering",
  [HERO_SLOT_KEYS.DESIGN]: "Hero — Jewelry Design",
};

export const FOUNDER_SLOT_KEYS = {
  PHOTO: "founder_photo",
} as const;

export type FounderSlotKey =
  (typeof FOUNDER_SLOT_KEYS)[keyof typeof FOUNDER_SLOT_KEYS];

/** Manufacturing Intelligence — one slot per accordion item id (detail image). */
export const MANUFACTURING_DETAIL_SLOT_KEYS = [
  "tolerance-control-assembly-precision",
  "mechanical-stress-load-distribution",
  "printing-strategy-resin",
  "casting-compensation-metal-flow",
  "stone-seat-geometry-setting",
  "wall-thickness-engineering",
] as const;

export type ManufacturingDetailSlotKey =
  (typeof MANUFACTURING_DETAIL_SLOT_KEYS)[number];
