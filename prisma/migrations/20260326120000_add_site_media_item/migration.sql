-- CreateTable
CREATE TABLE "SiteMediaItem" (
    "id" TEXT NOT NULL,
    "groupKey" TEXT NOT NULL,
    "slotKey" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "r2ObjectKey" TEXT NOT NULL,
    "altText" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteMediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteMediaItem_groupKey_slotKey_key" ON "SiteMediaItem"("groupKey", "slotKey");

-- CreateIndex
CREATE INDEX "SiteMediaItem_groupKey_sortOrder_idx" ON "SiteMediaItem"("groupKey", "sortOrder");
