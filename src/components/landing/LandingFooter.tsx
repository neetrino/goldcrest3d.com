import type { CSSProperties } from "react";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Link from "next/link";

/** Figma 92:248 — ներքին նկարի տոկոսներ (ֆրեյմը՝ FOOTER_LOGO_FRAME_CLASS) */
const FOOTER_LOGO_FIGMA_IMG_WIDTH_PCT = 149.16;
const FOOTER_LOGO_FIGMA_IMG_HEIGHT_PCT = 260.42;
const FOOTER_LOGO_FIGMA_IMG_LEFT_PCT = -24.58;
const FOOTER_LOGO_FIGMA_IMG_TOP_PCT = -86.25;

const FOOTER_LOGO_FULL_BLEED_STYLE: CSSProperties = {
  position: "absolute",
  maxWidth: "none",
  width: `${FOOTER_LOGO_FIGMA_IMG_WIDTH_PCT}%`,
  height: `${FOOTER_LOGO_FIGMA_IMG_HEIGHT_PCT}%`,
  left: `${FOOTER_LOGO_FIGMA_IMG_LEFT_PCT}%`,
  top: `${FOOTER_LOGO_FIGMA_IMG_TOP_PCT}%`,
};

/**
 * Լոգոյի ֆրեյմ — Figma 92:248 299×171, միշտ նույն aspect (գեղեցիկ և մոբայլ, և դեսքտոփ).
 * No horizontal translate on md (was clipping at viewport edge).
 */
const FOOTER_LOGO_FRAME_CLASS =
  "relative mt-4 aspect-[299/171] w-full max-w-[299px] shrink-0 overflow-hidden self-start -translate-x-3.5 md:mt-0 md:translate-x-0 lg:-translate-x-3";

/** Figma-ի ներքին overflow-շերտ — նկարը կտրվում է ֆրեյմի մեջ */
const FOOTER_LOGO_INNER_CLIP_CLASS =
  "pointer-events-none absolute inset-0 overflow-hidden";

/** SF Compact desktop; fluid max-width — no negative translate (was clipping). */
const FOOTER_TAGLINE_CLASS =
  "w-full min-w-0 max-w-[min(100%,384px)] font-sans text-[13px] font-light not-italic leading-5 tracking-[-0.15px] text-[#4A5565] " +
  "md:shrink-0 md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[15px] md:font-[350] md:not-italic md:leading-[22px] md:tracking-normal md:text-[rgba(24,22,16,0.6)]";

const FOOTER_CONTACT_HEADING_CLASS =
  "font-sans text-[11px] font-bold uppercase leading-[14px] tracking-[0.6px] text-[#0A0A0A] md:max-w-[87.152px] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:font-[790] md:tracking-[1.2px] md:text-[#0F172A]";

const FOOTER_CONTACT_LINE_CLASS =
  "font-sans text-[13px] font-normal leading-5 tracking-[-0.15px] text-[#4A5565] transition-colors hover:text-[var(--foreground)] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[12px] md:font-[457] md:leading-[18px] md:text-[#64748B] md:tracking-normal";

/** Follow վերնագիր — նույն սանդղակով մի քիչ փոքր, ինչ Contact */
const FOOTER_FOLLOW_HEADING_CLASS =
  "font-bold text-[11px] uppercase leading-[15px] tracking-[1.2px] text-[#0f172a]";

const FOOTER_CONTACT_LOCATION_BLOCK_CLASS =
  "flex flex-col gap-[13px] self-start md:self-stretch";

/** Mobile only: Inter 12/16, #99A1AF; centered with legal row, left on md+. */
const FOOTER_COPYRIGHT_MOBILE_CLASS =
  "md:hidden w-full min-w-0 font-sans text-xs font-normal leading-4 tracking-[0.6px] text-[#99A1AF] uppercase";

