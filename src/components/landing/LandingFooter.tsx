import type { CSSProperties } from "react";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import type { FooterSocialLinks } from "@/lib/footer-social/footer-social.keys";
import { toWhatsAppChatLink } from "@/lib/footer-social/whatsapp";
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
 * Tablet (`md`) gets a small left nudge to match visual alignment.
 */
const FOOTER_LOGO_FRAME_CLASS =
  "relative mt-4 aspect-[299/171] w-full max-w-[299px] shrink-0 overflow-hidden self-start -translate-x-3.5 md:mt-0 md:-translate-x-3 lg:-translate-x-3";

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

/** Contact բլոկի ենթավերնագիրներ (Email, Direct Line, Studio Location) */
const FOOTER_CONTACT_ITEM_LABEL_CLASS =
  "font-sans text-[12px] font-semibold leading-5 text-[#0A0A0A] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:font-[600] md:leading-[18px] md:text-[#0F172A]";

const FOOTER_CONTACT_INTRO_CLASS = "flex flex-col gap-3";

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

/** Logo frame artwork sits low; nudge column up on 3-col layout to align with Contact / Follow. */
const FOOTER_BRAND_COLUMN_CLASS =
  "flex min-w-0 w-full flex-col items-start gap-[10px] lg:max-w-none lg:-translate-y-3";

/** Միայն desktop — email/հեռախոս/տեղ՝ մի քիչ վերև (վերնագիրը՝ Contact — անշարժ) */
const FOOTER_CONTACT_LINES_BLOCK_DESKTOP_NUDGE_UP_CLASS = "lg:-translate-y-1";

const FOOTER_CONTACT_LINES_BLOCK_CLASS = `mt-[40px] flex flex-col gap-[13px] ${FOOTER_CONTACT_LINES_BLOCK_DESKTOP_NUDGE_UP_CLASS}`;

const FOOTER_FOLLOW_SOCIAL_ICONS_ROW_DESKTOP_NUDGE_CLASS = "lg:-translate-y-1";

/** Follow վերնագիր + 3 պատկերակ — մի քիչ աջ (քարտեզը՝ առանց շարժման). Mobile-only left nudge for heading+icons; desktop unchanged. */
const FOOTER_FOLLOW_HEADING_AND_SOCIAL_NUDGE_RIGHT_CLASS =
  "pl-8 sm:pl-9 max-md:-translate-x-7 md:max-lg:-translate-x-9 lg:pl-14 xl:pl-16 2xl:pl-20 lg:translate-x-3";

const FOOTER_FOLLOW_SOCIAL_ICONS_ROW_CLASS = `mt-[35px] flex gap-4 ${FOOTER_FOLLOW_SOCIAL_ICONS_ROW_DESKTOP_NUDGE_CLASS}`;

/** Follow քարտեզ — Figma 685.818px-ից մի քիչ նեղ */
const FOOTER_FOLLOW_MAP_WIDTH_PX = 560;
const FOOTER_FOLLOW_MAP_HEIGHT_PX = 100;

const FOOTER_FOLLOW_MAP_FRAME_DESKTOP_OFFSET_RIGHT_CLASS = "";

const FOOTER_FOLLOW_MAP_CORNER_CLASS = "rounded-3xl";

/**
 * iPad Pro–class widths (≈1024–1380 CSS px): slightly less right nudge so the map sits a bit left.
 * From 1381px: same as before (`translate-x-23`).
 */
const FOOTER_FOLLOW_MAP_INNER_DESKTOP_NUDGE_RIGHT_CLASS =
  "lg:translate-x-16 min-[1381px]:lg:translate-x-23";

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

