-- CreateTable
CREATE TABLE "ManufacturingSpecializationItemCopy" (
    "itemKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "r2ObjectKey" TEXT,
    "heroImageLayout" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ManufacturingSpecializationItemCopy_pkey" PRIMARY KEY ("itemKey")
);
