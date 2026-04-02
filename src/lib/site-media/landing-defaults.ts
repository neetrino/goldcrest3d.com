import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";

import { MODELING_SLOT_KEYS, type ModelingSlotKey } from "./site-media.registry";

/**
 * Значения по умолчанию, если в БД ещё нет записей (текущие ассеты лендинга).
 */
export const DEFAULT_MODELING_IMAGE_URL: Record<ModelingSlotKey, string> = {
  [MODELING_SLOT_KEYS.HIP_HOP]: LANDING_IMAGES.modelingHipHop,
  [MODELING_SLOT_KEYS.BRIDAL]: LANDING_IMAGES.modelingBridal,
  [MODELING_SLOT_KEYS.PORTRAIT]: LANDING_IMAGES.modelingPortrait,
  [MODELING_SLOT_KEYS.MECHANICAL]: LANDING_IMAGES.modelingMechanical,
  [MODELING_SLOT_KEYS.HERITAGE]: LANDING_IMAGES.modelingHeritage,
  [MODELING_SLOT_KEYS.HIGH_JEWELRY]: LANDING_IMAGES.modelingHighJewelry,
};

export type FinishedGalleryItem = {
  id: string;
  imageId: string;
  src: string;
  objectPositionClass?: string;
};

/** Верхний ряд — как в прежнем SectionFinishedCreations. */
export const DEFAULT_FINISHED_ROW1: readonly FinishedGalleryItem[] = [
  {
    id: "row1-img-1",
    imageId: LANDING_IMAGE_IDS.FINISHED_1,
    src: "/images/finished/block1-portrait-jewelry.webp",
    objectPositionClass: "gallery-object-position-portrait",
  },
  {
    id: "row1-img-2",
    imageId: LANDING_IMAGE_IDS.FINISHED_2,
    src: "/images/finished/block2-ancient-heritage.webp",
  },
  {
    id: "row1-img-3",
    imageId: LANDING_IMAGE_IDS.FINISHED_3,
    src: "/images/finished/block3-hiphop.webp",
  },
  {
    id: "row1-img-4",
    imageId: LANDING_IMAGE_IDS.FINISHED_4,
    src: "/images/modeling/bridal-engagement.webp",
  },
];

/** Нижний ряд — порядок и data-landing-image как раньше. */
export const DEFAULT_FINISHED_ROW2: readonly FinishedGalleryItem[] = [
  {
    id: "row2-img-1",
    imageId: LANDING_IMAGE_IDS.FINISHED_4,
    src: "/images/finished/small-block-bridal-1.webp",
  },
  {
    id: "row2-img-2",
    imageId: LANDING_IMAGE_IDS.FINISHED_5,
    src: "/images/finished/small-block-bridal-2.webp",
  },
  {
    id: "row2-img-3",
    imageId: LANDING_IMAGE_IDS.FINISHED_6,
    src: "/images/finished/small-block-portrait.webp",
  },
  {
    id: "row2-img-4",
    imageId: LANDING_IMAGE_IDS.FINISHED_7,
    src: "/images/modeling/mechanical-lock-systems.webp",
  },
  {
    id: "row2-img-5",
    imageId: LANDING_IMAGE_IDS.FINISHED_7,
    src: "/images/finished/small-block-bridal-1.webp",
  },
];
