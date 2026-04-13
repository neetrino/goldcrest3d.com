/**
 * Returns true when copy should be rendered as sanitized HTML (TinyMCE / rich output).
 * Plain-text rows without markup continue to use legacy line-splitting helpers.
 */
export function looksLikeHeroBannerRichBody(value: string): boolean {
  const t = value.trim();
  if (t.length === 0) return false;
  if (/<\s*(p|div|ul|ol|h[1-6]|br\s*\/?)/i.test(t)) return true;
  if (/<\s*(strong|em|b|i|u|span)[^>]*>/i.test(t)) return true;
  return false;
}
