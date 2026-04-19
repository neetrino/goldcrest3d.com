import { LANDING_IMAGE_IDS } from "@/constants";

import { ModelingCard } from "./ModelingCard";

type ModelingBlockBridalProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
};

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  descriptionLinesDesktop,
  descriptionLinesMobile,
}: ModelingBlockBridalProps) {
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      description=""
      descriptionLines={[...descriptionLinesDesktop]}
      descriptionLinesDesktop={[...descriptionLinesDesktop]}
      descriptionLinesMobile={[...descriptionLinesMobile]}
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
      textBlockAlign="end"
      titleAlignSelf="start"
      titleMarginTop="calc(3.4rem * var(--ms, 1))"
      titleMarginTopCompensate
      descriptionMarginTop="8%"
      firstDescriptionLineId="bridal-description-first-line"
      firstDescriptionLineMarginRight="40%"
      firstDescriptionLineTranslateX="-6%"
      secondDescriptionLineTranslateX="-56%"
      textBlockMarginLeft="12%"
      textBlockMarginTop="22%"
      descriptionLayout="row"
      mobileBridalTypography
    />
  );
}
