import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { parseManufacturingImageTransformFromLayoutMeta } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";

import {
  POWER_BANNER_DEFAULT_COPY,
  POWER_BANNER_DEFAULT_MEDIA,
  POWER_BANNER_DEFAULT_TRANSFORMS,
} from "./power-banner-defaults";
import {
  POWER_BANNER_KEYS,
  POWER_BANNER_SLOT_IDS,
  POWER_BANNER_VIEWPORTS,
  type PowerBannerKey,
  type PowerBannerViewport,
} from "./power-banner-keys";
import type { PowerBannerCopyBundle, PowerBannerCopyEntry } from "./power-banner-copy.types";

function defaultBannerEntry(
  viewport: PowerBannerViewport,
  bannerKey: PowerBannerKey,
): PowerBannerCopyEntry {
  return {
    ...POWER_BANNER_DEFAULT_COPY[viewport][bannerKey],
    ...POWER_BANNER_DEFAULT_MEDIA[viewport][bannerKey],
    titleOffsetX: 0,
    titleOffsetY: 0,
    bodyOffsetX: 0,
    bodyOffsetY: 0,
    ctaOffsetX: 0,
    ctaOffsetY: 0,
    imageObjectKey: null,
    imageTransform: POWER_BANNER_DEFAULT_TRANSFORMS[viewport][bannerKey],
  };
}

function emptyBundle(): PowerBannerCopyBundle {
  const desktop = {
    MODELING: defaultBannerEntry("desktop", "MODELING"),
    RENDERING: defaultBannerEntry("desktop", "RENDERING"),
    DESIGN: defaultBannerEntry("desktop", "DESIGN"),
  };
  const mobile = {
    MODELING: defaultBannerEntry("mobile", "MODELING"),
    RENDERING: defaultBannerEntry("mobile", "RENDERING"),
    DESIGN: defaultBannerEntry("mobile", "DESIGN"),
  };
  const tablet = {
    MODELING: defaultBannerEntry("tablet", "MODELING"),
    RENDERING: defaultBannerEntry("tablet", "RENDERING"),
    DESIGN: defaultBannerEntry("tablet", "DESIGN"),
  };
  return { desktop, mobile, tablet };
}

/**
 * Loads persisted hero copy and merges with defaults for any missing banner row.
 */
export async function getPowerBannerCopyBundle(): Promise<PowerBannerCopyBundle> {
  let rows: Awaited<ReturnType<typeof prisma.powerBannerCopy.findMany>>;
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
  const copyByViewportAndKey = new Map<
    string,
    {
      title: string;
      body: string;
      titleOffsetX: number;
      titleOffsetY: number;
      bodyOffsetX: number;
      bodyOffsetY: number;
      ctaOffsetX: number;
      ctaOffsetY: number;
    }
  >();
  for (const row of rows) {
    const mapKey = `${row.viewport}:${row.bannerKey}`;
    copyByViewportAndKey.set(mapKey, {
      title: row.title,
      body: row.body,
      titleOffsetX: Number.isFinite(row.titleOffsetX) ? row.titleOffsetX : 0,
      titleOffsetY: Number.isFinite(row.titleOffsetY) ? row.titleOffsetY : 0,
      bodyOffsetX: Number.isFinite(row.bodyOffsetX) ? row.bodyOffsetX : 0,
      bodyOffsetY: Number.isFinite(row.bodyOffsetY) ? row.bodyOffsetY : 0,
      ctaOffsetX: Number.isFinite(row.ctaOffsetX) ? row.ctaOffsetX : 0,
      ctaOffsetY: Number.isFinite(row.ctaOffsetY) ? row.ctaOffsetY : 0,
    });
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
          titleOffsetX: row.titleOffsetX,
          titleOffsetY: row.titleOffsetY,
          bodyOffsetX: row.bodyOffsetX,
          bodyOffsetY: row.bodyOffsetY,
          ctaOffsetX: row.ctaOffsetX,
          ctaOffsetY: row.ctaOffsetY,
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
  const defaultTransform = POWER_BANNER_DEFAULT_TRANSFORMS[viewport][key];
  const imageSrc = media.r2ObjectKey
    ? resolveSiteMediaDisplayUrl(media.r2ObjectKey)
    : null;
  out[viewport][key] = {
    ...out[viewport][key],
    imageSrc: imageSrc ?? media.legacySrc ?? defaults.imageSrc,
    imageAlt: media.alt ?? defaults.imageAlt,
    imageObjectKey: media.r2ObjectKey,
    imageTransform: media.layoutMeta
      ? parseManufacturingImageTransformFromLayoutMeta(media.layoutMeta)
      : defaultTransform,
  };
}
