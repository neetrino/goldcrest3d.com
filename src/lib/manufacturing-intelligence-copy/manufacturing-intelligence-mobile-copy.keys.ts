import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";

export const MANUFACTURING_MOBILE_SECTION_COPY_KEYS = {
  HEADING: "manufacturing_mobile_heading",
  IMAGE_ALT: "manufacturing_mobile_image_alt",
} as const;

export function getManufacturingMobileItemTitleKey(itemId: string): string {
  return `manufacturing_mobile_item_title:${itemId}`;
}

export function getManufacturingMobileItemDescriptionKey(itemId: string): string {
  return `manufacturing_mobile_item_description:${itemId}`;
}

export const MANUFACTURING_MOBILE_COPY_ALLOWED_KEYS: readonly string[] = [
  MANUFACTURING_MOBILE_SECTION_COPY_KEYS.HEADING,
  MANUFACTURING_MOBILE_SECTION_COPY_KEYS.IMAGE_ALT,
  ...MANUFACTURING_SPECIALIZATION_ITEMS.flatMap((item) => [
    getManufacturingMobileItemTitleKey(item.id),
    getManufacturingMobileItemDescriptionKey(item.id),
  ]),
];

export const MANUFACTURING_MOBILE_COPY_ALLOWED_KEY_SET = new Set<string>(
  MANUFACTURING_MOBILE_COPY_ALLOWED_KEYS,
);
