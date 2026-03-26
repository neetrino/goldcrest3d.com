import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import Link from "next/link";

/** Mobile: Inter 14/20, 324px. Desktop: SF Compact 16/24, weight 350, 384px. */
const FOOTER_TAGLINE_CLASS =
  "w-full max-w-[324px] font-sans text-sm font-light leading-5 tracking-[-0.15px] text-[#4A5565] md:max-w-[384px] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-base md:font-[350] md:leading-6 md:tracking-normal md:text-[rgba(24,22,16,0.6)]";

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

export function LandingFooter() {
  return (
    <footer
      className="-mt-8 border-t border-[#e2e8f0] bg-[#f8f7f6] px-4 py-16 md:mt-0 md:px-[5.05%] md:pr-[8.23%]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
          <div className="flex max-w-[384px] flex-col gap-[10px]">
            <div
              className="relative mt-4 h-[110px] w-[187px] overflow-hidden md:mt-0 md:h-[63px] md:w-[111px] md:overflow-visible"
              data-landing-image={LANDING_IMAGE_IDS.FOOTER_LOGO}
            >
              <Image
                src={LANDING_IMAGES.footerLogo}
                alt="Goldcrest 3D"
                fill
                className="object-contain object-left md:object-contain md:object-left max-md:object-cover max-md:object-[-41.5px_-92px]"
                sizes="(max-width: 767px) 187px, 111px"
                unoptimized
              />
            </div>
            <p className={FOOTER_TAGLINE_CLASS}>
              Specialized in precision jewelry CAD and structural engineering for high-end manufacturing.
            </p>
          </div>
          <div>
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
          <div>
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
                <Image
                  src={LANDING_IMAGES.social1}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
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
                <Image
                  src={LANDING_IMAGES.social2}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                aria-label="YouTube"
                data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_3}
              >
                <Image
                  src={LANDING_IMAGES.social3}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
                />
              </a>
            </div>
            <div
              className="mt-4 h-24 w-full overflow-hidden rounded-lg bg-slate-200 grayscale opacity-50"
              data-landing-image={LANDING_IMAGE_IDS.FOOTER_FOLLOW_IMAGE}
            >
              <Image
                src={LANDING_IMAGES.footerFollowImage}
                alt=""
                width={368}
                height={96}
                className="h-full w-full object-cover"
                style={{ height: "auto" }}
                loading="eager"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="mt-0 flex flex-col gap-4 border-t border-[#e2e8f0] pt-10 md:flex-row md:items-center md:justify-between">
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
