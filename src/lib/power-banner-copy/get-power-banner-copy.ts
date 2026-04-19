import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import { POWER_BANNER_DEFAULT_COPY, POWER_BANNER_DEFAULT_MEDIA } from "./power-banner-defaults";
import {
  POWER_BANNER_KEYS,
  POWER_BANNER_SLOT_IDS,
  POWER_BANNER_VIEWPORTS,
  type PowerBannerKey,
  type PowerBannerViewport,
} from "./power-banner-keys";
import type { PowerBannerCopyBundle } from "./power-banner-copy.types";

function emptyBundle(): PowerBannerCopyBundle {
  const desktop = {
    MODELING: {
      ...POWER_BANNER_DEFAULT_COPY.desktop.MODELING,
      ...POWER_BANNER_DEFAULT_MEDIA.desktop.MODELING,
      imageObjectKey: null,
    },
    RENDERING: {
      ...POWER_BANNER_DEFAULT_COPY.desktop.RENDERING,
      ...POWER_BANNER_DEFAULT_MEDIA.desktop.RENDERING,
      imageObjectKey: null,
    },
    DESIGN: {
      ...POWER_BANNER_DEFAULT_COPY.desktop.DESIGN,
      ...POWER_BANNER_DEFAULT_MEDIA.desktop.DESIGN,
      imageObjectKey: null,
    },
  };
  const mobile = {
    MODELING: {
      ...POWER_BANNER_DEFAULT_COPY.mobile.MODELING,
      ...POWER_BANNER_DEFAULT_MEDIA.mobile.MODELING,
      imageObjectKey: null,
    },
    RENDERING: {
      ...POWER_BANNER_DEFAULT_COPY.mobile.RENDERING,
      ...POWER_BANNER_DEFAULT_MEDIA.mobile.RENDERING,
      imageObjectKey: null,
    },
    DESIGN: {
      ...POWER_BANNER_DEFAULT_COPY.mobile.DESIGN,
      ...POWER_BANNER_DEFAULT_MEDIA.mobile.DESIGN,
      imageObjectKey: null,
    },
  };
  return { desktop, mobile };
}

/**
 * Loads persisted hero copy and merges with defaults for any missing banner row.
 */
export async function getPowerBannerCopyBundle(): Promise<PowerBannerCopyBundle> {
  let rows: { bannerKey: string; viewport: string; title: string; body: string }[];
  let mediaRows: Awaited<ReturnType<typeof siteMediaItem.findMany>>;
  try {
    const [copyRows, heroMediaRows] = await Promise.all([
      prisma.powerBannerCopy.findMany(),
      siteMediaItem.findMany({
        where: { sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS },
      }),
    ]);
    rows = copyRows;
    mediaRows = heroMediaRows;
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getPowerBannerCopyBundle: migration pending, using defaults");
    } else {
      logger.error("getPowerBannerCopyBundle: unexpected DB error", err);
    }
    return emptyBundle();
  }

  const out = emptyBundle();
  const copyByViewportAndKey = new Map<string, { title: string; body: string }>();
  for (const row of rows) {
    const mapKey = `${row.viewport}:${row.bannerKey}`;
    copyByViewportAndKey.set(mapKey, { title: row.title, body: row.body });
  }

  for (const viewport of POWER_BANNER_VIEWPORTS) {
    for (const key of POWER_BANNER_KEYS) {
      const copyMapKey = `${viewport}:${key}`;
      const row = copyByViewportAndKey.get(copyMapKey);
      if (row) {
        out[viewport][key] = {
          ...out[viewport][key],
          title: row.title,
          body: row.body,
        };
      }

      const slotId = POWER_BANNER_SLOT_IDS[viewport][key];
      const media = mediaRows.find((item) => item.slotId === slotId);
      if (media) {
        applyMediaEntry(out, viewport, key, media);
      }
    }
  }
  return out;
}

function applyMediaEntry(
  out: PowerBannerCopyBundle,
  viewport: PowerBannerViewport,
  key: PowerBannerKey,
  media: Awaited<ReturnType<typeof siteMediaItem.findMany>>[number],
): void {
  const defaults = POWER_BANNER_DEFAULT_MEDIA[viewport][key];
  const imageSrc = media.r2ObjectKey
    ? resolveSiteMediaDisplayUrl(media.r2ObjectKey)
    : null;
  out[viewport][key] = {
    ...out[viewport][key],
    imageSrc: imageSrc ?? media.legacySrc ?? defaults.imageSrc,
    imageAlt: media.alt ?? defaults.imageAlt,
    imageObjectKey: media.r2ObjectKey,
  };
}
