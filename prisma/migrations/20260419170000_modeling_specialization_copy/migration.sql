-- Editable text for Modeling Specialization cards.
CREATE TABLE "ModelingSpecializationCopy" (
    "slotKey" TEXT NOT NULL,
    "titleDesktop" TEXT,
    "titleMobile" TEXT,
    "bodyDesktop" TEXT,
    "bodyMobile" TEXT,
    "desktopLine1Emphasis" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModelingSpecializationCopy_pkey" PRIMARY KEY ("slotKey")
);

-- Seed current live copy so behavior stays unchanged after deploy.
INSERT INTO "ModelingSpecializationCopy" (
    "slotKey",
    "titleDesktop",
    "titleMobile",
    "bodyDesktop",
    "bodyMobile",
    "desktopLine1Emphasis",
    "updatedAt"
)
VALUES
    (
        'hip_hop',
        'Hip-Hop Jewelry',
        'Hip-Hop Jewelry',
        'High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution.
Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term
performance.',
        'High-mass, fully iced-out structures engineered for
structural durability and controlled weight distribution.
Advanced pavé density calibration and reinforced stone retention
designed for intensive wear and long-term performance.',
        NULL,
        NOW()
    ),
    (
        'bridal',
        'Bridal & Engagement',
        'Bridal & Engagement',
        'Engineered engagement and bridal
settings built for durability, comfort and
precise stone alignment. Secure prong
architecture developed for long-term wear.',
        'Engineered engagement and bridal settings built for
durability, comfort and precise stone alignment.',
        NULL,
        NOW()
    ),
    (
        'portrait',
        'High Jewelry',
        'High Jewelry',
        'Advanced pavé and fine-setting structures
developed with micron-level precision.
Invisible settings and ultra-thin tolerances
engineered with strict structural discipline.',
        'Advanced pavé and fine-setting structures
developed with micron-level precision.',
        NULL,
        NOW()
    ),
    (
        'mechanical',
        'Mechanical &
Lock Systems',
        'Mechanical &
Lock Systems',
        'Tolerance-calibrated clasps, hinges and
multi-part articulated
structures engineered for controlled
movement and secure locking
performance. Functional systems
developed for durability, precision
alignment and long-term
mechanical reliability.',
        'Tolerance-calibrated clasps, hinges and
multi-part articulated structures
engineered for controlled movement.',
        NULL,
        NOW()
    ),
    (
        'heritage',
        '3D Portrait Jewelry',
        '3D Portrait
Jewelry',
        'High-relief sculptural portraits
engineered with controlledvolume
distribution and balanced weight
architecture. Developed to integrate
pavé surfaces, deep dimensional detail
and reinforced structural support for
long-term durability.',
        'High-relief sculptural
portraits engineered with
controlled volume
distribution and balanced
weight architecture.',
        NULL,
        NOW()
    ),
    (
        'high_jewelry',
        'Ancient & Heritage Jewelry',
        'Ancient & Heritage Jewelry',
        'Cultural and historical motifs re-engineered into structurally optimized,
CAD frameworks. Authentic design language preserved through precise digital
reconstruction and manufacturing awareness.',
        'Cultural and historical motifs re-engineered
into structurally optimized, production-ready CAD frameworks.',
        'production-ready',
        NOW()
    );
