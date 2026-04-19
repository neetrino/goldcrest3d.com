import { prisma } from "@/lib/db";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

type FounderSectionMobileCopyDbRow = {
  key: string;
  value: string;
  updatedAt: Date;
};

type FounderSectionMobileCopyDelegate = {
  findMany: (args?: object) => Promise<FounderSectionMobileCopyDbRow[]>;
  upsert: (args: object) => Promise<FounderSectionMobileCopyDbRow>;
};

const founderSectionMobileCopyDelegate = (
  prisma as unknown as {
    founderSectionMobileCopy?: FounderSectionMobileCopyDelegate;
  }
).founderSectionMobileCopy;

export const founderSectionMobileCopy = {
  async findMany(args?: object): Promise<FounderSectionMobileCopyDbRow[]> {
    if (!founderSectionMobileCopyDelegate) {
      return [];
    }
    try {
      return founderSectionMobileCopyDelegate.findMany(args);
    } catch (error) {
      if (isMigrationPendingError(error)) {
        return [];
      }
      throw error;
    }
  },
  async upsert(args: object): Promise<FounderSectionMobileCopyDbRow> {
    if (!founderSectionMobileCopyDelegate) {
      throw new Error(
        "Prisma client is missing FounderSectionMobileCopy delegate. Run prisma generate.",
      );
    }
    return founderSectionMobileCopyDelegate.upsert(args);
  },
};
