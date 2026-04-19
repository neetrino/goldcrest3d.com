export const FOUNDER_SECTION_COPY_KEYS = {
  HEADING: "founder_desktop_heading",
  NAME: "founder_desktop_name",
  BIO_P1: "founder_desktop_bio_p1",
  BIO_P2: "founder_desktop_bio_p2",
  STAT_YEARS_VALUE: "founder_desktop_stat_years_value",
  STAT_YEARS_CAPTION: "founder_desktop_stat_years_caption",
  STAT_PROJECTS_VALUE: "founder_desktop_stat_projects_value",
  STAT_PROJECTS_CAPTION: "founder_desktop_stat_projects_caption",
  IMAGE_ALT: "founder_desktop_image_alt",
} as const;

export const FOUNDER_SECTION_COPY_ALLOWED_KEYS: readonly string[] = [
  FOUNDER_SECTION_COPY_KEYS.HEADING,
  FOUNDER_SECTION_COPY_KEYS.NAME,
  FOUNDER_SECTION_COPY_KEYS.BIO_P1,
  FOUNDER_SECTION_COPY_KEYS.BIO_P2,
  FOUNDER_SECTION_COPY_KEYS.STAT_YEARS_VALUE,
  FOUNDER_SECTION_COPY_KEYS.STAT_YEARS_CAPTION,
  FOUNDER_SECTION_COPY_KEYS.STAT_PROJECTS_VALUE,
  FOUNDER_SECTION_COPY_KEYS.STAT_PROJECTS_CAPTION,
  FOUNDER_SECTION_COPY_KEYS.IMAGE_ALT,
];

export const FOUNDER_SECTION_COPY_ALLOWED_KEY_SET = new Set<string>(
  FOUNDER_SECTION_COPY_ALLOWED_KEYS,
);
