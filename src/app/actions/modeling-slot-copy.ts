"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
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
    variant: formData.get("variant"),
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.slotKey?.[0] ??
      first.variant?.[0] ??
      first.title?.[0] ??
      first.body?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { slotKey, variant, title, body } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);

  try {
    await prisma.modelingSlotCopy.upsert({
      where: { slotKey },
      create: {
        slotKey,
        title: variant === "desktop" ? title : "",
        titleMobile: variant === "mobile" ? title : "",
        body: variant === "desktop" ? bodyStored : "",
        bodyMobile: variant === "mobile" ? bodyStored : "",
        textLayoutDesktop: Prisma.DbNull,
        textLayoutMobile: Prisma.DbNull,
      },
      update: {
        ...(variant === "desktop"
          ? {
              title,
              body: bodyStored,
            }
          : {
              titleMobile: title,
              bodyMobile: bodyStored,
            }),
        textLayoutDesktop: Prisma.DbNull,
        textLayoutMobile: Prisma.DbNull,
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
