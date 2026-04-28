import { LANDING_IMAGE_IDS } from "@/constants";

import { ModelingCard } from "./ModelingCard";

type ModelingBlockBridalProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageUrlTablet: string;
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  titleTabletOffsetY: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  bodyTabletOffsetY: number;
};

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal({
  imageUrlDesktop,
  imageUrlMobile,
  imageUrlTablet,
  titleDesktop,
  titleMobile,
  titleTablet,
  titleDesktopOffsetY,
  titleMobileOffsetY,
  titleTabletOffsetY,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyMobileOffsetY,
  bodyTabletOffsetY,
}: ModelingBlockBridalProps) {
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleTablet={titleTablet}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetYMobile={titleMobileOffsetY}
      titleOffsetYTablet={titleTabletOffsetY}
      description=""
      descriptionLines={[...descriptionLinesDesktop]}
      descriptionLinesDesktop={[...descriptionLinesDesktop]}
      descriptionLinesMobile={[...descriptionLinesMobile]}
      descriptionLinesTablet={[...descriptionLinesTablet]}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetYMobile={bodyMobileOffsetY}
      descriptionOffsetYTablet={bodyTabletOffsetY}
      imageSrc={imageUrlDesktop}
      imageSrcMobile={imageUrlMobile}
      imageSrcTablet={imageUrlTablet}
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
