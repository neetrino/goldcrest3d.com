import { prisma } from "@/lib/db";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

type ManufacturingIntelligenceMobileCopyDbRow = {
  key: string;
  value: string;
  updatedAt: Date;
};

type ManufacturingIntelligenceMobileCopyDelegate = {
  findMany: (args?: object) => Promise<ManufacturingIntelligenceMobileCopyDbRow[]>;
  upsert: (args: object) => Promise<ManufacturingIntelligenceMobileCopyDbRow>;
};

const manufacturingIntelligenceMobileCopyDelegate = (
  prisma as unknown as {
    manufacturingIntelligenceMobileCopy?: ManufacturingIntelligenceMobileCopyDelegate;
  }
).manufacturingIntelligenceMobileCopy;

export const manufacturingIntelligenceMobileCopy = {
  async findMany(args?: object): Promise<ManufacturingIntelligenceMobileCopyDbRow[]> {
    if (!manufacturingIntelligenceMobileCopyDelegate) {
      return [];
    }
    try {
      return await manufacturingIntelligenceMobileCopyDelegate.findMany(args);
    } catch (err) {
      if (isMigrationPendingError(err)) {
        return [];
      }
      throw err;
    }
  },
  async upsert(args: object): Promise<ManufacturingIntelligenceMobileCopyDbRow> {
    if (!manufacturingIntelligenceMobileCopyDelegate) {
      throw new Error(
        "Prisma client is missing ManufacturingIntelligenceMobileCopy delegate. Run prisma generate.",
      );
    }
    return manufacturingIntelligenceMobileCopyDelegate.upsert(args);
  },
};
