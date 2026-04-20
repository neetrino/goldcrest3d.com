export type ManufacturingImageTransform = {
  zoom: number;
  offsetX: number;
  offsetY: number;
};

type NumericRange = {
  min: number;
  max: number;
};

const ZOOM_RANGE: NumericRange = { min: 0.5, max: 2.5 };
const OFFSET_RANGE: NumericRange = { min: -400, max: 400 };

export const DEFAULT_MANUFACTURING_IMAGE_TRANSFORM: ManufacturingImageTransform = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
};

function clamp(value: number, range: NumericRange): number {
  if (Number.isNaN(value)) return range.min;
  if (value < range.min) return range.min;
  if (value > range.max) return range.max;
  return value;
}

function toSafeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  return null;
}

export function normalizeManufacturingImageTransform(
  value: Partial<ManufacturingImageTransform>,
): ManufacturingImageTransform {
  return {
    zoom: clamp(value.zoom ?? DEFAULT_MANUFACTURING_IMAGE_TRANSFORM.zoom, ZOOM_RANGE),
    offsetX: clamp(value.offsetX ?? DEFAULT_MANUFACTURING_IMAGE_TRANSFORM.offsetX, OFFSET_RANGE),
    offsetY: clamp(value.offsetY ?? DEFAULT_MANUFACTURING_IMAGE_TRANSFORM.offsetY, OFFSET_RANGE),
  };
}

export function parseManufacturingImageTransformFromLayoutMeta(
  layoutMeta: unknown,
): ManufacturingImageTransform {
  if (!layoutMeta || typeof layoutMeta !== "object") {
    return DEFAULT_MANUFACTURING_IMAGE_TRANSFORM;
  }
  const meta = layoutMeta as Record<string, unknown>;
  return normalizeManufacturingImageTransform({
    zoom: toSafeNumber(meta.zoom) ?? undefined,
    offsetX: toSafeNumber(meta.offsetX) ?? undefined,
    offsetY: toSafeNumber(meta.offsetY) ?? undefined,
  });
}

export function getManufacturingImageTransformCssValue(
  transform: ManufacturingImageTransform,
): string {
  const normalized = normalizeManufacturingImageTransform(transform);
  return `translate3d(${normalized.offsetX}px, ${normalized.offsetY}px, 0) scale(${normalized.zoom})`;
}
