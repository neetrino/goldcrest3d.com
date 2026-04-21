import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import { LANDING_SECTION_IDS } from "@/constants";
import { termsOfServiceContent } from "@/lib/legal/terms-of-service.content";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

export const metadata: Metadata = {
  title: "Terms of Service | Goldcrest 3D",
  description: "Terms of Service for Goldcrest 3D website and project delivery.",
};

export default async function TermsPage() {
  const siteMedia = await getLandingSiteMedia();

  return (
    <>
      <LandingNav useAbsoluteSectionLinks={true} />
      <div className="pt-[length:var(--landing-nav-height)]">
        <LegalDocumentPage content={termsOfServiceContent} />
        <footer id={LANDING_SECTION_IDS.FOOTER}>
          <LandingFooter socialLinks={siteMedia.footerSocialLinks} />
        </footer>
      </div>
    </>
  );
}
