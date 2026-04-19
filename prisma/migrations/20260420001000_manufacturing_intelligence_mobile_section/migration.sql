-- Separate editable copy storage for mobile Manufacturing Intelligence section.
CREATE TABLE "ManufacturingIntelligenceMobileCopy" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManufacturingIntelligenceMobileCopy_pkey" PRIMARY KEY ("key")
);

-- Seed defaults from desktop copy so mobile starts with current live content.
INSERT INTO "ManufacturingIntelligenceMobileCopy" ("key", "value", "updatedAt")
VALUES
    (
        'manufacturing_mobile_heading',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_heading_mobile'),
            'Manufacturing Intelligence'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_image_alt',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_image_alt'),
            'Manufacturing Intelligence section image'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_title:wall-thickness-engineering',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_title:wall-thickness-engineering'),
            'Wall Thickness Engineering'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_description:wall-thickness-engineering',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_description:wall-thickness-engineering'),
            ''
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_title:stone-seat-geometry-setting',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_title:stone-seat-geometry-setting'),
            'Stone Seat Geometry & Setting Logic'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_description:stone-seat-geometry-setting',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_description:stone-seat-geometry-setting'),
            ''
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_title:casting-compensation-metal-flow',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_title:casting-compensation-metal-flow'),
            'Casting Compensation & Metal Flow Awareness'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_description:casting-compensation-metal-flow',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_description:casting-compensation-metal-flow'),
            ''
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_title:printing-strategy-resin',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_title:printing-strategy-resin'),
            '3D Printing Strategy & Resin Behavior'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_description:printing-strategy-resin',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_description:printing-strategy-resin'),
            ''
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_title:mechanical-stress-load-distribution',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_title:mechanical-stress-load-distribution'),
            'Mechanical Stress & Load Distribution'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_description:mechanical-stress-load-distribution',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_description:mechanical-stress-load-distribution'),
            ''
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_title:tolerance-control-assembly-precision',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_title:tolerance-control-assembly-precision'),
            'Tolerance Control & Assembly Precision'
        ),
        NOW()
    ),
    (
        'manufacturing_mobile_item_description:tolerance-control-assembly-precision',
        COALESCE(
            (SELECT "value" FROM "ManufacturingIntelligenceCopy" WHERE "key" = 'manufacturing_item_description:tolerance-control-assembly-precision'),
            ''
        ),
        NOW()
    )
ON CONFLICT ("key") DO NOTHING;
