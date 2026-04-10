import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import { POWER_BANNER_DEFAULT_COPY } from "./power-banner-defaults";
import { POWER_BANNER_KEYS } from "./power-banner-keys";
import type { PowerBannerCopyBundle } from "./power-banner-copy.types";

function emptyBundle(): PowerBannerCopyBundle {
  return {
    MODELING: { ...POWER_BANNER_DEFAULT_COPY.MODELING },
    RENDERING: { ...POWER_BANNER_DEFAULT_COPY.RENDERING },
    DESIGN: { ...POWER_BANNER_DEFAULT_COPY.DESIGN },
  };
}

/**
 * Loads persisted hero copy and merges with defaults for any missing banner row.
 */
export async function getPowerBannerCopyBundle(): Promise<PowerBannerCopyBundle> {
  let rows: { bannerKey: string; title: string; body: string }[];
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
      out[key] = { title: row.title, body: row.body };
    }
  }
  return out;
}
