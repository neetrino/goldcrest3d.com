import { LANDING_IMAGE_IDS } from "@/constants";
import {
  MODELING_MOBILE_PREVIEW_BODY_FONT_PX_DEFAULT,
  MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_DEFAULT,
} from "@/constants/modeling-specialization-mobile-preview-font";
import {
  MODELING_TABLET_PREVIEW_BODY_FONT_PX_DEFAULT,
  MODELING_TABLET_PREVIEW_TITLE_FONT_PX_DEFAULT,
} from "@/constants/modeling-specialization-tablet-preview-font";
import {
  EMPTY_FOOTER_SOCIAL_LINKS,
  FOOTER_SOCIAL_KEYS,
  type FooterSocialLinks,
} from "@/lib/footer-social/footer-social.keys";
import { footerSocialLink } from "@/lib/footer-social/footer-social-prisma";
import {
  buildFounderDesktopContent,
  buildFounderMobileContent,
} from "@/lib/founder-section/founder-section-content";
import { founderSectionCopy } from "@/lib/founder-section/founder-section-copy-prisma";
import { founderSectionMobileCopy } from "@/lib/founder-section/founder-section-mobile-copy-prisma";
import type { FounderSectionContent } from "@/lib/founder-section/founder-section.types";
import {
  getDefaultEngineeringProcessSteps,
  mergeEngineeringProcessSteps,
} from "@/lib/engineering-process/engineering-process.defaults";
import { engineeringProcessCopy } from "@/lib/engineering-process/engineering-process-copy-prisma";
import type { EngineeringProcessStep } from "@/lib/engineering-process/engineering-process.types";
import { buildManufacturingIntelligenceContent } from "@/lib/manufacturing-intelligence/manufacturing-intelligence-content";
import { buildManufacturingIntelligenceMobileContent } from "@/lib/manufacturing-intelligence/manufacturing-intelligence-mobile-content";
import type { ManufacturingIntelligenceContent } from "@/lib/manufacturing-intelligence/manufacturing-intelligence.types";
import { manufacturingIntelligenceCopy } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy-prisma";
import { manufacturingIntelligenceMobileCopy } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-mobile-copy-prisma";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import {
  emptyModelingSpecializationCopyRow,
  normalizeModelingSpecializationCopyPayload,
} from "@/lib/modeling-specialization-copy/normalize-modeling-specialization-copy";
import type { ModelingSpecializationCopyRow } from "@/lib/modeling-specialization-copy/modeling-specialization-copy.types";

import { isMigrationPendingError } from "./is-migration-pending-error";
import {
  DEFAULT_FINISHED_ROW1,
  DEFAULT_FINISHED_ROW2,
  DEFAULT_MODELING_IMAGE_URL,
  type FinishedGalleryItem,
} from "./landing-defaults";
import { resolveSiteMediaDisplayUrl } from "./resolve-display-url";
import {
  siteMediaItem,
  type SiteMediaItemRow,
} from "./site-media-prisma";
import {
  ORDERED_MODELING_SLOT_KEYS,
  SITE_MEDIA_GROUP_KEYS,
  type ModelingSlotKey,
} from "./site-media.registry";

/** Desktop vs mobile URLs for Modeling Specialization (mobile falls back to desktop when not uploaded). Tablet tier is isolated (no runtime fallback to desktop/mobile URLs). */
export type ModelingSlotResolvedMedia = {
  desktop: string;
  mobile: string;
  tablet: string;
  /** True when `r2ObjectKeyTablet` is set in DB (vs default placeholder URL only). */
  hasTabletR2Upload: boolean;
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  bodyDesktop: string;
  bodyMobile: string;
  bodyTablet: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  titleDesktopOffsetX: number;
  titleMobileOffsetX: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  bodyDesktopOffsetX: number;
  bodyMobileOffsetX: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
  /** Mobile (< md) title/body font sizes from CMS; scales with section --ms/--mt. */
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
  /** Tablet (md–lg) title/body font sizes from CMS; scales with section --ms/--mt. */
  tabletPreviewTitleFontPx: number;
  tabletPreviewBodyFontPx: number;
};

export type LandingModelingMedia = Record<ModelingSlotKey, ModelingSlotResolvedMedia>;

