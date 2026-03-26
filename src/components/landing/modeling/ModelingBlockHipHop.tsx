import { LANDING_IMAGE_IDS } from "@/constants";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

/** Hip-Hop Jewelry — 4 տող, յուրաքանչյուր տողի բառերի քանակը խմբագրելի. */
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

type ModelingBlockHipHopProps = {
  imageUrl: string;
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({ imageUrl }: ModelingBlockHipHopProps) {
  return (
    <ModelingCard
      title="Hip-Hop Jewelry"
      description=""
      descriptionLines={HIPHOP_DESCRIPTION_LINES}
      imageSrc={imageUrl}
      imageId={LANDING_IMAGE_IDS.MODELING_HIPHOP}
      imageOnLeft={false}
      textAlign="left"
      imageLayerBackground={getModelingHipHopCardBackgroundStyle(imageUrl)}
      mobileHipHopTypography
    />
  );
}
