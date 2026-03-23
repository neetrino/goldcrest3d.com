import { LANDING_IMAGES } from "@/constants/landing-assets";

/** Տեսանելի չափ միայն detail նկարի համար (frame/column չի փոխվում) */
export const MANUFACTURING_DETAIL_IMAGE_WIDTH_PX = 980;
export const MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX = 653;

export const MANUFACTURING_SPECIALIZATION_IDS = {
  TOLERANCE_CONTROL_ASSEMBLY_PRECISION: "tolerance-control-assembly-precision",
  MECHANICAL_STRESS_LOAD_DISTRIBUTION: "mechanical-stress-load-distribution",
  PRINTING_STRATEGY_RESIN: "printing-strategy-resin",
  CASTING_COMPENSATION_METAL_FLOW: "casting-compensation-metal-flow",
  STONE_SEAT_GEOMETRY_SETTING: "stone-seat-geometry-setting",
  WALL_THICKNESS_ENGINEERING: "wall-thickness-engineering",
} as const;

export type ManufacturingSpecializationId =
  (typeof MANUFACTURING_SPECIALIZATION_IDS)[keyof typeof MANUFACTURING_SPECIALIZATION_IDS];

export type ManufacturingSpecializationItem = {
  id: ManufacturingSpecializationId;
  title: string;
  description?: string;
  detailImageSrc?: string;
  detailImageAlt?: string;
};

/**
 * Manufacturing Intelligence accordion — one row per item.
 * Optional `description` / `detailImageSrc` activate per-item detail + image when implemented.
 */
export const MANUFACTURING_SPECIALIZATION_ITEMS: readonly ManufacturingSpecializationItem[] =
  [
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.TOLERANCE_CONTROL_ASSEMBLY_PRECISION,
      title: "Tolerance Control & Assembly Precision",
      description:
        "Tolerance calibration for multi-part structures, articulated systems and\nlocking mechanisms. Precision alignment developed to ensure smooth\nmechanical performance after casting.",
      detailImageSrc: LANDING_IMAGES.manufacturingToleranceControl,
      detailImageAlt:
        "Technical CAD rendering of a ring with tolerance annotations",
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.MECHANICAL_STRESS_LOAD_DISTRIBUTION,
      title: "Mechanical Stress & Load Distribution",
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.PRINTING_STRATEGY_RESIN,
      title: "3D Printing Strategy & Resin Behavior",
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.CASTING_COMPENSATION_METAL_FLOW,
      title: "Casting Compensation & Metal Flow Awareness",
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.STONE_SEAT_GEOMETRY_SETTING,
      title: "Stone Seat Geometry & Setting Logic",
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.WALL_THICKNESS_ENGINEERING,
      title: "Wall Thickness Engineering",
    },
  ];
