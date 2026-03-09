# Նախագծի ճարտարապետություն — Goldcrest 3D

> Landing + Admin (Leads Inbox, Orders, Payment Links). Single-page site Apple-սթայլ, quote form, admin panel — հայտեր, պատվերներ, Full/50-50 վճարումներ։

**Նախագծի չափ.** A  
**Վերջին թարմացում.** 2026-03-09

---

## 📋 ԱՄԲՈՂՋԱԿ

### Նշանակություն
Goldcrest 3D-ի պրոմո-կայքը լուծում է երկու խնդիր. (1) հաճախորդների հասնելիություն — single-page landing + «Ուղարկել հայտ» ֆորմ, (2) կառավարում — admin-ում հայտերի inbox, պատվերների ձեռքով ստեղծում, վճարման հղումների ուղարկում (Full կամ 50/50) client-ի email-ին։

### Հիմնական առանձնահատկություններ
- Single-page landing (scroll-to-section), 3 Power Banners, Philosophy, Specializations, Manufacturing, Founder, Process, Quote CTA, Footer
- Quote CTA form — Full Name, Email, Message, Image upload → Leads Inbox
- Admin — Leads Inbox (list + detail, Reply → client email), Orders (CRUD, product image, custom price)
- Payment links — Send/Copy link, Full (100%) or Split (50/50), client view — Total / Paid / Remaining / type

### Օգտատերեր
- **Հաճախորդ (անանուն).** Ծանոթանում է landing-ին, լրացնում quote form, ստանում payment link email-ով, վճարում։
- **Admin.** Մուտք admin panel, դիտում/պատասխանում հայտեր, ստեղծում/խմբագրում պատվերներ, ուղարկում payment link։

---

## 🏗️ ՃԱՐՏԱՐԱՊԵՏՈՒԹՅՈՒՆ

### Բարձր մակարդակի դիագրամ

```
┌──────────────────────────────────────────────────────────┐
│                    Next.js App (Vercel)                    │
│  ┌─────────────────────┐  ┌─────────────────────────────┐│
│  │   Public (Landing)   │  │   Admin (protected)          ││
│  │   /                  │  │   /admin/leads, /admin/orders││
│  │   sections, form     │  │   list + detail, Reply, CRUD  ││
│  └──────────┬──────────┘  └───────────────┬───────────────┘│
│             │                            │                 │
│  ┌──────────▼────────────────────────────▼───────────────┐ │
│  │  Server Actions / API Routes (validation, business)   │ │
│  └──────────┬────────────────────────────┬─────────────┘ │
└─────────────┼────────────────────────────┼───────────────┘
              │                            │
    ┌─────────▼─────────┐    ┌─────────────▼─────────────┐
    │  Neon PostgreSQL  │    │  R2 / Resend / Stripe     │
    │  Prisma            │    │  files, email, payments  │
    └───────────────────┘    └───────────────────────────┘
```

### Ճարտարապետական ոճ
**Modular Monolith (single Next.js app).**

**Հիմնավորում.** Չափ A, մեկ դոմեն, պարզ հոսքեր — Next.js App Router + Server Actions + API Routes բավարար են; առանձին NestJS/backend չի պահանջվում։

---

## 🧩 ՀԱՄԱԿԱՐԳԻ ԿՈՄՊՈՆԵՆՏՆԵՐ

### Frontend
- **Տեխնոլոգիա.** Next.js 15.x (App Router), React 18, Tailwind, shadcn/ui
- **Նշանակություն.** Landing (public), Quote form, Admin UI (leads, orders, payment actions)
- **Գտնվելու վայր.** `src/app/`, `src/components/`
- **Առանձնահատկություններ.** SSR/static landing, Client Components որտեղ form/interaction

### Backend
- **Տեխնոլոգիա.** Next.js API Routes + Server Actions
- **Նշանակություն.** Form submit, file upload → R2, leads CRUD, orders CRUD, send payment link email, Stripe link generation
- **Գտնվելու վայր.** `src/app/api/`, `src/app/**/actions.ts`, `src/lib/`
- **API ոճ.** REST (ներքին), Server Actions (forms)

### Բազային տվյալներ
- **Տեխնոլոգիա.** PostgreSQL 17 (Neon)
- **ORM.** Prisma 6.x
- **Սխեմա.** `prisma/schema.prisma`

### Cache
- **Պետք չէ** (MVP)

---

## 📁 ՆԱԽԱԳԾԻ ԿԱՐԳՈՒՑՎԱԿՔԸ (Չափ A)

```
src/
├── app/
│   ├── page.tsx                 # Landing (single page, sections)
│   ├── layout.tsx
│   ├── admin/
│   │   ├── layout.tsx           # protected, auth check
│   │   ├── leads/               # Inbox list + [id] detail
│   │   └── orders/              # list + [id] detail, Add/Edit
│   ├── order/[token]/           # client payment view (public link)
│   └── api/                     # REST endpoints if needed
├── components/
│   ├── landing/                 # sections, hero, philosophy, CTA...
│   ├── quote-form/              # form + validation
│   ├── admin/                   # leads list/detail, orders list/detail
│   └── ui/                      # shadcn
├── lib/
│   ├── db.ts                    # Prisma client
│   ├── auth.ts                  # Auth.js config
│   ├── email.ts                 # Resend
│   ├── storage.ts               # R2 upload
│   ├── stripe.ts                # payment link creation
│   └── validations/             # Zod schemas
├── types/
└── constants/
prisma/
├── schema.prisma
└── migrations/
docs/
├── BRIEF.md
├── TECH_CARD.md
├── 01-ARCHITECTURE.md
└── PROGRESS.md
```

