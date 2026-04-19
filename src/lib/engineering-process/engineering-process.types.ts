export const ENGINEERING_PROCESS_STEP_KEYS = {
  CONCEPT_REVIEW: "concept_review",
  QUOTATION_PREPAYMENT: "quotation_prepayment",
  PROGRESS_REVIEW: "progress_review",
  FINAL_MODEL_PRESENTATION: "final_model_presentation",
  FINAL_PAYMENT_RELEASE: "final_payment_release",
} as const;

export type EngineeringProcessStepKey =
  (typeof ENGINEERING_PROCESS_STEP_KEYS)[keyof typeof ENGINEERING_PROCESS_STEP_KEYS];

export type EngineeringProcessStep = {
  key: EngineeringProcessStepKey;
  number: string;
  title: string;
  description: string;
};
