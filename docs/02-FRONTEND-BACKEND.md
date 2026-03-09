# Frontend vs Backend — Goldcrest 3D

**Նախագծի կոդը** — **`src/`** թղթապանակում (repo root-ում). Next.js app-ը՝ app, components, lib; prisma, public — արմատում։

Next.js-ում **front** (բրաուզեր) և **back** (սերվեր) տրամաբանորեն բաժանված են այսպես.

---

## FRONTEND (բրաուզերում աշխատող)

| Թղթապանակ / ֆայլ | Ինչ է |
|-------------------|--------|
| **`src/app/`** | Էջեր և layout — React կոմպոնենտներ, HTML/CSS, routing |
| **`src/app/page.tsx`**, **`layout.tsx`** | Landing, ընդհանուր layout |
| **`src/app/admin/*`** | Admin panel-ի էջեր (UI) |
| **`src/app/order/[token]/*`** | Client-ի վճարման էջ (UI) |
| **`src/components/`** | UI կոմպոնենտներ (buttons, forms, sections) |
| **`public/`** | Ստատիկ ֆայլեր (նկարներ, favicon) |

**Կարճ.** Ինչ օգտատերը **տեսնում** է և **սեղմում** — frontend.

---

## BACKEND (սերվերում աշխատող)

| Թղթապանակ / ֆայլ | Ինչ է |
|-------------------|--------|
| **`src/app/api/*`** | REST API endpoints (GET/POST) — օր. `/api/leads`, `/api/orders` |
| **`src/app/**/actions.ts`** | Server Actions — form submit, ֆայլ upload, business logic |
| **`src/lib/`** | Սերվերային լոգիկա — DB, email, R2, Stripe |
| **`src/lib/db.ts`** | Prisma client — ԲԴ կապ |
| **`src/lib/validations/`** | Zod schemas — մուտքային տվյալների ստուգում |
| **`prisma/`** | ԲԴ սխեմա և միգրացիաներ |

**Կարճ.** Ինչ **պահում** է տվյալները, **ուղարկում** email, **խոսում** Stripe/Neon/R2-ի հետ — backend.

---

## Հոսք (օրինակ)

```
[Օգտատեր] → սեղմում «Ուղարկել հայտ»
    → Frontend: components/quote-form (React form)
    → Submit → Server Action (app/.../actions.ts)  ← BACKEND
    → Backend: Zod validation, prisma.lead.create(), R2 upload
    → Պատասխան → Frontend: «Շնորհակալություն»
```

---

## Դիագրամ

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (Browser)                                      │
│  src/app/  +  src/components/  +  public/              │
│  React, Tailwind, forms, pages                          │
└─────────────────────┬───────────────────────────────────┘
                      │ fetch() / Server Action
                      ▼
┌─────────────────────────────────────────────────────────┐
│  BACKEND (Node.js on Vercel)                             │
│  src/app/api/*  +  **/actions.ts  +  src/lib/  +  prisma/│
│  DB, email, Stripe, R2, validation                      │
└─────────────────────────────────────────────────────────┘
```

---

**Կապված.** [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [03-STRUCTURE.md](./03-STRUCTURE.md)
