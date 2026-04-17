import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getManagedHomeBundle } from "@/lib/managed-home/get-managed-home-content";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

/** Homepage copy comes from DB — avoid serving a stale cached RSC shell after CMS saves. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const [siteMedia, powerBannerCopy, managedHome] = await Promise.all([
    getLandingSiteMedia(),
    getPowerBannerCopyBundle(),
    getManagedHomeBundle(),
  ]);
  return (
    <>
      <LandingNav />
      <main className="min-h-screen pt-[length:var(--landing-nav-height)]">
        <LandingSections
          siteMedia={siteMedia}
          powerBannerCopy={powerBannerCopy}
          managedHome={managedHome}
        />
      </main>
    </>
  );
}
