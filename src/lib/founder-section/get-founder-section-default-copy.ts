import { FOUNDER_SECTION_COPY_KEYS } from "./founder-section-copy.keys";

export function getFounderSectionDefaultCopyMap(): Map<string, string> {
  return new Map<string, string>([
    [FOUNDER_SECTION_COPY_KEYS.HEADING, "Founder & Lead CAD Engineer"],
    [FOUNDER_SECTION_COPY_KEYS.NAME, "Davit Sargsyan"],
    [
      FOUNDER_SECTION_COPY_KEYS.BIO_P1,
      `With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and
stone setting, the studio is built on practical manufacturing knowledge — not theory.
Direct experience at the bench provides a deep understanding of structural behavior, stone
security, tolerances and real-world production limitations.`,
    ],
    [
      FOUNDER_SECTION_COPY_KEYS.BIO_P2,
      `Every design decision is informed by how the piece will be cast, set, assembled and worn. Each
project is personally reviewed, calibrated and validated before delivery.
No model leaves the studio without structural verification. Jewelry is approached as a system —
where design, engineering and craftsmanship must align with precision․`,
    ],
    [FOUNDER_SECTION_COPY_KEYS.STAT_YEARS_VALUE, "16+"],
    [FOUNDER_SECTION_COPY_KEYS.STAT_YEARS_CAPTION, "Years Experience"],
    [FOUNDER_SECTION_COPY_KEYS.STAT_PROJECTS_VALUE, "2.5k+"],
    [FOUNDER_SECTION_COPY_KEYS.STAT_PROJECTS_CAPTION, "Projects Delivered"],
    [FOUNDER_SECTION_COPY_KEYS.IMAGE_ALT, "Davit Sargsyan"],
  ]);
}
