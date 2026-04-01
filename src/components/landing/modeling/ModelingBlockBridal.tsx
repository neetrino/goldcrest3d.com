import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";

import { ModelingCard } from "./ModelingCard";

/** Desktop / `sm+`: stacked lines (controlled breaks); fallback row layout uses `BRIDAL_DESCRIPTION_LINES`. */
const BRIDAL_DESCRIPTION_LINES_DESKTOP = [
  "Engineered engagement and bridal",
  "settings built for durability, comfort and",
  "precise stone alignment. Secure prong",
  "architecture developed for long-term wear.",
] as const;

/** Fallback when `descriptionLinesDesktop` omitted: two logical rows (row layout + transforms). */
const BRIDAL_DESCRIPTION_LINES = [
  "Engineered engagement and bridal settings built for durability, comfort and precise stone alignment.",
  "Secure prong architecture developed for long-term wear.",
] as const;

/** Mobile only: first paragraph split into two lines (third desktop line hidden below `sm`). */
const BRIDAL_DESCRIPTION_LINES_MOBILE = [
  "Engineered engagement and bridal settings built for",
  "durability, comfort and precise stone alignment.",
] as const;

type ModelingBlockBridalProps = {
  imageUrl: string;
};

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal({ imageUrl }: ModelingBlockBridalProps) {
  return (
    <ModelingCard
      title="Bridal & Engagement"
      description=""
      descriptionLines={[...BRIDAL_DESCRIPTION_LINES]}
      descriptionLinesDesktop={[...BRIDAL_DESCRIPTION_LINES_DESKTOP]}
      descriptionLinesMobile={[...BRIDAL_DESCRIPTION_LINES_MOBILE]}
      imageSrc={imageUrl}
      imageSrcMobile={LANDING_IMAGES.modelingBridal}
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
      titleAlignSelf="end"
      titleMarginRight="34%"
      titleMarginTop="3.4rem"
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
