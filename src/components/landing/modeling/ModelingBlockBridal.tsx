import { LANDING_IMAGE_IDS } from "@/constants";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { ImageFraming } from "@/lib/site-media/image-framing";

import { ModelingCard } from "./ModelingCard";

type ModelingBlockBridalProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
  forceMobileViewport?: boolean;
  /** Optional admin preview override: title and description are positioned independently. */
  independentTitleDescription?: boolean;
  /** Optional admin preview override: place title/body from top-left as the starting point. */
  adminPreviewLeftOrigin?: boolean;
};

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
  forceMobileViewport = false,
  independentTitleDescription = true,
  adminPreviewLeftOrigin = false,
}: ModelingBlockBridalProps) {
  return (
    <ModelingCard
      title={copy.title}
      titleMobile={copy.titleMobile}
      mobileTitleFontSizePx={copy.mobileTitleFontSizePx}
      description=""
      descriptionRichHtml={copy.body}
      descriptionRichHtmlMobile={copy.bodyMobile}
      mobileBodyFontSizePx={copy.mobileBodyFontSizePx}
      imageSrc={imageUrlDesktop}
      imageSrcMobile={imageUrlMobile}
      imagePairBreakpoint="md"
      imageId={LANDING_IMAGE_IDS.MODELING_BRIDAL}
      imageOnLeft={true}
      textAlign="left"
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
      imageFramingDesktop={imageFramingDesktop}
      imageFramingMobile={imageFramingMobile}
      forceMobileViewport={forceMobileViewport}
      independentTitleDescription={independentTitleDescription}
      titleBlockTop="-72%"
      titleBlockLeft="-12%"
      descriptionBlockTop="-65%"
      descriptionBlockLeft="-12%"
      descriptionAlign="left"
    />
  );
}
