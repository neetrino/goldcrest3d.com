"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { LeadReplyForm } from "./[id]/LeadReplyForm";
import type { LeadListItem, LeadWithAttachments } from "./adminLeads.types";
import { DeleteLeadButton, LEAD_DELETE_CONFIRM_QUERY } from "./DeleteLeadButton";
import { AdminAttachmentFileIcon } from "./AdminAttachmentFileIcon";
import {
  getAttachmentFileExtension,
  getAttachmentFileKind,
  getAttachmentFormatLabel,
  getAttachmentKindWrapperClass,
} from "./attachmentFileKind";
import {
  LEAD_AVATAR_DEFAULT_SRC,
  formatListTime,
  getPreview,
  getSubject,
} from "./adminLeadsInbox.helpers";
import { IconMail, IconSearch } from "./AdminLeadsInboxIcons";
import { useAdminLeadsUnread } from "../AdminLeadsUnreadContext";

type AdminLeadsInboxProps = {
  leads: LeadListItem[];
  selectedLead: LeadWithAttachments | null;
};

/**
 * Inbox layout per Figma: header (search), list column, detail column with reply.
 */
export function AdminLeadsInbox({ leads, selectedLead }: AdminLeadsInboxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const { reportUnreadLeadOpened } = useAdminLeadsUnread();
  const selectedId = searchParams.get("selected");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.trim().toLowerCase();
    return leads.filter(
      (l) =>
        l.fullName.toLowerCase().includes(q) || l.email.toLowerCase().includes(q),
    );
  }, [leads, searchQuery]);

  const handleSelectLead = (id: string) => {
    const opened = leads.find((l) => l.id === id);
    if (opened?.readAt === null && id !== selectedId) {
      reportUnreadLeadOpened();
    }
    const next = new URLSearchParams(searchParams.toString());
    next.set("selected", id);
    next.delete(LEAD_DELETE_CONFIRM_QUERY);
    startTransition(() => {
      router.push(`/admin/leads?${next.toString()}`);
      router.refresh();
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-white lg:min-h-0">
      {/* Header: search */}
      <header className="flex min-h-[4rem] shrink-0 flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3 lg:h-16 lg:flex-nowrap lg:px-6 lg:py-0">
        <div className="relative min-w-0 flex-1 lg:max-w-[448px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconSearch />
          </span>
          <input
            type="search"
            placeholder="Search leads by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-slate-50 py-2 pl-10 pr-4 text-[14px] text-[var(--foreground)] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Search leads"
          />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* List column */}
        <section
          className="flex w-full shrink-0 flex-col border-slate-200 border-b lg:h-auto lg:w-[380px] lg:border-b-0 lg:border-r"
          aria-label="All leads"
        >
          <div className="border-b border-slate-200 px-4 py-4 lg:px-6">
            <h2 className="text-[16px] font-bold text-slate-800">All Leads</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredLeads.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                {leads.length === 0
                  ? "No leads yet."
                  : "No leads match your search."}
              </div>
            ) : (
              <ul className="flex flex-col">
                {filteredLeads.map((lead) => {
                  const isActive = selectedId === lead.id;
                  const isUnread = lead.readAt === null;
                  return (
                    <li key={lead.id} className="border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleSelectLead(lead.id)}
                        aria-label={
                          isUnread
                            ? `${lead.fullName}, unread lead`
                            : `${lead.fullName}, read`
                        }
                        className={`relative flex w-full flex-col gap-1 px-4 py-4 text-left transition-colors hover:bg-slate-50 lg:px-6 ${
                          isActive ? "bg-white" : ""
                        } ${isUnread && !isActive ? "bg-amber-500/5" : ""}`}
                      >
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-0 top-0 w-1 bg-[var(--foreground)]"
                            aria-hidden
                          />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <span className="flex min-w-0 items-start gap-2">
                            {isUnread ? (
                              <span
                                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--foreground)]"
                                title="Not opened yet"
                                aria-hidden
                              />
                            ) : (
                              <span
                                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-transparent"
                                aria-hidden
                              />
                            )}
                            <span
                              className={`text-[14px] leading-5 ${
                                isUnread
                                  ? "font-bold text-slate-900"
                                  : "font-semibold text-slate-700"
                              }`}
                            >
                              {lead.fullName}
                            </span>
                          </span>
                          <span className="shrink-0 text-[11px] text-slate-400 leading-[16.5px]">
                            {formatListTime(lead.createdAt)}
                          </span>
                        </div>
                        <span
                          className={`pl-4 text-[12px] leading-4 ${
                            isUnread
                              ? "font-semibold text-slate-800"
                              : "font-medium text-slate-600"
                          }`}
                        >
                          {getSubject(lead.message)}
                        </span>
                        <p
                          className={`line-clamp-2 pl-4 text-[12px] leading-[19.5px] ${
                            isUnread ? "text-slate-600" : "text-slate-500"
                          }`}
                        >
                          {getPreview(lead.message)}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* Detail column */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-white lg:min-h-0">
          {selectedLead ? (
            <>
              {/* Message detail header */}
              <div className="shrink-0 border-b border-slate-200 px-4 pt-4 pb-6 lg:px-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                      <Image
                        src={LEAD_AVATAR_DEFAULT_SRC}
                        alt=""
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-xl font-bold leading-7 text-slate-900 lg:text-[24px] lg:leading-8">
                        {selectedLead.fullName}
                      </h1>
                      <div className="flex min-w-0 items-start gap-2">
                        <IconMail className="mt-0.5 shrink-0 text-slate-400" />
                        <span className="break-all text-[14px] text-slate-500">
                          {selectedLead.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2 self-start sm:self-auto">
                    <DeleteLeadButton
                      leadId={selectedLead.id}
                      leadName={selectedLead.fullName}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)]">
                      High Priority
                    </span>
                    <span className="text-[12px] text-slate-400">
                      Received{" "}
                      {selectedLead.createdAt.toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <h2 className="break-words text-[18px] font-semibold leading-7 text-slate-800">
                    Subject: {getSubject(selectedLead.message)}
                  </h2>
                </div>
              </div>

              {/* Message body */}
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 lg:px-12 lg:py-8">
                <div className="break-words whitespace-pre-wrap text-[16px] leading-[26px] text-slate-700">
                  {selectedLead.message}
                </div>

                {selectedLead.attachmentUrls.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      Attachments ({selectedLead.attachmentUrls.length})
                    </h3>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {selectedLead.attachmentUrls.map(({ key, url }) => {
                        const name = key.split("/").pop() ?? key;
                        const ext = getAttachmentFileExtension(key);
                        const kind = getAttachmentFileKind(ext);
                        const formatLabel = getAttachmentFormatLabel(ext);
                        return (
                          <a
                            key={key}
                            href={url ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full max-w-[256px] items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3 hover:bg-slate-100 sm:w-[256px]"
                          >
                            <div
                              className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${getAttachmentKindWrapperClass(kind)}`}
                              title={ext ? `.${ext}` : undefined}
                            >
                              <span
                                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.14]"
                                aria-hidden
                              >
                                <AdminAttachmentFileIcon kind={kind} />
                              </span>
                              <span className="relative z-10 max-w-[2.25rem] text-center text-[8px] font-extrabold leading-none tracking-tight">
                                {formatLabel}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[12px] font-bold text-slate-900">
                                {name}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {url ? "Open" : "—"}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Reply section */}
              <div className="shrink-0 border-t border-slate-200 bg-slate-50">
                <LeadReplyForm
                  leadId={selectedLead.id}
                  leadEmail={selectedLead.email}
                  variant="inbox"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-slate-500">
              <p className="text-[14px]">
                {filteredLeads.length > 0
                  ? "Select a lead to view details"
                  : "No leads to display"}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
