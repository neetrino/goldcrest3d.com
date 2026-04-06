import { z } from "zod";

import { prisma } from "@/lib/db";

const emailSchema = z.string().email();

/**
 * Unique lead email addresses from Inbox/Leads, validated for use in admin forms.
 * Deduplicates case-insensitively; sorts for stable UI.
 */
export async function getDistinctLeadEmails(): Promise<string[]> {
  const rows = await prisma.lead.findMany({
    select: { email: true },
    distinct: ["email"],
    orderBy: { email: "asc" },
  });

  const byLower = new Map<string, string>();

  for (const row of rows) {
    const trimmed = row.email.trim();
    if (trimmed.length === 0) continue;

    const parsed = emailSchema.safeParse(trimmed);
    if (!parsed.success) continue;

    const key = parsed.data.toLowerCase();
    if (byLower.has(key)) continue;
    byLower.set(key, parsed.data);
  }

  return [...byLower.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
}
