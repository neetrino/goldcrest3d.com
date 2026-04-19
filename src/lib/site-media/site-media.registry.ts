/**
 * Կայքի մեդիայի խմբերի և սլոտերի գրանցում — մեկ կետ նոր սեկցիաներ ավելացնելու համար։
 */

export const SITE_MEDIA_GROUP_KEYS = {
  MODELING_SPECIALIZATION: "modeling_specialization",
  MANUFACTURING_INTELLIGENCE: "manufacturing_intelligence",
  FINISHED_CREATIONS_ROW1: "finished_creations_row1",
  FINISHED_CREATIONS_ROW2: "finished_creations_row2",
  HERO_BANNERS: "hero_banners",
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
    key: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
    label: "Modeling Specialization",
    description: "",
    kind: "fixed_slots",
  },
  {
    key: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
    label: "Manufacturing Intelligence",
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
  {
    key: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
    label: "Hero Banners",
    description: "Homepage hero images and text for each slide.",
    kind: "fixed_slots",
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
