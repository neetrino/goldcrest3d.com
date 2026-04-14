"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { parseManufacturingSpecializationItemKey } from "@/lib/manufacturing-specialization-items/manufacturing-specialization-item-keys";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import {
  clampImageFraming,
  type ImageFraming,
} from "@/lib/site-media/image-framing";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

export type ManufacturingSpecializationItemFramingActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateManufacturing(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<ManufacturingSpecializationItemFramingActionResult | null> {
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
  return clampImageFraming({
    focusX: Number.parseFloat(rawX),
    focusY: Number.parseFloat(rawY),
    zoom: Number.parseFloat(rawZ),
  });
}

export async function saveManufacturingSpecializationItemFraming(
  _prev: ManufacturingSpecializationItemFramingActionResult | null,
  formData: FormData,
): Promise<ManufacturingSpecializationItemFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const itemKey = parseManufacturingSpecializationItemKey(formData.get("itemKey"));
  if (!itemKey) {
    return { ok: false, error: "Invalid item." };
  }

  const framing = parseFramingFromForm(formData);
  if (!framing) {
    return { ok: false, error: "Invalid framing values." };
  }

  try {
    const row = await prisma.manufacturingSpecializationItemCopy.findUnique({
      where: { itemKey },
    });
    if (!row?.r2ObjectKey) {
      return {
        ok: false,
        error: "Upload a custom image before adjusting framing.",
      };
    }
    await prisma.manufacturingSpecializationItemCopy.update({
      where: { itemKey },
      data: { heroImageLayout: framing as object },
    });
  } catch (e) {
    logger.error("saveManufacturingSpecializationItemFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not save framing." };
  }

  revalidateManufacturing();
  return { ok: true };
}

export async function resetManufacturingSpecializationItemFraming(
  _prev: ManufacturingSpecializationItemFramingActionResult | null,
  formData: FormData,
): Promise<ManufacturingSpecializationItemFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const itemKey = parseManufacturingSpecializationItemKey(formData.get("itemKey"));
  if (!itemKey) {
    return { ok: false, error: "Invalid item." };
  }

  try {
    const row = await prisma.manufacturingSpecializationItemCopy.findUnique({
      where: { itemKey },
    });
    if (!row) {
      revalidateManufacturing();
      return { ok: true };
    }
    await prisma.manufacturingSpecializationItemCopy.update({
      where: { itemKey },
      data: {
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("resetManufacturingSpecializationItemFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset framing." };
  }

  revalidateManufacturing();
  return { ok: true };
}
