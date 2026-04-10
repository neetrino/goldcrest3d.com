import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

export default async function Home() {
  const [siteMedia, powerBannerCopy] = await Promise.all([
    getLandingSiteMedia(),
    getPowerBannerCopyBundle(),
  ]);
  return (
    <>
      <LandingNav />
      <main className="min-h-screen pt-[length:var(--landing-nav-height)]">
        <LandingSections
          siteMedia={siteMedia}
          powerBannerCopy={powerBannerCopy}
        />
      </main>
    </>
  );
}
