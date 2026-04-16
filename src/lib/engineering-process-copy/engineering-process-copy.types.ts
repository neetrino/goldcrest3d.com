export type EngineeringProcessStepEntry = {
  num: string;
  title: string;
  subtitle: string;
  description: string;
};

export type EngineeringProcessCopyEntry = {
  sectionTitle: string;
  steps: EngineeringProcessStepEntry[];
};

