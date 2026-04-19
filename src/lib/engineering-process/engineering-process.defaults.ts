import {
  ENGINEERING_PROCESS_STEP_KEYS,
  type EngineeringProcessStep,
  type EngineeringProcessStepKey,
} from "./engineering-process.types";

type EngineeringProcessCopyRow = {
  stepKey: string;
  title: string;
  description: string;
};

const DEFAULT_ENGINEERING_PROCESS_STEPS: readonly EngineeringProcessStep[] = [
  {
    key: ENGINEERING_PROCESS_STEP_KEYS.CONCEPT_REVIEW,
    number: "01",
    title: "Concept Review",
    description:
      "Client vision, references and technical requirements are evaluated. Feasibility and structural considerations assessed before quotation.",
  },
  {
    key: ENGINEERING_PROCESS_STEP_KEYS.QUOTATION_PREPAYMENT,
    number: "02",
    title: "Quotation & Prepayment",
    description:
      "Project scope defined and pricing confirmed. Modeling begins upon agreed prepayment.",
  },
  {
    key: ENGINEERING_PROCESS_STEP_KEYS.PROGRESS_REVIEW,
    number: "03",
    title: "Progress Review",
    description:
      "Half-ready or structurally defined model presented for evaluation. Adjustments discussed and aligned before finalization.",
  },
  {
    key: ENGINEERING_PROCESS_STEP_KEYS.FINAL_MODEL_PRESENTATION,
    number: "04",
    title: "Final Model Presentation",
    description:
      "Completed production-ready model delivered for approval. All structural and dimensional aspects calibrated and verified.",
  },
  {
    key: ENGINEERING_PROCESS_STEP_KEYS.FINAL_PAYMENT_RELEASE,
    number: "05",
    title: "Final Payment & File Release",
    description:
      "Upon final payment, calibrated manufacturing files are delivered for production.",
  },
];

const ALLOWED_ENGINEERING_PROCESS_STEP_KEY_SET = new Set<EngineeringProcessStepKey>(
  DEFAULT_ENGINEERING_PROCESS_STEPS.map((step) => step.key),
);

function isEngineeringProcessStepKey(value: string): value is EngineeringProcessStepKey {
  return ALLOWED_ENGINEERING_PROCESS_STEP_KEY_SET.has(value as EngineeringProcessStepKey);
}

export function getDefaultEngineeringProcessSteps(): EngineeringProcessStep[] {
  return [...DEFAULT_ENGINEERING_PROCESS_STEPS];
}

export function mergeEngineeringProcessSteps(
  rows: EngineeringProcessCopyRow[],
): EngineeringProcessStep[] {
  if (rows.length === 0) {
    return getDefaultEngineeringProcessSteps();
  }
  const byStepKey = new Map<EngineeringProcessStepKey, EngineeringProcessCopyRow>();
  for (const row of rows) {
    if (!isEngineeringProcessStepKey(row.stepKey)) {
      continue;
    }
    byStepKey.set(row.stepKey, row);
  }

  return DEFAULT_ENGINEERING_PROCESS_STEPS.map((defaultStep) => {
    const row = byStepKey.get(defaultStep.key);
    if (!row) {
      return defaultStep;
    }
    return {
      ...defaultStep,
      title: row.title || defaultStep.title,
      description: row.description || defaultStep.description,
    };
  });
}
