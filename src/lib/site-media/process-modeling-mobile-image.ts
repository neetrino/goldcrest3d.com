import sharp from "sharp";

import {
  MODELING_MOBILE_ASPECT_HEIGHT,
  MODELING_MOBILE_ASPECT_WIDTH,
  MODELING_MOBILE_OUTPUT_MAX_WIDTH_PX,
  MODELING_MOBILE_WEBP_QUALITY,
} from "@/lib/site-media/modeling-mobile-image.constants";

/**
 * Normalizes EXIF orientation, then center-crops and resizes to the modeling mobile
 * frame aspect (360:259) so the file matches how `object-cover` + `object-center` display it.
 */
export async function processModelingMobileImageBuffer(
  input: Buffer,
): Promise<Buffer> {
  const targetHeight = Math.round(
    (MODELING_MOBILE_OUTPUT_MAX_WIDTH_PX * MODELING_MOBILE_ASPECT_HEIGHT) /
      MODELING_MOBILE_ASPECT_WIDTH,
  );

  return sharp(input)
    .rotate()
    .resize(MODELING_MOBILE_OUTPUT_MAX_WIDTH_PX, targetHeight, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality: MODELING_MOBILE_WEBP_QUALITY, effort: 4 })
    .toBuffer();
}
