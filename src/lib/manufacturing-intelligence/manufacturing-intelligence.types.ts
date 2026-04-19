import type {
  ManufacturingDetailPhotoLayout,
  ManufacturingSpecializationId,
} from "@/constants/manufacturing-specialization";

import type { ManufacturingImageTransform } from "./manufacturing-image-transform";

export type ManufacturingIntelligenceItemContent = {
  id: ManufacturingSpecializationId;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  detailPhotoLayout: ManufacturingDetailPhotoLayout | undefined;
  transform: ManufacturingImageTransform;
};

export type ManufacturingIntelligenceContent = {
  headingDesktop: string;
  headingMobile: string;
  items: ManufacturingIntelligenceItemContent[];
};
