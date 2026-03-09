# Goldcrest 3D — Task-եր (հերթով)

> Յուրաքանչյուր task անելուց հետո `[ ]`-ը փոխի՛ր `[x]`-ի (done).  
> Ըստ [project.md](./project.md) և [docs/PROGRESS.md](./docs/PROGRESS.md).

**Վերջին թարմացում.** 2026-03-09

---

## Փուլ 0. Նախապատրաստություն

- [ ] **0.1** TECH_CARD հաստատել (մշակողի հաստատում)
- [x] **0.2** Neon — նախագիծ/ԲԴ, `DATABASE_URL` + `DIRECT_URL` ավելացնել `.env`
- [ ] **0.3** `pnpm install`, `pnpm db:generate`, `pnpm db:migrate` — ԲԴ աշխատում է

---

## Փուլ 1. Landing page (single-page, Apple-սթայլ)

- [x] **1.1** Landing layout — `src/app/page.tsx`, sections wrapper, scroll-to-section (menu սեղմելիս → section)
- [x] **1.2** Section: 3 Power Banners (hero / carousel)
- [x] **1.3** Section: Goldcrest Engineering Philosophy
- [x] **1.4** Section: Modeling Specializations
- [x] **1.5** Section: Manufacturing Intelligence
- [x] **1.6** Section: Founder — Authority Block
- [x] **1.7** Section: Process
- [x] **1.8** Section: Quote CTA (տեղ — form-ը հաջորդ փուլում)
- [x] **1.9** Section: Footer
- [x] **1.10** SEO — metadata, title, description (landing)

---

## Փուլ 2. Quote CTA — «Ուղարկել հայտ» ֆորմ

- [ ] **2.1** Quote form UI — Full Name, Email, Message, Image upload (file input)
- [ ] **2.2** Zod schema — `src/lib/validations/quoteForm.ts` (fullName, email, message, optional file)
- [ ] **2.3** R2 — `src/lib/storage.ts` (upload quote attachment), env R2_* լրացնել
- [ ] **2.4** Server Action `submitQuoteForm` — validation → R2 upload → `prisma.lead.create`
- [ ] **2.5** Form submit → success/error message օգտատիրոջը
- [ ] **2.6** (Ըստ ընտրության) email notification to admin — Resend

---

## Փուլ 3. Admin — Auth + Leads Inbox

- [ ] **3.1** Auth.js — կարգավորում (`src/lib/auth.ts`), DB sessions, `AUTH_SECRET`, `AUTH_URL`
- [ ] **3.2** Admin layout — `src/app/admin/layout.tsx`, session check, redirect եթե unauthenticated
- [ ] **3.3** Leads list — `src/app/admin/leads/page.tsx` (կամ list + [id]) — ցուցադրել բոլոր Lead-երը (name, email, createdAt)
- [ ] **3.4** Lead detail view — client name, email, message, attachments (R2 links/prev)
- [ ] **3.5** Reply UI — input + «Reply» button
- [ ] **3.6** Resend — `src/lib/email.ts` (send email), env `RESEND_*` լրացնել
- [ ] **3.7** Server Action `replyToLead(leadId, replyText)` — send email to lead’s email via Resend

---

## Փուլ 4. Admin — Orders (CRUD)

- [ ] **4.1** Orders list — `src/app/admin/orders/page.tsx` — ցուցադրել orders (client, product, price, status)
- [ ] **4.2** Add New Order — form: Client name, Client email, Product title, Product image (upload), Custom price
- [ ] **4.3** Order validation (Zod) — clientName, clientEmail, productTitle, priceCents, paymentType (FULL | SPLIT)
- [ ] **4.4** Server Action `createOrder` — R2 product image upload → Order create, token generate (cuid/nanoid)
- [ ] **4.5** Order detail page — `src/app/admin/orders/[id]/page.tsx` (կամ modal) — ամբողջ order տվյալներ
- [ ] **4.6** Edit order — Server Action `updateOrder`, form prefill
- [ ] **4.7** Delete order — Server Action `deleteOrder` (կոնֆիրմ)

---

## Փուլ 5. Payment link — Send / Copy + Client page

- [ ] **5.1** Order detail-ում «Send Payment Link» button
- [ ] **5.2** Server Action `sendPaymentLink(orderId)` — build URL `origin + /order/[token]` → send email to `order.clientEmail` (Resend)
- [ ] **5.3** «Copy payment link» — client-side copy `origin + /order/[token]` to clipboard
- [ ] **5.4** Stripe — `src/lib/stripe.ts` (payment link creation), env `STRIPE_*` լրացնել
- [ ] **5.5** Payment type Full — Stripe payment link 100%; Split — 50% + 50% (երկու link/checkout session)
- [ ] **5.6** Client payment page — `src/app/order/[token]/page.tsx` (public): Total price, Paid amount, Remaining balance, Payment type (Full / 50-50)
- [ ] **5.7** 50-50 — ցուցադրել մնացած 50% վճարման պարտավորություն
- [ ] **5.8** Pay button — redirect to Stripe checkout / payment link; webhook կամ callback — `paidCents` / `status` թարմացում

---

## Փուլ 6. Polish + Անվտանգություն

- [ ] **6.1** Rate limiting — quote form, auth routes (middleware կամ Vercel)
- [ ] **6.2** CORS, CSRF — forms / Server Actions (Next.js default + ստուգում)
- [ ] **6.3** Error handling — try/catch, user-friendly messages, լոգ (Pino prod)
- [ ] **6.4** Վալիդացիա — Zod բոլոր Server Actions-ում, API-ում

---

## Փուլ 7. Թեստավորում + Դեպլոյ

- [ ] **7.1** Vitest — unit tests (validations, utils)
- [ ] **7.2** React Testing Library — կրիտիկական կոմպոնենտներ (quote form, admin forms)
- [ ] **7.3** Vercel — project connect, env (DATABASE_URL, DIRECT_URL, R2, Resend, Stripe, Auth)
- [ ] **7.4** Neon — prod branch, migration production-ում
- [ ] **7.5** PROGRESS.md — 100%, բոլոր փուլեր done
- [ ] **7.6** TECH_CARD — 12-րդ բաժին (եզրափակիչ ստուգում) լրացնել

---

## Ամփոփ աղյուսակ

| Փուլ | Task-եր | Done |
|------|---------|------|
| 0 | 0.1 – 0.3 | 0/3 |
| 1 | 1.1 – 1.10 | 10/10 |
| 2 | 2.1 – 2.6 | 0/6 |
| 3 | 3.1 – 3.7 | 0/7 |
| 4 | 4.1 – 4.7 | 0/7 |
| 5 | 5.1 – 5.8 | 0/8 |
| 6 | 6.1 – 6.4 | 0/4 |
| 7 | 7.1 – 7.6 | 0/6 |

**Ընդամենը.** 51 task

---

**Կապված.** [project.md](./project.md) · [docs/04-API.md](./docs/04-API.md) · [docs/PROGRESS.md](./docs/PROGRESS.md)
