import type { CSSProperties } from "react";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

/**
 * `cover` — նկարը լրիվ լցնում է block-ը; մուգ ֆոնը երևում է միայն եթե URL-ը բացակայի։
 */
export function getModelingHipHopCardBackgroundStyle(
  imageUrl: string,
): Pick<CSSProperties, "background"> {
  return {
    background: `url("${imageUrl}") ${LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED} center / cover no-repeat`,
  };
}
