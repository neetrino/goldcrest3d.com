import { LANDING_IMAGE_IDS } from "@/constants";
import { logger } from "@/lib/logger";

import { isMigrationPendingError } from "./is-migration-pending-error";
import {
  DEFAULT_FINISHED_ROW1,
  DEFAULT_FINISHED_ROW2,
  DEFAULT_MODELING_IMAGE_URL,
  type FinishedGalleryItem,
} from "./landing-defaults";
import { resolveSiteMediaDisplayUrl } from "./resolve-display-url";
import {
  siteMediaItem,
  type SiteMediaItemRow,
} from "./site-media-prisma";
import {
  ORDERED_MODELING_SLOT_KEYS,
  SITE_MEDIA_GROUP_KEYS,
  type ModelingSlotKey,
} from "./site-media.registry";

export type LandingModelingMedia = Record<ModelingSlotKey, string>;

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
  rows: Pick<SiteMediaItemRow, "slotId" | "r2ObjectKey" | "sortOrder">[],
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
    return {
      id: row.slotId,
      imageId,
      src,
      objectPositionClass: fallback.objectPositionClass,
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

    const modelingBySlot = new Map<ModelingSlotKey, string | null>(
      modelingRows.map((r: SiteMediaItemRow) => [
        r.slotId as ModelingSlotKey,
        r.r2ObjectKey,
      ]),
    );

    const modeling = {} as LandingModelingMedia;
    for (const slot of ORDERED_MODELING_SLOT_KEYS) {
      modeling[slot] = mergeModelingUrl(slot, modelingBySlot.get(slot));
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
    modeling[slot] = DEFAULT_MODELING_IMAGE_URL[slot];
  }
  return {
    modeling,
    finished: {
      row1: [...DEFAULT_FINISHED_ROW1],
      row2: [...DEFAULT_FINISHED_ROW2],
    },
  };
}
