import type { CSSProperties } from "react";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

/**
 * `contain` + dark frame so light overlay text stays readable on letterboxing.
 */
export function getModelingHipHopCardBackgroundStyle(
  imageUrl: string,
): Pick<CSSProperties, "background"> {
  return {
    background: `url("${imageUrl}") ${LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED} center / contain no-repeat`,
  };
}
