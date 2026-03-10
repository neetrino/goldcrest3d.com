# Կայացված որոշումներ — Goldcrest 3D

> Կարևոր ճարտարապետական և տեխնոլոգիական որոշումներ։  
> Նոր որոշումներ ավելացնել ամսաթվով և պատճառով։

**Վերջին թարմացում.** 2026-03-09

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
| Գաղտնաբառի hash | bcryptjs (popular, pure JS) |

---

**Կապված.** [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [TECH_CARD.md](./TECH_CARD.md) · [project.md](../project.md)
