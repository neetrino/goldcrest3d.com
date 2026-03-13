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

  const attachmentUrls = lead.attachmentKeys.map((key) => {
    const url = getR2PublicUrl(key);
    const ext = key.split(".").pop()?.toLowerCase() ?? "";
    const isImage = ["png", "jpg", "jpeg"].includes(ext);
    return { key, url, isImage };
  });

  return (
    <div className="max-w-2xl space-y-8">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-[var(--foreground)]"
      >
        ← Back to Leads
      </Link>

      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          {lead.fullName}
        </h1>
        <dl className="mt-4 space-y-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Email
            </dt>
            <dd className="mt-0.5">
              <a
                href={`mailto:${lead.email}`}
                className="text-[var(--foreground)] underline decoration-neutral-300 underline-offset-2 hover:decoration-[var(--foreground)]"
              >
                {lead.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Submission date/time
            </dt>
            <dd className="mt-0.5 text-sm text-neutral-600">
              {lead.createdAt.toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Message
            </dt>
            <dd className="mt-0.5 whitespace-pre-wrap text-sm text-neutral-700">
              {lead.message}
            </dd>
          </div>
          {attachmentUrls.length > 0 && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Attachments
              </dt>
              <dd className="mt-2">
                <ul className="space-y-3">
                  {attachmentUrls.map(({ key, url, isImage }) => (
                    <li key={key} className="flex flex-col gap-1">
                      {url ? (
                        <>
                          {isImage ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block max-w-[280px] rounded border border-neutral-200 overflow-hidden hover:opacity-90"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={url}
                                alt=""
                                className="block w-full object-contain max-h-48"
                              />
                            </a>
                          ) : null}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--foreground)] underline decoration-neutral-300 underline-offset-2 hover:decoration-[var(--foreground)]"
                          >
                            {isImage ? "Open image" : key.split("/").pop() ?? key}
                          </a>
                        </>
                      ) : (
                        <span className="text-sm text-neutral-500">{key}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <LeadReplyForm leadId={lead.id} leadEmail={lead.email} />
    </div>
  );
}
