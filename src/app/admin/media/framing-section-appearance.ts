import {
  DEFAULT_FRAME_POSITION_LABEL,
  MODELING_DESKTOP_FRAME_POSITION_LABEL,
  MODELING_MOBILE_FRAME_POSITION_LABEL,
  POWER_BANNER_DESKTOP_FRAME_POSITION_LABEL,
  POWER_BANNER_MOBILE_FRAME_POSITION_LABEL,
} from "./image-framing-editor.constants";
import type { ImageFramingTarget } from "./image-framing-target";

export function framingSectionAppearance(target: ImageFramingTarget): {
  title: string;
  cardClass: string;
} {
  if (target.kind === "powerBanner") {
    return target.variant === "mobile"
      ? {
          title: POWER_BANNER_MOBILE_FRAME_POSITION_LABEL,
          cardClass: "border-l-[6px] border-l-indigo-600 bg-indigo-50/60 shadow-sm",
        }
      : {
          title: POWER_BANNER_DESKTOP_FRAME_POSITION_LABEL,
          cardClass: "border-l-[6px] border-l-slate-600 bg-slate-50/95 shadow-sm",
        };
  }

  if (target.kind !== "modeling") {
    return { title: DEFAULT_FRAME_POSITION_LABEL, cardClass: "bg-slate-50/80" };
  }
  return target.variant === "desktop"
    ? {
        title: MODELING_DESKTOP_FRAME_POSITION_LABEL,
        cardClass: "border-l-[6px] border-l-slate-600 bg-slate-50/95 shadow-sm",
      }
    : {
        title: MODELING_MOBILE_FRAME_POSITION_LABEL,
        cardClass: "border-l-[6px] border-l-indigo-600 bg-indigo-50/60 shadow-sm",
      };
}
