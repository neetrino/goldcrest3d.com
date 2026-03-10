import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          Leads
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Contact form submissions from the website.
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 bg-white py-16 text-center shadow-sm">
          <p className="text-neutral-500">No leads yet.</p>
          <p className="mt-1 text-sm text-neutral-400">
            New submissions will appear here.
          </p>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          {leads.map((lead) => (
            <li key={lead.id} className="border-b border-neutral-100 last:border-b-0">
              <Link
                href={`/admin/leads/${lead.id}`}
                className="block px-5 py-4 transition-colors hover:bg-neutral-50"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-[var(--foreground)]">
                      {lead.fullName}
                    </span>
                    <span className="ml-2 text-sm text-neutral-500">
                      {lead.email}
                    </span>
                  </div>
                  <time
                    dateTime={lead.createdAt.toISOString()}
                    className="shrink-0 text-sm text-neutral-500"
                  >
                    {lead.createdAt.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                  {lead.message}
                </p>
                {lead.attachmentKeys.length > 0 && (
                  <span className="mt-2 inline-block text-xs text-neutral-500">
                    {lead.attachmentKeys.length} file(s)
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
