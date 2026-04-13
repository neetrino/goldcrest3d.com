import type { CSSProperties } from "react";

import { LANDING_IMAGE_IDS } from "@/constants";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import {
  framingToBackgroundImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

import { ModelingCard } from "./ModelingCard";

function portraitLayerBackground(
  imageUrl: string,
  framing?: ImageFraming | null,
): CSSProperties {
  if (framing) {
    return framingToBackgroundImageStyle(imageUrl, framing, "#E0F2F1");
  }
  return { background: `url("${imageUrl}") #E0F2F1 center / cover no-repeat` };
}

type ModelingBlockPortraitProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
};

export function ModelingBlockPortrait({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
}: ModelingBlockPortraitProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={copy.title}
      titleMobile={copy.titleMobile}
      description=""
      descriptionRichHtml={copy.body}
      descriptionRichHtmlMobile={copy.bodyMobile}
      imageSrc={imageUrlDesktop}
      imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
      imageOnLeft={false}
      textAlign="left"
      descriptionAlign="right"
      titleCompact
      imagePosition="center center"
      imageLayerBackground={portraitLayerBackground(
        imageUrlDesktop,
        imageFramingDesktop,
      )}
      imageLayerBackgroundMobile={
        sameUrl
          ? undefined
          : portraitLayerBackground(imageUrlMobile, imageFramingMobile)
      }
      imagePairBreakpoint="md"
      textDark
      independentTitleDescription
      titleBlockTop="34%"
      titleBlockLeft="7%"
      titleShiftClassName="md:translate-x-[calc(2.25rem*var(--ms,1))] lg:translate-x-0"
      descriptionBlockTop="42%"
      descriptionBlockLeft="-13%"
      desktopOverlayShiftClassName="lg:translate-x-[calc(2rem*var(--ms,1))] lg:translate-y-[calc(2.25rem*var(--ms,1))]"
      mobilePortraitTypography
      textLayoutDesktop={copy.textLayoutDesktop}
      textLayoutMobile={copy.textLayoutMobile}
    />
  );
}
