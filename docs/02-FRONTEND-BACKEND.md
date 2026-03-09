# Frontend vs Backend — Goldcrest 3D

**Նախագծի կոդը** — միայն **`_project/`** թղթապանակում։ Այդտեղ է Next.js app-ը (app, components, lib, prisma, public).  
Next.js-ում **front** (բրաուզեր) և **back** (սերվեր) տրամաբանորեն բաժանված են այսպես.

---

## FRONTEND (բրաուզերում աշխատող)

| Թղթապանակ / ֆայլ | Ինչ է |
|-------------------|--------|
| **`_project/app/`** | Էջեր և layout — React կոմպոնենտներ, HTML/CSS, routing |
| **`_project/app/page.tsx`**, **`layout.tsx`** | Landing, ընդհանուր layout |
| **`_project/app/admin/*`** | Admin panel-ի էջեր (UI) |
| **`_project/app/order/[token]/*`** | Client-ի վճարման էջ (UI) |
| **`_project/components/`** | UI կոմպոնենտներ (buttons, forms, sections) |
| **`_project/public/`** | Ստատիկ ֆայլեր (նկարներ, favicon) |

**Կարճ.** Ինչ օգտատերը **տեսնում** է և **սեղմում** — frontend.

---

## BACKEND (սերվերում աշխատող)

| Թղթապանակ / ֆայլ | Ինչ է |
|-------------------|--------|
| **`_project/app/api/*`** | REST API endpoints (GET/POST) — օր. `/api/leads`, `/api/orders` |
| **`_project/app/**/actions.ts`** | Server Actions — form submit, ֆայլ upload, business logic |
| **`_project/lib/`** | Սերվերային լոգիկա — DB, email, R2, Stripe |
| **`_project/lib/db.ts`** | Prisma client — ԲԴ կապ |
| **`_project/lib/validations/`** | Zod schemas — մուտքային տվյալների ստուգում |
| **`_project/prisma/`** | ԲԴ սխեմա և միգրացիաներ |

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
│  app/  +  components/  +  public/                        │
│  React, Tailwind, forms, pages                          │
└─────────────────────┬───────────────────────────────────┘
                      │ fetch() / Server Action
                      ▼
┌─────────────────────────────────────────────────────────┐
│  BACKEND (Node.js on Vercel)                            │
│  app/api/*  +  **/actions.ts  +  lib/  +  prisma/       │
│  DB, email, Stripe, R2, validation                      │
└─────────────────────────────────────────────────────────┘
```
