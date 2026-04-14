import { ORDERED_MANUFACTURING_SPECIALIZATION_IDS } from "@/constants/manufacturing-specialization";
import type { ManufacturingSpecializationId } from "@/constants/manufacturing-specialization";

export const MANUFACTURING_SPECIALIZATION_ITEM_KEY_SET: ReadonlySet<string> = new Set(
  ORDERED_MANUFACTURING_SPECIALIZATION_IDS,
);

export function parseManufacturingSpecializationItemKey(
  raw: unknown,
): ManufacturingSpecializationId | null {
  if (typeof raw !== "string" || !MANUFACTURING_SPECIALIZATION_ITEM_KEY_SET.has(raw)) {
    return null;
  }
  return raw as ManufacturingSpecializationId;
}
