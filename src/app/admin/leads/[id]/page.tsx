import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getR2PublicUrl } from "@/lib/storage";
import { LeadReplyForm } from "./LeadReplyForm";

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  const attachmentUrls = lead.attachmentKeys.map((key) => ({
    key,
    url: getR2PublicUrl(key),
  }));

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/leads"
        className="text-sm text-neutral-600 hover:text-[var(--foreground)]"
      >
        ← Leads
      </Link>
      <div className="border border-neutral-200 rounded-md p-4 space-y-3">
        <h1 className="text-xl font-semibold">{lead.fullName}</h1>
        <p>
          <span className="text-neutral-500">Email: </span>
          <a
            href={`mailto:${lead.email}`}
            className="text-blue-600 hover:underline"
          >
            {lead.email}
          </a>
        </p>
        <p className="text-neutral-600 whitespace-pre-wrap">{lead.message}</p>
        <p className="text-sm text-neutral-500">
          {lead.createdAt.toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
        {attachmentUrls.length > 0 && (
          <div>
            <span className="text-sm font-medium text-neutral-700">
              Attachments:
            </span>
            <ul className="mt-1 space-y-1">
              {attachmentUrls.map(({ key, url }) => (
                <li key={key}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {key.split("/").pop() ?? key}
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-500">{key}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <LeadReplyForm leadId={lead.id} leadEmail={lead.email} />
    </div>
  );
}
