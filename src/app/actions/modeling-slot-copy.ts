"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { extractCanvasRichTextHtml } from "@/lib/canvas-rich-text/canvas-rich-text-form";
import {
  clampModelingTextOverlayLayout,
  DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_MOBILE,
  parseModelingTextOverlayLayout,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
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
    body: extractCanvasRichTextHtml({
      html: String(formData.get("body") ?? ""),
      docJson: (formData.get("bodyDoc") as string | null) ?? "",
    }),
    bodyDoc: formData.get("bodyDoc"),
    mobileTitleFontSizePx: formData.get("mobileTitleFontSizePx"),
    mobileBodyFontSizePx: formData.get("mobileBodyFontSizePx"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.slotKey?.[0] ??
      first.variant?.[0] ??
      first.title?.[0] ??
      first.body?.[0] ??
      first.mobileTitleFontSizePx?.[0] ??
      first.mobileBodyFontSizePx?.[0] ??
      first.bodyDoc?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const {
    slotKey,
    variant,
    title,
    body,
    mobileTitleFontSizePx,
    mobileBodyFontSizePx,
  } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);
  let nextTextLayoutMobile: Prisma.InputJsonValue | Prisma.NullTypes.DbNull = Prisma.DbNull;

  if (variant === "mobile") {
    const existing = await prisma.modelingSlotCopy.findUnique({
      where: { slotKey },
      select: { textLayoutMobile: true },
    });
    const baseLayout = clampModelingTextOverlayLayout(
      parseModelingTextOverlayLayout(existing?.textLayoutMobile) ??
        DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_MOBILE,
    );
    nextTextLayoutMobile = {
      ...baseLayout,
      title: {
        ...baseLayout.title,
        fontSizePx: mobileTitleFontSizePx ?? baseLayout.title.fontSizePx,
      },
      body: {
        ...baseLayout.body,
        fontSizePx: mobileBodyFontSizePx ?? baseLayout.body.fontSizePx,
      },
    } as Prisma.InputJsonValue;
  }

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
        textLayoutMobile: nextTextLayoutMobile,
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
              textLayoutMobile: nextTextLayoutMobile,
            }),
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
