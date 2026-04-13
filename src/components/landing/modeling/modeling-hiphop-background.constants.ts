import type { CSSProperties } from "react";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";
import {
  framingToBackgroundImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

/**
 * `cover` — նկարը լրիվ լցնում է block-ը; մուգ ֆոնը երևում է միայն եթե URL-ը բացակայի։
 */
export function getModelingHipHopCardBackgroundStyle(
  imageUrl: string,
  framing?: ImageFraming | null,
): CSSProperties {
  if (framing) {
    return framingToBackgroundImageStyle(
      imageUrl,
      framing,
      LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED,
    );
  }
  return {
    background: `url("${imageUrl}") ${LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED} center / cover no-repeat`,
  };
}