export type LandingFinishedMedia = {
  row1: FinishedGalleryItem[];
  row2: FinishedGalleryItem[];
};

export type LandingSiteMedia = {
  modeling: LandingModelingMedia;
  manufacturingDesktop: ManufacturingIntelligenceContent;
  manufacturingMobile: ManufacturingIntelligenceContent;
  founderDesktop: FounderSectionContent;
  founderMobile: FounderSectionContent;
  engineeringProcess: EngineeringProcessStep[];
  footerSocialLinks: FooterSocialLinks;
  finished: LandingFinishedMedia;
};

function mapFooterSocialLinks(rows: Array<{ key: string; url: string | null }>): FooterSocialLinks {
  const byKey = new Map(rows.map((row) => [row.key, row.url]));
  return {
    instagram: byKey.get(FOOTER_SOCIAL_KEYS.INSTAGRAM) ?? null,
    linkedin: byKey.get(FOOTER_SOCIAL_KEYS.LINKEDIN) ?? null,
    behance: byKey.get(FOOTER_SOCIAL_KEYS.BEHANCE) ?? null,
    youtube: byKey.get(FOOTER_SOCIAL_KEYS.YOUTUBE) ?? null,
    whatsappPhone: byKey.get(FOOTER_SOCIAL_KEYS.WHATSAPP_PHONE) ?? null,
  };
}

function mergeModelingUrl(
  slot: ModelingSlotKey,
  r2ObjectKey: string | null | undefined,
): string {
  if (!r2ObjectKey) {
    return DEFAULT_MODELING_IMAGE_URL[slot];
  }
  const url = resolveSiteMediaDisplayUrl(r2ObjectKey);
  return url ?? DEFAULT_MODELING_IMAGE_URL[slot];
}

function mergeModelingTabletUrl(
  slot: ModelingSlotKey,
  r2ObjectKeyTablet: string | null | undefined,
): string {
  if (!r2ObjectKeyTablet) {
    return DEFAULT_MODELING_IMAGE_URL[slot];
  }
  const url = resolveSiteMediaDisplayUrl(r2ObjectKeyTablet);
  return url ?? DEFAULT_MODELING_IMAGE_URL[slot];
}

function buildFinishedRow(
  rows: Pick<SiteMediaItemRow, "slotId" | "r2ObjectKey" | "sortOrder">[],
  defaults: readonly FinishedGalleryItem[],
): FinishedGalleryItem[] {
  if (rows.length === 0) {
    return [...defaults];
  }
  const sorted = [...rows].sort((a, b) => a.sortOrder - b.sortOrder);
  const lastDefault = defaults[defaults.length - 1];
  return sorted.map((row, index) => {
    const fallback = defaults[index] ?? lastDefault;
    const url = row.r2ObjectKey
      ? resolveSiteMediaDisplayUrl(row.r2ObjectKey)
      : null;
    const src = url ?? fallback.src;
    const imageId =
      defaults[index]?.imageId ?? LANDING_IMAGE_IDS.FINISHED_1;
    /** Default slot 0 uses portrait-specific `object-position` for bundled art only. */
    const usesResolvedUpload = url != null;
    return {
      id: row.slotId,
      imageId,
      src,
      objectPositionClass: usesResolvedUpload
        ? undefined
        : fallback.objectPositionClass,
    };
  });
}

/**
 * Загружает URL изображений для лендинга: метаданные из Neon, файлы в R2.
 * Пустая БД → прежние статические пути и Figma/local URL из landing-defaults.
 */
