import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getR2PublicUrl } from "@/lib/storage";
import { AdminLeadsInbox } from "./AdminLeadsInbox";
import type { LeadListItem, LeadWithAttachments } from "./adminLeads.types";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ selected?: string }>;
}) {
  const { selected: selectedId } = await searchParams;

  if (selectedId) {
    await prisma.lead.updateMany({
      where: { id: selectedId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (leads.length > 0 && !selectedId) {
    redirect(`/admin/leads?selected=${leads[0].id}`);
  }

  const listItems: LeadListItem[] = leads.map((l) => ({
    id: l.id,
    fullName: l.fullName,
    email: l.email,
    message: l.message,
    createdAt: l.createdAt,
    readAt: l.readAt,
  }));

  let selectedLead: LeadWithAttachments | null = null;
  if (selectedId) {
    const lead = leads.find((l) => l.id === selectedId);
    if (lead) {
      const attachmentUrls = lead.attachmentKeys.map((key) => {
        const url = getR2PublicUrl(key);
        return { key, url };
      });
      selectedLead = {
        id: lead.id,
        fullName: lead.fullName,
        email: lead.email,
        message: lead.message,
        createdAt: lead.createdAt,
        readAt: lead.readAt,
        attachmentUrls,
      };
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <AdminLeadsInbox leads={listItems} selectedLead={selectedLead} />
    </div>
  );
}
