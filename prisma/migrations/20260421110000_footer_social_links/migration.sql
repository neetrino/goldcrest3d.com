-- Editable footer social links for the landing "Follow" section.
CREATE TABLE "FooterSocialLink" (
    "key" TEXT NOT NULL,
    "url" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FooterSocialLink_pkey" PRIMARY KEY ("key")
);

-- Seed current live links so behavior remains unchanged after migration.
INSERT INTO "FooterSocialLink" ("key", "url", "updatedAt")
VALUES
    ('instagram', 'https://www.instagram.com/goldcrest3d/', NOW()),
    ('linkedin', 'https://linkedin.com', NOW()),
    ('behance', 'https://www.behance.net', NOW())
ON CONFLICT ("key") DO NOTHING;