export async function getLandingSiteMedia(): Promise<LandingSiteMedia> {
  try {
    const [
      modelingRows,
      manufacturingMediaRows,
      manufacturingMobileMediaRows,
      founderDesktopMediaRows,
      founderMobileMediaRows,
      row1Rows,
      row2Rows,
      modelingCopyRows,
      manufacturingCopyRows,
      manufacturingMobileCopyRows,
      founderDesktopCopyRows,
      founderMobileCopyRows,
      engineeringProcessCopyRows,
      footerSocialRows,
    ] =
      await Promise.all([
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.FOUNDER_DESKTOP,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.FOUNDER_MOBILE,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
        },
      }),
      siteMediaItem.findMany({
        where: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
        },
      }),
      prisma.modelingSpecializationCopy.findMany(),
      manufacturingIntelligenceCopy.findMany(),
      manufacturingIntelligenceMobileCopy.findMany(),
      founderSectionCopy.findMany(),
      founderSectionMobileCopy.findMany(),
      engineeringProcessCopy.findMany(),
      footerSocialLink.findMany(),
    ]);

    const modelingBySlot = new Map<
      ModelingSlotKey,
      { desktop: string | null; mobile: string | null; tablet: string | null }
    >(
      modelingRows.map((r: SiteMediaItemRow) => [
        r.slotId as ModelingSlotKey,
        {
          desktop: r.r2ObjectKey,
          mobile: r.r2ObjectKeyMobile,
          tablet: r.r2ObjectKeyTablet,
        },
      ]),
    );

    const modeling = {} as LandingModelingMedia;
    const copyBySlot = new Map<ModelingSlotKey, ModelingSpecializationCopyRow>(
      modelingCopyRows.map((row) => [
        row.slotKey as ModelingSlotKey,
        {
          slotKey: row.slotKey as ModelingSlotKey,
          ...normalizeModelingSpecializationCopyPayload({
            titleDesktop: row.titleDesktop ?? "",
            titleMobile: row.titleMobile ?? "",
            titleTablet: row.titleTablet ?? "",
            bodyDesktop: row.bodyDesktop ?? "",
            bodyMobile: row.bodyMobile ?? "",
            bodyTablet: row.bodyTablet ?? "",
            titleDesktopOffsetY: row.titleDesktopOffsetY ?? 0,
            titleMobileOffsetY: row.titleMobileOffsetY ?? 0,
            titleDesktopOffsetX: row.titleDesktopOffsetX ?? 0,
            titleMobileOffsetX: row.titleMobileOffsetX ?? 0,
            titleTabletOffsetY: row.titleTabletOffsetY ?? 0,
            titleTabletOffsetX: row.titleTabletOffsetX ?? 0,
            bodyDesktopOffsetY: row.bodyDesktopOffsetY ?? 0,
            bodyMobileOffsetY: row.bodyMobileOffsetY ?? 0,
            bodyDesktopOffsetX: row.bodyDesktopOffsetX ?? 0,
            bodyMobileOffsetX: row.bodyMobileOffsetX ?? 0,
            bodyTabletOffsetY: row.bodyTabletOffsetY ?? 0,
            bodyTabletOffsetX: row.bodyTabletOffsetX ?? 0,
            desktopLine1Emphasis: row.desktopLine1Emphasis ?? "",
            tabletLine1Emphasis: row.tabletLine1Emphasis ?? "",
            mobilePreviewTitleFontPx:
              row.mobilePreviewTitleFontPx ?? MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_DEFAULT,
            mobilePreviewBodyFontPx:
              row.mobilePreviewBodyFontPx ?? MODELING_MOBILE_PREVIEW_BODY_FONT_PX_DEFAULT,
            tabletPreviewTitleFontPx:
              row.tabletPreviewTitleFontPx ?? MODELING_TABLET_PREVIEW_TITLE_FONT_PX_DEFAULT,
            tabletPreviewBodyFontPx:
              row.tabletPreviewBodyFontPx ?? MODELING_TABLET_PREVIEW_BODY_FONT_PX_DEFAULT,
          }),
        },
      ]),
    );
    for (const slot of ORDERED_MODELING_SLOT_KEYS) {
      const row = modelingBySlot.get(slot);
      const copy = copyBySlot.get(slot) ?? emptyModelingSpecializationCopyRow(slot);
      if (!row) {
        modeling[slot] = {
          desktop: mergeModelingUrl(slot, undefined),
          mobile: mergeModelingUrl(slot, undefined),
          tablet: mergeModelingTabletUrl(slot, undefined),
          hasTabletR2Upload: false,
          titleDesktop: copy.titleDesktop,
          titleMobile: copy.titleMobile,
          titleTablet: copy.titleTablet,
          bodyDesktop: copy.bodyDesktop,
          bodyMobile: copy.bodyMobile,
          bodyTablet: copy.bodyTablet,
          titleDesktopOffsetY: copy.titleDesktopOffsetY,
          titleMobileOffsetY: copy.titleMobileOffsetY,
          titleDesktopOffsetX: copy.titleDesktopOffsetX,
          titleMobileOffsetX: copy.titleMobileOffsetX,
          titleTabletOffsetY: copy.titleTabletOffsetY,
          titleTabletOffsetX: copy.titleTabletOffsetX,
          bodyDesktopOffsetY: copy.bodyDesktopOffsetY,
          bodyMobileOffsetY: copy.bodyMobileOffsetY,
          bodyDesktopOffsetX: copy.bodyDesktopOffsetX,
          bodyMobileOffsetX: copy.bodyMobileOffsetX,
          bodyTabletOffsetY: copy.bodyTabletOffsetY,
          bodyTabletOffsetX: copy.bodyTabletOffsetX,
          desktopLine1Emphasis: copy.desktopLine1Emphasis,
          tabletLine1Emphasis: copy.tabletLine1Emphasis,
          mobilePreviewTitleFontPx: copy.mobilePreviewTitleFontPx,
          mobilePreviewBodyFontPx: copy.mobilePreviewBodyFontPx,
          tabletPreviewTitleFontPx: copy.tabletPreviewTitleFontPx,
          tabletPreviewBodyFontPx: copy.tabletPreviewBodyFontPx,
        };
        continue;
      }
      const desktopUrl = mergeModelingUrl(slot, row.desktop);
      const mobileKey = row.mobile ?? row.desktop;
      const mobileUrl = mergeModelingUrl(slot, mobileKey);
      const tabletUrl = mergeModelingTabletUrl(slot, row.tablet);
      modeling[slot] = {
        desktop: desktopUrl,
        mobile: mobileUrl,
        tablet: tabletUrl,
        hasTabletR2Upload: Boolean(row.tablet),
        titleDesktop: copy.titleDesktop,
        titleMobile: copy.titleMobile,
        titleTablet: copy.titleTablet,
        bodyDesktop: copy.bodyDesktop,
        bodyMobile: copy.bodyMobile,
        bodyTablet: copy.bodyTablet,
        titleDesktopOffsetY: copy.titleDesktopOffsetY,
        titleMobileOffsetY: copy.titleMobileOffsetY,
        titleDesktopOffsetX: copy.titleDesktopOffsetX,
        titleMobileOffsetX: copy.titleMobileOffsetX,
        titleTabletOffsetY: copy.titleTabletOffsetY,
        titleTabletOffsetX: copy.titleTabletOffsetX,
        bodyDesktopOffsetY: copy.bodyDesktopOffsetY,
        bodyMobileOffsetY: copy.bodyMobileOffsetY,
        bodyDesktopOffsetX: copy.bodyDesktopOffsetX,
        bodyMobileOffsetX: copy.bodyMobileOffsetX,
        bodyTabletOffsetY: copy.bodyTabletOffsetY,
        bodyTabletOffsetX: copy.bodyTabletOffsetX,
        desktopLine1Emphasis: copy.desktopLine1Emphasis,
        tabletLine1Emphasis: copy.tabletLine1Emphasis,
        mobilePreviewTitleFontPx: copy.mobilePreviewTitleFontPx,
        mobilePreviewBodyFontPx: copy.mobilePreviewBodyFontPx,
        tabletPreviewTitleFontPx: copy.tabletPreviewTitleFontPx,
        tabletPreviewBodyFontPx: copy.tabletPreviewBodyFontPx,
      };
    }
    const manufacturingDesktop = buildManufacturingIntelligenceContent(
      manufacturingCopyRows.map((row) => ({
        key: row.key,
        value: row.value,
      })),
      manufacturingMediaRows,
    );
    const manufacturingMobile = buildManufacturingIntelligenceMobileContent(
      manufacturingMobileCopyRows.map((row) => ({
        key: row.key,
        value: row.value,
      })),
      manufacturingMobileMediaRows,
    );
    const founderDesktop = buildFounderDesktopContent(
      founderDesktopCopyRows.map((row) => ({
        key: row.key,
        value: row.value,
      })),
      founderDesktopMediaRows,
    );
    const founderMobile = buildFounderMobileContent(
      founderMobileCopyRows.map((row) => ({
        key: row.key,
        value: row.value,
      })),
      founderMobileMediaRows,
    );
    const engineeringProcess = mergeEngineeringProcessSteps(
      engineeringProcessCopyRows.map((row) => ({
        stepKey: row.stepKey,
        title: row.title,
        description: row.description,
      })),
    );
    const footerSocialLinks = mapFooterSocialLinks(
      footerSocialRows.map((row) => ({
        key: row.key,
        url: row.url,
      })),
    );

    const finished: LandingFinishedMedia = {
      row1: buildFinishedRow(row1Rows, DEFAULT_FINISHED_ROW1),
      row2: buildFinishedRow(row2Rows, DEFAULT_FINISHED_ROW2),
    };

    return {
      modeling,
      manufacturingDesktop,
      manufacturingMobile,
      founderDesktop,
      founderMobile,
      engineeringProcess,
      footerSocialLinks,
      finished,
    };
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getLandingSiteMedia: migration pending, static fallback");
    } else {
      logger.error("getLandingSiteMedia: unexpected DB error", err);
    }
    return getStaticFallbackLandingSiteMedia();
  }
}

