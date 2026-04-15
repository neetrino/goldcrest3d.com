import type { ManufacturingSpecializationId } from "@/constants/manufacturing-specialization";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";

export type ImageFramingTarget =
  | { kind: "gallery"; itemId: string }
  | { kind: "modeling"; slotId: string; variant: "desktop" | "mobile" }
  | { kind: "powerBanner"; bannerKey: PowerBannerKey }
  | { kind: "manufacturingItem"; itemKey: ManufacturingSpecializationId }
  | { kind: "founder" };
