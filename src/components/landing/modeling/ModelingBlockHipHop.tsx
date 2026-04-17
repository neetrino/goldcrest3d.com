import { LANDING_IMAGE_IDS } from "@/constants";
import type { ModelingCardFields } from "@/lib/managed-home/managed-home-schemas";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

/** Hip-Hop Jewelry — mobile: 4 lines; desktop: 3 structured blocks. */
const HIPHOP_DESCRIPTION_LINE_1 =
  "High-mass, fully iced-out structures engineered for";
const HIPHOP_DESCRIPTION_LINE_2 =
  "structural durability and controlled weight distribution.";
const HIPHOP_DESCRIPTION_LINE_3 =
  "Advanced pavé density calibration and reinforced stone retention";
const HIPHOP_DESCRIPTION_LINE_4 =
  "designed for intensive wear and long-term performance.";

const HIPHOP_DESCRIPTION_LINES = [
  HIPHOP_DESCRIPTION_LINE_1,
  HIPHOP_DESCRIPTION_LINE_2,
  HIPHOP_DESCRIPTION_LINE_3,
  HIPHOP_DESCRIPTION_LINE_4,
];

const HIPHOP_DESCRIPTION_LINES_DESKTOP = [
  "High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution.",
  "Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term",
  "performance.",
];

export type ModelingBlockViewport = "mobile" | "desktop";

type ModelingBlockHipHopProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome?: boolean;
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
  viewport,
  emulateMobileChrome = false,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const title = managed?.title ?? "Hip-Hop Jewelry";
  const lines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? [...managed.descriptionLines]
      : viewport === "mobile"
        ? [...HIPHOP_DESCRIPTION_LINES]
        : [...HIPHOP_DESCRIPTION_LINES_DESKTOP];
  return (
    <ModelingCard
      title={title}
      description=""
      descriptionLines={lines}
      descriptionLinesDesktop={viewport === "desktop" ? lines : undefined}
      imageSrc={imageUrlDesktop}
      imageId={LANDING_IMAGE_IDS.MODELING_HIPHOP}
      imageOnLeft={false}
      textAlign="left"
      imageLayerBackground={getModelingHipHopCardBackgroundStyle(imageUrlDesktop)}
      imageLayerBackgroundMobile={
        sameUrl ? undefined : getModelingHipHopCardBackgroundStyle(imageUrlMobile)
      }
      imagePairBreakpoint="md"
      mobileHipHopTypography
      hipHopSplitScope={viewport}
      emulateMobileChrome={emulateMobileChrome}
    />
  );
}
