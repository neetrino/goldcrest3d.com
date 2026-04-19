import Image from "next/image";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";
import { resolveModelingMobileFontSizePx } from "@/lib/modeling-slot-copy/modeling-mobile-typography";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import { framingToCoverImageStyle, type ImageFraming } from "@/lib/site-media/image-framing";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

/** Desktop (md+): nudge first title line up without shifting the rest of the overlay. */
const TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS = "md:-translate-y-1.5";

const MECHANICAL_RICH_BODY =
  "[&_p]:mb-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

function MechanicalTitleLines({ title }: { title: string }) {
  const lines = title.split(/\r?\n/);
  return lines.map((line, i) => (
    <span
      key={`mechanical-title-${i}`}
      className={`block whitespace-pre ${i === 0 ? TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS : ""}`}
    >
      {line.length > 0 ? line : "\u00A0"}
    </span>
  ));
}

function preserveEmptyParagraphLines(html: string): string {
  return html.replace(
    /<p([^>]*)>\s*(?:<br\s*\/?>)?\s*<\/p>/gi,
    "<p$1>&nbsp;</p>",
  );
}

type ModelingBlockMechanicalProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
  forceMobileViewport?: boolean;
  /** Optional admin preview override: place title/body at top-left. */
  adminPreviewLeftOrigin?: boolean;
};

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
export function ModelingBlockMechanical({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
  forceMobileViewport = false,
  adminPreviewLeftOrigin = false,
}: ModelingBlockMechanicalProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const bodyDesktop = preserveEmptyParagraphLines(copy.body);
  const bodyMobile = preserveEmptyParagraphLines(copy.bodyMobile);
  const titleDesktop = copy.title;
  const resolvedTitleMobile = copy.titleMobile;
  const mobileTitleFontSizePx = resolveModelingMobileFontSizePx(
    copy.mobileTitleFontSizePx,
    20,
  );
  const mobileBodyFontSizePx = resolveModelingMobileFontSizePx(
    copy.mobileBodyFontSizePx,
    12,
  );
  const mechanicalTitleH3Class =
    forceMobileViewport
      ? "z-10 w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] whitespace-normal"
      : "z-10 w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] max-md:whitespace-normal md:w-full md:max-w-[calc(520px*var(--ms,1))] md:font-manrope md:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:tracking-normal md:scale-x-105 md:origin-left";
  const mobileImageClass = forceMobileViewport ? "absolute inset-0" : "absolute inset-0 md:hidden";
  const desktopImageClass = forceMobileViewport
    ? "absolute inset-0 hidden"
    : "absolute inset-0 hidden md:block";
  const mobileTitleClass = forceMobileViewport ? "block" : "md:hidden";
  const desktopTitleClass = forceMobileViewport ? "hidden" : "hidden md:block";
  const mobileBodyClass = forceMobileViewport
    ? "w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))]"
    : "w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] md:hidden";
  const desktopBodyClass = forceMobileViewport
    ? "hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))]"
    : "hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] md:block";
  const frameClassName = forceMobileViewport
    ? "relative min-w-0 overflow-hidden mx-auto w-full max-w-full min-h-0 aspect-[360/259]"
    : `relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`;
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
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className={
              imageFramingDesktop
                ? "h-full w-full object-cover"
                : "h-full w-full object-cover max-md:object-[56%_center] md:object-center"
            }
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
                className={
                  imageFramingMobile
                    ? "min-h-0 min-w-0 h-full w-full object-cover"
                    : "min-h-0 min-w-0 h-full w-full object-cover object-[56%_center]"
                }
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
                className={
                  imageFramingDesktop
                    ? "h-full w-full object-cover"
                    : "h-full w-full object-cover object-center"
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
        className="absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(0.75rem*var(--ms,1))] px-[calc(0.75rem*var(--ms,1))] py-[calc(0.5rem*var(--ms,1))] text-black md:gap-[calc(1rem*var(--ms,1))] md:px-[calc(1rem*var(--ms,1))] md:py-[calc(0.75rem*var(--ms,1))]"
      >
        <>
          <h3 className={`${mechanicalTitleH3Class} ${mobileTitleClass}`}>
            <MechanicalTitleLines title={resolvedTitleMobile} />
          </h3>
          <h3 className={`${mechanicalTitleH3Class} ${desktopTitleClass}`}>
            <MechanicalTitleLines title={titleDesktop} />
          </h3>
        </>
        <div className={mobileBodyClass}>
          <HeroBannerBodyRichText
            body={bodyMobile}
            className={`modeling-slot-rich-body whitespace-pre ${MECHANICAL_RICH_BODY}`}
          />
        </div>
        <div className={desktopBodyClass} style={{ overflow: "visible" }}>
          <HeroBannerBodyRichText
            body={bodyDesktop}
            className={`modeling-slot-rich-body whitespace-pre ${MECHANICAL_RICH_BODY}`}
          />
        </div>
      </div>
    </article>
  );
}
