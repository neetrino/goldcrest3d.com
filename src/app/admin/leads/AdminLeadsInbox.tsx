"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LeadReplyForm } from "./[id]/LeadReplyForm";
import type { LeadListItem, LeadWithAttachments } from "./adminLeads.types";

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const ICON_OVERLAY_HEADER =
  "https://www.figma.com/api/mcp/asset/835ba48d-c946-4849-879a-3c83113d6291";
const ICON_FILTER =
  "https://www.figma.com/api/mcp/asset/6e709847-0d61-4215-9acc-159e3c4cbc7c";
const ICON_AVATAR_PLACEHOLDER =
  "https://www.figma.com/api/mcp/asset/2c9038f6-db51-4e83-adcf-172e6e3664e5";
const ICON_EMAIL =
  "https://www.figma.com/api/mcp/asset/f4033daa-700c-495c-adda-026f4c49ffb7";
const ICON_DOWNLOAD =
  "https://www.figma.com/api/mcp/asset/544d8796-9e2e-4766-8756-76ac81306b71";
const ICON_TRASH =
  "https://www.figma.com/api/mcp/asset/6b5d20c5-3c21-4c20-af9d-8fabe3b789a0";
const ICON_PDF =
  "https://www.figma.com/api/mcp/asset/b01bcc0e-3b49-47f5-abd1-f2f04513a605";
const ICON_IMAGE =
  "https://www.figma.com/api/mcp/asset/b9057f6d-ed9b-4160-ae47-5899ca81e6eb";

function formatListTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  if (d >= today) {
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (d >= yesterday) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function getSubject(message: string): string {
  const firstLine = message.split(/\r?\n/)[0]?.trim() ?? "";
  if (firstLine.length > 50) return firstLine.slice(0, 47) + "...";
  return firstLine || "Contact form submission";
}

function getPreview(message: string, maxLength: number = 80): string {
  const oneLine = message.replace(/\r?\n/g, " ").trim();
  if (oneLine.length <= maxLength) return oneLine;
  return oneLine.slice(0, maxLength) + "...";
}

type AdminLeadsInboxProps = {
  leads: LeadListItem[];
  selectedLead: LeadWithAttachments | null;
};

/**
 * Inbox layout per Figma: header (search + New Lead), list column, detail column with reply.
 */
export function AdminLeadsInbox({ leads, selectedLead }: AdminLeadsInboxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    const next = new URLSearchParams(searchParams.toString());
    next.set("selected", id);
    router.push(`/admin/leads?${next.toString()}`);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-white lg:min-h-0">
      {/* Header: search + New Lead */}
      <header className="flex min-h-[4rem] shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 lg:h-16 lg:flex-nowrap lg:px-6 lg:py-0">
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
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src={ICON_OVERLAY_HEADER}
            alt=""
            width={32}
            height={36}
            className="hidden sm:block"
            unoptimized
          />
          <div className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden />
          <Link
            href="/#contact"
            className="flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-[14px] font-semibold text-white hover:opacity-90 lg:min-h-0 lg:py-1.5"
          >
            <span>New Lead</span>
          </Link>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* List column */}
        <section
          className="flex w-full shrink-0 flex-col border-slate-200 border-b lg:h-auto lg:w-[380px] lg:border-b-0 lg:border-r"
          aria-label="All leads"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 lg:px-6">
            <h2 className="text-[16px] font-bold text-slate-800">All Leads</h2>
            <button
              type="button"
              className="rounded p-1 hover:bg-slate-100"
              aria-label="Filter or sort"
            >
              <Image src={ICON_FILTER} alt="" width={15} height={10} unoptimized />
            </button>
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
                  return (
                    <li key={lead.id} className="border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleSelectLead(lead.id)}
                        className={`relative flex w-full flex-col gap-1 px-4 py-4 text-left transition-colors hover:bg-slate-50 lg:px-6 ${
                          isActive ? "bg-white" : ""
                        }`}
                      >
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-0 top-0 w-1 bg-[var(--foreground)]"
                            aria-hidden
                          />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900 text-[14px] leading-5">
                            {lead.fullName}
                          </span>
                          <span className="shrink-0 text-[11px] text-slate-400 leading-[16.5px]">
                            {formatListTime(lead.createdAt)}
                          </span>
                        </div>
                        <span className="font-medium text-slate-700 text-[12px] leading-4">
                          {getSubject(lead.message)}
                        </span>
                        <p className="line-clamp-2 text-[12px] leading-[19.5px] text-slate-500">
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
                        src={ICON_AVATAR_PLACEHOLDER}
                        alt=""
                        width={28}
                        height={28}
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-xl font-bold leading-7 text-slate-900 lg:text-[24px] lg:leading-8">
                        {selectedLead.fullName}
                      </h1>
                      <div className="flex min-w-0 items-center gap-1">
                        <Image
                          src={ICON_EMAIL}
                          alt=""
                          width={14}
                          height={11}
                          unoptimized
                        />
                        <span className="break-all text-[14px] text-slate-500">
                          {selectedLead.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2 self-start sm:self-auto">
                    <a
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 hover:bg-slate-50"
                      aria-label="Download"
                    >
                      <Image
                        src={ICON_DOWNLOAD}
                        alt=""
                        width={18}
                        height={18}
                        unoptimized
                      />
                    </a>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 hover:bg-slate-50"
                      aria-label="Delete"
                    >
                      <Image
                        src={ICON_TRASH}
                        alt=""
                        width={16}
                        height={18}
                        unoptimized
                      />
                    </button>
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
                      {selectedLead.attachmentUrls.map(({ key, url, isImage }) => {
                        const name = key.split("/").pop() ?? key;
                        return (
                          <a
                            key={key}
                            href={url ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full max-w-[256px] items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3 hover:bg-slate-100 sm:w-[256px]"
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                isImage ? "bg-emerald-500/10" : "bg-blue-500/10"
                              }`}
                            >
                              <Image
                                src={isImage ? ICON_IMAGE : ICON_PDF}
                                alt=""
                                width={20}
                                height={20}
                                unoptimized
                              />
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
