/** Accepted MIME types for site media uploads (must stay in sync with server validation). */
export const SITE_MEDIA_ACCEPT = "image/png,image/jpeg,image/webp,image/gif" as const;

/** Human-readable hint for labels and helper text. */
export const SITE_MEDIA_FORMATS_LABEL = "PNG, JPG, WebP";

/** Max upload size shown to admins (must match server limit). */
export const SITE_MEDIA_MAX_SIZE_MB = 15;

/** Max images per ordered gallery row (must match server cap). */
export const ORDERED_GALLERY_MAX_ITEMS = 12;

/**
 * Admin preview for Manufacturing Intelligence detail images: same aspect and max width as the
 * public `.manufacturing-intelligence-image-frame` column (see `globals-manufacturing.css`, lg: 732px).
 */
export const MANUFACTURING_DETAIL_ADMIN_FRAME_MAX_CLASS = "max-w-[732px]";

/**
 * Full class string for the bounded image viewport (6:5, matches homepage frame proportions).
 */
export const MANUFACTURING_DETAIL_ADMIN_IMAGE_FRAME_CLASS = `relative mx-auto aspect-[750/625] w-full ${MANUFACTURING_DETAIL_ADMIN_FRAME_MAX_CLASS} min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100`;

/** `next/image` sizes hint for bounded manufacturing detail previews (matches frame max width). */
export const MANUFACTURING_DETAIL_ADMIN_IMAGE_SIZES =
  "(max-width: 1024px) 100vw, 732px" as const;
