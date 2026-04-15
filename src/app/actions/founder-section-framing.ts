"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { clampImageFraming, type ImageFraming } from "@/lib/site-media/image-framing";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { FOUNDER_SECTION_ID } from "@/lib/founder-section/founder-section-id";
import {
  FOUNDER_SECTION_DEFAULT_NAME,
  FOUNDER_SECTION_DEFAULT_BODY,
} from "@/lib/founder-section/founder-section-defaults";

export type FounderSectionFramingActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateFounderSection(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<FounderSectionFramingActionResult | null> {
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
  if (
    typeof rawX !== "string" ||
    typeof rawY !== "string" ||
    typeof rawZ !== "string"
  ) {
    return null;
  }
  return clampImageFraming({
    focusX: Number.parseFloat(rawX),
    focusY: Number.parseFloat(rawY),
    zoom: Number.parseFloat(rawZ),
  });
}

export async function saveFounderSectionFraming(
  _prev: FounderSectionFramingActionResult | null,
  formData: FormData,
): Promise<FounderSectionFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const framing = parseFramingFromForm(formData);
  if (!framing) {
    return { ok: false, error: "Invalid framing values." };
  }

  try {
    await prisma.founderSectionCopy.upsert({
      where: { id: FOUNDER_SECTION_ID },
      create: {
        id: FOUNDER_SECTION_ID,
        name: FOUNDER_SECTION_DEFAULT_NAME,
        body: FOUNDER_SECTION_DEFAULT_BODY,
        heroImageLayout: framing as object,
      },
      update: {
        heroImageLayout: framing as object,
      },
    });
  } catch (e) {
    logger.error("saveFounderSectionFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not save framing." };
  }

  revalidateFounderSection();
  return { ok: true };
}

export async function resetFounderSectionFraming(
  _prev: FounderSectionFramingActionResult | null,
  _formData: FormData,
): Promise<FounderSectionFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const row = await prisma.founderSectionCopy.findUnique({
      where: { id: FOUNDER_SECTION_ID },
    });
    if (!row) {
      revalidateFounderSection();
      return { ok: true };
    }
    await prisma.founderSectionCopy.update({
      where: { id: FOUNDER_SECTION_ID },
      data: {
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("resetFounderSectionFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset framing." };
  }

  revalidateFounderSection();
  return { ok: true };
}
