import { LANDING_SECTION_IDS } from "@/constants";
import Link from "next/link";

/**
 * CTA button "Get a Quote" — Figma node 92:270 / 5:54.
 * variant "default": white bg, text slate-900.
 * variant "gold": hero style — golden gradient, white text, pill shape (matches reference).
 */
export const HERO_GET_QUOTE_BUTTON_ID = "hero-get-quote";

/** Section 2 (Jewelry Rendering slide) — առանձին id CTA-ի համար */
export const HERO_SECTION2_GET_QUOTE_BUTTON_ID = "hero-section2-get-quote";

export function GetAQuoteButton({
  id,
  className,
  variant = "default",
}: {
  id?: string;
  className?: string;
  variant?: "default" | "gold";
} = {}) {
  const isGold = variant === "gold";
  return (
    <Link
      id={id}
      href={`#${LANDING_SECTION_IDS.QUOTE}`}
      className={
        isGold
          ? `flex h-12 min-w-[200px] items-center justify-center rounded-[26px] px-7 py-3 text-base font-medium leading-5 text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50 nav-cta-gradient ${className ?? ""}`
          : `flex h-14 min-w-[271px] items-center justify-center rounded-[35px] bg-white px-8 py-4 text-base font-bold leading-6 text-[#0f172a] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50 ${className ?? ""}`
      }
    >
      Get a Quote
    </Link>
  );
}
