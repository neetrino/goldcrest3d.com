import type { EngineeringProcessCopyEntry } from "./engineering-process-copy.types";

export const ENGINEERING_PROCESS_DEFAULT_COPY: EngineeringProcessCopyEntry = {
  sectionTitle: "Our Engineering Process",
  steps: [
    {
      num: "01",
      title: "Concept Review",
      subtitle: "",
      description:
        "Client vision, references and technical requirements are evaluated. Feasibility and structural considerations assessed before quotation.",
    },
    {
      num: "02",
      title: "Quotation & Prepayment",
      subtitle: "",
      description:
        "Project scope defined and pricing confirmed. Modeling begins upon agreed prepayment.",
    },
    {
      num: "03",
      title: "Progress Review",
      subtitle: "",
      description:
        "Half-ready or structurally defined model presented for evaluation. Adjustments discussed and aligned before finalization.",
    },
    {
      num: "04",
      title: "Final Model Presentation",
      subtitle: "",
      description:
        "Completed production-ready model delivered for approval. All structural and dimensional aspects calibrated and verified.",
    },
    {
      num: "05",
      title: "Final Payment & File Release",
      subtitle: "",
      description:
        "Upon final payment, calibrated manufacturing files are delivered for production.",
    },
  ],
};

