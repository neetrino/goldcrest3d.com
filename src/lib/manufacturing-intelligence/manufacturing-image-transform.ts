export type ManufacturingImageTransform = {
  zoom: number;
  offsetX: number;
  offsetY: number;
};

export type ManufacturingImageFrameSize = {
  frameWidthPx?: number;
  frameHeightPx?: number;
};

type NumericRange = {
  min: number;
  max: number;
};

const ZOOM_RANGE: NumericRange = { min: 0.5, max: 2.5 };
const OFFSET_RANGE: NumericRange = { min: -400, max: 400 };
export const MANUFACTURING_TRANSFORM_BASE_FRAME_WIDTH_PX = 420;
export const MANUFACTURING_TRANSFORM_BASE_FRAME_HEIGHT_PX = 350;

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
  frameSize?: ManufacturingImageFrameSize,
): string {
  const normalized = normalizeManufacturingImageTransform(transform);
  const widthRatio = resolveAxisRatio(
    frameSize?.frameWidthPx,
    MANUFACTURING_TRANSFORM_BASE_FRAME_WIDTH_PX,
  );
  const heightRatio = resolveAxisRatio(
    frameSize?.frameHeightPx,
    MANUFACTURING_TRANSFORM_BASE_FRAME_HEIGHT_PX,
  );
  const relativeOffsetX = normalized.offsetX * widthRatio;
  const relativeOffsetY = normalized.offsetY * heightRatio;
  return `translate3d(${relativeOffsetX}px, ${relativeOffsetY}px, 0) scale(${normalized.zoom})`;
}

function resolveAxisRatio(currentAxisPx: number | undefined, baselineAxisPx: number): number {
  if (!currentAxisPx || !Number.isFinite(currentAxisPx) || currentAxisPx <= 0) {
    return 1;
  }
  return currentAxisPx / baselineAxisPx;
}
