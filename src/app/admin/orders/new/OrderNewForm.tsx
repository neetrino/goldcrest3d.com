"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/order";
import type { CreateOrderResult } from "@/app/actions/order";
import { FORM_FIELD_PRODUCT_IMAGE } from "@/constants/order-form";

const initialState: CreateOrderResult = null;

const inputClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

export function OrderNewForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    CreateOrderResult,
    FormData
  >(createOrder, initialState);

  useEffect(() => {
    if (state?.success !== true) return;
    router.push(`/admin/orders/${state.orderId}`);
  }, [state, router]);

  if (state?.success === true) {
    return null;
  }

  return (
    <form
      action={formAction}
      className="space-y-5"
      aria-describedby={
        state?.success === false ? "order-error" : undefined
      }
    >
      <div>
        <label
          htmlFor="order-clientName"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Client name
        </label>
        <input
          id="order-clientName"
          name="clientName"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          disabled={isPending}
          className={inputClass}
          placeholder="e.g. John Smith"
        />
      </div>
      <div>
        <label
          htmlFor="order-clientEmail"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Client email
        </label>
        <input
          id="order-clientEmail"
          name="clientEmail"
          type="email"
          required
          autoComplete="email"
          disabled={isPending}
          className={inputClass}
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="order-productTitle"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Product title
        </label>
        <input
          id="order-productTitle"
          name="productTitle"
          type="text"
          required
          maxLength={200}
          disabled={isPending}
          className={inputClass}
          placeholder="e.g. 3D model — apartment"
        />
      </div>
      <div>
        <label
          htmlFor="order-productImage"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Product image (optional)
        </label>
        <input
          id="order-productImage"
          name={FORM_FIELD_PRODUCT_IMAGE}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={isPending}
          className="mt-1.5 w-full text-sm text-neutral-600 file:mr-3 file:rounded-md file:border file:border-neutral-300 file:bg-neutral-50 file:px-3 file:py-2 file:text-sm file:text-[var(--foreground)] file:transition-colors hover:file:bg-neutral-100"
        />
      </div>
      <div>
        <label
          htmlFor="order-priceCents"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Price (AMD)
        </label>
        <input
          id="order-priceCents"
          name="priceCents"
          type="number"
          required
          min={0}
          step={1}
          disabled={isPending}
          className={inputClass}
          placeholder="50000"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-[var(--foreground)]">
          Payment type
        </span>
        <div className="mt-1.5 flex flex-col gap-3 lg:flex-row lg:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              value="FULL"
              defaultChecked
              disabled={isPending}
              className="rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">Full (FULL)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              value="SPLIT"
              disabled={isPending}
              className="rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">50–50 (SPLIT)</span>
          </label>
        </div>
      </div>
      {state?.success === false && (
        <p
          id="order-error"
          className="text-sm text-red-600"
          role="alert"
        >
          {state.error}
        </p>
      )}
      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save order"}
        </button>
        <Link
          href="/admin/orders"
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-neutral-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
