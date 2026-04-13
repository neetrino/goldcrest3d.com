"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { logger } from "@/lib/logger";
import {
  clampImageFraming,
  type ImageFraming,
} from "@/lib/site-media/image-framing";
import {
  buildGalleryLayoutMeta,
  buildModelingLayoutMetaPatch,
  parseSiteMediaLayoutMeta,
  type SiteMediaLayoutMeta,
} from "@/lib/site-media/site-media-layout-meta";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import {
  SITE_MEDIA_GROUP_KEYS,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";

export type SiteMediaFramingActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateSite(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<SiteMediaFramingActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

function parseFramingFromForm(formData: FormData): ImageFraming | null {
  const rawX = formData.get("focusX");
  const rawY = formData.get("focusY");
  const rawZ = formData.get("zoom");
  if (typeof rawX !== "string" || typeof rawY !== "string" || typeof rawZ !== "string") {
    return null;
  }
  const focusX = Number.parseFloat(rawX);
  const focusY = Number.parseFloat(rawY);
  const zoom = Number.parseFloat(rawZ);
  return clampImageFraming({ focusX, focusY, zoom });
}

const ORDERED_GROUPS = new Set<SiteMediaGroupKey>([
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
]);

const MODELING_GROUP = SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION;

export async function saveOrderedGalleryFraming(
  _prev: SiteMediaFramingActionResult | null,
  formData: FormData,
): Promise<SiteMediaFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = formData.get("itemId");
  if (typeof id !== "string" || id.length === 0) {
    return { ok: false, error: "Invalid item." };
  }
  const framing = parseFramingFromForm(formData);
  if (!framing) {
    return { ok: false, error: "Invalid framing values." };
  }

  const existing = await siteMediaItem.findUnique({ where: { id } });
  if (!existing || !ORDERED_GROUPS.has(existing.sectionKey as SiteMediaGroupKey)) {
    return { ok: false, error: "Item not found." };
  }
  if (!existing.r2ObjectKey) {
    return { ok: false, error: "Upload an image before adjusting framing." };
  }

  try {
    const nextMeta = buildGalleryLayoutMeta(framing);
    await siteMediaItem.update({
      where: { id },
      data: { layoutMeta: nextMeta as object },
    });
  } catch (e) {
    logger.error("saveOrderedGalleryFraming", e);
    return { ok: false, error: "Could not save framing." };
  }

  revalidateSite();
  return { ok: true };
}

export async function saveModelingSlotFraming(
  _prev: SiteMediaFramingActionResult | null,
  formData: FormData,
): Promise<SiteMediaFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const slotId = formData.get("slotId");
  const variantRaw = formData.get("variant");
  if (typeof slotId !== "string" || slotId.length === 0) {
    return { ok: false, error: "Invalid slot." };
  }
  if (variantRaw !== "desktop" && variantRaw !== "mobile") {
    return { ok: false, error: "Invalid variant." };
  }
  const framing = parseFramingFromForm(formData);
  if (!framing) {
    return { ok: false, error: "Invalid framing values." };
  }

  const existing = await siteMediaItem.findUnique({ where: { slotId } });
  if (!existing || existing.sectionKey !== MODELING_GROUP) {
    return { ok: false, error: "Slot not found." };
  }
  const hasAsset =
    variantRaw === "desktop"
      ? Boolean(existing.r2ObjectKey)
      : Boolean(existing.r2ObjectKeyMobile ?? existing.r2ObjectKey);
  if (!hasAsset) {
    return { ok: false, error: "Upload an image for this variant first." };
  }

  try {
    const patch = buildModelingLayoutMetaPatch(
      existing.layoutMeta,
      variantRaw,
      framing,
    );
    await siteMediaItem.update({
      where: { id: existing.id },
      data: { layoutMeta: patch as object },
    });
  } catch (e) {
    logger.error("saveModelingSlotFraming", e);
    return { ok: false, error: "Could not save framing." };
  }

  revalidateSite();
  return { ok: true };
}

export async function resetOrderedGalleryFraming(
  _prev: SiteMediaFramingActionResult | null,
  formData: FormData,
): Promise<SiteMediaFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = formData.get("itemId");
  if (typeof id !== "string" || id.length === 0) {
    return { ok: false, error: "Invalid item." };
  }

  const existing = await siteMediaItem.findUnique({ where: { id } });
  if (!existing || !ORDERED_GROUPS.has(existing.sectionKey as SiteMediaGroupKey)) {
    return { ok: false, error: "Item not found." };
  }

  const meta = parseSiteMediaLayoutMeta(existing.layoutMeta);
  if (!meta?.framing) {
    return { ok: true };
  }

  try {
    await siteMediaItem.update({
      where: { id },
      data: { layoutMeta: null },
    });
  } catch (e) {
    logger.error("resetOrderedGalleryFraming", e);
    return { ok: false, error: "Could not reset framing." };
  }

  revalidateSite();
  return { ok: true };
}

export async function resetModelingSlotFraming(
  _prev: SiteMediaFramingActionResult | null,
  formData: FormData,
): Promise<SiteMediaFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const slotId = formData.get("slotId");
  const variantRaw = formData.get("variant");
  if (typeof slotId !== "string" || slotId.length === 0) {
    return { ok: false, error: "Invalid slot." };
  }
  if (variantRaw !== "desktop" && variantRaw !== "mobile") {
    return { ok: false, error: "Invalid variant." };
  }

  const existing = await siteMediaItem.findUnique({ where: { slotId } });
  if (!existing || existing.sectionKey !== MODELING_GROUP) {
    return { ok: false, error: "Slot not found." };
  }

  const meta = parseSiteMediaLayoutMeta(existing.layoutMeta);
  if (!meta) {
    return { ok: true };
  }
  const next: SiteMediaLayoutMeta = { ...meta };
  if (variantRaw === "desktop") {
    delete next.desktopFraming;
  } else {
    delete next.mobileFraming;
  }
  const hasData =
    Boolean(next.desktopFraming) ||
    Boolean(next.mobileFraming) ||
    Boolean(next.framing);

  try {
    await siteMediaItem.update({
      where: { id: existing.id },
      data: {
        layoutMeta: hasData ? (next as object) : null,
      },
    });
  } catch (e) {
    logger.error("resetModelingSlotFraming", e);
    return { ok: false, error: "Could not reset framing." };
  }

  revalidateSite();
  return { ok: true };
}
