"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getHeroBannerBodyPlainTextLength } from "@/lib/power-banner-copy/hero-banner-body-plain-text-length";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
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
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.slotKey?.[0] ??
      first.title?.[0] ??
      first.titleMobile?.[0] ??
      first.body?.[0] ??
      first.bodyMobile?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { slotKey, title, titleMobile, body, bodyMobile } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);
  if (getHeroBannerBodyPlainTextLength(bodyStored) === 0) {
    return { ok: false, error: "Desktop / tablet description is required." };
  }

  const bodyMobileStored =
    bodyMobile.length > 0 ? finalizeHeroBannerBodyHtml(bodyMobile) : null;
  const titleMobileStored = titleMobile.length > 0 ? titleMobile : null;

  try {
    await prisma.modelingSlotCopy.upsert({
      where: { slotKey },
      create: {
        slotKey,
        title,
        titleMobile: titleMobileStored,
        body: bodyStored,
        bodyMobile: bodyMobileStored,
      },
      update: {
        title,
        titleMobile: titleMobileStored,
        body: bodyStored,
        bodyMobile: bodyMobileStored,
      },
    });
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
