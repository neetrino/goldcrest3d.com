import { LANDING_IMAGE_IDS } from "@/constants";
import { logger } from "@/lib/logger";

import { isMigrationPendingError } from "./is-migration-pending-error";
import {
  DEFAULT_FINISHED_ROW1,
  DEFAULT_FINISHED_ROW2,
  DEFAULT_MODELING_IMAGE_URL,
  type FinishedGalleryItem,
} from "./landing-defaults";
import {
  getDefaultFounderPhotoSrc,
  getDefaultHeroDesktopSrc,
  getDefaultHeroMobileSrc,
  MANUFACTURING_SLOT_DEFAULT_SRC,
} from "./extended-media-defaults";
import { resolveSiteMediaDisplayUrl } from "./resolve-display-url";
import {
  siteMediaItem,
  type SiteMediaItemRow,
} from "./site-media-prisma";
import {
  FOUNDER_SLOT_KEYS,
  MANUFACTURING_DETAIL_SLOT_KEYS,
  ORDERED_HERO_SLOT_KEYS,
  ORDERED_MODELING_SLOT_KEYS,
  SITE_MEDIA_GROUP_KEYS,
  type HeroSlotKey,
  type ManufacturingDetailSlotKey,
  type ModelingSlotKey,
} from "./site-media.registry";

/** Desktop vs mobile URLs for Modeling Specialization (mobile falls back to desktop when not uploaded). */
export type ModelingSlotResolvedMedia = {
  desktop: string;
  mobile: string;
};

export type LandingModelingMedia = Record<ModelingSlotKey, ModelingSlotResolvedMedia>;

export type LandingFinishedMedia = {
  row1: FinishedGalleryItem[];
  row2: FinishedGalleryItem[];
};

export type HeroSlideResolvedMedia = {
  desktop: string;
  mobile: string;
  layoutMeta: unknown | null;
};

export type FounderPhotoResolvedMedia = {
  src: string;
  layoutMeta: unknown | null;
};

export type ManufacturingSlotResolvedMedia = {
  src: string;
  layoutMeta: unknown | null;
};

