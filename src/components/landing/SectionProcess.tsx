import { LANDING_SECTION_IDS } from "@/constants";

const STEPS: Array<{ num: string; title: string; description: string }> = [
  {
    num: "01",
    title: "Concept Review",
    description:
      "Client vision, references and technical requirements are evaluated. Feasibility and structural considerations assessed before quotation.",
  },
  {
    num: "02",
    title: "Quotation & Prepayment",
    description:
      "Project scope defined and pricing confirmed. Modeling begins upon agreed prepayment.",
  },
  {
    num: "03",
    title: "Progress Review",
    description:
      "Half-ready or structurally defined model presented for evaluation. Adjustments discussed and aligned before finalization.",
  },
  {
    num: "04",
    title: "Final Model Presentation",
    description:
      "Completed production-ready model delivered for approval. All structural and dimensional aspects calibrated and verified.",
  },
  {
    num: "05",
    title: "Final Payment & File Release",
    description:
      "Upon final payment, calibrated manufacturing files are delivered for production.",
  },
];

export function SectionProcess() {
  return (
    <section
      id={LANDING_SECTION_IDS.PROCESS}
      className="bg-[#f8f7f6] px-4 py-14 md:px-6 md:py-14"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="process-heading"
          className="font-manrope text-center font-extrabold uppercase leading-[36px] tracking-[3px] text-[#0f172a] text-[30px]"
        >
          Our Engineering Process
        </h2>
        <div className="mt-11 flex flex-wrap justify-center gap-[46px]">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="w-full max-w-[291px] shrink-0 space-y-[22px]"
            >
              <span className="font-manrope block font-normal leading-[60px] text-[#c69f58] text-[60px]">
                {step.num}
              </span>
              <h3 className="font-manrope font-bold leading-[28px] text-[#181610] text-[20px]">
                {step.title}
              </h3>
              <p className="font-manrope font-light leading-[24px] text-[rgba(24,22,16,0.6)] text-[16px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
