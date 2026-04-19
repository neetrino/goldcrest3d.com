import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { getManufacturingImageTransformCssValue } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type { FounderSectionContent } from "@/lib/founder-section/founder-section.types";
import Image from "next/image";

const FOUNDER_STAT_NUMBER_CLASS_DEFAULT =
  "font-black leading-[32px] text-[#0f172a] text-[24px] md:text-[28px]";

/** Mobile founder bio — Figma widths (px) */
const FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS = {
  p1: "max-w-[331px] min-[430px]:max-md:max-w-full",
  p2: "max-w-[342px] min-[430px]:max-md:max-w-full",
  p3: "max-w-[332px] min-[430px]:max-md:max-w-full",
  p4: "max-w-[338px] min-[430px]:max-md:max-w-full",
} as const;

const FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS =
  "w-full font-sans text-base font-light italic leading-6 tracking-[-0.312px] text-black/80 break-words";

/** Tablet-ում մի քիչ աջ, desktop-ում պահում ենք նախորդ ձախ տեղաշարժը */
const FOUNDER_PHOTO_DESKTOP_NUDGE_LEFT_CLASS =
  "md:max-lg:-translate-x-0 lg:-translate-x-24";

/** Outer section shell — baseline unchanged below `xl`; larger insets + footprint on wide desktops */
const FOUNDER_SECTION_WRAPPER_CLASS =
  "-mt-8 bg-[#f8f7f6] px-4 pt-0 pb-12 md:-mt-12 md:px-6 md:pt-0 md:pb-16 xl:px-10 xl:pb-20 2xl:px-14 2xl:pb-28";

/** Founder գրադարան — lg (1024px) կոմպակտ, xl-ից վեր՝ լայն դեսքտոփ */
const FOUNDER_GRADIENT_PANEL_CLASS =
  "relative mx-auto flex h-[431.867px] min-h-0 w-full max-w-full shrink-0 flex-col self-stretch overflow-hidden rounded-none bg-[linear-gradient(100deg,#D9D9D9_12.7%,#C69F58_67.88%,#FFDDA0_81.27%,#D9AA54_92.63%)] min-[430px]:max-md:h-[500px] md:mt-[88px] md:h-[560px] md:max-lg:h-auto md:w-full md:max-w-[1440px] md:shrink md:flex-row md:self-auto lg:mt-10 lg:h-[560px] xl:mt-[88px] xl:h-[680px]";

const FOUNDER_DESKTOP_TEXT_COLUMN_CLASS =
  "hidden min-h-0 flex-1 flex-col px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8 md:flex md:pl-16 md:pr-10 md:pt-20 md:pb-10 md:min-h-[280px] md:max-lg:-translate-y-7 md:max-lg:pl-10 md:max-lg:pr-6 md:max-lg:pt-12 md:max-lg:pb-6 lg:pl-14 lg:pr-8 lg:pt-14 lg:pb-6 lg:min-h-0 xl:pl-28 xl:pr-12 xl:pt-40 xl:pb-16 xl:min-h-[320px]";

const FOUNDER_DESKTOP_HEADING_CLASS =
  "text-left font-black text-[#0f172a] text-[32px] leading-[38px] tracking-[-1.2px] md:text-[34px] md:leading-[40px] md:max-lg:text-[clamp(30px,4vw,34px)] md:max-lg:leading-[clamp(34px,4.6vw,40px)] xl:text-[36px] xl:leading-[40px]";

const FOUNDER_DESKTOP_BIO_TOP_MARGIN_CLASS = "mt-5 sm:mt-6 md:mt-6 lg:mt-4 xl:mt-10";

const FOUNDER_DESKTOP_STATS_SECTION_CLASS =
  "mt-6 flex flex-wrap gap-6 sm:gap-8 sm:mt-8 md:mt-10 md:gap-10 lg:mt-6 lg:gap-8 xl:mt-16 xl:gap-12";

type FounderBioContentDesktopProps = {
  contentTopClassName: string;
  bioP1: string;
  bioP2: string;
};

function FounderBioContentDesktop({
  contentTopClassName,
  bioP1,
  bioP2,
}: FounderBioContentDesktopProps) {
  return (
    <div
      className={`space-y-3 font-light italic leading-[22px] text-black text-[14px] md:max-lg:text-[clamp(13px,1.6vw,14px)] md:max-lg:leading-[clamp(20px,2.3vw,22px)] lg:space-y-2.5 xl:space-y-4 ${contentTopClassName}`}
    >
      <p className="whitespace-pre-wrap break-words">{bioP1}</p>
      <p className="mt-8 whitespace-pre-wrap break-words sm:mt-10 lg:mt-5 xl:mt-10">{bioP2}</p>
    </div>
  );
}

type FounderBioContentMobileProps = {
  contentTopClassName: string;
  bioP1: string;
  bioP2: string;
  bioP3: string;
  bioP4: string;
};


function FounderBioContentMobile({
  contentTopClassName,
  bioP1,
  bioP2,
  bioP3,
  bioP4,
}: FounderBioContentMobileProps) {
  return (
    <div className={contentTopClassName}>
      <div className="space-y-4">
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p1} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {bioP1}
        </p>
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p2} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {bioP2}
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p3} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {bioP3}
        </p>
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p4} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {bioP4}
        </p>
      </div>
    </div>
  );
}

