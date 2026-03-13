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
      className="bg-[#f8f7f6] px-4 py-14 md:px-6 md:py-[56px]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1400px] px-0">
        <h2
          id="process-heading"
          className="font-manrope text-center font-extrabold uppercase leading-tight tracking-[3px] text-[#0f172a] text-[30px] md:text-[34px]"
        >
          Our Engineering Process
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:mt-12">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="flex min-w-0 flex-col space-y-4 lg:space-y-3"
            >
              <span className="font-manrope block font-normal leading-none text-[#c69f58] text-[42px] lg:text-[44px]">
                {step.num}
              </span>
              <h3 className="font-manrope font-bold leading-tight text-[#181610] text-[20px] lg:text-[19px]">
                {step.title}
              </h3>
              <p className="font-manrope font-light leading-[1.45] text-[rgba(24,22,16,0.6)] text-[16px] lg:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
