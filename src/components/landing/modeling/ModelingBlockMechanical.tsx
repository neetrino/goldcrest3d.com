import Image from "next/image";

import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

/** Mechanical & Lock Systems block. Full-bleed image only. */
export function ModelingBlockMechanical() {
  return (
    <article
      className="relative min-w-0 w-full overflow-hidden"
      style={{
        ...getModelingCardWidthStyle(),
        aspectRatio: MODELING_CARD_ASPECT_RATIO,
      }}
    >
      <Image
        src={LANDING_IMAGES.modelingMechanical}
        alt="Mechanical & Lock Systems — tolerance-calibrated clasps, hinges and articulated structures"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />
    </article>
  );
}
