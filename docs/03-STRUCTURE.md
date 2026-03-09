# Ֆայլերի կառուցվածք — Goldcrest 3D

> Ըստ [project.md](../project.md) և [01-ARCHITECTURE.md](./01-ARCHITECTURE.md).  
> Նախագծի արմատ — repo root; կոդը `src/` տակ։

**Նախագծի չափ.** A  
**Վերջին թարմացում.** 2026-03-09

---

## Ծառ (tree)

```
goldcrest3d.com/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing (single page, sections)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── favicon.ico
│   │   ├── admin/
│   │   │   ├── layout.tsx           # protected, auth check
│   │   │   ├── leads/               # Inbox list + [id] detail
│   │   │   │   └── page.tsx
│   │   │   └── orders/              # list + [id] detail, Add/Edit
│   │   │       └── page.tsx
│   │   ├── order/
│   │   │   └── [token]/             # client payment view (public link)
│   │   │       └── page.tsx
│   │   └── api/                     # REST endpoints (եթե պետք է)
│   ├── components/
│   │   ├── landing/                 # sections, hero, philosophy, CTA...
│   │   ├── quote-form/             # form + validation
│   │   ├── admin/                   # leads list/detail, orders list/detail
│   │   └── ui/                     # shadcn
│   ├── lib/
│   │   ├── db.ts                   # Prisma client
│   │   ├── auth.ts                 # Auth.js config
│   │   ├── email.ts                # Resend
│   │   ├── storage.ts              # R2 upload
│   │   ├── stripe.ts               # payment link creation
│   │   └── validations/            # Zod schemas
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/                         # ստատիկ ֆայլեր
├── docs/                           # փաստաթղթեր
├── project.md                      # ֆունկցիոնալ զադրանք
├── package.json
├── .env.example
└── README.md
```

---

## Թղթապանակների նշանակություն

| Ճանապարհ | Նշանակություն |
|-----------|----------------|
| `src/app/` | Էջեր, layouts, API routes, Server Actions |
| `src/app/admin/` | Admin-only routes (leads, orders); protected |
| `src/app/order/[token]/` | Client payment page (link from email) |
| `src/components/` | Landing, quote form, admin UI, shared UI |
| `src/lib/` | DB, auth, email, R2, Stripe, validations |
| `prisma/` | Սխեմա, միգրացիաներ |
| `docs/` | BRIEF, TECH_CARD, 01–05, PROGRESS, DECISIONS |
| `public/` | Նկարներ, favicon |

---

## Naming

- Կոմպոնենտներ — PascalCase (`ProductCard.tsx`)
- Հուկեր — camelCase, `use` prefix (`useProducts.ts`)
- Ուտիլիտա / lib — camelCase (`formatPrice.ts`)
- Տիպեր — `*.types.ts` կամ `types/index.ts`
- Հաստատուններ — `*.constants.ts` կամ `constants/index.ts`

---

**Կապված.** [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [04-API.md](./04-API.md) · [05-DATABASE.md](./05-DATABASE.md)
