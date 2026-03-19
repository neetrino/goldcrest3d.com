import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** Figma: 942×488, aspect 83/43; background position/size so ring cluster is centered. */
const BRIDAL_IMAGE_LAYER_BACKGROUND = `url(${LANDING_IMAGES.modelingBridal}) lightgray -32.94px -65.7px / 106.945% 116.074% no-repeat`;

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal() {
  return (
    <ModelingCard
      title="Bridal & Engagement"
      description=""
      descriptionLines={[
        "Engineered engagement and bridal settings built for durability, comfort and precise stone alignment.",
        "Secure prong architecture developed for long-term wear.",
      ]}
      imageSrc={LANDING_IMAGES.modelingBridal}
      imageId={LANDING_IMAGE_IDS.MODELING_BRIDAL}
      imageOnLeft={true}
      textAlign="right"
      imagePosition="center 55%"
      imageLayerBackground={{ background: BRIDAL_IMAGE_LAYER_BACKGROUND }}
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
    />
  );
}
