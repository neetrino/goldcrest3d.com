import type { CSSProperties } from "react";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
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

/** Միայն desktop — լոգոն մի քիչ դեպի ձախ */
const FOOTER_LOGO_DESKTOP_NUDGE_LEFT_CLASS = "md:-translate-x-24";

/**
 * Լոգոյի ֆրեյմ — Figma 92:248 299×171, միշտ նույն aspect (գեղեցիկ և մոբայլ, և դեսքտոփ).
 */
const FOOTER_LOGO_FRAME_CLASS =
  "relative mt-4 aspect-[299/171] w-full max-w-[299px] shrink-0 overflow-hidden self-start md:mt-0 " +
  FOOTER_LOGO_DESKTOP_NUDGE_LEFT_CLASS;

/** Figma-ի ներքին overflow-շերտ — նկարը կտրվում է ֆրեյմի մեջ */
const FOOTER_LOGO_INNER_CLIP_CLASS =
  "pointer-events-none absolute inset-0 overflow-hidden";

/**
 * Desktop — width 384px, SF Compact, rgba(24,22,16,0.6); տառ՝ մի քիչ փոքր Figma 16px-ից։
 * Մոբայլ՝ Inter, նույնպես մի փոքր փոքրացված։
 */
const FOOTER_TAGLINE_DESKTOP_NUDGE_LEFT_CLASS = "md:-translate-x-24";

const FOOTER_TAGLINE_CLASS =
  "w-full max-w-[324px] font-sans text-[13px] font-light not-italic leading-5 tracking-[-0.15px] text-[#4A5565] " +
  "md:w-[384px] md:max-w-[384px] md:shrink-0 md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[15px] md:font-[350] md:not-italic md:leading-[22px] md:tracking-normal md:text-[rgba(24,22,16,0.6)] " +
  FOOTER_TAGLINE_DESKTOP_NUDGE_LEFT_CLASS;

const FOOTER_CONTACT_HEADING_CLASS =
  "font-sans text-xs font-bold uppercase leading-4 tracking-[0.6px] text-[#0A0A0A] md:max-w-[87.152px] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:font-[790] md:tracking-[1.2px] md:text-[#0F172A]";

const FOOTER_CONTACT_LINE_CLASS =
  "font-sans text-sm font-normal leading-5 tracking-[-0.15px] text-[#4A5565] transition-colors hover:text-[var(--foreground)] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:font-[457] md:text-[#64748B] md:tracking-normal";

const FOOTER_CONTACT_LOCATION_BLOCK_CLASS =
  "flex flex-col gap-[13px] self-start md:self-stretch";

/** Mobile only: Inter 12/16, 296px, #99A1AF. Desktop uses separate line below. */
const FOOTER_COPYRIGHT_MOBILE_CLASS =
  "md:hidden w-[296px] font-sans text-xs font-normal leading-4 tracking-[0.6px] text-[#99A1AF] uppercase";

/** Desktop: SF Compact 10/15, weight 790, 435.762px — DS Studio line. */
const FOOTER_COPYRIGHT_DESKTOP_CLASS =
  "hidden md:block md:w-[435.762px] md:shrink-0 md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[10px] md:font-[790] md:leading-[15px] md:tracking-[1px] md:text-[#94A3B8] md:uppercase";

/** Mobile: Inter 12/16, #99A1AF. Desktop: SF Compact — widths on Privacy / Terms. */
const FOOTER_LEGAL_LINK_MOBILE_CLASS =
  "font-sans text-xs font-normal leading-4 tracking-[0.6px] text-[#99A1AF] uppercase transition-colors hover:text-[var(--foreground)]";

const FOOTER_LEGAL_LINK_DESKTOP_SHARED_CLASS =
  "md:shrink-0 md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[10px] md:font-[790] md:leading-[15px] md:tracking-[1px] md:text-[#94A3B8] md:uppercase";

const FOOTER_PRIVACY_LINK_CLASS = `${FOOTER_LEGAL_LINK_MOBILE_CLASS} ${FOOTER_LEGAL_LINK_DESKTOP_SHARED_CLASS} md:w-[127.477px]`;