type FounderBioAndStatsProps = {
  content: FounderSectionContent;
  statCaptionClassName: string;
  contentTopClassName: string;
  statsSectionClassName: string;
  statsFirst?: boolean;
  statNumberClassName?: string;
  useMobileBioTypography?: boolean;
};

function FounderBioAndStats({
  content,
  statCaptionClassName,
  contentTopClassName,
  statsSectionClassName,
  statsFirst = false,
  statNumberClassName = FOUNDER_STAT_NUMBER_CLASS_DEFAULT,
  useMobileBioTypography = false,
}: FounderBioAndStatsProps) {
  const statsBlock = (
    <div className={statsSectionClassName}>
      <div>
        <p className={statNumberClassName}>{content.stats.yearsValue}</p>
        <p className={statCaptionClassName}>{content.stats.yearsCaption}</p>
      </div>
      <div>
        <p className={statNumberClassName}>{content.stats.projectsValue}</p>
        <p className={statCaptionClassName}>{content.stats.projectsCaption}</p>
      </div>
    </div>
  );

  const bioBlock = useMobileBioTypography ? (
    <FounderBioContentMobile
      contentTopClassName={contentTopClassName}
      bioP1={content.bioParagraphs[0]}
      bioP2={content.bioParagraphs[1]}
      bioP3={content.bioParagraphs[2]}
      bioP4={content.bioParagraphs[3]}
    />
  ) : (
    <FounderBioContentDesktop
      contentTopClassName={contentTopClassName}
      bioP1={content.bioParagraphs[0]}
      bioP2={content.bioParagraphs[1]}
    />
  );

  if (statsFirst) {
    return (
      <>
        {statsBlock}
        {bioBlock}
      </>
    );
  }

  return (
    <>
      {bioBlock}
      {statsBlock}
    </>
  );
}

type SectionFounderProps = {
  desktopContent: FounderSectionContent;
  mobileContent: FounderSectionContent;
};

export function SectionFounder({ desktopContent, mobileContent }: SectionFounderProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.FOUNDER}
      className={FOUNDER_SECTION_WRAPPER_CLASS}
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="founder-heading"
          className="mt-8 text-center text-black md:mt-12 md:text-left"
        >
          <span className="-translate-y-3 font-sans text-2xl font-medium leading-8 tracking-[0.07px] md:hidden">
            {mobileContent.heading}
          </span>
          <span className="hidden font-manrope text-[48px] font-normal leading-[40px] tracking-[-0.9px] md:inline">
            {desktopContent.heading}
          </span>
        </h2>
        <h3 className="-mt-2 mb-3 text-center font-sans text-[30px] font-black leading-[36px] tracking-[0.396px] text-black md:hidden">
          {mobileContent.name}
        </h3>
        <div className={FOUNDER_GRADIENT_PANEL_CLASS}>
          <div className={FOUNDER_DESKTOP_TEXT_COLUMN_CLASS}>
            <h3 className={FOUNDER_DESKTOP_HEADING_CLASS}>
              {desktopContent.name}
            </h3>
            <FounderBioAndStats
              content={desktopContent}
              statCaptionClassName="font-bold uppercase tracking-[1.4px] text-white text-[12px] md:text-[13px]"
              contentTopClassName={FOUNDER_DESKTOP_BIO_TOP_MARGIN_CLASS}
              statsSectionClassName={FOUNDER_DESKTOP_STATS_SECTION_CLASS}
            />
          </div>
          <div
            className="relative min-h-0 w-full flex-1 md:aspect-auto md:h-auto md:max-w-[440px] lg:max-w-[493px] md:min-h-0 md:flex-none md:shrink-0"
            data-landing-image={LANDING_IMAGE_IDS.FOUNDER_PHOTO}
          >
            <div
              className="absolute inset-0 md:hidden"
              style={{ transform: getManufacturingImageTransformCssValue(mobileContent.image.transform) }}
            >
              <Image
                src={mobileContent.image.src}
                alt={mobileContent.image.alt}
                fill
                className="object-cover object-center min-[430px]:max-md:object-contain min-[430px]:max-md:object-bottom"
                sizes="(max-width: 768px) 100vw, 493px"
                unoptimized
              />
            </div>
            <div
              className="absolute inset-0 hidden md:block"
              style={{ transform: getManufacturingImageTransformCssValue(desktopContent.image.transform) }}
            >
              <Image
                src={desktopContent.image.src}
                alt={desktopContent.image.alt}
                fill
                className={`object-cover object-center ${FOUNDER_PHOTO_DESKTOP_NUDGE_LEFT_CLASS}`}
                sizes="(max-width: 768px) 100vw, 493px"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="mt-6 md:hidden">
          <FounderBioAndStats
            content={mobileContent}
            statsFirst
            useMobileBioTypography
            statNumberClassName="font-black leading-[32px] text-black text-[24px]"
            statCaptionClassName="font-bold uppercase tracking-[1.4px] text-black text-[12px]"
            contentTopClassName="mt-8"
            statsSectionClassName="flex flex-wrap gap-8"
          />
        </div>
      </div>
    </section>
  );
}
