"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import {
  MANAGED_HOME_SECTION_KEYS,
  type ManagedHomeSectionKey,
} from "@/lib/managed-home/managed-home-section-keys";
import {
  founderPayloadSchema,
  manufacturingPayloadSchema,
  modelingPayloadSchema,
  philosophyPayloadSchema,
  processPayloadSchema,
} from "@/lib/managed-home/managed-home-schemas";

export type SaveManagedHomeResult =
  | { ok: true }
  | { ok: false; error: string };

function parseSectionPayload(
  key: ManagedHomeSectionKey,
  payload: unknown,
): { success: true; data: object } | { success: false; error: string } {
  switch (key) {
    case MANAGED_HOME_SECTION_KEYS.PHILOSOPHY: {
      const r = philosophyPayloadSchema.safeParse(payload);
      return r.success
        ? { success: true, data: r.data }
        : { success: false, error: "Invalid philosophy content." };
    }
    case MANAGED_HOME_SECTION_KEYS.MODELING: {
      const r = modelingPayloadSchema.safeParse(payload);
      return r.success
        ? { success: true, data: r.data }
        : { success: false, error: "Invalid modeling content." };
    }
    case MANAGED_HOME_SECTION_KEYS.MANUFACTURING: {
      const r = manufacturingPayloadSchema.safeParse(payload);
      return r.success
        ? { success: true, data: r.data }
        : { success: false, error: "Invalid manufacturing content." };
    }
    case MANAGED_HOME_SECTION_KEYS.FOUNDER: {
      const r = founderPayloadSchema.safeParse(payload);
      return r.success
        ? { success: true, data: r.data }
        : { success: false, error: "Invalid founder content." };
    }
    case MANAGED_HOME_SECTION_KEYS.PROCESS: {
      const r = processPayloadSchema.safeParse(payload);
      return r.success
        ? { success: true, data: r.data }
        : { success: false, error: "Invalid process content." };
    }
    default: {
      const _exhaustive: never = key;
      return { success: false, error: `Unknown section: ${_exhaustive}` };
    }
  }
}

export async function saveManagedHomeSection(
  sectionKey: ManagedHomeSectionKey,
  payload: unknown,
): Promise<SaveManagedHomeResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }

  const parsed = parseSectionPayload(sectionKey, payload);
  if (!parsed.success) {
    return { ok: false, error: parsed.error };
  }

  try {
    await prisma.managedHomeContent.upsert({
      where: { sectionKey },
      create: { sectionKey, payload: parsed.data },
      update: { payload: parsed.data },
    });
  } catch (e) {
    logger.error("saveManagedHomeSection", e);
    return { ok: false, error: "Could not save content." };
  }

  revalidatePath("/");
  revalidatePath("/admin/manager2");
  return { ok: true };
}
