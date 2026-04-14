-- CreateTable
CREATE TABLE "ManufacturingIntelligenceCopy" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "r2ObjectKey" TEXT,
    "heroImageLayout" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ManufacturingIntelligenceCopy_pkey" PRIMARY KEY ("id")
);