### Թղթապանակների նկարագրություն

| Թղթապանակ | Նշանակություն |
|------------|----------------|
| `src/app/` | Էջեր, layouts, API routes, Server Actions |
| `src/app/admin/` | Admin-only routes (leads, orders) |
| `src/app/order/[token]/` | Client payment page (link from email) |
| `src/components/` | Landing, quote form, admin UI, shared UI |
| `src/lib/` | DB, auth, email, R2, Stripe, validations |
| `prisma/` | Սխեմա, միգրացիաներ |
| `docs/` | Փաստաթղթեր |

---

## 🔄 ՏՎՅԱԼՆԵՐԻ ՀՈՐԻԶՈՆՏՆԵՐ

### Quote form submit
1. Client → Landing → Quote form (Full Name, Email, Message, Image)
2. Submit → Server Action → Zod validation → save Lead (Prisma), upload image → R2
3. (Ըստ ընտրության) email notification to admin

### Admin — Reply to lead
1. Admin → Leads Inbox → detail → Reply
2. Server Action → send email via Resend to lead’s email

### Admin — Create order + Send payment link
1. Admin → Orders → Add → Client name/email, Product title, Product image, Custom price, Payment type (Full / 50-50)
2. Save → Order in DB, image → R2
3. «Send Payment Link» → generate Stripe link (or app URL with order token), send email to client with link
4. Client opens link → `src/app/order/[token]/page.tsx` → Total / Paid / Remaining / Payment type, pay (Stripe)

### Ինքնություն
- Auth.js — session in DB, only admin routes protected; role ADMIN (կամ single admin user)

---

## 📊 ԲԱԶԱՅԻՆ ՏՎՅԱԼՆԵՐ

### Հիմնական էնտիտիներ

| Էնտիտի | Նկարագրություն |
|--------|-----------------|
| User | Admin օգտատեր (Auth.js) |
| Lead | Quote form submission — name, email, message, attachment keys (R2) |
| Order | Client name, email, product title, product image key, custom price, payment type (full/split), status, paid amount |
| Payment | Կապված order-ի հետ (Stripe payment intent / link), 50/50-ի դեպքում երկու փուլ |

### ER (համառոտ)

```
[User] 1 —— * (admin only, no direct relation to Lead/Order)

[Lead] — name, email, message, attachmentUrl(s), createdAt

[Order] — clientName, clientEmail, productTitle, productImageKey, price, paymentType (FULL|SPLIT), paidAmount, status, token (public link)
```

### Մանրամասն սխեմա
Տե՛ս `prisma/schema.prisma` (ստեղծվելու է զարգացման փուլում)

---

## 🔌 ԻՆՏԵԳՐԱՑԻԱՆԵՐ

| Սերվիս | Նշանակություն | Փաստաթղթավորում |
|--------|----------------|-------------------|
| Stripe | Payment links (Full / 50-50) | reference/platforms, Stripe Docs |
| Resend | Email — reply to leads, payment link | reference/platforms/11-EMAIL.md |
| Cloudflare R2 | Quote attachments, order product images | reference/platforms/03-CLOUDFLARE.md |
| Auth.js | Admin session | reference/platforms/10-AUTH.md |
| Neon | PostgreSQL | reference/platforms/02-NEON.md |

---

## 🔐 ԱՆՎՏԱՆԳՈՒԹՅՈՒՆ

### Ինքնություն
- Auth.js — Database sessions
- Պահպանում. httpOnly cookies
- Admin-only routes — middleware check session + role

### Պաշտպանություն
- HTTPS (Vercel)
- CORS, CSRF (forms / Server Actions)
- Rate limiting (quote form, auth)
- Zod validation բոլոր մուտքերում
- Գաղտնիքներ միայն env-ում

---

## 🚀 ԴԵՊԼՈՅ

### Շրջակա միջավայրեր

| Շրջակա միջավայր | URL | Նշանակություն |
|------------------|-----|----------------|
| Development | localhost:3000 | Տեղական զարգացում |
| Production | Vercel ավտո / անհատական դոմեն | Goldcrest 3D |

### Ինֆրակառուցվածք
- **Vercel** — Next.js app (front + API + Server Actions)
- **Neon** — PostgreSQL (branch dev/prod)
- **Cloudflare R2** — bucket quote + order images
- **Resend** — transactional email
- **Stripe** — payment links

---

## 📋 ՀԻՄՆԱԿԱՆ ՈՐՈՇՈՒՄՆԵՐ

| Որոշում | Ընտրություն | Պատճառ |
|---------|---------------|--------|
| Fullstack | Next.js only | Չափ A, մեկ դոմեն, արագ դեպլոյ |
| ORM | Prisma | Type-safe, Neon, միգրացիաներ |
| Ոճեր | Tailwind + shadcn/ui | Արագ UI, համահունչ |
| Auth | Auth.js | Ստանդարտ, admin-only |
| Վճարումներ | Stripe | Payment links, 50/50 support |
| Email | Resend | Պարզ API, deliverability |
| Ֆայլեր | R2 | reference, S3-compatible |

---

## 🔗 ԿԱՊՎԱԾ ՓԱՍՏԱԹՂԹԵՐ

- [BRIEF.md](./BRIEF.md)
- [TECH_CARD.md](./TECH_CARD.md)
- [PROGRESS.md](./PROGRESS.md)
- [project.md](../project.md) — ֆունկցիոնալ զադրանք

---

**Փաստաթղթի տարբերակ.** 1.0  
**Ամսաթիվ.** 2026-03-09
