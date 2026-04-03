"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { deleteLead } from "@/app/actions/lead";

import { IconTrashBin } from "./AdminLeadsInboxIcons";

/** Query flag: dialog open for delete confirmation (value = lead id). Survives full page refresh. */
export const LEAD_DELETE_CONFIRM_QUERY = "confirmLeadDelete";

type DeleteLeadButtonProps = {
  leadId: string;
  leadName: string;
};

/**
 * Opens a confirmation dialog, then deletes the lead via server action (DB + R2 attachments).
 * Open state is synced to the URL so a full refresh keeps the dialog visible for the same lead.
 */
export function DeleteLeadButton({ leadId, leadName }: DeleteLeadButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const skipUrlSyncOnCloseRef = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const replaceLeadsQuery = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(searchParams.toString());
      mutate(next);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (searchParams.get(LEAD_DELETE_CONFIRM_QUERY) !== leadId) return;
    const el = dialogRef.current;
    if (el && !el.open) {
      el.showModal();
    }
  }, [searchParams, leadId]);

  function openDialog() {
    setError(null);
    replaceLeadsQuery((p) => p.set(LEAD_DELETE_CONFIRM_QUERY, leadId));
    dialogRef.current?.showModal();
  }

  function requestCloseDialog() {
    if (!pending) dialogRef.current?.close();
  }

  function handleDialogClose() {
    if (skipUrlSyncOnCloseRef.current) return;
    replaceLeadsQuery((p) => {
      if (p.get(LEAD_DELETE_CONFIRM_QUERY) === leadId) {
        p.delete(LEAD_DELETE_CONFIRM_QUERY);
      }
    });
  }

  async function handleConfirmDelete() {
    setPending(true);
    setError(null);
    const result = await deleteLead(leadId);
    if (result?.deleted) {
      skipUrlSyncOnCloseRef.current = true;
      dialogRef.current?.close();
      router.replace("/admin/leads");
      router.refresh();
      skipUrlSyncOnCloseRef.current = false;
      setPending(false);
      return;
    }
    setError(result?.error ?? "Lead could not be deleted.");
    setPending(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
        aria-label="Delete"
        aria-haspopup="dialog"
      >
        <IconTrashBin />
      </button>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 z-50 m-0 max-h-[min(100vh-2rem,90vh)] w-[min(calc(100vw-2rem),28rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-slate-200 bg-white p-0 shadow-xl [&::backdrop]:bg-slate-900/40"
        aria-labelledby="delete-lead-dialog-title"
        onClose={handleDialogClose}
        onCancel={(e) => {
          if (pending) e.preventDefault();
        }}
      >
        <div className="border-slate-100 border-b px-6 py-4">
          <h2
            id="delete-lead-dialog-title"
            className="text-lg font-semibold text-slate-900"
          >
            Delete this lead?
          </h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-[14px] leading-6 text-slate-600">
            <span className="font-medium text-slate-800">{leadName}</span> will
            be removed permanently, including message and any uploaded
            attachments. This cannot be undone.
          </p>
          {error && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 border-slate-100 border-t bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={requestCloseDialog}
            disabled={pending}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={pending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? "Deleting…" : "Delete"}
          </button>
        </div>
      </dialog>
    </>
  );
}
