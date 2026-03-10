"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createOrder, FORM_FIELD_PRODUCT_IMAGE } from "@/app/actions/order";
import type { CreateOrderResult } from "@/app/actions/order";

const initialState: CreateOrderResult = null;

const inputClass =
  "w-full rounded border border-[var(--foreground)]/20 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--foreground)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/30 disabled:opacity-60";

export function OrderNewForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    CreateOrderResult,
    FormData
  >(createOrder, initialState);

  if (state?.success === true) {
    router.push(`/admin/orders/${state.orderId}`);
    return null;
  }

  return (
    <form
      action={formAction}
      className="max-w-xl space-y-4"
      aria-describedby={
        state?.success === false ? "order-error" : undefined
      }
    >
      <div>
        <label
          htmlFor="order-clientName"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Հաճախորդի անուն
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
          placeholder="Օր. Արամ Պետրոսյան"
        />
      </div>
      <div>
        <label
          htmlFor="order-clientEmail"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Հաճախորդի email
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
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Ապրանքի անվանում
        </label>
        <input
          id="order-productTitle"
          name="productTitle"
          type="text"
          required
          maxLength={200}
          disabled={isPending}
          className={inputClass}
          placeholder="Օր. 3D մոդել — բնակարան"
        />
      </div>
      <div>
        <label
          htmlFor="order-productImage"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Ապրանքի նկար (ոչ պարտադիր)
        </label>
        <input
          id="order-productImage"
          name={FORM_FIELD_PRODUCT_IMAGE}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={isPending}
          className="w-full text-sm text-[var(--foreground)]/80 file:mr-2 file:rounded file:border file:border-[var(--foreground)]/20 file:bg-[var(--foreground)]/5 file:px-3 file:py-1.5 file:text-sm file:text-[var(--foreground)]"
        />
      </div>
      <div>
        <label
          htmlFor="order-priceCents"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Գին (դրամ)
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
        <span className="mb-1 block text-sm font-medium text-[var(--foreground)]/80">
          Վճարման տեսակ
        </span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              value="FULL"
              defaultChecked
              disabled={isPending}
              className="rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">Ամբողջությամբ (FULL)</span>
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
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {state.error}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Պահպանվում է…" : "Պահպանել պատվեր"}
        </button>
        <a
          href="/admin/orders"
          className="rounded border border-[var(--foreground)]/30 px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
        >
          Չեղարկել
        </a>
      </div>
    </form>
  );
}
