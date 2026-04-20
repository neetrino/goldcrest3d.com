import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";

import {
  getManufacturingMobileItemDescriptionKey,
  getManufacturingMobileItemTitleKey,
  MANUFACTURING_MOBILE_SECTION_COPY_KEYS,
} from "./manufacturing-intelligence-mobile-copy.keys";

export function getManufacturingIntelligenceMobileDefaultCopyMap(): Map<string, string> {
  const copy = new Map<string, string>();
  copy.set(MANUFACTURING_MOBILE_SECTION_COPY_KEYS.HEADING, "Manufacturing Intelligence");
  copy.set(
    MANUFACTURING_MOBILE_SECTION_COPY_KEYS.IMAGE_ALT,
    "Manufacturing Intelligence section image",
  );

  for (const item of MANUFACTURING_SPECIALIZATION_ITEMS) {
    copy.set(getManufacturingMobileItemTitleKey(item.id), item.title);
    copy.set(getManufacturingMobileItemDescriptionKey(item.id), item.description ?? "");
  }

  return copy;
}
