# Տեխնոլոգիաների stack — Goldcrest 3D

> Ըստ [TECH_CARD.md](./TECH_CARD.md) և [01-ARCHITECTURE.md](./01-ARCHITECTURE.md).  
> Ֆունկցիոնալ զադրանք — [project.md](../project.md).

**Նախագծի չափ.** A  
**Վերջին թարմացում.** 2026-03-09

---

## Հիմք

| Տեխնոլոգիա | Որոշում | Նշում |
|-------------|---------|-------|
| Package manager | pnpm | Ստանդարտ |
| Node.js | 20.x LTS | |
| TypeScript | 5.x, strict: true | |
| Git | trunk-based | Conventional Commits |

---

## Frontend

| Տեխնոլոգիա | Որոշում | Նշում |
|-------------|---------|-------|
| Framework | Next.js 15+ (App Router) | Vercel |
| Ոճեր | Tailwind CSS 4.x | |
| UI Kit | shadcn/ui | Landing + Admin |
| State | useState + Server Components | Չափ A-ի համար բավարար |
| Ձևեր | React Hook Form + Zod | Quote form, Admin forms |
| Data fetching | Server Components / fetch | |
| i18n | — | MVP մի լեզու (hy) |
| SEO | Metadata API | landing meta, title, description |

---

## Backend

| Տեխնոլոգիա | Որոշում | Նշում |
|-------------|---------|-------|
| Տիպ | Next.js API Routes + Server Actions | Fullstack, Vercel |
| Վալիդացիա | Zod | Բոլոր մուտքերում |
| API | REST (ներքին) | Server Actions forms-ի համար |
| Ֆայլեր | Server Actions → R2 | Quote attachments, order images |
| Rate limiting | Middleware | Quote form, auth |

---

## Բազային տվյալներ

| Տեխնոլոգիա | Որոշում | Նշում |
|-------------|---------|-------|
| ՍՈՒԲԴ | PostgreSQL 17 (Neon) | |
| ORM | Prisma 6.x / 7.x | schema: `prisma/schema.prisma` |
| Դերեր | app_user + readonly_user | Runtime-ի համար |
| Cache / Հերթեր | — | MVP-ում պետք չէ |

---

## Ինքնություն

| Տեխնոլոգիա | Որոշում | Նշում |
|-------------|---------|-------|
| Auth | Auth.js 5.x | Միայն admin |
| Մատակարարներ | Google / GitHub / Email (Credentials) | Քննարկել |
| Սեսիաներ | Database sessions | |
| Դերեր | ADMIN | Միայն admin panel |

---

## Պահոց և արտաքին սերվիսներ

| Սերվիս | Նշանակություն |
|--------|----------------|
| Cloudflare R2 | Quote attachments, order product images |
| Resend | Reply to leads, payment link email |
| Stripe | Payment links — Full / 50-50 |
| Vercel Edge | CDN / static |

---

## DevOps

| Տեխնոլոգիա | Որոշում |
|-------------|---------|
| Հոսթինգ | Vercel (fullstack) |
| CI/CD | GitHub Actions |
| Լոգեր | Pino (prod) |
| ԲԴ բեքափներ | Neon auto (PITR) |

---

## Թեստավորում

| Տիպ | Որոշում |
|-----|---------|
| Unit | Vitest |
| Կոմպոնենտ | React Testing Library |
| E2E | — (MVP) |
| Ծածկույթ | ≥70% (բիզնես-լոգիկա) |

---

## Անվտանգություն

- CORS, CSRF (forms / Server Actions)
- Zod validation բոլոր սահմաններում
- Rate limiting (quote, auth)
- Գաղտնիքներ միայն env-ում
- argon2 — Credentials provider-ի դեպքում

---

**Կապված.** [TECH_CARD.md](./TECH_CARD.md) · [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [05-DATABASE.md](./05-DATABASE.md)
