import { logger } from "@/lib/logger";

import { resolveSiteMediaDisplayUrl } from "./resolve-display-url";
import { isMigrationPendingError } from "./is-migration-pending-error";
import { siteMediaItem, type SiteMediaItemRow } from "./site-media-prisma";
import {
  MODELING_SLOT_LABELS,
  ORDERED_MODELING_SLOT_KEYS,
  SITE_MEDIA_GROUP_KEYS,
  SITE_MEDIA_GROUPS,
  type ModelingSlotKey,
  type SiteMediaGroupKey,
} from "./site-media.registry";

export type AdminModelingSlotRow = {
  slotKey: ModelingSlotKey;
  label: string;
  itemId: string | null;
  r2ObjectKey: string | null;
  r2ObjectKeyMobile: string | null;
  displayUrl: string | null;
  displayUrlMobile: string | null;
  altText: string;
};

export type AdminOrderedItemRow = {
  id: string;
  slotKey: string;
  sortOrder: number;
  r2ObjectKey: string | null;
  displayUrl: string | null;
  altText: string;
};

export type AdminSiteMediaBundle = {
  groupsMeta: typeof SITE_MEDIA_GROUPS;
  modeling: AdminModelingSlotRow[];
  finishedRow1: AdminOrderedItemRow[];
  finishedRow2: AdminOrderedItemRow[];
};

function emptyAdminBundle(): AdminSiteMediaBundle {
  const modeling: AdminModelingSlotRow[] = ORDERED_MODELING_SLOT_KEYS.map(
    (slotKey) => ({
      slotKey,
      label: MODELING_SLOT_LABELS[slotKey],
      itemId: null,
      r2ObjectKey: null,
      r2ObjectKeyMobile: null,
      displayUrl: null,
      displayUrlMobile: null,
      altText: "",
    }),
  );
  return {
    groupsMeta: SITE_MEDIA_GROUPS,
    modeling,
    finishedRow1: [],
    finishedRow2: [],
  };
}

function mapOrderedRow(r: SiteMediaItemRow): AdminOrderedItemRow {
  return {
    id: r.id,
    slotKey: r.slotId,
    sortOrder: r.sortOrder,
    r2ObjectKey: r.r2ObjectKey,
    displayUrl: r.r2ObjectKey
      ? resolveSiteMediaDisplayUrl(r.r2ObjectKey)
      : null,
    altText: r.alt ?? "",
  };
}

/**
 * Данные для страницы Media Manager.
 */
export async function getSiteMediaAdminBundle(): Promise<AdminSiteMediaBundle> {
  let rows: SiteMediaItemRow[];
  try {
    rows = await siteMediaItem.findMany({
      orderBy: [{ sectionKey: "asc" }, { sortOrder: "asc" }],
    });
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getSiteMediaAdminBundle: migration pending, empty bundle");
    } else {
      logger.error("getSiteMediaAdminBundle: unexpected DB error", err);
    }
    return emptyAdminBundle();
  }

  const byGroup = (key: SiteMediaGroupKey) =>
    rows.filter((r) => r.sectionKey === key);

  const modelingMap = new Map(
    byGroup(SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION).map((r) => [
      r.slotId as ModelingSlotKey,
      r,
    ]),
  );

  const modeling: AdminModelingSlotRow[] = ORDERED_MODELING_SLOT_KEYS.map(
    (slotKey) => {
      const row = modelingMap.get(slotKey);
      return {
        slotKey,
        label: MODELING_SLOT_LABELS[slotKey],
        itemId: row?.id ?? null,
        r2ObjectKey: row?.r2ObjectKey ?? null,
        r2ObjectKeyMobile: row?.r2ObjectKeyMobile ?? null,
        displayUrl: row?.r2ObjectKey
          ? resolveSiteMediaDisplayUrl(row.r2ObjectKey)
          : null,
        displayUrlMobile: row?.r2ObjectKeyMobile
          ? resolveSiteMediaDisplayUrl(row.r2ObjectKeyMobile)
          : null,
        altText: row?.alt ?? "",
      };
    },
  );

  return {
    groupsMeta: SITE_MEDIA_GROUPS,
    modeling,
    finishedRow1: byGroup(SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1).map(
      mapOrderedRow,
    ),
    finishedRow2: byGroup(SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2).map(
      mapOrderedRow,
    ),
  };
}
