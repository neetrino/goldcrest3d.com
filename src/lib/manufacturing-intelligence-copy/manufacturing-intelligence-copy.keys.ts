import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";

export const MANUFACTURING_SECTION_COPY_KEYS = {
  HEADING_DESKTOP: "manufacturing_heading_desktop",
  HEADING_MOBILE: "manufacturing_heading_mobile",
  IMAGE_ALT: "manufacturing_image_alt",
} as const;

export function getManufacturingItemTitleKey(itemId: string): string {
  return `manufacturing_item_title:${itemId}`;
}

export function getManufacturingItemDescriptionKey(itemId: string): string {
  return `manufacturing_item_description:${itemId}`;
}

export const MANUFACTURING_COPY_ALLOWED_KEYS: readonly string[] = [
  MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP,
  MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE,
  MANUFACTURING_SECTION_COPY_KEYS.IMAGE_ALT,
  ...MANUFACTURING_SPECIALIZATION_ITEMS.flatMap((item) => [
    getManufacturingItemTitleKey(item.id),
    getManufacturingItemDescriptionKey(item.id),
  ]),
];

export const MANUFACTURING_COPY_ALLOWED_KEY_SET = new Set<string>(
  MANUFACTURING_COPY_ALLOWED_KEYS,
);
