import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import { ENGINEERING_PROCESS_DEFAULT_COPY } from "./engineering-process-copy-defaults";
import { ENGINEERING_PROCESS_COPY_ID } from "./engineering-process-copy-id";
import type { EngineeringProcessCopyEntry } from "./engineering-process-copy.types";

function cloneDefault(): EngineeringProcessCopyEntry {
  return {
    sectionTitle: ENGINEERING_PROCESS_DEFAULT_COPY.sectionTitle,
    steps: ENGINEERING_PROCESS_DEFAULT_COPY.steps.map((step) => ({ ...step })),
  };
}

/** Loads persisted Engineering Process copy for the landing page and admin. */
export async function getEngineeringProcessCopyBundle(): Promise<EngineeringProcessCopyEntry> {
  let row:
    | {
        sectionTitle: string;
        step1Title: string;
        step1Subtitle: string;
        step1Description: string;
        step2Title: string;
        step2Subtitle: string;
        step2Description: string;
        step3Title: string;
        step3Subtitle: string;
        step3Description: string;
        step4Title: string;
        step4Subtitle: string;
        step4Description: string;
        step5Title: string;
        step5Subtitle: string;
        step5Description: string;
      }
    | null;

  try {
    row = await prisma.engineeringProcessCopy.findUnique({
      where: { id: ENGINEERING_PROCESS_COPY_ID },
    });
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getEngineeringProcessCopyBundle: migration pending, using defaults");
    } else {
      logger.error("getEngineeringProcessCopyBundle: unexpected DB error", err);
    }
    return cloneDefault();
  }

  if (!row) {
    return cloneDefault();
  }

  return {
    sectionTitle: row.sectionTitle,
    steps: [
      {
        num: "01",
        title: row.step1Title,
        subtitle: row.step1Subtitle,
        description: row.step1Description,
      },
      {
        num: "02",
        title: row.step2Title,
        subtitle: row.step2Subtitle,
        description: row.step2Description,
      },
      {
        num: "03",
        title: row.step3Title,
        subtitle: row.step3Subtitle,
        description: row.step3Description,
      },
      {
        num: "04",
        title: row.step4Title,
        subtitle: row.step4Subtitle,
        description: row.step4Description,
      },
      {
        num: "05",
        title: row.step5Title,
        subtitle: row.step5Subtitle,
        description: row.step5Description,
      },
    ],
  };
}

