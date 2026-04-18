import Image from "next/image";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import { framingToCoverImageStyle, type ImageFraming } from "@/lib/site-media/image-framing";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const HERITAGE_RICH_BODY =
  "[&_p]:mb-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

type ModelingBlockHeritageProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
  /** Optional admin preview override: place title/body at top-left. */
  adminPreviewLeftOrigin?: boolean;
};

function HeritageTitleLines({ title }: { title: string }) {
  const lines = title.split(/\r?\n/);
  return lines.map((line, i) => (
    <span key={`heritage-title-${i}`} className="block whitespace-pre">
      {line.length > 0 ? line : "\u00A0"}
    </span>
  ));
}

function HeritageOverlayText({
  copy,
  adminPreviewLeftOrigin,
}: {
  copy: ModelingSlotCopyEntry;
  adminPreviewLeftOrigin: boolean;
}) {
  const desktopTitle = copy.title;
  const mobileTitle = copy.titleMobile;
  const bodyDesktop = copy.body;
  const bodyMobile = copy.bodyMobile;
  if (adminPreviewLeftOrigin) {
    return (
      <div className="absolute inset-0 z-10 flex items-start justify-start px-[calc(0.75rem*var(--ms,1))] py-[calc(0.5rem*var(--ms,1))] md:px-[calc(1rem*var(--ms,1))] md:py-[calc(0.75rem*var(--ms,1))]">
        <div className="relative h-full w-full max-w-[calc(540px*var(--ms,1))] text-left text-black">
          <div className="absolute left-0 top-0">
            <h3 className="font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-left sm:tracking-normal sm:font-extrabold">
              <span className="block md:hidden">
                <HeritageTitleLines title={mobileTitle} />
              </span>
              <span className="hidden md:block">
                <HeritageTitleLines title={desktopTitle} />
              </span>
            </h3>
          </div>
          <div className="absolute left-0 top-[calc(3.6rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black">
            <div className="md:hidden">
              <HeroBannerBodyRichText
                body={bodyMobile}
                className={`modeling-slot-rich-body whitespace-pre text-left ${HERITAGE_RICH_BODY}`}
              />
            </div>
            <div className="hidden md:block">
              <HeroBannerBodyRichText
                body={bodyDesktop}
                className={`modeling-slot-rich-body whitespace-pre text-left ${HERITAGE_RICH_BODY}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]">
      <div className="-translate-x-[calc(0.3rem*var(--ms,1))] -translate-y-[calc(0rem*var(--ms,1))] max-w-[calc(540px*var(--ms,1))] text-right text-black md:-translate-x-[calc(1.5rem*var(--ms,1))] md:mt-[calc(12.7rem*var(--ms,1))] md:-translate-y-[calc(4.15rem*var(--ms,1))]">
        <h3 className="mt-[calc(2.25rem*var(--ms,1))] font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] sm:mt-0 sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-right sm:tracking-normal sm:font-extrabold">
          <span className="block text-right translate-y-[calc(2.75rem*var(--ms,1))] md:hidden">
            <HeritageTitleLines title={mobileTitle} />
          </span>
          <span className="hidden md:block">
            <HeritageTitleLines title={desktopTitle} />
          </span>
        </h3>
        <div className="mt-[calc(3.5rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:mt-[calc(1rem*var(--ms,1))] sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black">
          <div className="md:hidden">
            <HeroBannerBodyRichText
              body={bodyMobile}
              className={`modeling-slot-rich-body whitespace-pre text-left sm:text-right ${HERITAGE_RICH_BODY}`}
            />
          </div>
          <div className="hidden md:block">
            <HeroBannerBodyRichText
              body={bodyDesktop}
              className={`modeling-slot-rich-body whitespace-pre text-left sm:text-right ${HERITAGE_RICH_BODY}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
  adminPreviewLeftOrigin = false,
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
                className="min-h-0 min-w-0 h-full w-full object-cover object-center"
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
                className="h-full w-full object-cover object-center"
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
      <HeritageOverlayText copy={copy} adminPreviewLeftOrigin />
    </article>
  );
}
