import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

import type { ModelingSlotCopyBundle, ModelingSlotCopyEntry } from "./modeling-slot-copy.types";

function body(html: string): string {
  return finalizeHeroBannerBodyHtml(html);
}

/**
 * Baseline copy when no `ModelingSlotCopy` row exists — mirrors the previous static card content
 * (paragraph structure is approximate; admins can refine in the rich editor).
 */
const HIP_HOP: ModelingSlotCopyEntry = {
  title: "Hip-Hop Jewelry",
  bodyMobile: "",
  body: body(
    "<p>High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution.</p><p>Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term performance.</p>",
  ),
};

const BRIDAL: ModelingSlotCopyEntry = {
  title: "Bridal & Engagement",
  bodyMobile: "",
  body: body(
    "<p>Engineered engagement and bridal settings built for durability, comfort and precise stone alignment. Secure prong architecture developed for long-term wear.</p>",
  ),
};

const PORTRAIT: ModelingSlotCopyEntry = {
  title: "High Jewelry",
  bodyMobile: "",
  body: body(
    "<p>Advanced pavé and fine-setting structures developed with micron-level precision.</p><p>Invisible settings and ultra-thin tolerances engineered with strict structural discipline.</p>",
  ),
};

const MECHANICAL: ModelingSlotCopyEntry = {
  title: "Mechanical &\nLock Systems",
  bodyMobile: "",
  body: body(
    "<p>Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement and secure locking performance.</p><p>Functional systems developed for durability, precision alignment and long-term mechanical reliability.</p>",
  ),
};

const HERITAGE: ModelingSlotCopyEntry = {
  title: "3D Portrait Jewelry",
  bodyMobile: "",
  body: body(
    "<p>High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture.</p><p>Developed to integrate pavé surfaces, deep dimensional detail and reinforced structural support for long-term durability.</p>",
  ),
};

const HIGH_JEWELRY: ModelingSlotCopyEntry = {
  title: "Ancient & Heritage Jewelry",
  bodyMobile: "",
  body: body(
    "<p>Cultural and historical motifs re-engineered into structurally optimized, <strong>production-ready</strong> CAD frameworks.</p><p>Authentic design language preserved through precise digital reconstruction and manufacturing awareness.</p>",
  ),
};

export const MODELING_SLOT_DEFAULT_COPY: ModelingSlotCopyBundle = {
  [MODELING_SLOT_KEYS.HIP_HOP]: HIP_HOP,
  [MODELING_SLOT_KEYS.BRIDAL]: BRIDAL,
  [MODELING_SLOT_KEYS.PORTRAIT]: PORTRAIT,
  [MODELING_SLOT_KEYS.MECHANICAL]: MECHANICAL,
  [MODELING_SLOT_KEYS.HERITAGE]: HERITAGE,
  [MODELING_SLOT_KEYS.HIGH_JEWELRY]: HIGH_JEWELRY,
};

export function defaultModelingSlotCopyBundle(): ModelingSlotCopyBundle {
  return { ...MODELING_SLOT_DEFAULT_COPY };
}
