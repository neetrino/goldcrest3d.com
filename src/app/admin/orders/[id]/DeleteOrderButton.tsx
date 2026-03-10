"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteOrder } from "@/app/actions/order";

type Props = { orderId: string };

export function DeleteOrderButton({ orderId }: Props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirm("Delete this order?")) return;
    setIsPending(true);
    setError(null);
    const result = await deleteOrder(orderId);
    if (result?.deleted) {
      router.push("/admin/orders");
      return;
    }
    setError(result?.error ?? "Error");
    setIsPending(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded border border-red-500/80 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/30"
      >
        {isPending ? "Deleting…" : "Delete order"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
