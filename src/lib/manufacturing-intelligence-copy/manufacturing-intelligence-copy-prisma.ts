import { prisma } from "@/lib/db";

type ManufacturingIntelligenceCopyDbRow = {
  key: string;
  value: string;
  updatedAt: Date;
};

type ManufacturingIntelligenceCopyDelegate = {
  findMany: (args?: object) => Promise<ManufacturingIntelligenceCopyDbRow[]>;
  upsert: (args: object) => Promise<ManufacturingIntelligenceCopyDbRow>;
};

export const manufacturingIntelligenceCopy = (
  prisma as unknown as {
    manufacturingIntelligenceCopy?: ManufacturingIntelligenceCopyDelegate;
  }
).manufacturingIntelligenceCopy ?? {
  async findMany() {
    return [];
  },
  async upsert() {
    throw new Error(
      "Prisma client is missing ManufacturingIntelligenceCopy delegate. Run prisma generate.",
    );
  },
};
