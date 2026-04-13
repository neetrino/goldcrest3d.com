import { LANDING_IMAGE_IDS } from "@/constants";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { ImageFraming } from "@/lib/site-media/image-framing";

import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

type ModelingBlockHipHopProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={copy.title}
      description=""
      descriptionRichHtml={copy.body}
      imageSrc={imageUrlDesktop}
      imageId={LANDING_IMAGE_IDS.MODELING_HIPHOP}
      imageOnLeft={false}
      textAlign="left"
      imageLayerBackground={getModelingHipHopCardBackgroundStyle(
        imageUrlDesktop,
        imageFramingDesktop,
      )}
      imageLayerBackgroundMobile={
        sameUrl
          ? undefined
          : getModelingHipHopCardBackgroundStyle(imageUrlMobile, imageFramingMobile)
      }
      imagePairBreakpoint="md"
    />
  );
}
