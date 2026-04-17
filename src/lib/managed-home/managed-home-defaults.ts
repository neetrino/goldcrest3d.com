import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";

import type {
  FounderPayload,
  ManagedHomeBundle,
  ManufacturingPayload,
  ModelingPayload,
  PhilosophyPayload,
  ProcessPayload,
} from "./managed-home-schemas";

export const PHILOSOPHY_DEFAULTS: PhilosophyPayload = {
  goldcrest: "Goldcrest",
  engineering: "Engineering",
  philosophy: "Philosophy",
  quoteLines: [
    "We design with manufacturing awareness.",
    "We engineer with structural responsibility.",
    "We eliminate risks at the digital stage.",
  ],
  emphasis: "Precision is not optional. It is the standard.",
};

export const PROCESS_DEFAULTS: ProcessPayload = {
  heading: "Our Engineering Process",
  steps: [
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
  ],
};

export const FOUNDER_DEFAULTS: FounderPayload = {
  sectionHeading: "Founder & Lead CAD Engineer",
  name: "Davit Sargsyan",
  bioMobileParagraphs: [
    "With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and stone setting, the studio is built on practical manufacturing knowledge — not theory.",
    "Direct experience at the bench provides a deep understanding of structural behavior, stone security, tolerances and real-world production limitations.",
    "Every design decision is informed by how the piece will be cast, set, assembled and worn. Each project is personally reviewed, calibrated and validated before delivery.",
    "No model leaves the studio without structural verification. Jewelry is approached as a system — where design, engineering and craftsmanship must align with precision․",
  ],
  bioDesktopBlock1: `With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and
stone setting, the studio is built on practical manufacturing knowledge — not theory.
Direct experience at the bench provides a deep understanding of structural behavior, stone
security, tolerances and real-world production limitations.`,
  bioDesktopBlock2: `Every design decision is informed by how the piece will be cast, set, assembled and worn. Each
project is personally reviewed, calibrated and validated before delivery.
No model leaves the studio without structural verification. Jewelry is approached as a system — 
where design, engineering and craftsmanship must align with precision․`,
  stats: [
    { value: "16+", label: "Years Experience" },
    { value: "2.5k+", label: "Projects Delivered" },
  ],
};

export function buildDefaultManufacturingPayload(): ManufacturingPayload {
  return {
    sectionTitle: "Manufacturing Intelligence",
    items: MANUFACTURING_SPECIALIZATION_ITEMS.map((i) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      detailImageAlt: i.detailImageAlt,
    })),
  };
}

export const MODELING_DEFAULTS: ModelingPayload = {
  desktop: {
    sectionTitle: "Modeling Specialization",
    cards: undefined,
  },
  mobile: {
    sectionTitle: "Modeling Specialization",
    cards: undefined,
  },
};

export function getManagedHomeDefaults(): ManagedHomeBundle {
  return {
    philosophy: PHILOSOPHY_DEFAULTS,
    modeling: MODELING_DEFAULTS,
    manufacturing: buildDefaultManufacturingPayload(),
    founder: FOUNDER_DEFAULTS,
    process: PROCESS_DEFAULTS,
  };
}
