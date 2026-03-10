# Կայացված որոշումներ — Goldcrest 3D

> Կարևոր ճարտարապետական և տեխնոլոգիական որոշումներ։  
> Նոր որոշումներ ավելացնել ամսաթվով և պատճառով։

**Վերջին թարմացում.** 2026-03-10

---

## Next.js

| Որոշում | Ընտրություն | Պատճառ |
|---------|---------------|--------|
| Request boundary | `proxy.ts` + `export function proxy()` | Next.js 16 deprecated `middleware.ts`; proxy-ն արտահայտում է network boundary դերը, deprecation warning-ը վերացնում է |

---

## Ճարտարապետություն

| Որոշում | Ընտրություն | Պատճառ |
|---------|---------------|--------|
| Fullstack | Next.js only (App Router) | Չափ A, մեկ դոմեն, արագ դեպլոյ; առանձին backend չի պահանջվում |
| Կոդի դիրք | `src/` (repo root) | Միասնական կառուցվածք, Next.js default |

---

## Տեխնոլոգիաներ

| Որոշում | Ընտրություն | Պատճառ |
|---------|---------------|--------|
| ORM | Prisma | Type-safe, Neon, միգրացիաներ |
| Ոճեր | Tailwind + shadcn/ui | Արագ UI, համահունչ |
| Auth | Auth.js | Ստանդարտ, admin-only, DB sessions |
| Վճարումներ | Stripe | Payment links, Full / 50-50 |
| Email | Resend | Պարզ API, deliverability |
| Ֆայլեր | Cloudflare R2 | Quote attachments, order product images |
| Package manager | pnpm | Ստանդարտ |
| Commit | Conventional Commits | .commitlintrc.json |

---

## Ֆունկցիոնալ (project.md)

| Թեմա | Ընտրություն |
|------|-------------|
| Landing | Single-page, scroll-to-section (Apple-սթայլ) |
| Quote form | Full Name, Email, Message, Image upload → Leads Inbox |
| Admin Leads | List + detail, Reply → client email (Resend) |
| Admin Orders | CRUD, product image, custom price; Send/Copy payment link |
| Payment types | Full (100%), Split (50/50); client view — Total / Paid / Remaining |
| Client payment page | `/order/[token]` — public link from email |

---

## Կախվածություններ

| Որոշում | Պատճառ |
|---------|--------|
| Միայն popular փաթեթներ | Next.js, React, Prisma, Zod, next-auth, bcryptjs, resend, @aws-sdk/client-s3, pg — industry-standard կամ npm-ում շատ տարածված; փոքր/անծանոթ գրադարաններ չեն ավելացվում |

Մանրամասն ցանկ — [02-TECH_STACK.md](./02-TECH_STACK.md#կախվածություններ--միայն-popular).

---

## Անվտանգություն

| Որոշում | Պատճառ |
|---------|--------|
| Zod բոլոր մուտքերում | Վալիդացիա սահմաններում |
| Գաղտնիքներ env-ում | Ոչ կոդում |
| Admin routes protected | Auth.js session + role |
| CORS, CSRF, rate limiting | Quote form, auth |
| CORS / CSRF | Next.js default — Server Actions-ը same-origin, CSRF պաշտպանություն built-in; հատուկ CORS headers չեն պետք (public API չկա) |
| Rate limiting | proxy.ts — POST / (quote) 10/ր, POST /api/auth/* 5/ր (in-memory per instance) |
| Գաղտնաբառի hash | bcryptjs (popular, pure JS) |

---

## Սխալների մշակում և լոգ

| Որոշում | Պատճառ |
|---------|--------|
| Logger | `src/lib/logger.ts` — info/error, առայժմ console; prod-ում Pino (TECH_CARD 8.7) |
| Server Actions | try/catch, user-friendly message, logger.error |
| API routes (webhook) | try/catch, logger.error, 500 + message |

---

**Կապված.** [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [TECH_CARD.md](./TECH_CARD.md) · [project.md](../project.md)
