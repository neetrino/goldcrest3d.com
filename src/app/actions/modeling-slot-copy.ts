"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { modelingTextOverlayLayoutSchema } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import { modelingSlotCopyFormSchema } from "@/lib/validations/modelingSlotCopy";

export type ModelingSlotCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateModelingCopy(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<ModelingSlotCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

/**
 * Server action — compatible with `useActionState` (prevState, formData).
 */
export async function updateModelingSlotCopy(
  _prev: ModelingSlotCopyActionResult | null,
  formData: FormData,
): Promise<ModelingSlotCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = modelingSlotCopyFormSchema.safeParse({
    slotKey: formData.get("slotKey"),
    title: formData.get("title"),
    titleMobile: formData.get("titleMobile") ?? "",
    body: formData.get("body"),
    bodyMobile: formData.get("bodyMobile") ?? "",
    useCustomTextLayout: formData.get("useCustomTextLayout") ?? "0",
    textLayoutDesktop: formData.get("textLayoutDesktop") ?? "",
    textLayoutMobile: formData.get("textLayoutMobile") ?? "",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.slotKey?.[0] ??
      first.title?.[0] ??
      first.titleMobile?.[0] ??
      first.body?.[0] ??
      first.bodyMobile?.[0] ??
      first.textLayoutDesktop?.[0] ??
      first.textLayoutMobile?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const {
    slotKey,
    title,
    titleMobile,
    body,
    bodyMobile,
    useCustomTextLayout,
    textLayoutDesktop: textLayoutDesktopRaw,
    textLayoutMobile: textLayoutMobileRaw,
  } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);

  const bodyMobileStored =
    bodyMobile.length > 0 ? finalizeHeroBannerBodyHtml(bodyMobile) : "";
  const titleMobileStored = titleMobile;

  let textLayoutDesktopParsed: ReturnType<typeof modelingTextOverlayLayoutSchema.parse> | null =
    null;
  let textLayoutMobileParsed: ReturnType<typeof modelingTextOverlayLayoutSchema.parse> | null =
    null;
  if (useCustomTextLayout === "1") {
    try {
      textLayoutDesktopParsed = modelingTextOverlayLayoutSchema.parse(
        JSON.parse(textLayoutDesktopRaw) as unknown,
      );
      textLayoutMobileParsed = modelingTextOverlayLayoutSchema.parse(
        JSON.parse(textLayoutMobileRaw) as unknown,
      );
    } catch {
      return { ok: false, error: "Could not parse text layout. Try again." };
    }
  }

  try {
    await prisma.modelingSlotCopy.upsert({
      where: { slotKey },
      create: {
        slotKey,
        title,
        titleMobile: titleMobileStored,
        body: bodyStored,
        bodyMobile: bodyMobileStored,
        textLayoutDesktop: textLayoutDesktopParsed ?? Prisma.DbNull,
        textLayoutMobile: textLayoutMobileParsed ?? Prisma.DbNull,
      },
      update: {
        title,
        titleMobile: titleMobileStored,
        body: bodyStored,
        bodyMobile: bodyMobileStored,
        textLayoutDesktop: textLayoutDesktopParsed ?? Prisma.DbNull,
        textLayoutMobile: textLayoutMobileParsed ?? Prisma.DbNull,
      },
    } as Parameters<typeof prisma.modelingSlotCopy.upsert>[0]);
  } catch (err) {
    logger.error("updateModelingSlotCopy: failed to upsert", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateModelingCopy();
  return { ok: true };
}
