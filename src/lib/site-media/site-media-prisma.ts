import { prisma } from "@/lib/db";

/**
 * `SiteMediaItem` տող — համապատասխանում է `schema.prisma` մոդելին (Neon)։
 */
export type SiteMediaItemRow = {
  id: string;
  sectionKey: string;
  slotId: string;
  sortOrder: number;
  r2ObjectKey: string | null;
  r2ObjectKeyMobile: string | null;
  legacySrc: string | null;
  alt: string | null;
  layoutMeta: unknown | null;
  publicLabelKey: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type SiteMediaItemDelegate = {
  findMany: (args?: object) => Promise<SiteMediaItemRow[]>;
  findUnique: (args: object) => Promise<SiteMediaItemRow | null>;
  count: (args: object) => Promise<number>;
  create: (args: object) => Promise<SiteMediaItemRow>;
  upsert: (args: object) => Promise<SiteMediaItemRow>;
  update: (args: object) => Promise<SiteMediaItemRow>;
  delete: (args: object) => Promise<SiteMediaItemRow>;
};

/**
 * `SiteMediaItem` delegate — assertion, եթե IDE-ի Prisma client-ը հին է։
 */
export const siteMediaItem = (
  prisma as unknown as { siteMediaItem: SiteMediaItemDelegate }
).siteMediaItem;
