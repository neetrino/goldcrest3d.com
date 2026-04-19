import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";
import { withPrismaConnectionRetry } from "@/lib/db/prisma-transient-retry";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { ORDERED_MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";
import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";
import { parseModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

import { defaultModelingSlotCopyBundle } from "./modeling-slot-copy-defaults";
import type { ModelingSlotCopyBundle } from "./modeling-slot-copy.types";

function getModelingSlotCopyDelegate(): {
  findMany: () => Promise<
    {
      slotKey: string;
      title: string;
      titleMobile: string | null;
      body: string;
      bodyMobile: string | null;
      textLayoutMobile: unknown | null;
    }[]
  >;
} | null {
  const delegate = (
    prisma as unknown as {
      modelingSlotCopy?: {
        findMany: () => Promise<
          {
            slotKey: string;
            title: string;
            titleMobile: string | null;
            body: string;
            bodyMobile: string | null;
            textLayoutMobile: unknown | null;
          }[]
        >;
      };
    }
  ).modelingSlotCopy;
  if (delegate == null || typeof delegate.findMany !== "function") {
    return null;
  }
  return delegate;
}

/**
 * Loads persisted Modeling Specialization copy; merges DB rows with code defaults per slot.
 */
export async function getModelingSlotCopyBundle(): Promise<ModelingSlotCopyBundle> {
  const delegate = getModelingSlotCopyDelegate();
  if (delegate == null) {
    logger.info(
      "getModelingSlotCopyBundle: Prisma client has no ModelingSlotCopy delegate (stale client). Run `pnpm exec prisma generate` and restart the dev server.",
    );
    return defaultModelingSlotCopyBundle();
  }

  let rows: {
    slotKey: string;
    title: string;
    titleMobile: string | null;
    body: string;
    bodyMobile: string | null;
    textLayoutMobile: unknown | null;
  }[];
  try {
    rows = await withPrismaConnectionRetry(prisma, () => delegate.findMany());
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getModelingSlotCopyBundle: migration pending, using defaults");
    } else {
      logger.error("getModelingSlotCopyBundle: unexpected DB error", err);
    }
    return defaultModelingSlotCopyBundle();
  }

  const byKey = new Map(rows.map((r) => [r.slotKey, r]));
  const out = defaultModelingSlotCopyBundle();
  for (const key of ORDERED_MODELING_SLOT_KEYS) {
    const row = byKey.get(key);
    if (row) {
      const mobileLayout = parseModelingTextOverlayLayout(row.textLayoutMobile);
      out[key as ModelingSlotKey] = {
        title: row.title,
        titleMobile: row.titleMobile ?? "",
        body: row.body,
        bodyMobile: row.bodyMobile ?? "",
        mobileTitleFontSizePx: mobileLayout?.title.fontSizePx ?? null,
        mobileBodyFontSizePx: mobileLayout?.body.fontSizePx ?? null,
      };
    }
  }
  return out;
}
