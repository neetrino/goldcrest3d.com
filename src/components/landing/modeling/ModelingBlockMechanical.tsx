import Image from "next/image";

import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

const TITLE = "Mechanical & Lock Systems";
const DESCRIPTION =
  "Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement and secure locking performance. Functional systems developed for durability, precision alignment and long-term mechanical reliability.";

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
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
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center gap-6 px-6 py-8 text-right text-white md:items-end md:px-8 md:py-10 md:pl-[50%]">
        <h3 className="font-manrope text-[40px] font-bold leading-[28px]">
          {TITLE}
        </h3>
        <p className="max-w-[407px] font-manrope text-[16px] font-light leading-[26px]">
          {DESCRIPTION}
        </p>
      </div>
    </article>
  );
}
