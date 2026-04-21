import { prisma } from "@/lib/db";

export type FooterSocialLinkDbRow = {
  key: string;
  url: string | null;
  updatedAt: Date;
};

type FooterSocialLinkDelegate = {
  findMany: (args?: object) => Promise<FooterSocialLinkDbRow[]>;
  upsert: (args: object) => Promise<FooterSocialLinkDbRow>;
};

export const footerSocialLink = (
  prisma as unknown as {
    footerSocialLink?: FooterSocialLinkDelegate;
  }
).footerSocialLink ?? {
  async findMany() {
    return [];
  },
  async upsert() {
    throw new Error("Prisma client is missing FooterSocialLink delegate. Run prisma generate.");
  },
};
