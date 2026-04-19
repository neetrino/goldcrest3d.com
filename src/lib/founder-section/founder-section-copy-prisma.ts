import { prisma } from "@/lib/db";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

type FounderSectionCopyDbRow = {
  key: string;
  value: string;
  updatedAt: Date;
};

type FounderSectionCopyDelegate = {
  findMany: (args?: object) => Promise<FounderSectionCopyDbRow[]>;
  upsert: (args: object) => Promise<FounderSectionCopyDbRow>;
};

const founderSectionCopyDelegate = (
  prisma as unknown as {
    founderSectionCopy?: FounderSectionCopyDelegate;
  }
).founderSectionCopy;

export const founderSectionCopy = {
  async findMany(args?: object): Promise<FounderSectionCopyDbRow[]> {
    if (!founderSectionCopyDelegate) {
      return [];
    }
    try {
      return founderSectionCopyDelegate.findMany(args);
    } catch (error) {
      if (isMigrationPendingError(error)) {
        return [];
      }
      throw error;
    }
  },
  async upsert(args: object): Promise<FounderSectionCopyDbRow> {
    if (!founderSectionCopyDelegate) {
      throw new Error(
        "Prisma client is missing FounderSectionCopy delegate. Run prisma generate.",
      );
    }
    return founderSectionCopyDelegate.upsert(args);
  },
};
