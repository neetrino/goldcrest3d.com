import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE = "High Jewelry";
const LINE_1 =
  "Advanced pavé and fine-setting structures developed with micron-level precision.";
const LINE_2 =
  "Invisible settings and ultra-thin tolerances engineered with strict structural discipline.";

type ModelingBlockHighJewelryProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

/** High Jewelry — `object-cover` ամբողջ block-ում; mobile-ում աջ anchor, desktop-ում կենտրոնացված crop։ */
export function ModelingBlockHighJewelry({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockHighJewelryProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const objectClassName =
    "h-full w-full object-cover max-md:object-right md:object-[center_48%_center]";
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HIGH_JEWELRY}
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className={objectClassName}
            sizes="(max-width: 767px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-right"
                sizes="(max-width: 767px) 100vw, 0px"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-[center_48%_center]"
                sizes="(max-width: 1280px) 50vw, 33vw"
                unoptimized
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[136px]"
        style={{ marginTop: "-30%" }}
      >
        <h3 className="font-sans text-[20px] font-bold leading-[28px] tracking-[-0.449px] text-black max-sm:translate-y-3 sm:font-manrope sm:text-[32px] sm:leading-[24px] sm:tracking-normal sm:font-bold">
          {TITLE}
        </h3>
        <p className="mt-4 block w-[243px] max-w-full shrink-0 text-center font-sans text-[12px] font-light leading-4 text-[#364153] sm:hidden">
          {LINE_1}
        </p>
        <div className="mt-4 hidden max-w-[520px] font-manrope text-[14px] font-light leading-[22px] text-black/70 sm:block">
          <span className="block">{LINE_1}</span>
          <span className="mt-0.5 block -translate-x-3 whitespace-nowrap">{LINE_2}</span>
        </div>
      </div>
    </article>
  );
}
