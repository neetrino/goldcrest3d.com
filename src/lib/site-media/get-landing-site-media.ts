import { LANDING_IMAGE_IDS } from "@/constants";
import { logger } from "@/lib/logger";

import type { ImageFraming } from "./image-framing";
import { isMigrationPendingError } from "./is-migration-pending-error";
import {
  DEFAULT_FINISHED_ROW1,
  DEFAULT_FINISHED_ROW2,
  DEFAULT_MODELING_IMAGE_URL,
  type FinishedGalleryItem,
} from "./landing-defaults";
import { resolveSiteMediaDisplayUrl } from "./resolve-display-url";
import { parseSiteMediaLayoutMeta } from "./site-media-layout-meta";
import {
  siteMediaItem,
  type SiteMediaItemRow,
} from "./site-media-prisma";
import {
  ORDERED_MODELING_SLOT_KEYS,
  SITE_MEDIA_GROUP_KEYS,
  type ModelingSlotKey,
} from "./site-media.registry";

/** Desktop vs mobile URLs for Modeling Specialization (mobile falls back to desktop when not uploaded). */
export type ModelingSlotResolvedMedia = {
  desktop: string;
  mobile: string;
  desktopFraming: ImageFraming | null;
  mobileFraming: ImageFraming | null;
};

export type LandingModelingMedia = Record<ModelingSlotKey, ModelingSlotResolvedMedia>;

export type LandingFinishedMedia = {
  row1: FinishedGalleryItem[];
  row2: FinishedGalleryItem[];
};

export type LandingSiteMedia = {
  modeling: LandingModelingMedia;
  finished: LandingFinishedMedia;
};

function mergeModelingUrl(
  slot: ModelingSlotKey,
  r2ObjectKey: string | null | undefined,
): string {
  if (!r2ObjectKey) {
    return DEFAULT_MODELING_IMAGE_URL[slot];
  }
  const url = resolveSiteMediaDisplayUrl(r2ObjectKey);
  return url ?? DEFAULT_MODELING_IMAGE_URL[slot];
}

function buildFinishedRow(
  rows: Pick<SiteMediaItemRow, "slotId" | "r2ObjectKey" | "sortOrder" | "layoutMeta">[],
  defaults: readonly FinishedGalleryItem[],
): FinishedGalleryItem[] {
  if (rows.length === 0) {
    return [...defaults];
  }
  const sorted = [...rows].sort((a, b) => a.sortOrder - b.sortOrder);
  const lastDefault = defaults[defaults.length - 1];
  return sorted.map((row, index) => {
    const fallback = defaults[index] ?? lastDefault;
    const url = row.r2ObjectKey
      ? resolveSiteMediaDisplayUrl(row.r2ObjectKey)
      : null;
    const src = url ?? fallback.src;
    const imageId =
      defaults[index]?.imageId ?? LANDING_IMAGE_IDS.FINISHED_1;
    const meta = parseSiteMediaLayoutMeta(row.layoutMeta);
    const framing = meta?.framing ?? null;
    return {
      id: row.slotId,
      imageId,
      src,
      objectPositionClass: fallback.objectPositionClass,
      framing,
    };
  });
}

/**
 * Загружает URL изображений для лендинга: метаданные из Neon, файлы в R2.
 * Пустая БД → прежние статические пути и Figma/local URL из landing-defaults.
 */
export async function getLandingSiteMedia(): Promise<LandingSiteMedia> {
  try {
    const [modelingRows, row1Rows, row2Rows] = await Promise.all([
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
        },
      }),
    ]);

    const modelingBySlot = new Map<
      ModelingSlotKey,
      {
        desktop: string | null;
        mobile: string | null;
        layoutMeta: unknown | null;
      }
    >(
      modelingRows.map((r: SiteMediaItemRow) => [
        r.slotId as ModelingSlotKey,
        {
          desktop: r.r2ObjectKey,
          mobile: r.r2ObjectKeyMobile,
          layoutMeta: r.layoutMeta,
        },
      ]),
    );

    const modeling = {} as LandingModelingMedia;
    for (const slot of ORDERED_MODELING_SLOT_KEYS) {
      const row = modelingBySlot.get(slot);
      if (!row) {
        modeling[slot] = {
          desktop: mergeModelingUrl(slot, undefined),
          mobile: mergeModelingUrl(slot, undefined),
          desktopFraming: null,
          mobileFraming: null,
        };
        continue;
      }
      const meta = parseSiteMediaLayoutMeta(row.layoutMeta);
      const desktopUrl = mergeModelingUrl(slot, row.desktop);
      const mobileKey = row.mobile ?? row.desktop;
      const mobileUrl = mergeModelingUrl(slot, mobileKey);
      modeling[slot] = {
        desktop: desktopUrl,
        mobile: mobileUrl,
        desktopFraming: meta?.desktopFraming ?? null,
        mobileFraming: meta?.mobileFraming ?? null,
      };
    }

    const finished: LandingFinishedMedia = {
      row1: buildFinishedRow(row1Rows, DEFAULT_FINISHED_ROW1),
      row2: buildFinishedRow(row2Rows, DEFAULT_FINISHED_ROW2),
    };

    return { modeling, finished };
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getLandingSiteMedia: migration pending, static fallback");
    } else {
      logger.error("getLandingSiteMedia: unexpected DB error", err);
    }
    return getStaticFallbackLandingSiteMedia();
  }
}

/** Для тестов и Storybook — без обращения к БД. */
export function getStaticFallbackLandingSiteMedia(): LandingSiteMedia {
  const modeling = {} as LandingModelingMedia;
  for (const slot of ORDERED_MODELING_SLOT_KEYS) {
    const url = DEFAULT_MODELING_IMAGE_URL[slot];
    modeling[slot] = {
      desktop: url,
      mobile: url,
      desktopFraming: null,
      mobileFraming: null,
    };
  }
  return {
    modeling,
    finished: {
      row1: [...DEFAULT_FINISHED_ROW1],
      row2: [...DEFAULT_FINISHED_ROW2],
    },
  };
}