/** Desktop: SF Compact — fluid width (no fixed px) to avoid clipping. */
const FOOTER_COPYRIGHT_DESKTOP_CLASS =
  "hidden min-w-0 md:block md:max-w-[min(100%,28rem)] md:shrink md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[10px] md:font-[790] md:leading-[15px] md:tracking-[1px] md:text-[#94A3B8] md:uppercase";

/** Mobile: Inter 12/16, #99A1AF. Desktop: SF Compact — widths on Privacy / Terms. */
const FOOTER_LEGAL_LINK_MOBILE_CLASS =
  "font-sans text-xs font-normal leading-4 tracking-[0.6px] text-[#99A1AF] uppercase transition-colors hover:text-[var(--foreground)]";

const FOOTER_LEGAL_LINK_DESKTOP_SHARED_CLASS =
  "md:shrink-0 md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[10px] md:font-[790] md:leading-[15px] md:tracking-[1px] md:text-[#94A3B8] md:uppercase";

const FOOTER_PRIVACY_LINK_CLASS = `${FOOTER_LEGAL_LINK_MOBILE_CLASS} ${FOOTER_LEGAL_LINK_DESKTOP_SHARED_CLASS} md:min-w-0`;

const FOOTER_TERMS_LINK_CLASS = `${FOOTER_LEGAL_LINK_MOBILE_CLASS} ${FOOTER_LEGAL_LINK_DESKTOP_SHARED_CLASS} md:min-w-0`;

const FOOTER_LEGAL_LINKS_ROW_CLASS =
  "flex flex-wrap items-center justify-center gap-8 md:justify-end";

/** Stack (mobile/tablet) → 3 columns from lg (matches Figma desktop). */
const FOOTER_GRID_CLASS =
  "grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 xl:gap-x-12";

/** Horizontal page padding — ~5–8% on large screens like design. */
const FOOTER_OUTER_PADDING_CLASS =
  "px-4 py-12 sm:px-6 sm:py-14 md:mt-0 md:py-16 md:px-[5%] lg:px-[6%] xl:px-[7%]";

const FOOTER_GRID_CONTACT_AND_FOLLOW_COLUMN_CLASS = "min-w-0";

/** Միայն desktop — email/հեռախոս/տեղ՝ մի քիչ վերև (վերնագիրը՝ Contact — անշարժ) */
const FOOTER_CONTACT_LINES_BLOCK_DESKTOP_NUDGE_UP_CLASS = "lg:-translate-y-1";

const FOOTER_CONTACT_LINES_BLOCK_CLASS = `mt-[40px] flex flex-col gap-[13px] ${FOOTER_CONTACT_LINES_BLOCK_DESKTOP_NUDGE_UP_CLASS}`;

const FOOTER_FOLLOW_SOCIAL_ICONS_ROW_DESKTOP_NUDGE_CLASS = "lg:-translate-y-1";

/** Follow վերնագիր + 3 պատկերակ — մի քիչ աջ (քարտեզը՝ առանց շարժման) */
const FOOTER_FOLLOW_HEADING_AND_SOCIAL_NUDGE_RIGHT_CLASS =
  "pl-8 sm:pl-9 lg:pl-14 xl:pl-16 2xl:pl-20 lg:translate-x-3";

const FOOTER_FOLLOW_SOCIAL_ICONS_ROW_CLASS = `mt-[35px] flex gap-4 ${FOOTER_FOLLOW_SOCIAL_ICONS_ROW_DESKTOP_NUDGE_CLASS}`;

/** Follow քարտեզ — Figma 685.818px-ից մի քիչ նեղ */
const FOOTER_FOLLOW_MAP_WIDTH_PX = 560;
const FOOTER_FOLLOW_MAP_HEIGHT_PX = 100;

const FOOTER_FOLLOW_MAP_FRAME_DESKTOP_OFFSET_RIGHT_CLASS = "";

const FOOTER_FOLLOW_MAP_CORNER_CLASS = "rounded-3xl";

const FOOTER_FOLLOW_MAP_INNER_DESKTOP_NUDGE_RIGHT_CLASS = "lg:translate-x-23";

