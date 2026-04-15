/** Canonical founder name when no DB row exists. */
export const FOUNDER_SECTION_DEFAULT_NAME = "Davit Sargsyan";

/**
 * Default bio HTML — matches the hardcoded paragraphs in SectionFounder.tsx.
 * Used when no DB row exists so the admin edit area is pre-filled with the live text.
 */
export const FOUNDER_SECTION_DEFAULT_BODY = `<p>With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and stone setting, the studio is built on practical manufacturing knowledge — not theory.</p><p>Direct experience at the bench provides a deep understanding of structural behavior, stone security, tolerances and real-world production limitations.</p><p>Every design decision is informed by how the piece will be cast, set, assembled and worn. Each project is personally reviewed, calibrated and validated before delivery.</p><p>No model leaves the studio without structural verification. Jewelry is approached as a system — where design, engineering and craftsmanship must align with precision.</p>`;

/**
 * Built-in portrait image path (public asset). Shown in the admin preview when no
 * custom R2 upload has been made yet.
 */
export const FOUNDER_SECTION_BUILTIN_IMAGE_SRC = "/images/founder/founder-portrait.png";
