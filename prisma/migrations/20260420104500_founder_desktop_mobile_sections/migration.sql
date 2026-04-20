-- Separate editable copy storage for Founder section desktop/mobile variants.
CREATE TABLE "FounderSectionCopy" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FounderSectionCopy_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "FounderSectionMobileCopy" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FounderSectionMobileCopy_pkey" PRIMARY KEY ("key")
);

-- Desktop defaults (current live founder desktop content).
INSERT INTO "FounderSectionCopy" ("key", "value", "updatedAt")
VALUES
    ('founder_desktop_heading', 'Founder & Lead CAD Engineer', NOW()),
    ('founder_desktop_name', 'Davit Sargsyan', NOW()),
    (
        'founder_desktop_bio_p1',
        'With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and
stone setting, the studio is built on practical manufacturing knowledge — not theory.
Direct experience at the bench provides a deep understanding of structural behavior, stone
security, tolerances and real-world production limitations.',
        NOW()
    ),
    (
        'founder_desktop_bio_p2',
        'Every design decision is informed by how the piece will be cast, set, assembled and worn. Each
project is personally reviewed, calibrated and validated before delivery.
No model leaves the studio without structural verification. Jewelry is approached as a system —
where design, engineering and craftsmanship must align with precision․',
        NOW()
    ),
    ('founder_desktop_stat_years_value', '16+', NOW()),
    ('founder_desktop_stat_years_caption', 'Years Experience', NOW()),
    ('founder_desktop_stat_projects_value', '2.5k+', NOW()),
    ('founder_desktop_stat_projects_caption', 'Projects Delivered', NOW()),
    ('founder_desktop_image_alt', 'Davit Sargsyan', NOW())
ON CONFLICT ("key") DO NOTHING;

-- Mobile defaults (current live founder mobile content).
INSERT INTO "FounderSectionMobileCopy" ("key", "value", "updatedAt")
VALUES
    ('founder_mobile_heading', 'Founder & Lead CAD Engineer', NOW()),
    ('founder_mobile_name', 'Davit Sargsyan', NOW()),
    (
        'founder_mobile_bio_p1',
        'With over 16 years of experience in jewelry craftsmanship, including professional goldsmithing and stone setting, the studio is built on practical manufacturing knowledge — not theory.',
        NOW()
    ),
    (
        'founder_mobile_bio_p2',
        'Direct experience at the bench provides a deep understanding of structural behavior, stone security, tolerances and real-world production limitations.',
        NOW()
    ),
    (
        'founder_mobile_bio_p3',
        'Every design decision is informed by how the piece will be cast, set, assembled and worn. Each project is personally reviewed, calibrated and validated before delivery.',
        NOW()
    ),
    (
        'founder_mobile_bio_p4',
        'No model leaves the studio without structural verification. Jewelry is approached as a system — where design, engineering and craftsmanship must align with precision․',
        NOW()
    ),
    ('founder_mobile_stat_years_value', '16+', NOW()),
    ('founder_mobile_stat_years_caption', 'Years Experience', NOW()),
    ('founder_mobile_stat_projects_value', '2.5k+', NOW()),
    ('founder_mobile_stat_projects_caption', 'Projects Delivered', NOW()),
    ('founder_mobile_image_alt', 'Davit Sargsyan', NOW())
ON CONFLICT ("key") DO NOTHING;
