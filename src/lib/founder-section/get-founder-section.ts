import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import { FOUNDER_SECTION_ID } from "./founder-section-id";
import type { FounderSectionEntry } from "./founder-section.types";
import {
  FOUNDER_SECTION_DEFAULT_BODY,
  FOUNDER_SECTION_DEFAULT_NAME,
} from "./founder-section-defaults";
import { resolveFounderSectionImageFields } from "./resolve-founder-section-image";

function defaultEntry(): FounderSectionEntry {
  return {
    name: FOUNDER_SECTION_DEFAULT_NAME,
    body: FOUNDER_SECTION_DEFAULT_BODY,
    customImageDisplayUrl: null,
    heroImageR2Key: null,
    heroImageFraming: null,
  };
}

/**
 * Loads persisted Founder & Lead CAD Engineer section data for the admin.
 */
export async function getFounderSectionEntry(): Promise<FounderSectionEntry> {
  let row: {
    name: string;
    body: string;
    r2ObjectKey: string | null;
    heroImageLayout: unknown | null;
  } | null;

  try {
    row = await prisma.founderSectionCopy.findUnique({
      where: { id: FOUNDER_SECTION_ID },
    });
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getFounderSectionEntry: migration pending, using defaults");
    } else {
      logger.error("getFounderSectionEntry: unexpected DB error", err);
    }
    return defaultEntry();
  }

  if (!row) {
    return defaultEntry();
  }

  const images = resolveFounderSectionImageFields(row.r2ObjectKey, row.heroImageLayout);

  return {
    name: row.name.trim() || FOUNDER_SECTION_DEFAULT_NAME,
    body: row.body,
    ...images,
  };
}
