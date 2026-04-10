-- Hero power-banner copy (Admin → Media Manager)
CREATE TABLE "PowerBannerCopy" (
    "bannerKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PowerBannerCopy_pkey" PRIMARY KEY ("bannerKey")
);