function FooterPhoneIcon() {
  return (
    <svg
      className="mt-0.5 size-4 shrink-0 text-[#64748B]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function FooterEmailIcon() {
  return (
    <svg
      className="mt-0.5 size-4 shrink-0 text-[#64748B]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

type LandingFooterProps = {
  socialLinks: FooterSocialLinks;
};

type FooterSocialIcon = {
  key: "instagram" | "linkedin" | "behance" | "youtube";
  href: string;
  ariaLabel: string;
  imageId: string;
  imageSrc: string;
};

function isNonEmptyLink(value: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getFooterSocialIcons(links: FooterSocialLinks): FooterSocialIcon[] {
  const icons: FooterSocialIcon[] = [];
  if (isNonEmptyLink(links.instagram)) {
    icons.push({
      key: "instagram",
      href: links.instagram,
      ariaLabel: "Instagram",
      imageId: LANDING_IMAGE_IDS.FOOTER_SOCIAL_1,
      imageSrc: LANDING_IMAGES.social1,
    });
  }
  if (isNonEmptyLink(links.linkedin)) {
    icons.push({
      key: "linkedin",
      href: links.linkedin,
      ariaLabel: "LinkedIn",
      imageId: LANDING_IMAGE_IDS.FOOTER_SOCIAL_2,
      imageSrc: LANDING_IMAGES.social2,
    });
  }
  if (isNonEmptyLink(links.behance)) {
    icons.push({
      key: "behance",
      href: links.behance,
      ariaLabel: "Behance",
      imageId: LANDING_IMAGE_IDS.FOOTER_SOCIAL_3,
      imageSrc: LANDING_IMAGES.social3,
    });
  }
  if (isNonEmptyLink(links.youtube)) {
    icons.push({
      key: "youtube",
      href: links.youtube,
      ariaLabel: "YouTube",
      imageId: LANDING_IMAGE_IDS.FOOTER_SOCIAL_4,
      imageSrc: LANDING_IMAGES.social4,
    });
  }
  return icons;
}

export function LandingFooter({ socialLinks }: LandingFooterProps) {
  const socialIcons = getFooterSocialIcons(socialLinks);
  const whatsappPhone = socialLinks.whatsappPhone?.trim() ?? "";
  const whatsappLink = toWhatsAppChatLink(whatsappPhone);
  const hasWhatsappPhone = whatsappPhone.length > 0 && whatsappLink !== null;

  return (
    <footer
      className={`-mt-8 overflow-x-clip border-t border-[#e2e8f0] bg-[#f8f7f6] ${FOOTER_OUTER_PADDING_CLASS}`}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className={FOOTER_GRID_CLASS}>
          <div className={FOOTER_BRAND_COLUMN_CLASS}>
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
            <div className={`${FOOTER_CONTACT_INTRO_CLASS} w-full max-w-[min(100%,384px)]`}>
              <p className={FOOTER_TAGLINE_CLASS}>
                Production-focused collaborations and custom engineering
                inquiries are welcomed.
              </p>
              <p className={FOOTER_TAGLINE_CLASS}>
                For project evaluation and technical consultation, contact
                directly:
              </p>
            </div>
          </div>
          <div
            className={`${FOOTER_GRID_CONTACT_AND_FOLLOW_COLUMN_CLASS} flex flex-col`}
          >
            <h3 className={FOOTER_CONTACT_HEADING_CLASS}>Contact</h3>
            <div className={FOOTER_CONTACT_LINES_BLOCK_CLASS}>
              <div className={FOOTER_LOCATION_ROW_CLASS}>
                <FooterEmailIcon />
                <p
                  className={`${FOOTER_CONTACT_LINE_CLASS} min-w-0 break-all md:max-w-none`}
                >
                  <span className={FOOTER_CONTACT_ITEM_LABEL_CLASS}>Email: </span>
                  <a
                    href="mailto:info@goldcrest3d.com"
                    className="text-inherit transition-colors hover:text-[var(--foreground)]"
                  >
                    info@goldcrest3d.com
                  </a>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className={FOOTER_LOCATION_ROW_CLASS}>
                  <FooterPhoneIcon />
                  <p className={FOOTER_CONTACT_ITEM_LABEL_CLASS}>
                    Direct Line / WhatsApp
                  </p>
                </div>
                {hasWhatsappPhone ? (
                  <p className={`${FOOTER_CONTACT_LINE_CLASS} md:max-w-none`}>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[var(--foreground)]"
                    >
                      {whatsappPhone}
                    </a>
                  </p>
                ) : null}
              </div>
              <div className={FOOTER_CONTACT_LOCATION_BLOCK_CLASS}>
                <div className="flex flex-col gap-1">
                  <div className={FOOTER_LOCATION_ROW_CLASS}>
                    <FooterLocationIcon />
                    <p className={FOOTER_CONTACT_ITEM_LABEL_CLASS}>
                      Studio Location
                    </p>
                  </div>
                  <p className={FOOTER_CONTACT_LINE_CLASS}>
                    10/6 Gai Ave, Yerevan, Armenia
                  </p>
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
              {socialIcons.length > 0 ? (
                <div className={FOOTER_FOLLOW_SOCIAL_ICONS_ROW_CLASS}>
                  {socialIcons.map((icon) => (
                    <a
                      key={icon.key}
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                      aria-label={icon.ariaLabel}
                      data-landing-image={icon.imageId}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Follow icons are SVG from Figma */}
                      <img
                        src={icon.imageSrc}
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
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
            © {FOOTER_COPYRIGHT_YEAR} GOLDCREST STUDIO.
          </p>
          <p className={FOOTER_COPYRIGHT_DESKTOP_CLASS}>
            © {FOOTER_COPYRIGHT_YEAR} GOLDCREST STUDIO.
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
