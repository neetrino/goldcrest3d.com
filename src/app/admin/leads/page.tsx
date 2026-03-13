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
  let { selected: selectedId } = await searchParams;

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
  }));

  let selectedLead: LeadWithAttachments | null = null;
  if (selectedId) {
    const lead = leads.find((l) => l.id === selectedId);
    if (lead) {
      const attachmentUrls = lead.attachmentKeys.map((key) => {
        const url = getR2PublicUrl(key);
        const ext = key.split(".").pop()?.toLowerCase() ?? "";
        const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
        return { key, url, isImage };
      });
      selectedLead = {
        id: lead.id,
        fullName: lead.fullName,
        email: lead.email,
        message: lead.message,
        createdAt: lead.createdAt,
        attachmentUrls,
      };
    }
  }

  return (
    <div className="h-full">
      <AdminLeadsInbox leads={listItems} selectedLead={selectedLead} />
    </div>
  );
}