const FOOTER_TERMS_LINK_CLASS = `${FOOTER_LEGAL_LINK_MOBILE_CLASS} ${FOOTER_LEGAL_LINK_DESKTOP_SHARED_CLASS} md:w-[145.688px]`;

/** Follow սյուն — Figma լայնություն 685.818px (գրիդի երրորդ տողը) */
const FOOTER_GRID_DESKTOP_CLASS =
  "grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,685.818px)] md:gap-12";

/** Քարտեզի ֆրեյմ — բարձրություն 96px, լայնությունը = Follow սյունը */
const FOOTER_FOLLOW_MAP_FRAME_CLASS =
  "relative mt-4 h-[96px] w-full overflow-hidden rounded-lg";

/** Միայն քարտեզի նկարը մի քիչ դեպի աջ (`translate-x` դրական = աջ) */
const FOOTER_FOLLOW_MAP_IMAGE_NUDGE_RIGHT_CLASS = "translate-x-3";

/** Գծի շերտ — լայնությունը footer-ի padding-ի միջև (ոչ թե միայն max-w-7xl) */
const FOOTER_BOTTOM_BORDER_OUTER_CLASS =
  "mt-0 w-full border-t border-[#e2e8f0] pt-10";

const FOOTER_BOTTOM_LEGAL_INNER_CLASS =
  "mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between";

export function LandingFooter() {
  return (
    <footer
      className="-mt-8 border-t border-[#e2e8f0] bg-[#f8f7f6] px-4 py-16 md:mt-0 md:px-[5.05%] md:pr-[8.23%]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className={FOOTER_GRID_DESKTOP_CLASS}>
          <div className="flex min-w-0 w-full max-w-[384px] flex-col items-start gap-[10px]">
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
              Specialized in precision jewelry CAD and structural engineering for high-end manufacturing.
            </p>
          </div>
          <div className="min-w-0">
            <h3 className={FOOTER_CONTACT_HEADING_CLASS}>Contact</h3>
            <div className="mt-[40px] flex flex-col gap-[13px]">
              <a
                href="mailto:hello@ds-jewelry.studio"
                className={`${FOOTER_CONTACT_LINE_CLASS} md:max-w-[206.982px]`}
              >
                hello@ds-jewelry.studio
              </a>
              <a
                href="tel:+15559023481"
                className={`${FOOTER_CONTACT_LINE_CLASS} md:max-w-[162.721px]`}
              >
                +1 (555) 902-3481
              </a>
              <div className={FOOTER_CONTACT_LOCATION_BLOCK_CLASS}>
                <p className={FOOTER_CONTACT_LINE_CLASS}>Yerevan, Armenia</p>
                <p className={FOOTER_CONTACT_LINE_CLASS}>
                  International collaborations available
                </p>
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold leading-[16px] tracking-[1.2px] text-[#0f172a] text-[12px] uppercase">
              Follow
            </h3>
            <div className="mt-[35px] flex gap-4">
              <a
                href="https://instagram.com"
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
            <div
              className={FOOTER_FOLLOW_MAP_FRAME_CLASS}
              data-landing-image={LANDING_IMAGE_IDS.FOOTER_FOLLOW_IMAGE}
            >
              <Image
                src={LANDING_IMAGES.footerFollowImage}
                alt=""
                fill
                className={`object-cover ${FOOTER_FOLLOW_MAP_IMAGE_NUDGE_RIGHT_CLASS}`}
                sizes="(max-width: 768px) 100vw, 686px"
                loading="eager"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
      <div className={FOOTER_BOTTOM_BORDER_OUTER_CLASS}>
        <div className={FOOTER_BOTTOM_LEGAL_INNER_CLASS}>
          <p className={FOOTER_COPYRIGHT_MOBILE_CLASS}>
            © 2024 DS Studio Engineering. All Rights Reserved.
          </p>
          <p className={FOOTER_COPYRIGHT_DESKTOP_CLASS}>
            © 2024 DS Studio Engineering. All Rights Reserved.
          </p>
          <div className="flex gap-8">
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
