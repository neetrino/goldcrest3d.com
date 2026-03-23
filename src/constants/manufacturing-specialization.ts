import { LANDING_IMAGES } from "@/constants/landing-assets";

/** Տեսանելի չափ միայն detail նկարի համար (frame/column չի փոխվում) */
export const MANUFACTURING_DETAIL_IMAGE_WIDTH_PX = 980;
export const MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX = 653;

/** 3D Printing Strategy & Resin Behavior — նկարի նախագծային չափեր (aspect 69/49) */
export const MANUFACTURING_DETAIL_IMAGE_PRINTING_STRATEGY_WIDTH_PX = 978;
export const MANUFACTURING_DETAIL_IMAGE_PRINTING_STRATEGY_HEIGHT_PX = 694;

/** Casting Compensation & Metal Flow — դիզայնային չափեր, aspect 48/53 */
export const MANUFACTURING_DETAIL_IMAGE_CASTING_COMPENSATION_WIDTH_PX = 682;
export const MANUFACTURING_DETAIL_IMAGE_CASTING_COMPENSATION_HEIGHT_PX = 753;

/** Stone Seat Geometry & Setting Logic — դիզայնային չափեր, aspect 37/39 */
export const MANUFACTURING_DETAIL_IMAGE_STONE_SEAT_GEOMETRY_WIDTH_PX = 666;
export const MANUFACTURING_DETAIL_IMAGE_STONE_SEAT_GEOMETRY_HEIGHT_PX = 702;

/** Wall Thickness Engineering — դիզայնային չափեր, aspect-ratio 151/159 */
export const MANUFACTURING_DETAIL_IMAGE_WALL_THICKNESS_WIDTH_PX = 560;
export const MANUFACTURING_DETAIL_IMAGE_WALL_THICKNESS_HEIGHT_PX = 590;

export const MANUFACTURING_DETAIL_PHOTO_LAYOUT = {
  STANDARD: "standard",
  PRINTING_STRATEGY_RESIN: "printing-strategy-resin",
  CASTING_COMPENSATION_METAL_FLOW: "casting-compensation-metal-flow",
  STONE_SEAT_GEOMETRY_SETTING: "stone-seat-geometry-setting",
  WALL_THICKNESS_ENGINEERING: "wall-thickness-engineering",
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
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.CASTING_COMPENSATION_METAL_FLOW) {
    return {
      widthPx: MANUFACTURING_DETAIL_IMAGE_CASTING_COMPENSATION_WIDTH_PX,
      heightPx: MANUFACTURING_DETAIL_IMAGE_CASTING_COMPENSATION_HEIGHT_PX,
      photoLayout: MANUFACTURING_DETAIL_PHOTO_LAYOUT.CASTING_COMPENSATION_METAL_FLOW,
    };
  }
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.STONE_SEAT_GEOMETRY_SETTING) {
    return {
      widthPx: MANUFACTURING_DETAIL_IMAGE_STONE_SEAT_GEOMETRY_WIDTH_PX,
      heightPx: MANUFACTURING_DETAIL_IMAGE_STONE_SEAT_GEOMETRY_HEIGHT_PX,
      photoLayout: MANUFACTURING_DETAIL_PHOTO_LAYOUT.STONE_SEAT_GEOMETRY_SETTING,
    };
  }
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.WALL_THICKNESS_ENGINEERING) {
    return {
      widthPx: MANUFACTURING_DETAIL_IMAGE_WALL_THICKNESS_WIDTH_PX,
      heightPx: MANUFACTURING_DETAIL_IMAGE_WALL_THICKNESS_HEIGHT_PX,
      photoLayout: MANUFACTURING_DETAIL_PHOTO_LAYOUT.WALL_THICKNESS_ENGINEERING,
    };
  }
  return {
    widthPx: MANUFACTURING_DETAIL_IMAGE_WIDTH_PX,
    heightPx: MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX,
    photoLayout: MANUFACTURING_DETAIL_PHOTO_LAYOUT.STANDARD,
  };
}

export function getManufacturingDetailPhotoLayoutClassName(
  layout: ManufacturingDetailPhotoLayout,
): string {
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.PRINTING_STRATEGY_RESIN) {
    return "manufacturing-intelligence-photo-detail--printing-strategy-resin";
  }
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.CASTING_COMPENSATION_METAL_FLOW) {
    return "manufacturing-intelligence-photo-detail--casting-compensation-metal-flow";
  }
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.STONE_SEAT_GEOMETRY_SETTING) {
    return "manufacturing-intelligence-photo-detail--stone-seat-geometry-setting";
  }
  if (layout === MANUFACTURING_DETAIL_PHOTO_LAYOUT.WALL_THICKNESS_ENGINEERING) {
    return "manufacturing-intelligence-photo-detail--wall-thickness-engineering";
  }
  return "";
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
      description:
        "Shrinkage compensation and internal volume balance calculated at the\nCAD stage. Metal flow logic and structural reinforcement zones defined\nbefore mold preparation.",
      detailImageSrc: LANDING_IMAGES.manufacturingCastingCompensationMetalFlowAwareness,
      detailImageAlt:
        "CAD rendering of a ring on a casting tree with sprues for investment casting",
      detailPhotoLayout:
        MANUFACTURING_DETAIL_PHOTO_LAYOUT.CASTING_COMPENSATION_METAL_FLOW,
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.STONE_SEAT_GEOMETRY_SETTING,
      title: "Stone Seat Geometry & Setting Logic",
      description:
        "Micron-level seat calibration aligned with stone dimensions and intended setting technique. Pavé density planning and prong architecture engineered for secure retention and long-term wear stability. Prongs dimensioned to minimal visual presence while maintaining structural integrity and reliable stone security under daily wear conditions.",
      detailImageSrc: LANDING_IMAGES.manufacturingStoneSeatGeometrySetting,
      detailImageAlt:
        "CAD render of a six-prong gemstone setting with stone seat geometry",
      detailPhotoLayout:
        MANUFACTURING_DETAIL_PHOTO_LAYOUT.STONE_SEAT_GEOMETRY_SETTING,
    },
    {
      id: MANUFACTURING_SPECIALIZATION_IDS.WALL_THICKNESS_ENGINEERING,
      title: "Wall Thickness Engineering",
      description:
        "Controlled wall thickness calibration based on material type, casting method and structural load requirements. Optimized to prevent deformation, porosity exposure and weak stress points during production.",
      detailImageSrc: LANDING_IMAGES.manufacturingWallThicknessEngineering,
      detailImageAlt:
        "CAD render of a two-tone ring showing engineered wall thickness and stone settings",
      detailPhotoLayout:
        MANUFACTURING_DETAIL_PHOTO_LAYOUT.WALL_THICKNESS_ENGINEERING,
    },
  ];
