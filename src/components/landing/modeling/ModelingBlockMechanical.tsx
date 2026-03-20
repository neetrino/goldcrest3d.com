import Image from "next/image";

import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

const TITLE = "Mechanical & Lock Systems";
const DESCRIPTION_LINES = [
  "Tolerance-calibrated clasps, hinges and multi-part articulated",
  "structures engineered for controlled movement and secure locking",
  "performance. Functional systems developed for durability, precision alignment",
  "and long-term mechanical reliability.",
] as const;

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
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-8 text-white md:flex-row md:justify-end md:px-8 md:py-10">
        <div
          className="max-w-[520px] text-left font-manrope text-[14px] font-light leading-[22px] md:mr-[34%] md:mt-[3.75rem]"
          style={{ overflow: "visible" }}
        >
          {DESCRIPTION_LINES.map((line, i) => (
            <span key={i} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
