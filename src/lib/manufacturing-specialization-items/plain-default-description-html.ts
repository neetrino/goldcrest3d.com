import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";

/**
 * Converts legacy plain accordion text (possibly with `\n`) into hero-safe HTML for editors and merged display.
 */
export function plainManufacturingDescriptionToHtml(plain: string | undefined): string {
  const t = plain?.trim() ?? "";
  if (!t) {
    return "";
  }
  return finalizeHeroBannerBodyHtml(`<p>${t.replace(/\n/g, "<br />")}</p>`);
}
