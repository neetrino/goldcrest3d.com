"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { baseById } from "@/lib/manufacturing-specialization-items/base-by-id";
import { parseManufacturingSpecializationItemKey } from "@/lib/manufacturing-specialization-items/manufacturing-specialization-item-keys";
import { plainManufacturingDescriptionToHtml } from "@/lib/manufacturing-specialization-items/plain-default-description-html";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { deleteObjectFromR2, uploadSiteMediaToR2 } from "@/lib/storage";
import { validateSiteMediaImage } from "@/lib/validations/siteMediaImage";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

export type ManufacturingSpecializationItemImageActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateManufacturing(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<ManufacturingSpecializationItemImageActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

export async function uploadManufacturingSpecializationItemImage(
  _prev: ManufacturingSpecializationItemImageActionResult | null,
  formData: FormData,
): Promise<ManufacturingSpecializationItemImageActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const itemKey = parseManufacturingSpecializationItemKey(formData.get("itemKey"));
  if (!itemKey) {
    return { ok: false, error: "Invalid item." };
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
    const existing = await prisma.manufacturingSpecializationItemCopy.findUnique({
      where: { itemKey },
    });
    if (existing?.r2ObjectKey && existing.r2ObjectKey !== newKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }

    const base = baseById(itemKey);
    const initialBody = finalizeHeroBannerBodyHtml(
      plainManufacturingDescriptionToHtml(base.description),
    );

    await prisma.manufacturingSpecializationItemCopy.upsert({
      where: { itemKey },
      create: {
        itemKey,
        title: base.title,
        body: initialBody,
        r2ObjectKey: newKey,
      },
      update: {
        r2ObjectKey: newKey,
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("uploadManufacturingSpecializationItemImage: failed", e);
    await deleteObjectFromR2(newKey);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not save. Try again." };
  }

  revalidateManufacturing();
  return { ok: true };
}

export async function clearManufacturingSpecializationItemImage(
  _prev: ManufacturingSpecializationItemImageActionResult | null,
  formData: FormData,
): Promise<ManufacturingSpecializationItemImageActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const itemKey = parseManufacturingSpecializationItemKey(formData.get("itemKey"));
  if (!itemKey) {
    return { ok: false, error: "Invalid item." };
  }

  try {
    const existing = await prisma.manufacturingSpecializationItemCopy.findUnique({
      where: { itemKey },
    });
    if (!existing?.r2ObjectKey) {
      revalidateManufacturing();
      return { ok: true };
    }
    await deleteObjectFromR2(existing.r2ObjectKey);
    await prisma.manufacturingSpecializationItemCopy.update({
      where: { itemKey },
      data: {
        r2ObjectKey: null,
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("clearManufacturingSpecializationItemImage: failed", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset image. Try again." };
  }

  revalidateManufacturing();
  return { ok: true };
}
