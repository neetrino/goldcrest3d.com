import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { parsePowerBannerMobileHeroTextLayout } from "@/lib/power-banner-copy/power-banner-mobile-hero-text-layout";

import {
  POWER_BANNER_DEFAULT_COPY,
  POWER_BANNER_DEFAULT_MOBILE_COPY,
} from "./power-banner-defaults";
import { POWER_BANNER_KEYS, type PowerBannerKey } from "./power-banner-keys";
import type { PowerBannerCopyBundle, PowerBannerCopyEntry } from "./power-banner-copy.types";
import { resolveHeroBannerImageFields } from "./resolve-hero-banner-images";

function defaultEntryForKey(key: PowerBannerKey): PowerBannerCopyEntry {
  const copy = POWER_BANNER_DEFAULT_COPY[key];
  const mobile = POWER_BANNER_DEFAULT_MOBILE_COPY[key];
  const images = resolveHeroBannerImageFields(key, null, null, null, null);
  return {
    ...copy,
    mobileTitle: mobile.title,
    mobileBody: mobile.body,
    heroTextLayoutMobile: null,
    ...images,
  };
}

function emptyBundle(): PowerBannerCopyBundle {
  return {
    MODELING: defaultEntryForKey("MODELING"),
    RENDERING: defaultEntryForKey("RENDERING"),
    DESIGN: defaultEntryForKey("DESIGN"),
  };
}

/**
 * Loads persisted hero copy and merges with defaults for any missing banner row.
 */
export async function getPowerBannerCopyBundle(): Promise<PowerBannerCopyBundle> {
  let rows: {
    bannerKey: string;
    title: string;
    body: string;
    r2ObjectKey: string | null;
    r2ObjectKeyMobile: string | null;
    titleMobile: string | null;
    bodyMobile: string | null;
    heroImageLayout: unknown | null;
    heroImageLayoutMobile: unknown | null;
    heroTextLayoutMobile: unknown | null;
  }[];
  try {
    rows = await prisma.powerBannerCopy.findMany();
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getPowerBannerCopyBundle: migration pending, using defaults");
    } else {
      logger.error("getPowerBannerCopyBundle: unexpected DB error", err);
    }
    return emptyBundle();
  }

  const byKey = new Map(rows.map((r) => [r.bannerKey, r]));
  const out = emptyBundle();
  for (const key of POWER_BANNER_KEYS) {
    const row = byKey.get(key);
    if (row) {
      out[key] = {
        title: row.title,
        body: row.body,
        mobileTitle: row.titleMobile ?? "",
        mobileBody: row.bodyMobile ?? "",
        ...resolveHeroBannerImageFields(
          key,
          row.r2ObjectKey,
          row.r2ObjectKeyMobile,
          row.heroImageLayout,
          row.heroImageLayoutMobile,
        ),
        heroTextLayoutMobile: parsePowerBannerMobileHeroTextLayout(row.heroTextLayoutMobile),
      };
    }
  }
  return out;
}
