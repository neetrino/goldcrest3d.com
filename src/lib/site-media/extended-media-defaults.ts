import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  HERO_SLOT_KEYS,
  type HeroSlotKey,
  type ManufacturingDetailSlotKey,
} from "@/lib/site-media/site-media.registry";

/** Keep in sync with `power-banners-layout.constants` mobile paths. */
const HERO_DEFAULT_MOBILE: Record<HeroSlotKey, string> = {
  [HERO_SLOT_KEYS.MODELING]: "/images/modeling/block1-mobile.png",
  [HERO_SLOT_KEYS.RENDERING]: "/images/rendering/block2-mobile.png",
  [HERO_SLOT_KEYS.DESIGN]: "/images/design/block3-mobile-original.png",
};

const HERO_DEFAULT_DESKTOP: Record<HeroSlotKey, string> = {
  [HERO_SLOT_KEYS.MODELING]: LANDING_IMAGES.heroModeling,
  [HERO_SLOT_KEYS.RENDERING]: LANDING_IMAGES.heroRendering,
  [HERO_SLOT_KEYS.DESIGN]: LANDING_IMAGES.heroDesign,
};

export function getDefaultHeroDesktopSrc(slot: HeroSlotKey): string {
  return HERO_DEFAULT_DESKTOP[slot];
}

export function getDefaultHeroMobileSrc(slot: HeroSlotKey): string {
  return HERO_DEFAULT_MOBILE[slot];
}

export const MANUFACTURING_SLOT_DEFAULT_SRC: Record<
  ManufacturingDetailSlotKey,
  string
> = {
  "tolerance-control-assembly-precision":
    LANDING_IMAGES.manufacturingToleranceControl,
  "mechanical-stress-load-distribution":
    LANDING_IMAGES.manufacturingMechanicalStressLoadDistribution,
  "printing-strategy-resin":
    LANDING_IMAGES.manufacturingPrintingStrategyResinBehavior,
  "casting-compensation-metal-flow":
    LANDING_IMAGES.manufacturingCastingCompensationMetalFlowAwareness,
  "stone-seat-geometry-setting":
    LANDING_IMAGES.manufacturingStoneSeatGeometrySetting,
  "wall-thickness-engineering":
    LANDING_IMAGES.manufacturingWallThicknessEngineering,
};

export function getDefaultFounderPhotoSrc(): string {
  return LANDING_IMAGES.founder;
}
