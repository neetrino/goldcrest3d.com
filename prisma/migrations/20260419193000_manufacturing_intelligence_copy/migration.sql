-- Editable key-value copy for Manufacturing Intelligence section.
CREATE TABLE "ManufacturingIntelligenceCopy" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManufacturingIntelligenceCopy_pkey" PRIMARY KEY ("key")
);

-- Seed live defaults so the public layout/content stays unchanged.
INSERT INTO "ManufacturingIntelligenceCopy" ("key", "value", "updatedAt")
VALUES
    ('manufacturing_heading_desktop', 'Manufacturing Intelligence', NOW()),
    ('manufacturing_heading_mobile', 'Manufacturing Intelligence', NOW()),
    ('manufacturing_image_alt', 'Manufacturing Intelligence section image', NOW()),
    (
        'manufacturing_item_title:wall-thickness-engineering',
        'Wall Thickness Engineering',
        NOW()
    ),
    (
        'manufacturing_item_description:wall-thickness-engineering',
        'Controlled wall thickness calibration based on material type, casting method and structural load requirements. Optimized to prevent deformation, porosity exposure and weak stress points during production.',
        NOW()
    ),
    (
        'manufacturing_item_title:stone-seat-geometry-setting',
        'Stone Seat Geometry & Setting Logic',
        NOW()
    ),
    (
        'manufacturing_item_description:stone-seat-geometry-setting',
        'Micron-level seat calibration aligned with stone dimensions and intended setting technique. Pavé density planning and prong architecture engineered for secure retention and long-term wear stability. Prongs dimensioned to minimal visual presence while maintaining structural integrity and reliable stone security under daily wear conditions.',
        NOW()
    ),
    (
        'manufacturing_item_title:casting-compensation-metal-flow',
        'Casting Compensation & Metal Flow Awareness',
        NOW()
    ),
    (
        'manufacturing_item_description:casting-compensation-metal-flow',
        'Shrinkage compensation and internal volume balance calculated at the
CAD stage. Metal flow logic and structural reinforcement zones defined
before mold preparation.',
        NOW()
    ),
    (
        'manufacturing_item_title:printing-strategy-resin',
        '3D Printing Strategy & Resin Behavior',
        NOW()
    ),
    (
        'manufacturing_item_description:printing-strategy-resin',
        'Support structure planning, overhang control and resin thickness awareness integrated into model architecture. Designed to minimize distortion and reduce post-processing risk.',
        NOW()
    ),
    (
        'manufacturing_item_title:mechanical-stress-load-distribution',
        'Mechanical Stress & Load Distribution',
        NOW()
    ),
    (
        'manufacturing_item_description:mechanical-stress-load-distribution',
        'Structural stress zones identified and reinforced through balanced
mass distribution. Engineered for impact resistance, movement stability
and long-term durability.',
        NOW()
    ),
    (
        'manufacturing_item_title:tolerance-control-assembly-precision',
        'Tolerance Control & Assembly Precision',
        NOW()
    ),
    (
        'manufacturing_item_description:tolerance-control-assembly-precision',
        'Tolerance calibration for multi-part structures, articulated systems and
locking mechanisms. Precision alignment developed to ensure smooth
mechanical performance after casting.',
        NOW()
    );
