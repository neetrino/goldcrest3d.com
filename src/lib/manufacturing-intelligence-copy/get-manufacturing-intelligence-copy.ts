import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import { MANUFACTURING_INTELLIGENCE_COPY_ID } from "./manufacturing-intelligence-copy-id";
import type { ManufacturingIntelligenceCopyEntry } from "./manufacturing-intelligence-copy.types";
import { MANUFACTURING_INTELLIGENCE_DEFAULT_TITLE } from "./manufacturing-intelligence-defaults";
import { resolveManufacturingIntelligenceImageFields } from "./resolve-manufacturing-intelligence-image";

function defaultEntry(): ManufacturingIntelligenceCopyEntry {
  return {
    title: MANUFACTURING_INTELLIGENCE_DEFAULT_TITLE,
    body: "",
    customImageDisplayUrl: null,
    heroImageR2Key: null,
    heroImageFraming: null,
  };
}

/**
 * Loads persisted Manufacturing Intelligence copy for the landing page and admin.
 */
export async function getManufacturingIntelligenceCopyBundle(): Promise<ManufacturingIntelligenceCopyEntry> {
  let row: {
    title: string;
    body: string;
    r2ObjectKey: string | null;
    heroImageLayout: unknown | null;
  } | null;
  try {
    row = await prisma.manufacturingIntelligenceCopy.findUnique({
      where: { id: MANUFACTURING_INTELLIGENCE_COPY_ID },
    });
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info(
        "getManufacturingIntelligenceCopyBundle: migration pending, using defaults",
      );
    } else {
      logger.error("getManufacturingIntelligenceCopyBundle: unexpected DB error", err);
    }
    return defaultEntry();
  }

  if (!row) {
    return defaultEntry();
  }

  const images = resolveManufacturingIntelligenceImageFields(
    row.r2ObjectKey,
    row.heroImageLayout,
  );

  return {
    title: row.title.trim() || MANUFACTURING_INTELLIGENCE_DEFAULT_TITLE,
    body: row.body,
    ...images,
  };
}
