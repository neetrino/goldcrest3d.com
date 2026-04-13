import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";

type HeroBannerBodyRichTextProps = {
  body: string;
  className?: string;
};

/**
 * Renders admin-authored hero description HTML with the same sanitization used when saving.
 */
export function HeroBannerBodyRichText({ body, className }: HeroBannerBodyRichTextProps) {
  const html = finalizeHeroBannerBodyHtml(body);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
