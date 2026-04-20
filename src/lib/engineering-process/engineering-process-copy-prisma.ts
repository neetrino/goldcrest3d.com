import { prisma } from "@/lib/db";

type EngineeringProcessCopyDbRow = {
  stepKey: string;
  title: string;
  description: string;
  updatedAt: Date;
};

type EngineeringProcessCopyDelegate = {
  findMany: (args?: object) => Promise<EngineeringProcessCopyDbRow[]>;
  upsert: (args: object) => Promise<EngineeringProcessCopyDbRow>;
};

export const engineeringProcessCopy = (
  prisma as unknown as {
    engineeringProcessCopy?: EngineeringProcessCopyDelegate;
  }
).engineeringProcessCopy ?? {
  async findMany() {
    return [];
  },
  async upsert() {
    throw new Error("Prisma client is missing EngineeringProcessCopy delegate. Run prisma generate.");
  },
};
