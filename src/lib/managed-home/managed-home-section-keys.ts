export const MANAGED_HOME_SECTION_KEYS = {
  PHILOSOPHY: "philosophy",
  MODELING: "modeling",
  MANUFACTURING: "manufacturing",
  FOUNDER: "founder",
  PROCESS: "process",
} as const;

export type ManagedHomeSectionKey =
  (typeof MANAGED_HOME_SECTION_KEYS)[keyof typeof MANAGED_HOME_SECTION_KEYS];
