import { LANDING_IMAGE_IDS } from "@/constants";
import type { ModelingCardFields } from "@/lib/managed-home/managed-home-schemas";

import { ModelingCard } from "./ModelingCard";
import type { ModelingBlockViewport } from "./ModelingBlockHipHop";

/** Desktop / `sm+`: stacked lines (controlled breaks); fallback row layout uses `BRIDAL_DESCRIPTION_LINES`. */
const BRIDAL_DESCRIPTION_LINES_DESKTOP = [
  "Engineered engagement and bridal",
  "settings built for durability, comfort and",
  "precise stone alignment. Secure prong",
  "architecture developed for long-term wear.",
] as const;

const BRIDAL_DESCRIPTION_LINES = [
  "Engineered engagement and bridal settings built for durability, comfort and precise stone alignment.",
  "Secure prong architecture developed for long-term wear.",
] as const;

const BRIDAL_DESCRIPTION_LINES_MOBILE = [
  "Engineered engagement and bridal settings built for",
  "durability, comfort and precise stone alignment.",
] as const;

type ModelingBlockBridalProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome?: boolean;
};

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
  viewport,
  emulateMobileChrome = false,
}: ModelingBlockBridalProps) {
  const title = managed?.title ?? "Bridal & Engagement";
  if (viewport === "mobile") {
    const rowLines = [...BRIDAL_DESCRIPTION_LINES];
    const mobileLines =
      managed?.descriptionLines != null && managed.descriptionLines.length > 0
        ? [...managed.descriptionLines]
        : [...BRIDAL_DESCRIPTION_LINES_MOBILE];
    return (
      <ModelingCard
        title={title}
        description=""
        descriptionLines={rowLines}
        descriptionLinesDesktop={undefined}
        descriptionLinesMobile={mobileLines}
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
        bridalSplitScope="mobile"
        emulateMobileChrome={emulateMobileChrome}
      />
    );
  }

  const stackLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? [...managed.descriptionLines]
      : [...BRIDAL_DESCRIPTION_LINES_DESKTOP];
  const rowLines = [...BRIDAL_DESCRIPTION_LINES];

  return (
    <ModelingCard
      title={title}
      description=""
      descriptionLines={rowLines}
      descriptionLinesDesktop={stackLines}
      descriptionLinesMobile={[...BRIDAL_DESCRIPTION_LINES_MOBILE]}
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
      bridalSplitScope="desktop"
      emulateMobileChrome={emulateMobileChrome}
    />
  );
}