/** Для тестов и Storybook — без обращения к БД. */
export function getStaticFallbackLandingSiteMedia(): LandingSiteMedia {
  const modeling = {} as LandingModelingMedia;
  for (const slot of ORDERED_MODELING_SLOT_KEYS) {
    const url = DEFAULT_MODELING_IMAGE_URL[slot];
    const copy = emptyModelingSpecializationCopyRow(slot);
    modeling[slot] = {
      desktop: url,
      mobile: url,
      tablet: url,
      hasTabletR2Upload: false,
      titleDesktop: copy.titleDesktop,
      titleMobile: copy.titleMobile,
      titleTablet: copy.titleTablet,
      bodyDesktop: copy.bodyDesktop,
      bodyMobile: copy.bodyMobile,
      bodyTablet: copy.bodyTablet,
      titleDesktopOffsetY: copy.titleDesktopOffsetY,
      titleMobileOffsetY: copy.titleMobileOffsetY,
      titleDesktopOffsetX: copy.titleDesktopOffsetX,
      titleMobileOffsetX: copy.titleMobileOffsetX,
      titleTabletOffsetY: copy.titleTabletOffsetY,
      titleTabletOffsetX: copy.titleTabletOffsetX,
      bodyDesktopOffsetY: copy.bodyDesktopOffsetY,
      bodyMobileOffsetY: copy.bodyMobileOffsetY,
      bodyDesktopOffsetX: copy.bodyDesktopOffsetX,
      bodyMobileOffsetX: copy.bodyMobileOffsetX,
      bodyTabletOffsetY: copy.bodyTabletOffsetY,
      bodyTabletOffsetX: copy.bodyTabletOffsetX,
      desktopLine1Emphasis: copy.desktopLine1Emphasis,
      tabletLine1Emphasis: copy.tabletLine1Emphasis,
      mobilePreviewTitleFontPx: copy.mobilePreviewTitleFontPx,
      mobilePreviewBodyFontPx: copy.mobilePreviewBodyFontPx,
      tabletPreviewTitleFontPx: copy.tabletPreviewTitleFontPx,
      tabletPreviewBodyFontPx: copy.tabletPreviewBodyFontPx,
    };
  }
  const manufacturingDesktop = buildManufacturingIntelligenceContent([], []);
  const manufacturingMobile = buildManufacturingIntelligenceMobileContent([], []);
  const founderDesktop = buildFounderDesktopContent([], []);
  const founderMobile = buildFounderMobileContent([], []);
  const engineeringProcess = getDefaultEngineeringProcessSteps();
  return {
    modeling,
    manufacturingDesktop,
    manufacturingMobile,
    founderDesktop,
    founderMobile,
    engineeringProcess,
    footerSocialLinks: EMPTY_FOOTER_SOCIAL_LINKS,
    finished: {
      row1: [...DEFAULT_FINISHED_ROW1],
      row2: [...DEFAULT_FINISHED_ROW2],
    },
  };
}
