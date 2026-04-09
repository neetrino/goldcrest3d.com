import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const HERITAGE_TITLE = "3D Portrait Jewelry";
const HERITAGE_DESCRIPTION_LINES = [
  "High-relief sculptural portraits",
  "engineered with controlledvolume",
  "distribution and balanced weight",
  "architecture. Developed to integrate",
  "pavé surfaces, deep dimensional detail",
  "and reinforced structural support for",
  "long-term durability.",
] as const;

type ModelingBlockHeritageProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

function HeritageOverlayText() {
  return (
    <div className="absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]">
      <div className="-translate-x-[calc(1.2rem*var(--ms,1))] -translate-y-[calc(3.85rem*var(--ms,1))] max-w-[calc(540px*var(--ms,1))] text-right text-black md:-translate-x-[calc(1.5rem*var(--ms,1))] md:mt-[calc(12.7rem*var(--ms,1))] md:-translate-y-[calc(4.15rem*var(--ms,1))]">
        <h3 className="font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-right sm:tracking-normal sm:font-extrabold">
          {HERITAGE_TITLE}
        </h3>
        <p className="mt-[calc(1rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black">
          {HERITAGE_DESCRIPTION_LINES.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockHeritageProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HERITAGE}
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-center"
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </>
        )}
      </div>
      <HeritageOverlayText />
    </article>
  );
}