export type LandingSiteMedia = {
  modeling: LandingModelingMedia;
  finished: LandingFinishedMedia;
  hero: Record<HeroSlotKey, HeroSlideResolvedMedia>;
  founderPhoto: FounderPhotoResolvedMedia;
  manufacturing: Record<
    ManufacturingDetailSlotKey,
    ManufacturingSlotResolvedMedia
  >;
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

function resolveUrlOr<T>(key: string | null | undefined, fallback: T): string | T {
  if (!key) return fallback;
  const url = resolveSiteMediaDisplayUrl(key);
  return url ?? fallback;
}

function buildHeroSlides(
  rows: SiteMediaItemRow[],
): Record<HeroSlotKey, HeroSlideResolvedMedia> {
  const bySlot = new Map(rows.map((r) => [r.slotId as HeroSlotKey, r]));
  const out = {} as Record<HeroSlotKey, HeroSlideResolvedMedia>;
  for (const slot of ORDERED_HERO_SLOT_KEYS) {
    const row = bySlot.get(slot);
    const desktop = resolveUrlOr(
      row?.r2ObjectKey ?? null,
      getDefaultHeroDesktopSrc(slot),
    ) as string;
    const mobileKey = row?.r2ObjectKeyMobile ?? row?.r2ObjectKey;
    const mobile = resolveUrlOr(mobileKey ?? null, getDefaultHeroMobileSrc(slot)) as string;
    out[slot] = {
      desktop,
      mobile,
      layoutMeta: row?.layoutMeta ?? null,
    };
  }
  return out;
}

function buildFounderPhoto(rows: SiteMediaItemRow[]): FounderPhotoResolvedMedia {
  const row = rows.find((r) => r.slotId === FOUNDER_SLOT_KEYS.PHOTO);
  return {
    src: resolveUrlOr(row?.r2ObjectKey ?? null, getDefaultFounderPhotoSrc()) as string,
    layoutMeta: row?.layoutMeta ?? null,
  };
}

function buildManufacturingSlots(
  rows: SiteMediaItemRow[],
): Record<ManufacturingDetailSlotKey, ManufacturingSlotResolvedMedia> {
  const bySlot = new Map(
    rows.map((r) => [r.slotId as ManufacturingDetailSlotKey, r]),
  );
  const out = {} as Record<
    ManufacturingDetailSlotKey,
    ManufacturingSlotResolvedMedia
  >;
  for (const slot of MANUFACTURING_DETAIL_SLOT_KEYS) {
    const row = bySlot.get(slot);
    const fallback = MANUFACTURING_SLOT_DEFAULT_SRC[slot];
    out[slot] = {
      src: resolveUrlOr(row?.r2ObjectKey ?? null, fallback) as string,
      layoutMeta: row?.layoutMeta ?? null,
    };
  }
  return out;
}

/**
 * Загружает URL изображений для лендинга: метаданные из Neon, файлы в R2.
 * Пустая БД → прежние статические пути и Figma/local URL из landing-defaults.
 */
export async function getLandingSiteMedia(): Promise<LandingSiteMedia> {
  try {
    const [modelingRows, row1Rows, row2Rows, extendedRows] = await Promise.all([
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
      siteMediaItem.findMany({
        where: {
          sectionKey: {
            in: [
              SITE_MEDIA_GROUP_KEYS.HERO,
              SITE_MEDIA_GROUP_KEYS.FOUNDER,
              SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
            ],
          },
        },
      }),
    ]);

    const heroRows = extendedRows.filter(
      (r) => r.sectionKey === SITE_MEDIA_GROUP_KEYS.HERO,
    );
    const founderRows = extendedRows.filter(
      (r) => r.sectionKey === SITE_MEDIA_GROUP_KEYS.FOUNDER,
    );
    const manufacturingRows = extendedRows.filter(
      (r) => r.sectionKey === SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
    );

    const modelingBySlot = new Map<
      ModelingSlotKey,
      { desktop: string | null; mobile: string | null }
    >(
      modelingRows.map((r: SiteMediaItemRow) => [
        r.slotId as ModelingSlotKey,
        {
          desktop: r.r2ObjectKey,
          mobile: r.r2ObjectKeyMobile,
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
        };
        continue;
      }
      const desktopUrl = mergeModelingUrl(slot, row.desktop);
      const mobileKey = row.mobile ?? row.desktop;
      const mobileUrl = mergeModelingUrl(slot, mobileKey);
      modeling[slot] = { desktop: desktopUrl, mobile: mobileUrl };
    }

    const finished: LandingFinishedMedia = {
      row1: buildFinishedRow(row1Rows, DEFAULT_FINISHED_ROW1),
      row2: buildFinishedRow(row2Rows, DEFAULT_FINISHED_ROW2),
    };

    return {
      modeling,
      finished,
      hero: buildHeroSlides(heroRows),
      founderPhoto: buildFounderPhoto(founderRows),
      manufacturing: buildManufacturingSlots(manufacturingRows),
    };
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
    modeling[slot] = { desktop: url, mobile: url };
  }
  const hero = {} as Record<HeroSlotKey, HeroSlideResolvedMedia>;
  for (const slot of ORDERED_HERO_SLOT_KEYS) {
    hero[slot] = {
      desktop: getDefaultHeroDesktopSrc(slot),
      mobile: getDefaultHeroMobileSrc(slot),
      layoutMeta: null,
    };
  }
  const manufacturing = {} as Record<
    ManufacturingDetailSlotKey,
    ManufacturingSlotResolvedMedia
  >;
  for (const slot of MANUFACTURING_DETAIL_SLOT_KEYS) {
    manufacturing[slot] = {
      src: MANUFACTURING_SLOT_DEFAULT_SRC[slot],
      layoutMeta: null,
    };
  }
  return {
    modeling,
    finished: {
      row1: [...DEFAULT_FINISHED_ROW1],
      row2: [...DEFAULT_FINISHED_ROW2],
    },
    hero,
    founderPhoto: {
      src: getDefaultFounderPhotoSrc(),
      layoutMeta: null,
    },
    manufacturing,
  };
}
