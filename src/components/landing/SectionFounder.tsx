import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

const FOUNDER_STAT_NUMBER_CLASS_DEFAULT =
  "font-black leading-[32px] text-[#0f172a] text-[24px] md:text-[28px]";

/** Mobile founder bio — Figma widths (px) */
const FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS = {
  p1: "max-w-[331px]",
  p2: "max-w-[342px]",
  p3: "max-w-[332px]",
  p4: "max-w-[338px]",
} as const;

const FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS =
  "w-full font-sans text-base font-light italic leading-6 tracking-[-0.312px] text-black/80 break-words";

const FOUNDER_BIO_MOBILE_P1 = `With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and stone setting, the studio is built on practical manufacturing knowledge — not theory.`;

const FOUNDER_BIO_MOBILE_P2 = `Direct experience at the bench provides a deep understanding of structural behavior, stone security, tolerances and real-world production limitations.`;

const FOUNDER_BIO_MOBILE_P3 = `Every design decision is informed by how the piece will be cast, set, assembled and worn. Each project is personally reviewed, calibrated and validated before delivery.`;

const FOUNDER_BIO_MOBILE_P4 = `No model leaves the studio without structural verification. Jewelry is approached as a system — where design, engineering and craftsmanship must align with precision`;

type FounderBioContentDesktopProps = {
  contentTopClassName: string;
};

function FounderBioContentDesktop({ contentTopClassName }: FounderBioContentDesktopProps) {
  return (
    <div
      className={`space-y-4 font-light italic leading-[22px] text-black text-[14px] ${contentTopClassName}`}
    >
      <p className="whitespace-pre-wrap break-words">{`With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and
stone setting, the studio is built on practical manufacturing knowledge — not theory.
Direct experience at the bench provides a deep understanding of structural behavior, stone
security, tolerances and real-world production limitations.`}</p>
      <p className="mt-8 whitespace-pre-wrap break-words sm:mt-10">{`Every design decision is informed by how the piece will be cast, set, assembled and worn. Each
project is personally reviewed, calibrated and validated before delivery.
No model leaves the studio without structural verification. Jewelry is approached as a system — 
where design, engineering and craftsmanship must align with precision`}</p>
    </div>
  );
}

type FounderBioContentMobileProps = {
  contentTopClassName: string;
};

function FounderBioContentMobile({ contentTopClassName }: FounderBioContentMobileProps) {
  return (
    <div className={contentTopClassName}>
      <div className="space-y-4">
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p1} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {FOUNDER_BIO_MOBILE_P1}
        </p>
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p2} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {FOUNDER_BIO_MOBILE_P2}
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p3} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {FOUNDER_BIO_MOBILE_P3}
        </p>
        <p
          className={`${FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p4} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {FOUNDER_BIO_MOBILE_P4}
        </p>
      </div>
    </div>
  );
}

type FounderBioAndStatsProps = {
  statCaptionClassName: string;
  contentTopClassName: string;
  statsSectionClassName: string;
  statsFirst?: boolean;
  statNumberClassName?: string;
  useMobileBioTypography?: boolean;
};

function FounderBioAndStats({
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
        <p className={statNumberClassName}>16+</p>
        <p className={statCaptionClassName}>Years Experience</p>
      </div>
      <div>
        <p className={statNumberClassName}>2.5k+</p>
        <p className={statCaptionClassName}>Projects Delivered</p>
      </div>
    </div>
  );

  const bioBlock = useMobileBioTypography ? (
    <FounderBioContentMobile contentTopClassName={contentTopClassName} />
  ) : (
    <FounderBioContentDesktop contentTopClassName={contentTopClassName} />
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

export function SectionFounder() {
  return (
    <section
      id={LANDING_SECTION_IDS.FOUNDER}
      className="-mt-8 bg-[#f8f7f6] px-4 pt-0 pb-12 md:-mt-12 md:px-6 md:pt-0 md:pb-16"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="founder-heading"
          className="mt-8 -translate-y-3 text-center font-sans text-2xl font-medium leading-8 tracking-[0.07px] text-black md:mt-12 md:translate-y-0 md:text-left md:font-manrope md:text-[48px] md:font-normal md:leading-[40px] md:tracking-[-0.9px]"
        >
          Founder & Lead CAD Engineer
        </h2>
        <h3 className="-mt-2 mb-3 text-center font-sans text-[30px] font-black leading-[36px] tracking-[0.396px] text-black md:hidden">
          Davit Sargsyan
        </h3>
        <div className="relative mx-auto flex h-[431.867px] min-h-0 w-full max-w-full shrink-0 flex-col self-stretch overflow-hidden rounded-none bg-[linear-gradient(100deg,#D9D9D9_12.7%,#C69F58_67.88%,#FFDDA0_81.27%,#D9AA54_92.63%)] md:mt-[88px] md:h-[680px] md:w-[1440px] md:shrink md:flex-row md:self-auto">
          <div className="hidden min-h-0 flex-1 flex-col px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8 md:flex md:pl-28 md:pr-12 md:pt-40 md:pb-16 md:min-h-[320px]">
            <h3 className="text-left font-black leading-[40px] tracking-[-1.2px] text-[#0f172a] text-[36px]">
              Davit Sargsyan
            </h3>
            <FounderBioAndStats
              statCaptionClassName="font-bold uppercase tracking-[1.4px] text-white text-[12px] md:text-[13px]"
              contentTopClassName="mt-6 sm:mt-8 md:mt-10"
              statsSectionClassName="mt-8 flex flex-wrap gap-8 sm:gap-10 md:mt-16 md:gap-12"
            />
          </div>
          <div
            className="relative min-h-0 w-full flex-1 md:aspect-auto md:h-auto md:max-w-[493px] md:min-h-0 md:flex-none md:shrink-0"
            data-landing-image={LANDING_IMAGE_IDS.FOUNDER_PHOTO}
          >
            <Image
              src={LANDING_IMAGES.founder}
              alt="Davit Sargsyan"
              fill
              className="object-cover object-top md:-translate-x-24"
              sizes="(max-width: 768px) 100vw, 493px"
              unoptimized
            />
          </div>
        </div>
        <div className="mt-6 md:hidden">
          <FounderBioAndStats
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
