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
  /** Optional admin preview override: title and description are positioned independently. */
  independentTitleDescription?: boolean;
  /** Optional admin preview override: place title/body from top-left as the starting point. */
  adminPreviewLeftOrigin?: boolean;
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
  independentTitleDescription = true,
  adminPreviewLeftOrigin = false,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={copy.title}
      titleMobile={copy.titleMobile}
      description=""
      descriptionRichHtml={copy.body}
      descriptionRichHtmlMobile={copy.bodyMobile}
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
      independentTitleDescription={independentTitleDescription}
      titleBlockTop={adminPreviewLeftOrigin ? "-6%" : "2%"}
      titleBlockLeft={adminPreviewLeftOrigin ? "6%" : "2%"}
      descriptionBlockTop={adminPreviewLeftOrigin ? "2%" : "10%"}
      descriptionBlockLeft={adminPreviewLeftOrigin ? "6%" : "2%"}
      descriptionAlign="left"
    />
  );
}
