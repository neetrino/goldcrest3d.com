-- Seed hero banner text so homepage content is DB-backed by default.
INSERT INTO "PowerBannerCopy" ("bannerKey", "title", "body", "updatedAt")
VALUES
  (
    'MODELING',
    '3D Production-Ready Modeling',
    'Engineered for casting, printing and precise stone setting. Every micron accounted for.',
    NOW()
  ),
  (
    'RENDERING',
    'Jewelry Rendering',
    'High-resolution assets for brand presentation and global sales. Perfection in every light ray.',
    NOW()
  ),
  (
    'DESIGN',
    'Jewelry Design',
    'Concept-to-CAD development for legacy collection building. Your vision, engineered.',
    NOW()
  )
ON CONFLICT ("bannerKey") DO NOTHING;

-- Register hero banner media slots in SiteMediaItem (fallback to legacy local images until replaced in admin).
INSERT INTO "SiteMediaItem" (
  "sectionKey",
  "slotId",
  "sortOrder",
  "legacySrc",
  "alt"
)
VALUES
  (
    'hero_banners',
    'hero_modeling',
    0,
    '/images/modeling/hero-production-ready-jewelry-cad.png',
    '3D Production-Ready Modeling hero banner'
  ),
  (
    'hero_banners',
    'hero_rendering',
    1,
    '/images/rendering/hero-jewelry-rendering.png',
    'Jewelry Rendering hero banner'
  ),
  (
    'hero_banners',
    'hero_design',
    2,
    '/images/design/hero-jewelry-design-brief.png',
    'Jewelry Design hero banner'
  )
ON CONFLICT ("slotId") DO NOTHING;
