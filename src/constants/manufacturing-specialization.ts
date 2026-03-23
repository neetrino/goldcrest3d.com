import { LANDING_IMAGES } from "@/constants/landing-assets";

/** Տեսանելի չափ միայն detail նկարի համար (frame/column չի փոխվում) */
export const MANUFACTURING_DETAIL_IMAGE_WIDTH_PX = 980;
export const MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX = 653;

/** 3D Printing Strategy & Resin Behavior — նկարի նախագծային չափեր (aspect 69/49) */
export const MANUFACTURING_DETAIL_IMAGE_PRINTING_STRATEGY_WIDTH_PX = 978;
export const MANUFACTURING_DETAIL_IMAGE_PRINTING_STRATEGY_HEIGHT_PX = 694;

export const MANUFACTURING_DETAIL_PHOTO_LAYOUT = {
  STANDARD: "standard",
  PRINTING_STRATEGY_RESIN: "printing-strategy-resin",
} as const;

export type ManufacturingDetailPhotoLayout =
  (typeof MANUFACTURING_DETAIL_PHOTO_LAYOUT)[keyof typeof MANUFACTURING_DETAIL_PHOTO_LAYOUT];

/**
 * Detail նկարի intrinsic չափեր Next/Image-ի համար և CSS մոդիֆիկատորի ընտրություն
 */
export function resolveManufacturingDetailImageDimensions(
  layout: ManufacturingDetailPhotoLayout | undefined,
): { widthPx: number; heightPx: number; photoLayout: ManufacturingDetailPhotoLayout } {
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.PRINTING_STRATEGY_RESIN) {
    return {
      widthPx: MANUFACTURING_DETAIL_IMAGE_PRINTING_STRATEGY_WIDTH_PX,
      heightPx: MANUFACTURING_DETAIL_IMAGE_PRINTING_STRATEGY_HEIGHT_PX,
      photoLayout: MANUFACTURING_DETAIL_PHOTO_LAYOUT.PRINTING_STRATEGY_RESIN,
    };
  }
  return {
    widthPx: MANUFACTURING_DETAIL_IMAGE_WIDTH_PX,
    heightPx: MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX,
    photoLayout: MANUFACTURING_DETAIL_PHOTO_LAYOUT.STANDARD,
  };
}

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
  /** Երբ տրված է `detailImageSrc`-ի հետ — detail նկարի intrinsic չափեր և CSS մոդիֆիկատոր */
  detailPhotoLayout?: ManufacturingDetailPhotoLayout;
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
      description:
        "Structural stress zones identified and reinforced through balanced\nmass distribution. Engineered for impact resistance, movement stability\nand long-term durability.",
      detailImageSrc: LANDING_IMAGES.manufacturingMechanicalStressLoadDistribution,
      detailImageAlt:
        "Ring finite element analysis showing mechanical stress and load distribution",
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.PRINTING_STRATEGY_RESIN,
      title: "3D Printing Strategy & Resin Behavior",
      description:
        "Support structure planning, overhang control and resin thickness awareness integrated into model architecture. Designed to minimize distortion and reduce post-processing risk.",
      detailImageSrc: LANDING_IMAGES.manufacturingPrintingStrategyResinBehavior,
      detailImageAlt:
        "Jewelry ring SLA model with support structures on a perforated build plate",
      detailPhotoLayout:
        MANUFACTURING_DETAIL_PHOTO_LAYOUT.PRINTING_STRATEGY_RESIN,
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
