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
          className="mt-12 font-manrope text-left text-[48px] font-normal leading-[40px] tracking-[-0.9px] text-black"
        >
          Founder & Lead Cad Engineer
        </h2>
        <div className="relative mx-auto mt-[88px] h-[680px] w-[1440px] max-w-full overflow-hidden rounded-none bg-[linear-gradient(100deg,#D9D9D9_12.7%,#C69F58_67.88%,#FFDDA0_81.27%,#D9AA54_92.63%)] md:flex">
          <div className="min-h-[320px] flex-1 pl-16 pr-8 pt-28 pb-12 md:pl-28 md:pr-12 md:pt-40 md:pb-16">
            <h3 className="font-black leading-[40px] tracking-[-1.2px] text-[#0f172a] text-[36px]">
              Davit Sargsyan
            </h3>
            <div className="mt-10 space-y-4 font-light italic leading-[22px] text-black text-[14px]">
              <p className="whitespace-pre-wrap">{`With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and
stone setting, the studio is built on practical manufacturing knowledge — not theory.
Direct experience at the bench provides a deep understanding of structural behavior, stone
security, tolerances and real-world production limitations.`}</p>
              <p className="mt-10 whitespace-pre-wrap">{`Every design decision is informed by how the piece will be cast, set, assembled and worn. Each
project is personally reviewed, calibrated and validated before delivery.
No model leaves the studio without structural verification. Jewelry is approached as a system — 
where design, engineering and craftsmanship must align with precision`}</p>
            </div>
            <div className="mt-16 flex flex-wrap gap-12">
              <div>
                <p className="font-black leading-[32px] text-[#0f172a] text-[28px]">
                  16+
                </p>
                <p className="font-bold uppercase tracking-[1.4px] text-white text-[13px]">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-black leading-[32px] text-[#0f172a] text-[28px]">
                  2.5k+
                </p>
                <p className="font-bold uppercase tracking-[1.4px] text-white text-[13px]">
                  Projects Delivered
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative h-[320px] w-full shrink-0 md:h-auto md:max-w-[493px]"
            data-landing-image={LANDING_IMAGE_IDS.FOUNDER_PHOTO}
          >
            <Image
              src={LANDING_IMAGES.founder}
              alt="Davit Sargsyan"
              fill
              className="object-cover object-top -translate-x-16 md:-translate-x-24"
              sizes="(max-width: 768px) 100vw, 493px"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
