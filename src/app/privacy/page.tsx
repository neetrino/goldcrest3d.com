import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import { LANDING_SECTION_IDS } from "@/constants";
import { privacyPolicyContent } from "@/lib/legal/privacy-policy.content";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

export const metadata: Metadata = {
  title: "Privacy Policy | Goldcrest 3D",
  description: "Privacy Policy for Goldcrest 3D services and website use.",
};

export default async function PrivacyPage() {
  const siteMedia = await getLandingSiteMedia();

  return (
    <>
      <LandingNav useAbsoluteSectionLinks={true} />
      <div className="pt-[length:var(--landing-nav-height)]">
        <LegalDocumentPage content={privacyPolicyContent} />
        <footer id={LANDING_SECTION_IDS.FOOTER}>
          <LandingFooter socialLinks={siteMedia.footerSocialLinks} />
        </footer>
      </div>
    </>
  );
}
