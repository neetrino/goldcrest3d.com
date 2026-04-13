import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";

/**
 * HTML shown on viewports below `md` for Modeling Specialization cards.
 * When `bodyMobile` is empty, the desktop/tablet `body` is used everywhere.
 */
export function resolveModelingSlotBodyForMobile(entry: ModelingSlotCopyEntry): string {
  const trimmed = entry.bodyMobile.trim();
  return trimmed.length > 0 ? trimmed : entry.body;
}
