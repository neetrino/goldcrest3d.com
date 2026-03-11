import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

export function SectionFounder() {
  return (
    <section
      id={LANDING_SECTION_IDS.FOUNDER}
      className="bg-[#f8f7f6] px-4 py-12 md:px-6 md:py-16"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="founder-heading"
          className="font-manrope text-center font-normal leading-[40px] tracking-[-0.9px] text-black text-[48px]"
        >
          Founder & Lead Cad Engineer
        </h2>
        <div className="relative mt-10 overflow-hidden rounded-2xl md:flex">
          <div
            className="min-h-[320px] flex-1 px-8 py-12 md:px-12 md:py-16"
            style={{
              background:
                "linear-gradient(110.87deg, #d9d9d9 12.7%, #c69f58 67.9%, #ffdda0 81.3%, #d9aa54 92.6%)",
            }}
          >
            <h3 className="font-black leading-[48px] tracking-[-1.2px] text-[#0f172a] text-[48px]">
              Davit Sargsyan
            </h3>
            <p className="mt-6 font-light italic leading-[29.25px] text-black text-[18px] whitespace-pre-wrap">
              {`With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and stone setting, the studio is built on practical manufacturing knowledge — not theory.\nDirect experience at the bench provides a deep understanding of structural behavior, stone security, tolerances and real-world production limitations.\n\nEvery design decision is informed by how the piece will be cast, set, assembled and worn. Each project is personally reviewed, calibrated and validated before delivery.\nNo model leaves the studio without structural verification. Jewelry is approached as a system — where design, engineering and craftsmanship must align with precision`}
            </p>
            <div className="mt-10 flex flex-wrap gap-12">
              <div>
                <p className="font-black leading-[36px] text-[#0f172a] text-[30px]">
                  16+
                </p>
                <p className="font-bold uppercase tracking-[1.4px] text-[#0f172a] text-[14px]">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-black leading-[36px] text-[#0f172a] text-[30px]">
                  2.5k+
                </p>
                <p className="font-bold uppercase tracking-[1.4px] text-[#0f172a] text-[14px]">
                  Projects Delivered
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[320px] w-full shrink-0 md:h-auto md:max-w-[493px]">
            <Image
              src={LANDING_IMAGES.founder}
              alt="Davit Sargsyan"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 493px"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