const FOOTER_FOLLOW_MAP_INNER_DESKTOP_NUDGE_UP_CLASS = "lg:-translate-y-2";

/** Ներքին ֆրեյմ — overflow + radius; չափերը՝ FOOTER_FOLLOW_MAP_BANNER_LAYOUT_STYLE */
const FOOTER_FOLLOW_MAP_INNER_FRAME_CLASS = `mt-4 w-full md:w-[79%] min-w-0 overflow-hidden ${FOOTER_FOLLOW_MAP_CORNER_CLASS} md:shrink-0 ${FOOTER_FOLLOW_MAP_INNER_DESKTOP_NUDGE_RIGHT_CLASS} ${FOOTER_FOLLOW_MAP_INNER_DESKTOP_NUDGE_UP_CLASS}`;

const FOOTER_FOLLOW_MAP_OUTER_WRAPPER_CLASS = `w-full ${FOOTER_FOLLOW_MAP_FRAME_DESKTOP_OFFSET_RIGHT_CLASS}`;
const FOOTER_FOLLOW_MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Gai+Avenue+10%2F6%2C+Yerevan";

/**
 * Design reference 110:389 — `background: url(...) lightgray 50% / cover no-repeat`
 */
const FOOTER_FOLLOW_MAP_BANNER_STYLE: CSSProperties = {
  background: `lightgray url("${LANDING_IMAGES.footerFollowImage}") 50% / cover no-repeat`,
};

/** Նույն Figma չափեր՝ inline (Tailwind-ը չի սկանավորում փոփոխական arbitrary class-ները) */
const FOOTER_FOLLOW_MAP_BANNER_LAYOUT_STYLE: CSSProperties = {
  height: FOOTER_FOLLOW_MAP_HEIGHT_PX,
  maxWidth: `${FOOTER_FOLLOW_MAP_WIDTH_PX}px`,
};

const FOOTER_FOLLOW_MAP_BANNER_COMBINED_STYLE: CSSProperties = {
  ...FOOTER_FOLLOW_MAP_BANNER_STYLE,
  ...FOOTER_FOLLOW_MAP_BANNER_LAYOUT_STYLE,
};

/** Գծի շերտ — վերևից բացակ (քարտեզը չի կպնում border-ին), լայնությունը padding-ի միջև */
const FOOTER_BOTTOM_BORDER_OUTER_TOP_SPACING_CLASS = "mt-8 md:mt-10";

const FOOTER_BOTTOM_BORDER_OUTER_CLASS = `${FOOTER_BOTTOM_BORDER_OUTER_TOP_SPACING_CLASS} w-full border-t border-[#e2e8f0] pt-10`;

const FOOTER_BOTTOM_LEGAL_INNER_CLASS =
  "mx-auto flex w-full min-w-0 max-w-7xl flex-col items-center gap-5 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left";

const FOOTER_LOCATION_ROW_CLASS = "flex items-start gap-2";

const FOOTER_COPYRIGHT_YEAR = new Date().getFullYear();

function FooterLocationIcon() {
  return (
    <svg
      className="mt-0.5 size-4 shrink-0 text-[#64748B]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s2.5-1.12 2.5-2.5z" />
    </svg>
  );
}

