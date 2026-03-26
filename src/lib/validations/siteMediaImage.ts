/**
 * Admin site media — images only, bounded size (landing hero/gallery).
 */

export const SITE_MEDIA_IMAGE_MAX_BYTES = 15 * 1024 * 1024;

export const SITE_MEDIA_IMAGE_ALLOWED_MIME_TYPES: readonly string[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

const ALLOWED = new Set(SITE_MEDIA_IMAGE_ALLOWED_MIME_TYPES);

export function validateSiteMediaImage(file: File | null | undefined): string | null {
  if (!file || file.size === 0) {
    return "Choose an image file.";
  }
  if (file.size > SITE_MEDIA_IMAGE_MAX_BYTES) {
    return "Image must be 15MB or smaller.";
  }
  const type = (file.type ?? "").toLowerCase();
  if (!ALLOWED.has(type)) {
    return "Only PNG, JPEG, WebP, and GIF images are allowed.";
  }
  return null;
}
