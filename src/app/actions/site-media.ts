"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/auth";
import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";
import { prisma } from "@/lib/db";
import { FOOTER_SOCIAL_KEYS } from "@/lib/footer-social/footer-social.keys";
import { footerSocialLink } from "@/lib/footer-social/footer-social-prisma";
import { FOUNDER_SECTION_COPY_KEYS } from "@/lib/founder-section/founder-section-copy.keys";
import { engineeringProcessCopy } from "@/lib/engineering-process/engineering-process-copy-prisma";
import {
  getFounderDesktopMediaSlotId,
  getFounderMobileMediaSlotId,
} from "@/lib/founder-section/founder-section-content";
import { FOUNDER_SECTION_MOBILE_COPY_KEYS } from "@/lib/founder-section/founder-section-mobile-copy.keys";
import {
  DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
  normalizeManufacturingImageTransform,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import { manufacturingIntelligenceCopy } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy-prisma";
import {
  getManufacturingItemDescriptionKey,
  getManufacturingItemTitleKey,
  MANUFACTURING_SECTION_COPY_KEYS,
} from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.keys";
import {
  getManufacturingMobileItemDescriptionKey,
  getManufacturingMobileItemTitleKey,
} from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-mobile-copy.keys";
import { logger } from "@/lib/logger";
import { modelingSpecializationCopy } from "@/lib/modeling-specialization-copy/modeling-specialization-copy-prisma";
import { normalizeModelingSpecializationCopyPayload } from "@/lib/modeling-specialization-copy/normalize-modeling-specialization-copy";
import { getManufacturingMobileMediaSlotId } from "@/lib/manufacturing-intelligence/manufacturing-intelligence-mobile-content";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import {
  SITE_MEDIA_GROUP_KEYS,
  MODELING_SLOT_KEYS,
  type ModelingSlotKey,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";
import {
  deleteObjectFromR2,
  uploadModelingMobileImageToR2,
  uploadSiteMediaToR2,
} from "@/lib/storage";
import { validateSiteMediaImage } from "@/lib/validations/siteMediaImage";
import {
  POWER_BANNER_KEY_SET,
  POWER_BANNER_KEYS,
  POWER_BANNER_SLOT_IDS,
  type PowerBannerKey,
  type PowerBannerViewport,
  POWER_BANNER_VIEWPORT_SET,
} from "@/lib/power-banner-copy/power-banner-keys";
import { POWER_BANNER_DEFAULT_TRANSFORMS } from "@/lib/power-banner-copy/power-banner-defaults";
import {
  manufacturingIntelligenceHeadingFormSchema,
  manufacturingIntelligenceItemFormSchema,
} from "@/lib/validations/manufacturingIntelligenceItem";
import { founderSectionFormSchema } from "@/lib/validations/founderSection";
import { modelingSpecializationCopyFormSchema } from "@/lib/validations/modelingSpecializationCopy";
import { powerBannerTransformFormSchema } from "@/lib/validations/powerBannerCopy";
import { engineeringProcessStepFormSchema } from "@/lib/validations/engineeringProcessStep";
import { footerSocialLinksFormSchema } from "@/lib/validations/footerSocialLinks";

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));
const MANUFACTURING_SLOT_SET = new Set<string>(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item) => item.id),
);
const MANUFACTURING_SORT_ORDER = new Map<string, number>(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item, index) => [item.id, index]),
);
const MANUFACTURING_MOBILE_SORT_ORDER = new Map<string, number>(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item, index) => [item.id, index]),
);

export type ModelingSlotImageVariant = "desktop" | "mobile";
export type HeroBannerImageVariant = "desktop" | "mobile";
export type FounderSectionVariant = "desktop" | "mobile";

const ORDERED_GROUPS = new Set<SiteMediaGroupKey>([
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
]);

const MAX_ORDERED_ITEMS = 12;
const HERO_BANNER_SORT_ORDER = new Map<string, number>(
  POWER_BANNER_KEYS.map((key, index) => [key, index]),
);
const FOUNDER_SORT_ORDER = {
  desktop: 0,
  mobile: 0,
} as const;