export function LandingFooter() {
  return (
    <footer
      className={`-mt-8 overflow-x-clip border-t border-[#e2e8f0] bg-[#f8f7f6] ${FOOTER_OUTER_PADDING_CLASS}`}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className={FOOTER_GRID_CLASS}>
          <div className="flex min-w-0 w-full flex-col items-start gap-[10px] lg:max-w-none">
            <div
              className={FOOTER_LOGO_FRAME_CLASS}
              data-landing-image={LANDING_IMAGE_IDS.FOOTER_LOGO}
            >
              <div className={FOOTER_LOGO_INNER_CLIP_CLASS}>
                {/* eslint-disable-next-line @next/next/no-img-element -- Figma percent box; next/image fill fights absolute sizing */}
                <img
                  src={LANDING_IMAGES.footerLogo}
                  alt="Goldcrest 3D"
                  style={FOOTER_LOGO_FULL_BLEED_STYLE}
                  decoding="async"
                />
              </div>
            </div>
            <p className={FOOTER_TAGLINE_CLASS}>
              Professional Jewelry 3D Modeling Studio
            </p>
          </div>
          <div
            className={`${FOOTER_GRID_CONTACT_AND_FOLLOW_COLUMN_CLASS} flex flex-col`}
          >
            <h3 className={FOOTER_CONTACT_HEADING_CLASS}>Contact</h3>
            <div className={FOOTER_CONTACT_LINES_BLOCK_CLASS}>
              <a
                href="mailto:hello@ds-jewelry.studio"
                className={`${FOOTER_CONTACT_LINE_CLASS} break-all md:max-w-none`}
              >
                info@goldcrest3d.com
              </a>
              <a
                href="tel:+15559023481"
                className={`${FOOTER_CONTACT_LINE_CLASS} md:max-w-none`}
              >
                +374 (41) 141 - 110
              </a>
              <div className={FOOTER_CONTACT_LOCATION_BLOCK_CLASS}>
                <div className={FOOTER_LOCATION_ROW_CLASS}>
                  <FooterLocationIcon />
                  <p className={FOOTER_CONTACT_LINE_CLASS}>10/6 Gai Ave, Yerevan</p>
                </div>
                <p className={FOOTER_CONTACT_LINE_CLASS}>
                  International collaborations available
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${FOOTER_GRID_CONTACT_AND_FOLLOW_COLUMN_CLASS} flex flex-col`}
          >
            <div className={FOOTER_FOLLOW_HEADING_AND_SOCIAL_NUDGE_RIGHT_CLASS}>
              <h3 className={FOOTER_FOLLOW_HEADING_CLASS}>Follow</h3>
              <div className={FOOTER_FOLLOW_SOCIAL_ICONS_ROW_CLASS}>
                <a
                  href="https://www.instagram.com/goldcrest3d?igsh=NXQ3MXk4N2xsYWRm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                  aria-label="Instagram"
                  data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_1}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- Follow icons are SVG from Figma */}
                  <img
                    src={LANDING_IMAGES.social1}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                  aria-label="LinkedIn"
                  data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_2}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={LANDING_IMAGES.social2}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </a>
                <a
                  href="https://www.behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                  aria-label="Behance"
                  data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_3}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={LANDING_IMAGES.social3}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </a>
              </div>
            </div>
            <div className={FOOTER_FOLLOW_MAP_OUTER_WRAPPER_CLASS}>
              <a
                href={FOOTER_FOLLOW_MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Gai avenue 10/6, Yerevan on Google Maps"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A] focus-visible:ring-offset-2"
              >
                <div
                  className={FOOTER_FOLLOW_MAP_INNER_FRAME_CLASS}
                  style={FOOTER_FOLLOW_MAP_BANNER_COMBINED_STYLE}
                  data-landing-image={LANDING_IMAGE_IDS.FOOTER_FOLLOW_IMAGE}
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={FOOTER_BOTTOM_BORDER_OUTER_CLASS}>
        <div className={FOOTER_BOTTOM_LEGAL_INNER_CLASS}>
          <p className={FOOTER_COPYRIGHT_MOBILE_CLASS}>
            © {FOOTER_COPYRIGHT_YEAR} DS Studio Engineering. All Rights Reserved.
          </p>
          <p className={FOOTER_COPYRIGHT_DESKTOP_CLASS}>
            © {FOOTER_COPYRIGHT_YEAR} DS Studio Engineering. All Rights Reserved.
          </p>
          <div className={FOOTER_LEGAL_LINKS_ROW_CLASS}>
            <Link href="/privacy" className={FOOTER_PRIVACY_LINK_CLASS}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={FOOTER_TERMS_LINK_CLASS}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
