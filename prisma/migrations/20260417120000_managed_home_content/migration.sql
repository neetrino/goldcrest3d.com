-- CreateTable
CREATE TABLE "ManagedHomeContent" (
    "sectionKey" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagedHomeContent_pkey" PRIMARY KEY ("sectionKey")
);
