import { logger } from "@/lib/logger";
import {
  buildFounderDesktopContent,
  buildFounderMobileContent,
  getFounderDesktopMediaSlotId,
  getFounderMobileMediaSlotId,
} from "@/lib/founder-section/founder-section-content";
import { founderSectionCopy } from "@/lib/founder-section/founder-section-copy-prisma";
import { founderSectionMobileCopy } from "@/lib/founder-section/founder-section-mobile-copy-prisma";
import type { FounderSectionContent } from "@/lib/founder-section/founder-section.types";
import { buildManufacturingIntelligenceContent } from "@/lib/manufacturing-intelligence/manufacturing-intelligence-content";
import {
  buildManufacturingIntelligenceMobileContent,
  getManufacturingMobileMediaSlotId,
} from "@/lib/manufacturing-intelligence/manufacturing-intelligence-mobile-content";
import { manufacturingIntelligenceCopy } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy-prisma";
import { manufacturingIntelligenceMobileCopy } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-mobile-copy-prisma";
import { modelingSpecializationCopy } from "@/lib/modeling-specialization-copy/modeling-specialization-copy-prisma";
import {
  emptyModelingSpecializationCopyRow,
  normalizeModelingSpecializationCopyPayload,
} from "@/lib/modeling-specialization-copy/normalize-modeling-specialization-copy";
import type { ModelingSpecializationCopyRow } from "@/lib/modeling-specialization-copy/modeling-specialization-copy.types";

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
  titleDesktop: string;
  titleMobile: string;
  bodyDesktop: string;
  bodyMobile: string;
  desktopLine1Emphasis: string;
};

export type AdminOrderedItemRow = {
  id: string;
  slotKey: string;
  sortOrder: number;
  r2ObjectKey: string | null;
  displayUrl: string | null;
  altText: string;
};

export type AdminManufacturingItemRow = {
  id: string;
  label: string;
  itemId: string | null;
  imageObjectKey: string | null;
  displayUrl: string | null;
  title: string;
  description: string;
  imageAlt: string;
  zoom: number;
  offsetX: number;
  offsetY: number;
};

export type AdminFounderSectionRow = FounderSectionContent & {
  itemId: string | null;
  imageObjectKey: string | null;
};

export type AdminSiteMediaBundle = {
  groupsMeta: typeof SITE_MEDIA_GROUPS;
  modeling: AdminModelingSlotRow[];
  manufacturingHeadingDesktop: string;
  manufacturingHeadingMobile: string;
  manufacturing: AdminManufacturingItemRow[];
  manufacturingMobile: AdminManufacturingItemRow[];
  founderDesktop: AdminFounderSectionRow;
  founderMobile: AdminFounderSectionRow;
  finishedRow1: AdminOrderedItemRow[];
  finishedRow2: AdminOrderedItemRow[];
};

