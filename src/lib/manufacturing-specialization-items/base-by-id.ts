import {
  MANUFACTURING_SPECIALIZATION_ITEMS,
  type ManufacturingSpecializationId,
  type ManufacturingSpecializationItem,
} from "@/constants/manufacturing-specialization";

export function baseById(id: ManufacturingSpecializationId): ManufacturingSpecializationItem {
  const base = MANUFACTURING_SPECIALIZATION_ITEMS.find((i) => i.id === id);
  if (!base) {
    throw new Error(`Missing manufacturing specialization base for ${id}`);
  }
  return base;
}
