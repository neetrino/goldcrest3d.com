-- Editable text for shared Our Engineering Process section.
CREATE TABLE "EngineeringProcessCopy" (
    "stepKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EngineeringProcessCopy_pkey" PRIMARY KEY ("stepKey")
);

-- Seed live defaults to preserve current website copy.
INSERT INTO "EngineeringProcessCopy" ("stepKey", "title", "description", "updatedAt")
VALUES
    (
        'concept_review',
        'Concept Review',
        'Client vision, references and technical requirements are evaluated. Feasibility and structural considerations assessed before quotation.',
        NOW()
    ),
    (
        'quotation_prepayment',
        'Quotation & Prepayment',
        'Project scope defined and pricing confirmed. Modeling begins upon agreed prepayment.',
        NOW()
    ),
    (
        'progress_review',
        'Progress Review',
        'Half-ready or structurally defined model presented for evaluation. Adjustments discussed and aligned before finalization.',
        NOW()
    ),
    (
        'final_model_presentation',
        'Final Model Presentation',
        'Completed production-ready model delivered for approval. All structural and dimensional aspects calibrated and verified.',
        NOW()
    ),
    (
        'final_payment_release',
        'Final Payment & File Release',
        'Upon final payment, calibrated manufacturing files are delivered for production.',
        NOW()
    );
