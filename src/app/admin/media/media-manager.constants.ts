/** Accepted MIME types for site media uploads (must stay in sync with server validation). */
export const SITE_MEDIA_ACCEPT = "image/png,image/jpeg,image/webp,image/gif" as const;

/** Human-readable hint for labels and helper text. */
export const SITE_MEDIA_FORMATS_LABEL = "PNG, JPG, WebP";

/** Max upload size shown to admins (must match server limit). */
export const SITE_MEDIA_MAX_SIZE_MB = 15;

/** Max images per ordered gallery row (must match server cap). */
export const ORDERED_GALLERY_MAX_ITEMS = 12;