function emptyAdminBundle(): AdminSiteMediaBundle {
  const modeling: AdminModelingSlotRow[] = ORDERED_MODELING_SLOT_KEYS.map(
    (slotKey) => ({
      ...emptyModelingSpecializationCopyRow(slotKey),
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
    manufacturingHeadingDesktop: "Manufacturing Intelligence",
    manufacturingHeadingMobile: "Manufacturing Intelligence",
    manufacturing: [],
    manufacturingMobile: [],
    founderDesktop: {
      ...buildFounderDesktopContent([], []),
      itemId: null,
      imageObjectKey: null,
    },
    founderMobile: {
      ...buildFounderMobileContent([], []),
      itemId: null,
      imageObjectKey: null,
    },
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
  let copyRows: ModelingSpecializationCopyRow[];
  let manufacturingCopyRows: { key: string; value: string }[];
  let manufacturingMobileCopyRows: { key: string; value: string }[];
  let founderCopyRows: { key: string; value: string }[];
  let founderMobileCopyRows: { key: string; value: string }[];
  try {
    const [
      siteMediaRows,
      modelingCopyRows,
      manufacturingRows,
      manufacturingMobileRows,
      founderRows,
      founderMobileRows,
    ] = await Promise.all([
      siteMediaItem.findMany({
        orderBy: [{ sectionKey: "asc" }, { sortOrder: "asc" }],
      }),
      modelingSpecializationCopy.findMany(),
      manufacturingIntelligenceCopy.findMany(),
      manufacturingIntelligenceMobileCopy.findMany(),
      founderSectionCopy.findMany(),
      founderSectionMobileCopy.findMany(),
    ]);
    rows = siteMediaRows;
    copyRows = modelingCopyRows.map((row) => ({
      slotKey: row.slotKey as ModelingSlotKey,
      ...normalizeModelingSpecializationCopyPayload({
        titleDesktop: row.titleDesktop ?? "",
        titleMobile: row.titleMobile ?? "",
        bodyDesktop: row.bodyDesktop ?? "",
        bodyMobile: row.bodyMobile ?? "",
        desktopLine1Emphasis: row.desktopLine1Emphasis ?? "",
      }),
    }));
    manufacturingCopyRows = manufacturingRows.map((row) => ({
      key: row.key,
      value: row.value,
    }));
    manufacturingMobileCopyRows = manufacturingMobileRows.map((row) => ({
      key: row.key,
      value: row.value,
    }));
    founderCopyRows = founderRows.map((row) => ({
      key: row.key,
      value: row.value,
    }));
    founderMobileCopyRows = founderMobileRows.map((row) => ({
      key: row.key,
      value: row.value,
    }));
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
  const copyBySlot = new Map<ModelingSlotKey, ModelingSpecializationCopyRow>(
    copyRows.map((row) => [row.slotKey, row]),
  );

  const modelingMap = new Map(
    byGroup(SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION).map((r) => [
      r.slotId as ModelingSlotKey,
      r,
    ]),
  );

  const modeling: AdminModelingSlotRow[] = ORDERED_MODELING_SLOT_KEYS.map(
    (slotKey) => {
      const row = modelingMap.get(slotKey);
      const copy = copyBySlot.get(slotKey) ?? emptyModelingSpecializationCopyRow(slotKey);
      return {
        ...copy,
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
  const manufacturingContent = buildManufacturingIntelligenceContent(manufacturingCopyRows, rows);
  const manufacturingMediaById = new Map(
    byGroup(SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE).map((row) => [
      row.slotId,
      row,
    ]),
  );
  const manufacturing: AdminManufacturingItemRow[] = manufacturingContent.items.map((item) => {
    const mediaRow = manufacturingMediaById.get(item.id);
    return {
      id: item.id,
      label: item.title,
      itemId: mediaRow?.id ?? null,
      imageObjectKey: mediaRow?.r2ObjectKey ?? null,
      displayUrl: item.imageSrc,
      title: item.title,
      description: item.description,
      imageAlt: item.imageAlt,
      zoom: item.transform.zoom,
      offsetX: item.transform.offsetX,
      offsetY: item.transform.offsetY,
    };
  });
  const manufacturingMobileContent = buildManufacturingIntelligenceMobileContent(
    manufacturingMobileCopyRows,
    rows,
  );
  const manufacturingMobileMediaById = new Map(
    byGroup(SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE).map((row) => [
      row.slotId,
      row,
    ]),
  );
  const manufacturingMobile: AdminManufacturingItemRow[] = manufacturingMobileContent.items.map(
    (item) => {
      const mediaRow = manufacturingMobileMediaById.get(getManufacturingMobileMediaSlotId(item.id));
      return {
        id: item.id,
        label: item.title,
        itemId: mediaRow?.id ?? null,
        imageObjectKey: mediaRow?.r2ObjectKey ?? null,
        displayUrl: item.imageSrc,
        title: item.title,
        description: item.description,
        imageAlt: item.imageAlt,
        zoom: item.transform.zoom,
        offsetX: item.transform.offsetX,
        offsetY: item.transform.offsetY,
      };
    },
  );
  const founderDesktopContent = buildFounderDesktopContent(
    founderCopyRows,
    byGroup(SITE_MEDIA_GROUP_KEYS.FOUNDER_DESKTOP),
  );
  const founderDesktopMedia = byGroup(SITE_MEDIA_GROUP_KEYS.FOUNDER_DESKTOP).find(
    (row) => row.slotId === getFounderDesktopMediaSlotId(),
  );
  const founderDesktop: AdminFounderSectionRow = {
    ...founderDesktopContent,
    itemId: founderDesktopMedia?.id ?? null,
    imageObjectKey: founderDesktopMedia?.r2ObjectKey ?? null,
  };
  const founderMobileContent = buildFounderMobileContent(
    founderMobileCopyRows,
    byGroup(SITE_MEDIA_GROUP_KEYS.FOUNDER_MOBILE),
  );
  const founderMobileMedia = byGroup(SITE_MEDIA_GROUP_KEYS.FOUNDER_MOBILE).find(
    (row) => row.slotId === getFounderMobileMediaSlotId(),
  );
  const founderMobile: AdminFounderSectionRow = {
    ...founderMobileContent,
    itemId: founderMobileMedia?.id ?? null,
    imageObjectKey: founderMobileMedia?.r2ObjectKey ?? null,
  };

  return {
    groupsMeta: SITE_MEDIA_GROUPS,
    modeling,
    manufacturingHeadingDesktop: manufacturingContent.headingDesktop,
    manufacturingHeadingMobile: manufacturingContent.headingMobile,
    manufacturing,
    manufacturingMobile,
    founderDesktop,
    founderMobile,
    finishedRow1: byGroup(SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1).map(
      mapOrderedRow,
    ),
    finishedRow2: byGroup(SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2).map(
      mapOrderedRow,
    ),
  };
}
