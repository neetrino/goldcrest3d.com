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
      <h3
        className="absolute right-6 top-6 z-10 whitespace-nowrap font-manrope text-[32px] font-bold leading-[24px] text-white md:right-[21rem] md:top-[3.25rem] md:scale-x-105 md:origin-right"
      >
        {TITLE}
      </h3>
      <div className="absolute inset-0 z-10 flex flex-col justify-center gap-6 px-6 py-8 text-right text-white md:items-end md:px-8 md:py-10 md:pl-[50%]">
        <p className="max-w-[407px] font-manrope text-[16px] font-light leading-[26px]">
          {DESCRIPTION}
        </p>
      </div>
    </article>
  );
}
