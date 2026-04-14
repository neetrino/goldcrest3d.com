import {
  ORDERED_MANUFACTURING_SPECIALIZATION_IDS,
  type ManufacturingSpecializationId,
  type ManufacturingSpecializationItem,
} from "@/constants/manufacturing-specialization";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";
import { parseImageFramingJson } from "@/lib/site-media/image-framing";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import type { ImageFraming } from "@/lib/site-media/image-framing";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";

import { baseById } from "./base-by-id";
import { mergeManufacturingSpecializationItem } from "./merge-manufacturing-specialization-item";
import { plainManufacturingDescriptionToHtml } from "./plain-default-description-html";

export type ManufacturingSpecializationItemAdminEntry = {
  itemKey: ManufacturingSpecializationId;
  /** Stable label from defaults (card eyebrow). */
  canonicalLabel: string;
  formTitle: string;
  formBody: string;
  heroImageR2Key: string | null;
  heroImageFraming: ImageFraming | null;
  desktopPreviewSrc: string;
  /** Remount editor after save/refresh so form state matches server (`updatedAt` or seed). */
  editorSyncKey: string;
};

/**
 * Resolved accordion + detail images for the public homepage.
 */
export async function getManufacturingSpecializationItemsResolved(): Promise<
  ManufacturingSpecializationItem[]
> {
  let rows: {
    itemKey: string;
    title: string;
    body: string;
    r2ObjectKey: string | null;
    heroImageLayout: unknown | null;
  }[];
  try {
    rows = await prisma.manufacturingSpecializationItemCopy.findMany();
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getManufacturingSpecializationItemsResolved: migration pending, using defaults");
    } else {
      logger.error("getManufacturingSpecializationItemsResolved: unexpected DB error", err);
    }
    return ORDERED_MANUFACTURING_SPECIALIZATION_IDS.map((id) =>
      mergeManufacturingSpecializationItem(baseById(id), null),
    );
  }

  const byKey = new Map(rows.map((r) => [r.itemKey, r]));
  return ORDERED_MANUFACTURING_SPECIALIZATION_IDS.map((id) => {
    const base = baseById(id);
    return mergeManufacturingSpecializationItem(base, byKey.get(id) ?? null);
  });
}

/**
 * Admin Media Manager — one entry per accordion row with form defaults and image preview fields.
 */
export async function getManufacturingSpecializationItemsAdmin(): Promise<
  ManufacturingSpecializationItemAdminEntry[]
> {
  let rows: {
    itemKey: string;
    title: string;
    body: string;
    r2ObjectKey: string | null;
    heroImageLayout: unknown | null;
    updatedAt: Date;
  }[];
  try {
    rows = await prisma.manufacturingSpecializationItemCopy.findMany();
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getManufacturingSpecializationItemsAdmin: migration pending, empty overrides");
    } else {
      logger.error("getManufacturingSpecializationItemsAdmin: unexpected DB error", err);
    }
    rows = [];
  }

  const byKey = new Map(rows.map((r) => [r.itemKey, r]));

  return ORDERED_MANUFACTURING_SPECIALIZATION_IDS.map((id) => {
    const base = baseById(id);
    const row = byKey.get(id);
    const formTitle =
      row?.title != null && String(row.title).trim() !== ""
        ? String(row.title).trim()
        : base.title;
    const formBody =
      row?.body != null && String(row.body).trim() !== ""
        ? String(row.body)
        : plainManufacturingDescriptionToHtml(base.description);

    const r2Key = row?.r2ObjectKey ?? null;
    const customUrl = r2Key ? resolveSiteMediaDisplayUrl(r2Key) : null;
    const desktopPreviewSrc = customUrl ?? base.detailImageSrc ?? "";

    return {
      itemKey: id,
      canonicalLabel: base.title,
      formTitle,
      formBody,
      heroImageR2Key: r2Key,
      heroImageFraming: parseImageFramingJson(row?.heroImageLayout),
      desktopPreviewSrc,
      editorSyncKey: row ? row.updatedAt.toISOString() : `seed-${id}`,
    };
  });
}
