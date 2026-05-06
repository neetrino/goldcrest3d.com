import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
import { headers } from "next/headers";

/** CMS-driven media/copy must not be served from stale static shell. */
export const dynamic = "force-dynamic";

function isMobileUserAgent(userAgent: string): boolean {
  return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(userAgent);
}

function isAndroidUserAgent(userAgent: string): boolean {
  return /Android/i.test(userAgent);
}

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const initialIsMobileViewport = isMobileUserAgent(userAgent);
  const isAndroidViewport = isAndroidUserAgent(userAgent);
  const [siteMedia, powerBannerCopy] = await Promise.all([
    getLandingSiteMedia(),
    getPowerBannerCopyBundle(),
  ]);
  return (
    <>
      <LandingNav />
      <LandingSections
        siteMedia={siteMedia}
        powerBannerCopy={powerBannerCopy}
        initialIsMobileViewport={initialIsMobileViewport}
        isAndroidViewport={isAndroidViewport}
      />
    </>
  );
}
