"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteOrder } from "@/app/actions/order";

type Props = { orderId: string };

export function DeleteOrderButton({ orderId }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openDialog() {
    setError(null);
    dialogRef.current?.showModal();
  }

  function requestCloseDialog() {
    if (!isPending) dialogRef.current?.close();
  }

  async function handleConfirmDelete() {
    setIsPending(true);
    setError(null);
    const result = await deleteOrder(orderId);
    if (result?.deleted) {
      dialogRef.current?.close();
      router.push("/admin/orders");
      return;
    }
    setError(result?.error ?? "Order could not be deleted.");
    setIsPending(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={openDialog}
        disabled={isPending}
        className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
        aria-haspopup="dialog"
      >
        Delete order
      </button>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 z-50 m-0 max-h-[min(100vh-2rem,90vh)] w-[min(calc(100vw-2rem),28rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-slate-200 bg-white p-0 shadow-xl [&::backdrop]:bg-slate-900/40"
        aria-labelledby="delete-order-dialog-title"
        onCancel={(e) => {
          if (isPending) e.preventDefault();
        }}
      >
        <div className="border-slate-100 border-b px-6 py-4">
          <h2
            id="delete-order-dialog-title"
            className="text-lg font-semibold text-slate-900"
          >
            Delete this order?
          </h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-[14px] leading-6 text-slate-600">
            This order will be removed permanently. This cannot be undone.
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
            disabled={isPending}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isPending ? "Deleting…" : "Delete"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
