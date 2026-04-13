import Image from "next/image";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import { resolveModelingSlotBodyForMobile } from "@/lib/modeling-slot-copy/resolve-modeling-slot-body-mobile";
import { framingToCoverImageStyle, type ImageFraming } from "@/lib/site-media/image-framing";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const HIGH_JEWELRY_RICH_BODY =
  "[&_p:not(:last-child)]:mb-[0.45em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

type ModelingBlockHighJewelryProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
};

/** High Jewelry — object-cover block; mobile vs desktop image anchors preserved. */
export function ModelingBlockHighJewelry({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
}: ModelingBlockHighJewelryProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const objectClassName =
    imageFramingDesktop
      ? "h-full w-full object-cover"
      : "h-full w-full object-cover max-md:object-right md:object-[center_48%_center]";
  const titleLines = copy.title.split(/\r?\n/).filter((s) => s.length > 0);
  const titleDesktop = copy.title.split(/\r?\n/).join(" ");
  const bodyDesktop = copy.body;
  const bodyMobile = resolveModelingSlotBodyForMobile(copy);
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
            style={
              imageFramingDesktop
                ? framingToCoverImageStyle(imageFramingDesktop)
                : undefined
            }
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className={
                  imageFramingMobile
                    ? "min-h-0 min-w-0 h-full w-full object-cover"
                    : "min-h-0 min-w-0 h-full w-full object-cover object-right"
                }
                style={
                  imageFramingMobile
                    ? framingToCoverImageStyle(imageFramingMobile)
                    : undefined
                }
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className={
                  imageFramingDesktop
                    ? "h-full w-full object-cover"
                    : "h-full w-full object-cover object-[center_48%_center]"
                }
                style={
                  imageFramingDesktop
                    ? framingToCoverImageStyle(imageFramingDesktop)
                    : undefined
                }
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[calc(144px*var(--ms,1))]"
        style={{ marginTop: "-33%" }}
      >
        <h3 className="font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black max-sm:translate-y-[calc(0.75rem*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal sm:font-bold">
          <span className="sm:hidden">
            {titleLines.map((line, i) => (
              <span key={`hj-m-${i}`} className="block">
                {line}
              </span>
            ))}
          </span>
          <span className="hidden sm:inline">{titleDesktop}</span>
        </h3>
        <div className="mt-[calc(1rem*var(--ms,1))] block w-[min(100%,calc(280px*var(--ms,1)))] max-w-full shrink-0 text-center font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] md:hidden">
          <HeroBannerBodyRichText
            body={bodyMobile}
            className={`modeling-slot-rich-body ${HIGH_JEWELRY_RICH_BODY}`}
          />
        </div>
        <div className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 md:block">
          <HeroBannerBodyRichText
            body={bodyDesktop}
            className={`modeling-slot-rich-body -translate-x-[calc(1.9rem*var(--ms,1))] text-center ${HIGH_JEWELRY_RICH_BODY}`}
          />
        </div>
      </div>
    </article>
  );
}
