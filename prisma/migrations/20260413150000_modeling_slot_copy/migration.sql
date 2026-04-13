-- CreateTable
CREATE TABLE "ModelingSlotCopy" (
    "slotKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModelingSlotCopy_pkey" PRIMARY KEY ("slotKey")
);
