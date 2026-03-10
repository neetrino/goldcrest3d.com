import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Leads</h1>
      {leads.length === 0 ? (
        <p className="text-neutral-600">No leads yet.</p>
      ) : (
        <ul className="border border-neutral-200 rounded-md divide-y divide-neutral-200">
          {leads.map((lead) => (
            <li key={lead.id}>
              <Link
                href={`/admin/leads/${lead.id}`}
                className="block px-4 py-3 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-medium text-[var(--foreground)]">
                      {lead.fullName}
                    </span>
                    <span className="text-neutral-500 text-sm ml-2">
                      {lead.email}
                    </span>
                  </div>
                  <time
                    dateTime={lead.createdAt.toISOString()}
                    className="text-sm text-neutral-500 shrink-0"
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
                <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                  {lead.message}
                </p>
                {lead.attachmentKeys.length > 0 && (
                  <span className="inline-block mt-1 text-xs text-neutral-500">
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
