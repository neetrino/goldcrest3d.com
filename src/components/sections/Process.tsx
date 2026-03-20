import { SectionContainer } from "./SectionContainer";

const STEPS = [
  {
    number: "01",
    title: "Concept Review",
    description:
      "Client vision, references and technical requirements are evaluated. Feasibility and structural considerations assessed before quotation.",
  },
  {
    number: "02",
    title: "Quotation & Prepayment",
    description:
      "Project scope defined and pricing confirmed. Modeling begins upon agreed prepayment.",
  },
  {
    number: "03",
    title: "Progress Review",
    description:
      "Half-ready or structurally defined model presented for evaluation. Adjustments discussed and aligned before finalization.",
  },
  {
    number: "04",
    title: "Final Model Presentation",
    description:
      "Completed production-ready model delivered for approval. All structural and dimensional aspects calibrated and verified.",
  },
  {
    number: "05",
    title: "Final Payment & File Release",
    description:
      "Upon final payment, calibrated manufacturing files are delivered for production.",
  },
];

export function Process() {
  return (
    <SectionContainer className="bg-[var(--color-bg-warm)]">
      <div className="container-narrow mx-auto">
        <h2 className="text-[var(--color-slate-heading)] text-[clamp(1.5rem,2.5vw,1.875rem)] font-bold uppercase tracking-widest text-center mb-10 lg:mb-14">
          Our Engineering Process
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 lg:gap-10">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex-1 min-w-[260px] max-w-[320px] mx-auto md:mx-0"
            >
              <p className="text-[var(--color-primary)] font-normal text-4xl lg:text-5xl leading-tight">
                {step.number}
              </p>
              <h3 className="mt-4 text-[var(--color-charcoal)] font-bold text-xl">
                {step.title}
              </h3>
              <p className="mt-3 text-[var(--color-charcoal-soft)] text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
