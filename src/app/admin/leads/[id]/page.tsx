import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";

/**
 * Legacy route: redirect to inbox with this lead selected.
 */
export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();
  redirect(`/admin/leads?selected=${id}`);
}
