import { LANDING_IMAGE_IDS } from "@/constants";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

/** Hip-Hop Jewelry — mobile: 4 տող (unchanged layout); desktop: 3 structured blocks. */
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

type ModelingBlockHipHopProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  managed?: {
    title?: string;
    descriptionLines?: string[];
    descriptionLinesDesktop?: string[];
  };
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const title = managed?.title ?? "Hip-Hop Jewelry";
  const lines = managed?.descriptionLines ?? [...HIPHOP_DESCRIPTION_LINES];
  const linesDesktop =
    managed?.descriptionLinesDesktop ?? [...HIPHOP_DESCRIPTION_LINES_DESKTOP];
  return (
    <ModelingCard
      title={title}
      description=""
      descriptionLines={lines}
      descriptionLinesDesktop={linesDesktop}
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
    />
  );
}
