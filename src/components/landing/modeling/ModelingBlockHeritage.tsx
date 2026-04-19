import Image from "next/image";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";
import { resolveModelingMobileFontSizePx } from "@/lib/modeling-slot-copy/modeling-mobile-typography";
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
  forceMobileViewport?: boolean;
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
  forceMobileViewport,
}: {
  copy: ModelingSlotCopyEntry;
  adminPreviewLeftOrigin: boolean;
  forceMobileViewport: boolean;
}) {
  const desktopTitle = copy.title;
  const mobileTitle = copy.titleMobile;
  const bodyDesktop = copy.body;
  const bodyMobile = copy.bodyMobile;
  const titleClassName = forceMobileViewport
    ? "font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px]"
    : "font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] md:font-manrope md:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:scale-x-105 md:origin-left md:tracking-normal md:font-extrabold";
  const titleClassNameRight = forceMobileViewport
    ? "mt-[calc(2.25rem*var(--ms,1))] font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px]"
    : "mt-[calc(2.25rem*var(--ms,1))] font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] md:mt-0 md:font-manrope md:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:scale-x-105 md:origin-right md:tracking-normal md:font-extrabold";
  const bodyClassName = forceMobileViewport
    ? "absolute left-0 top-[calc(3.6rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] text-[#364153]"
    : "absolute left-0 top-[calc(3.6rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] text-[#364153] md:font-manrope md:text-[calc(14px*var(--ms,1)*var(--mt,1))] md:leading-[calc(22px*var(--ms,1)*var(--mt,1))] md:text-black";
  const bodyClassNameRight = forceMobileViewport
    ? "mt-[calc(3.5rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] text-[#364153]"
    : "mt-[calc(3.5rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] text-[#364153] md:mt-[calc(1rem*var(--ms,1))] md:font-manrope md:text-[calc(14px*var(--ms,1)*var(--mt,1))] md:leading-[calc(22px*var(--ms,1)*var(--mt,1))] md:text-black";
  const mobileTitleClass = forceMobileViewport ? "block" : "block md:hidden";
  const desktopTitleClass = forceMobileViewport ? "hidden" : "hidden md:block";
  const mobileBodyClass = forceMobileViewport ? "block" : "md:hidden";
  const desktopBodyClass = forceMobileViewport ? "hidden" : "hidden md:block";
  if (adminPreviewLeftOrigin) {
    return (
      <div className="absolute inset-0 z-10 flex items-start justify-start px-[calc(0.75rem*var(--ms,1))] py-[calc(0.5rem*var(--ms,1))] md:px-[calc(1rem*var(--ms,1))] md:py-[calc(0.75rem*var(--ms,1))]">
        <div className="relative h-full w-full max-w-[calc(540px*var(--ms,1))] text-left text-black">
          <div className="absolute left-0 top-0">
            <h3 className={titleClassName}>
              <span className={mobileTitleClass}>
                <HeritageTitleLines title={mobileTitle} />
              </span>
              <span className={desktopTitleClass}>
                <HeritageTitleLines title={desktopTitle} />
              </span>
            </h3>
          </div>
          <div className={bodyClassName}>
            <div className={mobileBodyClass}>
              <HeroBannerBodyRichText
                body={bodyMobile}
                className={`modeling-slot-rich-body whitespace-pre text-left ${HERITAGE_RICH_BODY}`}
              />
            </div>
            <div className={desktopBodyClass}>
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
        <h3 className={titleClassNameRight}>
          <span className={`${mobileTitleClass} text-right translate-y-[calc(2.75rem*var(--ms,1))]`}>
            <HeritageTitleLines title={mobileTitle} />
          </span>
          <span className={desktopTitleClass}>
            <HeritageTitleLines title={desktopTitle} />
          </span>
        </h3>
        <div className={bodyClassNameRight}>
          <div className={mobileBodyClass}>
            <HeroBannerBodyRichText
              body={bodyMobile}
              className={`modeling-slot-rich-body whitespace-pre text-left sm:text-right ${HERITAGE_RICH_BODY}`}
            />
          </div>
          <div className={desktopBodyClass}>
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
  forceMobileViewport = false,
  adminPreviewLeftOrigin = false,
}: ModelingBlockHeritageProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const mobileTitleFontSizePx = resolveModelingMobileFontSizePx(
    copy.mobileTitleFontSizePx,
    20,
  );
  const mobileBodyFontSizePx = resolveModelingMobileFontSizePx(
    copy.mobileBodyFontSizePx,
    12,
  );
  const frameClassName = forceMobileViewport
    ? "relative min-w-0 overflow-hidden mx-auto w-full max-w-full min-h-0 aspect-[360/259]"
    : `relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`;
  const mobileImageClass = forceMobileViewport ? "absolute inset-0" : "absolute inset-0 md:hidden";
  const desktopImageClass = forceMobileViewport
    ? "absolute inset-0 hidden"
    : "absolute inset-0 hidden md:block";
  return (
    <article
      className={frameClassName}
      style={{
        ["--modeling-mobile-title-font-px" as string]: String(mobileTitleFontSizePx),
        ["--modeling-mobile-body-font-px" as string]: String(mobileBodyFontSizePx),
      }}
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
            <div className={mobileImageClass}>
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
            <div className={desktopImageClass}>
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
      <HeritageOverlayText
        copy={copy}
        adminPreviewLeftOrigin
        forceMobileViewport={forceMobileViewport}
      />
    </article>
  );
}
