-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "readAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Lead_readAt_idx" ON "Lead"("readAt");
