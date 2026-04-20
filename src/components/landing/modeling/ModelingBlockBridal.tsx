import { LANDING_IMAGE_IDS } from "@/constants";

import { ModelingCard } from "./ModelingCard";

type ModelingBlockBridalProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
};

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  titleDesktopOffsetY,
  titleMobileOffsetY,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  bodyDesktopOffsetY,
  bodyMobileOffsetY,
}: ModelingBlockBridalProps) {
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetYMobile={titleMobileOffsetY}
      description=""
      descriptionLines={[...descriptionLinesDesktop]}
      descriptionLinesDesktop={[...descriptionLinesDesktop]}
      descriptionLinesMobile={[...descriptionLinesMobile]}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetYMobile={bodyMobileOffsetY}
      imageSrc={imageUrlDesktop}
      imageSrcMobile={imageUrlMobile}
      imagePairBreakpoint="md"
      imageId={LANDING_IMAGE_IDS.MODELING_BRIDAL}
      imageOnLeft={true}
      textAlign="right"
      imagePosition="center 55%"
      imageFillClassName="object-cover object-center"
      imageFillClassNameDesktop="object-contain"
      textDark
      noDescriptionMaxWidth
      fluidTextLayout
      textBlockAlign="start"
      titleAlignSelf="start"
      titleMarginTop="0"
      titleMarginTopCompensate
      descriptionMarginTop="0"
      firstDescriptionLineId="bridal-description-first-line"
      firstDescriptionLineMarginRight="40%"
      firstDescriptionLineTranslateX="-6%"
      secondDescriptionLineTranslateX="-56%"
      textBlockMarginLeft="0"
      textBlockMarginTop="0"
      descriptionLayout="row"
      mobileBridalTypography
    />
  );
}
