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
- bcryptjs — գաղտնաբառի hash (Credentials provider)

---

---

## Կախվածություններ — միայն popular

Նախագծում օգտագործվում են **միայն լայն տարածված, ճանաչված** գրադարաններ։ Փոքր/անծանոթ փաթեթներ չեն ավելացվում։

| Խումբ | Փաթեթ | Նշում |
|-------|--------|-------|
| Framework | next, react, react-dom | Next.js, React |
| ORM / DB | prisma, @prisma/client, @prisma/adapter-pg, pg | Prisma, node-postgres |
| Auth | next-auth, @auth/prisma-adapter | Auth.js, official adapter |
| Password | bcryptjs | Հանրաճանաչ hash, pure JS |
| Validation | zod | Schema validation |
| Forms | react-hook-form, @hookform/resolvers | Forms + Zod |
| Storage (S3) | @aws-sdk/client-s3 | Official AWS SDK, R2-compatible |
| Email | resend | Թրանզակցիոն email |
| Dev / Seed | typescript, tsx, eslint, tailwindcss | Tooling |

**Կանոն.** Նոր dependency ավելացնելիս — միայն այնպիսի փաթեթ, որը industry-standard կամ npm-ում շատ տարածված է (օր. npm weekly downloads, GitHub stars)։ Հակառակ դեպքում — իրականացնել սեփական լոգիկա կամ օգտագործել արդեն stack-ում 있는 գործիքը։

---

**Կապված.** [TECH_CARD.md](./TECH_CARD.md) · [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [05-DATABASE.md](./05-DATABASE.md)
