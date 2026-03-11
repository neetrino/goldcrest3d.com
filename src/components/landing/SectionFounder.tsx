import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

export function SectionFounder() {
  return (
    <section
      id={LANDING_SECTION_IDS.FOUNDER}
      className="px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="founder-heading"
          className="text-center font-normal leading-tight tracking-[-0.02em] text-[var(--foreground)] text-[clamp(1.75rem,4vw,48px)]"
        >
          Founder & Lead Cad Engineer
        </h2>
        <div className="relative mt-12 overflow-hidden rounded-2xl shadow-xl md:flex">
          <div
            className="min-h-[320px] flex-1 px-8 py-12 md:px-12 md:py-16"
            style={{
              background:
                "linear-gradient(110.87deg, #d9d9d9 12.7%, #c69f58 67.9%, #ffdda0 81.3%, #d9aa54 92.6%)",
            }}
          >
            <h3 className="font-black leading-tight tracking-[-0.025em] text-[#0f172a] text-[clamp(2rem,4vw,48px)]">
              Davit Sargsyan
            </h3>
            <p className="mt-6 font-light italic leading-[1.6] text-[var(--foreground)] text-[18px]">
              With over 16 years of experience in jewelry craftsmanship,
              including professional goldsmithing and stone setting, the studio is
              built on practical manufacturing knowledge — not theory. Direct
              experience at the bench provides a deep understanding of structural
              behavior, stone security, tolerances and real-world production
              limitations. Every design decision is informed by how the piece
              will be cast, set, assembled and worn. Each project is personally
              reviewed, calibrated and validated before delivery. No model leaves
              the studio without structural verification.
            </p>
            <div className="mt-10 flex flex-wrap gap-12">
              <div>
                <p className="font-black text-[#0f172a] text-[30px]">16+</p>
                <p className="font-bold uppercase tracking-wider text-[#0f172a]/80 text-[14px]">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-black text-[#0f172a] text-[30px]">2.5k+</p>
                <p className="font-bold uppercase tracking-wider text-[#0f172a]/80 text-[14px]">
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}
