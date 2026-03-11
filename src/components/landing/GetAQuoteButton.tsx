import { LANDING_SECTION_IDS } from "@/constants";
import Link from "next/link";

/**
 * CTA button "Get a Quote" — Figma node 92:270 / 5:54.
 * White bg, rounded-[35px], 271×56px, text slate-900, font-bold, links to #quote.
 */
export function GetAQuoteButton({
  className,
}: {
  className?: string;
} = {}) {
  return (
    <Link
      href={`#${LANDING_SECTION_IDS.QUOTE}`}
      className={`flex h-14 min-w-[271px] items-center justify-center rounded-[35px] bg-white px-8 py-4 text-base font-bold leading-6 text-[#0f172a] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50 ${className ?? ""}`}
    >
      Get a Quote
    </Link>
  );
}
