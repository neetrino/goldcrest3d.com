import { LANDING_SECTION_IDS } from "@/constants";
import type { EngineeringProcessStep } from "@/lib/engineering-process/engineering-process.types";

/**
 * Mobile: Inter 24/32, 277px wide, tracking 1.27px.
 * `md:` — previous desktop heading (Manrope 34px, extrabold, …).
 */
const PROCESS_HEADING_CLASS =
  "mx-auto w-full max-w-[277px] text-center font-sans text-[24px] font-bold uppercase not-italic leading-8 tracking-[1.27px] text-black md:max-w-none md:font-manrope md:text-[34px] md:font-extrabold md:leading-tight md:tracking-[3px] md:text-[#0f172a]";

/** Mobile: Inter; `md:`/`lg:` — previous step typography (Manrope). */
const PROCESS_STEP_NUM_CLASS =
  "block font-sans text-[48px] font-normal leading-[48px] tracking-[0.352px] text-[#e2c481] md:font-manrope md:text-[42px] md:leading-none md:tracking-normal lg:text-[44px]";

const PROCESS_STEP_TITLE_CLASS =
  "font-sans text-[20px] font-bold leading-7 tracking-[-0.449px] text-black md:font-manrope md:leading-tight md:tracking-normal md:text-[#181610] lg:text-[19px]";

const PROCESS_STEP_DESC_CLASS =
  "max-w-[331px] font-sans text-sm font-light leading-5 tracking-[-0.15px] text-[#4A5565] md:max-w-none md:font-manrope md:text-[16px] md:font-light md:leading-[1.45] md:tracking-normal md:text-[rgba(24,22,16,0.6)] lg:text-[15px]";

type SectionProcessProps = {
  steps: EngineeringProcessStep[];
};

export function SectionProcess({ steps }: SectionProcessProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.PROCESS}
      className="bg-[#f8f7f6] px-4 py-14 md:px-6 md:py-[56px]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1400px] px-0">
        <h2 id="process-heading" className={PROCESS_HEADING_CLASS}>
          Our Engineering Process
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:mt-12">
          {steps.map((step) => (
            <div
              key={step.key}
              className="flex min-w-0 flex-col space-y-4 lg:space-y-3"
            >
              <span className={PROCESS_STEP_NUM_CLASS}>{step.number}</span>
              <h3 className={PROCESS_STEP_TITLE_CLASS}>{step.title}</h3>
              <p className={PROCESS_STEP_DESC_CLASS}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