export type SiteMediaActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateSite() {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<SiteMediaActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

export async function upsertModelingSlotImage(
  slotKey: string,
  variant: ModelingSlotImageVariant,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!MODELING_SLOT_SET.has(slotKey)) {
    return { ok: false, error: "Invalid slot." };
  }
  if (variant !== "desktop" && variant !== "mobile") {
    return { ok: false, error: "Invalid variant." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const isDesktop = variant === "desktop";
  const newKey = isDesktop
    ? await uploadSiteMediaToR2(file)
    : await uploadModelingMobileImageToR2(file);
  if (!newKey) {
    return {
      ok: false,
      error: isDesktop
        ? "Upload failed. Check R2 configuration."
        : "Upload failed. The image could not be processed (try PNG, JPEG, or WebP) or R2 is misconfigured.",
    };
  }

  const typedSlot = slotKey as ModelingSlotKey;
  try {
    const existing = await siteMediaItem.findUnique({
      where: { slotId: typedSlot },
    });

    if (existing) {
      const oldKey = isDesktop ? existing.r2ObjectKey : existing.r2ObjectKeyMobile;
      if (oldKey) {
        await deleteObjectFromR2(oldKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: isDesktop
          ? { r2ObjectKey: newKey }
          : { r2ObjectKeyMobile: newKey },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
          slotId: typedSlot,
          sortOrder: 0,
          r2ObjectKey: isDesktop ? newKey : null,
          r2ObjectKeyMobile: isDesktop ? null : newKey,
        },
      });
    }
  } catch (e) {
    logger.error("upsertModelingSlotImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateModelingSlotCopy(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = modelingSpecializationCopyFormSchema.safeParse({
    slotKey: formData.get("slotKey"),
    titleDesktop: formData.get("titleDesktop"),
    titleMobile: formData.get("titleMobile"),
    bodyDesktop: formData.get("bodyDesktop"),
    bodyMobile: formData.get("bodyMobile"),
    titleDesktopOffsetY: formData.get("titleDesktopOffsetY"),
    titleMobileOffsetY: formData.get("titleMobileOffsetY"),
    bodyDesktopOffsetY: formData.get("bodyDesktopOffsetY"),
    bodyMobileOffsetY: formData.get("bodyMobileOffsetY"),
    desktopLine1Emphasis: formData.get("desktopLine1Emphasis"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.slotKey?.[0] ??
        fieldErrors.titleDesktop?.[0] ??
        fieldErrors.titleMobile?.[0] ??
        fieldErrors.bodyDesktop?.[0] ??
        fieldErrors.bodyMobile?.[0] ??
        fieldErrors.titleDesktopOffsetY?.[0] ??
        fieldErrors.titleMobileOffsetY?.[0] ??
        fieldErrors.bodyDesktopOffsetY?.[0] ??
        fieldErrors.bodyMobileOffsetY?.[0] ??
        fieldErrors.desktopLine1Emphasis?.[0] ??
        "Invalid input.",
    };
  }

  const payload = normalizeModelingSpecializationCopyPayload({
    titleDesktop: parsed.data.titleDesktop,
    titleMobile: parsed.data.titleMobile,
    bodyDesktop: parsed.data.bodyDesktop,
    bodyMobile: parsed.data.bodyMobile,
    titleDesktopOffsetY: parsed.data.titleDesktopOffsetY,
    titleMobileOffsetY: parsed.data.titleMobileOffsetY,
    bodyDesktopOffsetY: parsed.data.bodyDesktopOffsetY,
    bodyMobileOffsetY: parsed.data.bodyMobileOffsetY,
    desktopLine1Emphasis: parsed.data.desktopLine1Emphasis,
  });

  try {
    await modelingSpecializationCopy.upsert({
      where: { slotKey: parsed.data.slotKey },
      create: {
        slotKey: parsed.data.slotKey,
        ...payload,
      },
      update: {
        titleDesktop: payload.titleDesktop,
        titleMobile: payload.titleMobile,
        bodyDesktop: payload.bodyDesktop,
        bodyMobile: payload.bodyMobile,
        titleDesktopOffsetY: payload.titleDesktopOffsetY,
        titleMobileOffsetY: payload.titleMobileOffsetY,
        bodyDesktopOffsetY: payload.bodyDesktopOffsetY,
        bodyMobileOffsetY: payload.bodyMobileOffsetY,
        desktopLine1Emphasis: payload.desktopLine1Emphasis,
      },
    });
  } catch (e) {
    logger.error("updateModelingSlotCopy", e);
    return { ok: false, error: "Could not save text content." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateEngineeringProcessStep(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = engineeringProcessStepFormSchema.safeParse({
    stepKey: formData.get("stepKey"),
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.stepKey?.[0] ??
        fieldErrors.title?.[0] ??
        fieldErrors.description?.[0] ??
        "Invalid process step values.",
    };
  }

  try {
    await engineeringProcessCopy.upsert({
      where: { stepKey: parsed.data.stepKey },
      create: {
        stepKey: parsed.data.stepKey,
        title: parsed.data.title,
        description: parsed.data.description,
      },
      update: {
        title: parsed.data.title,
        description: parsed.data.description,
      },
    });
  } catch (error) {
    logger.error("updateEngineeringProcessStep", error);
    return { ok: false, error: "Could not save process step content." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateFooterSocialLinks(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = footerSocialLinksFormSchema.safeParse({
    instagram: formData.get("instagram"),
    linkedin: formData.get("linkedin"),
    behance: formData.get("behance"),
    youtube: formData.get("youtube"),
    whatsappPhone: formData.get("whatsappPhone"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.instagram?.[0] ??
        fieldErrors.linkedin?.[0] ??
        fieldErrors.behance?.[0] ??
        fieldErrors.youtube?.[0] ??
        fieldErrors.whatsappPhone?.[0] ??
        "Invalid social links.",
    };
  }

  const normalized = {
    instagram: parsed.data.instagram.length > 0 ? parsed.data.instagram : null,
    linkedin: parsed.data.linkedin.length > 0 ? parsed.data.linkedin : null,
    behance: parsed.data.behance.length > 0 ? parsed.data.behance : null,
    youtube: parsed.data.youtube.length > 0 ? parsed.data.youtube : null,
    whatsappPhone: parsed.data.whatsappPhone.length > 0 ? parsed.data.whatsappPhone : null,
  };

  try {
    await footerSocialLink.upsert({
      where: { key: FOOTER_SOCIAL_KEYS.INSTAGRAM },
      create: {
        key: FOOTER_SOCIAL_KEYS.INSTAGRAM,
        url: normalized.instagram,
      },
      update: { url: normalized.instagram },
    });
    await footerSocialLink.upsert({
      where: { key: FOOTER_SOCIAL_KEYS.LINKEDIN },
      create: {
        key: FOOTER_SOCIAL_KEYS.LINKEDIN,
        url: normalized.linkedin,
      },
      update: { url: normalized.linkedin },
    });
    await footerSocialLink.upsert({
      where: { key: FOOTER_SOCIAL_KEYS.BEHANCE },
      create: {
        key: FOOTER_SOCIAL_KEYS.BEHANCE,
        url: normalized.behance,
      },
      update: { url: normalized.behance },
    });
    await footerSocialLink.upsert({
      where: { key: FOOTER_SOCIAL_KEYS.YOUTUBE },
      create: {
        key: FOOTER_SOCIAL_KEYS.YOUTUBE,
        url: normalized.youtube,
      },
      update: { url: normalized.youtube },
    });
    await footerSocialLink.upsert({
      where: { key: FOOTER_SOCIAL_KEYS.WHATSAPP_PHONE },
      create: {
        key: FOOTER_SOCIAL_KEYS.WHATSAPP_PHONE,
        url: normalized.whatsappPhone,
      },
      update: { url: normalized.whatsappPhone },
    });
  } catch (error) {
    logger.error("updateFooterSocialLinks", error);
    return { ok: false, error: "Could not save social links." };
  }

  revalidateSite();
  return { ok: true };
}

export async function upsertManufacturingIntelligenceImage(
  itemId: string,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!MANUFACTURING_SLOT_SET.has(itemId)) {
    return { ok: false, error: "Invalid manufacturing item." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId: itemId } });
    if (existing) {
      if (existing.r2ObjectKey) {
        await deleteObjectFromR2(existing.r2ObjectKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
          r2ObjectKey: newKey,
        },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
          slotId: itemId,
          sortOrder: MANUFACTURING_SORT_ORDER.get(itemId) ?? 0,
          r2ObjectKey: newKey,
          layoutMeta: DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
        },
      });
    }
  } catch (e) {
    logger.error("upsertManufacturingIntelligenceImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function upsertManufacturingIntelligenceMobileImage(
  itemId: string,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!MANUFACTURING_SLOT_SET.has(itemId)) {
    return { ok: false, error: "Invalid manufacturing item." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  const slotId = getManufacturingMobileMediaSlotId(itemId);
  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId } });
    if (existing) {
      if (existing.r2ObjectKey) {
        await deleteObjectFromR2(existing.r2ObjectKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE,
          r2ObjectKey: newKey,
        },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE,
          slotId,
          sortOrder: MANUFACTURING_MOBILE_SORT_ORDER.get(itemId) ?? 0,
          r2ObjectKey: newKey,
          layoutMeta: DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
        },
      });
    }
  } catch (e) {
    logger.error("upsertManufacturingIntelligenceMobileImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function upsertHeroBannerImage(
  bannerKey: string,
  viewport: HeroBannerImageVariant,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!POWER_BANNER_KEY_SET.has(bannerKey)) {
    return { ok: false, error: "Invalid hero banner." };
  }
  if (!POWER_BANNER_VIEWPORT_SET.has(viewport)) {
    return { ok: false, error: "Invalid image viewport." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  const typedKey = bannerKey as PowerBannerKey;
  const typedViewport = viewport as PowerBannerViewport;
  const slotId = POWER_BANNER_SLOT_IDS[typedViewport][typedKey];
  const defaultTransform = POWER_BANNER_DEFAULT_TRANSFORMS[typedViewport][typedKey];

  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId } });
    if (existing) {
      if (existing.r2ObjectKey) {
        await deleteObjectFromR2(existing.r2ObjectKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
          r2ObjectKey: newKey,
          r2ObjectKeyMobile: null,
        },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
          slotId,
          sortOrder: HERO_BANNER_SORT_ORDER.get(typedKey) ?? 0,
          r2ObjectKey: newKey,
          r2ObjectKeyMobile: null,
          layoutMeta: defaultTransform,
        },
      });
    }
  } catch (e) {
    logger.error("upsertHeroBannerImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateHeroBannerTransform(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = powerBannerTransformFormSchema.safeParse({
    bannerKey: formData.get("bannerKey"),
    viewport: formData.get("viewport"),
    imageAlt: formData.get("imageAlt"),
    zoom: formData.get("zoom"),
    offsetX: formData.get("offsetX"),
    offsetY: formData.get("offsetY"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.bannerKey?.[0] ??
        fieldErrors.viewport?.[0] ??
        fieldErrors.imageAlt?.[0] ??
        fieldErrors.zoom?.[0] ??
        fieldErrors.offsetX?.[0] ??
        fieldErrors.offsetY?.[0] ??
        "Invalid input.",
    };
  }

  const typedKey = parsed.data.bannerKey as PowerBannerKey;
  const typedViewport = parsed.data.viewport as PowerBannerViewport;
  const slotId = POWER_BANNER_SLOT_IDS[typedViewport][typedKey];
  const transform = normalizeManufacturingImageTransform({
    zoom: parsed.data.zoom,
    offsetX: parsed.data.offsetX,
    offsetY: parsed.data.offsetY,
  });

  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId } });
    if (existing) {
      await siteMediaItem.update({
        where: { id: existing.id },
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
          alt: parsed.data.imageAlt,
          layoutMeta: transform,
        },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
          slotId,
          sortOrder: HERO_BANNER_SORT_ORDER.get(typedKey) ?? 0,
          alt: parsed.data.imageAlt,
          layoutMeta: transform,
        },
      });
    }
  } catch (e) {
    logger.error("updateHeroBannerTransform", e);
    return { ok: false, error: "Could not save hero banner transform." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateManufacturingIntelligenceHeadings(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = manufacturingIntelligenceHeadingFormSchema.safeParse({
    desktopHeading: formData.get("desktopHeading"),
    mobileHeading: formData.get("mobileHeading"),
    desktopHeadingKey: formData.get("desktopHeadingKey"),
    mobileHeadingKey: formData.get("mobileHeadingKey"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.desktopHeading?.[0] ??
        fieldErrors.mobileHeading?.[0] ??
        "Invalid heading values.",
    };
  }
  try {
    await manufacturingIntelligenceCopy.upsert({
      where: { key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP },
      create: {
        key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP,
        value: parsed.data.desktopHeading,
      },
      update: { value: parsed.data.desktopHeading },
    });
    await manufacturingIntelligenceCopy.upsert({
      where: { key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE },
      create: {
        key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE,
        value: parsed.data.mobileHeading,
      },
      update: { value: parsed.data.mobileHeading },
    });
  } catch (e) {
    logger.error("updateManufacturingIntelligenceHeadings", e);
    return { ok: false, error: "Could not save headings." };
  }
  revalidateSite();
  return { ok: true };
}

export async function updateManufacturingIntelligenceItem(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = manufacturingIntelligenceItemFormSchema.safeParse({
    itemId: formData.get("itemId"),
    title: formData.get("title"),
    description: formData.get("description"),
    imageAlt: formData.get("imageAlt"),
    zoom: formData.get("zoom"),
    offsetX: formData.get("offsetX"),
    offsetY: formData.get("offsetY"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.itemId?.[0] ??
        fieldErrors.title?.[0] ??
        fieldErrors.description?.[0] ??
        fieldErrors.imageAlt?.[0] ??
        fieldErrors.zoom?.[0] ??
        fieldErrors.offsetX?.[0] ??
        fieldErrors.offsetY?.[0] ??
        "Invalid input.",
    };
  }

  const { itemId, title, description, imageAlt } = parsed.data;
  const transform = normalizeManufacturingImageTransform({
    zoom: parsed.data.zoom,
    offsetX: parsed.data.offsetX,
    offsetY: parsed.data.offsetY,
  });

  try {
    await prisma.$transaction(async (tx) => {
      const transactionalClient = tx as typeof tx & {
        siteMediaItem: typeof siteMediaItem;
        manufacturingIntelligenceCopy: {
          upsert: (args: object) => Promise<unknown>;
        };
      };
      await transactionalClient.manufacturingIntelligenceCopy.upsert({
        where: { key: getManufacturingItemTitleKey(itemId) },
        create: { key: getManufacturingItemTitleKey(itemId), value: title },
        update: { value: title },
      });
      await transactionalClient.manufacturingIntelligenceCopy.upsert({
        where: { key: getManufacturingItemDescriptionKey(itemId) },
        create: { key: getManufacturingItemDescriptionKey(itemId), value: description },
        update: { value: description },
      });
      const existing = await transactionalClient.siteMediaItem.findUnique({
        where: { slotId: itemId },
      });
      if (existing) {
        await transactionalClient.siteMediaItem.update({
          where: { id: existing.id },
          data: {
            sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
            alt: imageAlt,
            layoutMeta: transform,
          },
        });
      } else {
        await transactionalClient.siteMediaItem.create({
          data: {
            sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
            slotId: itemId,
            sortOrder: MANUFACTURING_SORT_ORDER.get(itemId) ?? 0,
            alt: imageAlt,
            layoutMeta: transform,
          },
        });
      }
    });
  } catch (e) {
    logger.error("updateManufacturingIntelligenceItem", e);
    return { ok: false, error: "Could not save manufacturing content." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateManufacturingIntelligenceMobileItem(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = manufacturingIntelligenceItemFormSchema.safeParse({
    itemId: formData.get("itemId"),
    title: formData.get("title"),
    description: formData.get("description"),
    imageAlt: formData.get("imageAlt"),
    zoom: formData.get("zoom"),
    offsetX: formData.get("offsetX"),
    offsetY: formData.get("offsetY"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.itemId?.[0] ??
        fieldErrors.title?.[0] ??
        fieldErrors.description?.[0] ??
        fieldErrors.imageAlt?.[0] ??
        fieldErrors.zoom?.[0] ??
        fieldErrors.offsetX?.[0] ??
        fieldErrors.offsetY?.[0] ??
        "Invalid input.",
    };
  }

  const { itemId, title, description, imageAlt } = parsed.data;
  const transform = normalizeManufacturingImageTransform({
    zoom: parsed.data.zoom,
    offsetX: parsed.data.offsetX,
    offsetY: parsed.data.offsetY,
  });
  const slotId = getManufacturingMobileMediaSlotId(itemId);

  try {
    await prisma.$transaction(async (tx) => {
      const transactionalClient = tx as typeof tx & {
        siteMediaItem: typeof siteMediaItem;
        manufacturingIntelligenceMobileCopy: {
          upsert: (args: object) => Promise<unknown>;
        };
      };
      await transactionalClient.manufacturingIntelligenceMobileCopy.upsert({
        where: { key: getManufacturingMobileItemTitleKey(itemId) },
        create: { key: getManufacturingMobileItemTitleKey(itemId), value: title },
        update: { value: title },
      });
      await transactionalClient.manufacturingIntelligenceMobileCopy.upsert({
        where: { key: getManufacturingMobileItemDescriptionKey(itemId) },
        create: { key: getManufacturingMobileItemDescriptionKey(itemId), value: description },
        update: { value: description },
      });
      const existing = await transactionalClient.siteMediaItem.findUnique({
        where: { slotId },
      });
      if (existing) {
        await transactionalClient.siteMediaItem.update({
          where: { id: existing.id },
          data: {
            sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE,
            alt: imageAlt,
            layoutMeta: transform,
          },
        });
      } else {
        await transactionalClient.siteMediaItem.create({
          data: {
            sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE,
            slotId,
            sortOrder: MANUFACTURING_MOBILE_SORT_ORDER.get(itemId) ?? 0,
            alt: imageAlt,
            layoutMeta: transform,
          },
        });
      }
    });
  } catch (e) {
    logger.error("updateManufacturingIntelligenceMobileItem", e);
    return { ok: false, error: "Could not save manufacturing mobile content." };
  }

  revalidateSite();
  return { ok: true };
}

function getFounderVariantConfig(variant: FounderSectionVariant): {
  sectionKey: SiteMediaGroupKey;
  slotId: string;
  sortOrder: number;
  keys: {
    HEADING: string;
    NAME: string;
    BIO_P1: string;
    BIO_P2: string;
    BIO_P3?: string;
    BIO_P4?: string;
    STAT_YEARS_VALUE: string;
    STAT_YEARS_CAPTION: string;
    STAT_PROJECTS_VALUE: string;
    STAT_PROJECTS_CAPTION: string;
    IMAGE_ALT: string;
  };
} {
  if (variant === "mobile") {
    return {
      sectionKey: SITE_MEDIA_GROUP_KEYS.FOUNDER_MOBILE,
      slotId: getFounderMobileMediaSlotId(),
      sortOrder: FOUNDER_SORT_ORDER.mobile,
      keys: FOUNDER_SECTION_MOBILE_COPY_KEYS,
    };
  }
  return {
    sectionKey: SITE_MEDIA_GROUP_KEYS.FOUNDER_DESKTOP,
    slotId: getFounderDesktopMediaSlotId(),
    sortOrder: FOUNDER_SORT_ORDER.desktop,
    keys: FOUNDER_SECTION_COPY_KEYS,
  };
}

export async function upsertFounderSectionImage(
  variant: FounderSectionVariant,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (variant !== "desktop" && variant !== "mobile") {
    return { ok: false, error: "Invalid founder variant." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }
  const config = getFounderVariantConfig(variant);
  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId: config.slotId } });
    if (existing?.r2ObjectKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }
    if (existing) {
      await siteMediaItem.update({
        where: { id: existing.id },
        data: { sectionKey: config.sectionKey, r2ObjectKey: newKey },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: config.sectionKey,
          slotId: config.slotId,
          sortOrder: config.sortOrder,
          r2ObjectKey: newKey,
          layoutMeta: DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
        },
      });
    }
  } catch (error) {
    logger.error("upsertFounderSectionImage", error);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateFounderSectionContent(
  variant: FounderSectionVariant,
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (variant !== "desktop" && variant !== "mobile") {
    return { ok: false, error: "Invalid founder variant." };
  }

  const parsed = founderSectionFormSchema.safeParse({
    heading: formData.get("heading"),
    name: formData.get("name"),
    bioP1: formData.get("bioP1"),
    bioP2: formData.get("bioP2"),
    bioP3: formData.get("bioP3"),
    bioP4: formData.get("bioP4"),
    yearsValue: formData.get("yearsValue"),
    yearsCaption: formData.get("yearsCaption"),
    projectsValue: formData.get("projectsValue"),
    projectsCaption: formData.get("projectsCaption"),
    imageAlt: formData.get("imageAlt"),
    zoom: formData.get("zoom"),
    offsetX: formData.get("offsetX"),
    offsetY: formData.get("offsetY"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.heading?.[0] ??
        fieldErrors.name?.[0] ??
        fieldErrors.bioP1?.[0] ??
        fieldErrors.bioP2?.[0] ??
        fieldErrors.bioP3?.[0] ??
        fieldErrors.bioP4?.[0] ??
        fieldErrors.yearsValue?.[0] ??
        fieldErrors.yearsCaption?.[0] ??
        fieldErrors.projectsValue?.[0] ??
        fieldErrors.projectsCaption?.[0] ??
        fieldErrors.imageAlt?.[0] ??
        fieldErrors.zoom?.[0] ??
        fieldErrors.offsetX?.[0] ??
        fieldErrors.offsetY?.[0] ??
        "Invalid founder section values.",
    };
  }

  const data = parsed.data;
  const config = getFounderVariantConfig(variant);
  const transform = normalizeManufacturingImageTransform({
    zoom: data.zoom,
    offsetX: data.offsetX,
    offsetY: data.offsetY,
  });

  const copyEntries: Array<{ key: string; value: string }> = [
    { key: config.keys.HEADING, value: data.heading },
    { key: config.keys.NAME, value: data.name },
    { key: config.keys.BIO_P1, value: data.bioP1 },
    { key: config.keys.BIO_P2, value: data.bioP2 },
    { key: config.keys.STAT_YEARS_VALUE, value: data.yearsValue },
    { key: config.keys.STAT_YEARS_CAPTION, value: data.yearsCaption },
    { key: config.keys.STAT_PROJECTS_VALUE, value: data.projectsValue },
    { key: config.keys.STAT_PROJECTS_CAPTION, value: data.projectsCaption },
    { key: config.keys.IMAGE_ALT, value: data.imageAlt },
  ];
  if (config.keys.BIO_P3) copyEntries.push({ key: config.keys.BIO_P3, value: data.bioP3 });
  if (config.keys.BIO_P4) copyEntries.push({ key: config.keys.BIO_P4, value: data.bioP4 });

  try {
    await prisma.$transaction(async (tx) => {
      const transactionalClient = tx as typeof tx & {
        siteMediaItem: typeof siteMediaItem;
        founderSectionCopy: { upsert: (args: object) => Promise<unknown> };
        founderSectionMobileCopy: { upsert: (args: object) => Promise<unknown> };
      };
      for (const entry of copyEntries) {
        if (variant === "mobile") {
          await transactionalClient.founderSectionMobileCopy.upsert({
            where: { key: entry.key },
            create: { key: entry.key, value: entry.value },
            update: { value: entry.value },
          });
        } else {
          await transactionalClient.founderSectionCopy.upsert({
            where: { key: entry.key },
            create: { key: entry.key, value: entry.value },
            update: { value: entry.value },
          });
        }
      }
      const existing = await transactionalClient.siteMediaItem.findUnique({
        where: { slotId: config.slotId },
      });
      if (existing) {
        await transactionalClient.siteMediaItem.update({
          where: { id: existing.id },
          data: {
            sectionKey: config.sectionKey,
            alt: data.imageAlt,
            layoutMeta: transform,
          },
        });
      } else {
        await transactionalClient.siteMediaItem.create({
          data: {
            sectionKey: config.sectionKey,
            slotId: config.slotId,
            sortOrder: config.sortOrder,
            alt: data.imageAlt,
            layoutMeta: transform,
          },
        });
      }
    });
  } catch (error) {
    logger.error("updateFounderSectionContent", error);
    return { ok: false, error: "Could not save founder section content." };
  }

  revalidateSite();
  return { ok: true };
}

export async function addOrderedGalleryImage(
  groupKey: SiteMediaGroupKey,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!ORDERED_GROUPS.has(groupKey)) {
    return { ok: false, error: "Invalid group." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const count = await siteMediaItem.count({ where: { sectionKey: groupKey } });
  if (count >= MAX_ORDERED_ITEMS) {
    return { ok: false, error: `Maximum ${MAX_ORDERED_ITEMS} images in this row.` };
  }

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  const slotId = crypto.randomUUID();
  try {
    await siteMediaItem.create({
      data: {
        sectionKey: groupKey,
        slotId,
        sortOrder: count,
        r2ObjectKey: newKey,
      },
    });
  } catch (e) {
    logger.error("addOrderedGalleryImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function replaceOrderedGalleryImage(
  id: string,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const existing = await siteMediaItem.findUnique({ where: { id } });
  if (!existing || !ORDERED_GROUPS.has(existing.sectionKey as SiteMediaGroupKey)) {
    return { ok: false, error: "Item not found." };
  }

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  try {
    if (existing.r2ObjectKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }
    await siteMediaItem.update({
      where: { id },
      data: { r2ObjectKey: newKey },
    });
  } catch (e) {
    logger.error("replaceOrderedGalleryImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not update image." };
  }

  revalidateSite();
  return { ok: true };
}

export async function deleteOrderedGalleryImage(
  id: string,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const existing = await siteMediaItem.findUnique({ where: { id } });
  if (!existing || !ORDERED_GROUPS.has(existing.sectionKey as SiteMediaGroupKey)) {
    return { ok: false, error: "Item not found." };
  }

  try {
    await siteMediaItem.delete({ where: { id } });
    if (existing.r2ObjectKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }
    const rest = await siteMediaItem.findMany({
      where: { sectionKey: existing.sectionKey },
      orderBy: { sortOrder: "asc" },
    });
    await prisma.$transaction(async (tx) => {
      const sm = tx as typeof tx & { siteMediaItem: typeof siteMediaItem };
      for (let index = 0; index < rest.length; index++) {
        const row = rest[index];
        if (!row) continue;
        await sm.siteMediaItem.update({
          where: { id: row.id },
          data: { sortOrder: index },
        });
      }
    });
  } catch (e) {
    logger.error("deleteOrderedGalleryImage", e);
    return { ok: false, error: "Could not delete image." };
  }

  revalidateSite();
  return { ok: true };
}

export async function reorderOrderedGallery(
  groupKey: SiteMediaGroupKey,
  orderedIds: string[],
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!ORDERED_GROUPS.has(groupKey)) {
    return { ok: false, error: "Invalid group." };
  }

  const existing = await siteMediaItem.findMany({
    where: { sectionKey: groupKey },
  });
  if (orderedIds.length !== existing.length) {
    return { ok: false, error: "Order list does not match items." };
  }
  const idSet = new Set(existing.map((r) => r.id));
  for (const id of orderedIds) {
    if (!idSet.has(id)) {
      return { ok: false, error: "Invalid item id in order." };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      const sm = tx as typeof tx & { siteMediaItem: typeof siteMediaItem };
      for (let index = 0; index < orderedIds.length; index++) {
        const id = orderedIds[index];
        if (id === undefined) continue;
        await sm.siteMediaItem.update({
          where: { id },
          data: { sortOrder: index },
        });
      }
    });
  } catch (e) {
    logger.error("reorderOrderedGallery", e);
    return { ok: false, error: "Could not save order." };
  }

  revalidateSite();
  return { ok: true };
}
