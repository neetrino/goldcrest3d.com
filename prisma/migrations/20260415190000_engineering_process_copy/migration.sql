-- CreateTable
CREATE TABLE "EngineeringProcessCopy" (
    "id" TEXT NOT NULL,
    "sectionTitle" TEXT NOT NULL,
    "step1Title" TEXT NOT NULL,
    "step1Subtitle" TEXT NOT NULL,
    "step1Description" TEXT NOT NULL,
    "step2Title" TEXT NOT NULL,
    "step2Subtitle" TEXT NOT NULL,
    "step2Description" TEXT NOT NULL,
    "step3Title" TEXT NOT NULL,
    "step3Subtitle" TEXT NOT NULL,
    "step3Description" TEXT NOT NULL,
    "step4Title" TEXT NOT NULL,
    "step4Subtitle" TEXT NOT NULL,
    "step4Description" TEXT NOT NULL,
    "step5Title" TEXT NOT NULL,
    "step5Subtitle" TEXT NOT NULL,
    "step5Description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngineeringProcessCopy_pkey" PRIMARY KEY ("id")
);
