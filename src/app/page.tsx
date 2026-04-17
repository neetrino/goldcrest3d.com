import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getManagedHomeBundle } from "@/lib/managed-home/get-managed-home-content";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

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
