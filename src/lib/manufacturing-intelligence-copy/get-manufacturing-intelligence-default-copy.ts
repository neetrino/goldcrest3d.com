import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";

import {
  getManufacturingItemDescriptionKey,
  getManufacturingItemTitleKey,
  MANUFACTURING_SECTION_COPY_KEYS,
} from "./manufacturing-intelligence-copy.keys";

export function getManufacturingIntelligenceDefaultCopyMap(): Map<string, string> {
  const copy = new Map<string, string>();
  copy.set(MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP, "Manufacturing Intelligence");
  copy.set(MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE, "Manufacturing Intelligence");
  copy.set(
    MANUFACTURING_SECTION_COPY_KEYS.IMAGE_ALT,
    "Manufacturing Intelligence section image",
  );

  for (const item of MANUFACTURING_SPECIALIZATION_ITEMS) {
    copy.set(getManufacturingItemTitleKey(item.id), item.title);
    copy.set(getManufacturingItemDescriptionKey(item.id), item.description ?? "");
  }

  return copy;
}
