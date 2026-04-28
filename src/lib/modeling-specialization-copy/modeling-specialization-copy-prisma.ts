import { prisma } from "@/lib/db";

type ModelingSpecializationCopyDbRow = {
  slotKey: string;
  titleDesktop: string | null;
  titleMobile: string | null;
  bodyDesktop: string | null;
  bodyMobile: string | null;
  titleTablet: string | null;
  bodyTablet: string | null;
  titleDesktopOffsetY: number | null;
  titleMobileOffsetY: number | null;
  bodyDesktopOffsetY: number | null;
  bodyMobileOffsetY: number | null;
  titleTabletOffsetY: number | null;
  bodyTabletOffsetY: number | null;
  desktopLine1Emphasis: string | null;
  tabletLine1Emphasis: string | null;
  updatedAt: Date;
};

type ModelingSpecializationCopyDelegate = {
  findMany: (args?: object) => Promise<ModelingSpecializationCopyDbRow[]>;
  upsert: (args: object) => Promise<ModelingSpecializationCopyDbRow>;
};

export const modelingSpecializationCopy = (
  prisma as unknown as {
    modelingSpecializationCopy?: ModelingSpecializationCopyDelegate;
  }
).modelingSpecializationCopy ?? {
  async findMany() {
    return [];
  },
  async upsert() {
    throw new Error(
      "Prisma client is missing ModelingSpecializationCopy delegate. Run prisma generate.",
    );
  },
};
