"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { extractCanvasRichTextHtml } from "@/lib/canvas-rich-text/canvas-rich-text-form";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { manufacturingSpecializationItemCopyFormSchema } from "@/lib/validations/manufacturingSpecializationItemCopy";

export type ManufacturingSpecializationItemCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateManufacturingItems(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<ManufacturingSpecializationItemCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

export async function updateManufacturingSpecializationItemCopy(
  _prev: ManufacturingSpecializationItemCopyActionResult | null,
  formData: FormData,
): Promise<ManufacturingSpecializationItemCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = manufacturingSpecializationItemCopyFormSchema.safeParse({
    itemKey: formData.get("itemKey"),
    title: formData.get("title"),
    body: extractCanvasRichTextHtml({
      html: String(formData.get("body") ?? ""),
      docJson: (formData.get("bodyDoc") as string | null) ?? "",
    }),
    bodyDoc: formData.get("bodyDoc"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.itemKey?.[0] ??
      first.title?.[0] ??
      first.body?.[0] ??
      first.bodyDoc?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { itemKey, title, body } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);

  try {
    await prisma.manufacturingSpecializationItemCopy.upsert({
      where: { itemKey },
      create: {
        itemKey,
        title,
        body: bodyStored,
      },
      update: { title, body: bodyStored },
    });
  } catch (err) {
    logger.error("updateManufacturingSpecializationItemCopy: upsert failed", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateManufacturingItems();
  return { ok: true };
}
