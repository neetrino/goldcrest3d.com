import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

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
          className="mt-8 font-manrope text-left text-[28px] font-normal leading-[1.2] tracking-[-0.5px] text-black md:mt-12 md:text-[48px] md:leading-[40px] md:tracking-[-0.9px]"
        >
          Founder & Lead Cad Engineer
        </h2>
        <div className="relative mx-auto mt-6 flex min-h-0 w-full max-w-full flex-col overflow-hidden rounded-none bg-[linear-gradient(100deg,#D9D9D9_12.7%,#C69F58_67.88%,#FFDDA0_81.27%,#D9AA54_92.63%)] md:mt-[88px] md:h-[680px] md:w-[1440px] md:flex-row">
          <div className="flex min-h-0 flex-1 flex-col px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8 md:pl-28 md:pr-12 md:pt-40 md:pb-16 md:min-h-[320px]">
            <h3 className="font-black leading-tight tracking-[-1.2px] text-[#0f172a] text-[28px] sm:text-[32px] md:leading-[40px] md:text-[36px]">
              Davit Sargsyan
            </h3>
            <div className="mt-6 space-y-4 font-light italic leading-[22px] text-black text-[14px] sm:mt-8 md:mt-10">
              <p className="whitespace-pre-wrap break-words">{`With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and
stone setting, the studio is built on practical manufacturing knowledge — not theory.
Direct experience at the bench provides a deep understanding of structural behavior, stone
security, tolerances and real-world production limitations.`}</p>
              <p className="mt-8 whitespace-pre-wrap break-words sm:mt-10">{`Every design decision is informed by how the piece will be cast, set, assembled and worn. Each
project is personally reviewed, calibrated and validated before delivery.
No model leaves the studio without structural verification. Jewelry is approached as a system — 
where design, engineering and craftsmanship must align with precision`}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-8 sm:gap-10 md:mt-16 md:gap-12">
              <div>
                <p className="font-black leading-[32px] text-[#0f172a] text-[24px] md:text-[28px]">
                  16+
                </p>
                <p className="font-bold uppercase tracking-[1.4px] text-white text-[12px] md:text-[13px]">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-black leading-[32px] text-[#0f172a] text-[24px] md:text-[28px]">
                  2.5k+
                </p>
                <p className="font-bold uppercase tracking-[1.4px] text-white text-[12px] md:text-[13px]">
                  Projects Delivered
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative aspect-[3/3.4] w-full shrink-0 sm:aspect-[4/4.3] md:aspect-auto md:h-auto md:min-h-0 md:max-w-[493px]"
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
      </div>
    </section>
  );
}
