# Նախագծի տեխնոլոգիական քարտ — Goldcrest 3D

> Լրացվում է AI-ի կողմից `docs/BRIEF.md`-ի վերլուծությունից հետո պլանավորման փուլում։
> Յուրաքանչյուր կետ — AI-ի առաջարկ + մշակողի հաստատում։
> **Մի սկսի՛ր կոդ մինչև քարտի հաստատումը։**

**Նախագիծ.** Goldcrest 3D  
**Չափ.** A  
**Ամսաթիվ.** 2026-03-09  
**Ստատուս.** սևագիր

> Ստատուսներ. ⬜ չի սկսվել · 🔄 ընթացքում · ✅ պատրաստ · ➖ պետք չէ

---

## 1. Հիմք

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 1.1 | Նախագծի չափ | A | ✅ | BRIEF + 00-core |
| 1.2 | Ճարտարապետություն | Պարզ | ✅ | src/app, components, lib |
| 1.3 | Package manager | pnpm | ✅ | ստանդարտ |
| 1.4 | Node.js | 20.x LTS | ⬜ | |
| 1.5 | TypeScript | 5.x, strict: true | ⬜ | |
| 1.6 | Monorepo գործիք | — | ➖ | միայն C-ի համար |
| 1.7 | Git ստրատեգիա | trunk-based | ⬜ | |
| 1.8 | Commit կոնվենցիա | Conventional Commits | ✅ | .commitlintrc.json |

---

## 2. Frontend

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 2.1 | Framework | Next.js 15.x (App Router) | ⬜ | |
| 2.2 | Ոճեր | Tailwind CSS 4.x | ⬜ | |
| 2.3 | UI Kit | shadcn/ui | ⬜ | landing + admin |
| 2.4 | State management | useState + Server Components | ⬜ | A-ի համար բավարար |
| 2.5 | Ձևեր | React Hook Form + Zod | ⬜ | Quote form, Admin forms |
| 2.6 | Data fetching | Server Components / fetch | ⬜ | |
| 2.7 | i18n | պետք չէ | ➖ | MVP մի լեզու (hy) |
| 2.8 | SEO | Metadata API | ⬜ | landing meta, title, description |
| 2.9 | Մուգ թեմա | CSS variables (ըստ դիզայնի) | ⬜ | որոշել UI-ից առաջ |
| 2.10 | Անիմացիաներ | CSS transitions / Framer Motion | ⬜ | smooth scroll, section transitions |
| 2.11 | PWA | պետք չէ | ➖ | |

---

## 3. Backend

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 3.1 | Տիպ | Next.js API Routes + Server Actions | ⬜ | fullstack, Vercel |
| 3.2 | Վալիդացիա | Zod | ⬜ | |
| 3.3 | API ձևաչափ | REST | ⬜ | |
| 3.4 | Rate limiting | middleware (Vercel) | ⬜ | quote form, API |
| 3.5 | API փաստաթղթավորում | պետք չէ | ➖ | A |
| 3.6 | CRON | պետք չէ | ➖ | |
| 3.7 | Ֆայլերի բեռնում | Server Actions → R2 | ⬜ | quote attachments, order images |

---

## 4. Բազային տվյալներ

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 4.1 | ՍՈՒԲԴ | PostgreSQL 17 (Neon) | ⬜ | |
| 4.2 | ORM | Prisma 6.x | ⬜ | |
| 4.3 | ԲԴ դերեր | app_user + readonly_user | ⬜ | ստանդարտ |
| 4.4 | Connection limit | 10 (serverless) | ⬜ | ադապտիվ — Neon serverless |
| 4.5 | statement_timeout | 15s | ⬜ | ադապտիվ |
| 4.6 | idle_in_transaction_session_timeout | 10s | ⬜ | ադապտիվ |
| 4.7 | lock_timeout | 5s | ⬜ | ադապտիվ |
| 4.8 | Seed data | prisma db seed | ⬜ | optional fixtures — admin-ը DB-ում |
| 4.9 | Cache (Redis) | պետք չէ | ➖ | |
| 4.10 | Հերթեր | պետք չէ | ➖ | |

---

## 5. Ինքնություն հաստատում

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 5.1 | Լուծում | Auth.js 5.x | ⬜ | միայն admin |
| 5.2 | Մատակարարներ | Google / GitHub / Email (Credentials) | ⬜ | քննարկել |
| 5.3 | Սեսիաների ստրատեգիա | Database sessions | ⬜ | |
| 5.4 | Դերեր / RBAC | ADMIN (միայն admin panel) | ⬜ | |
| 5.5 | Email վերահաստատում | պետք չէ | ➖ | |
| 5.6 | Գաղտնաբառի վերականգնում | պետք չէ | ➖ | կամ Credentials-ի դեպքում |

---

## 6. Պահոց և CDN

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 6.1 | Ֆայլային պահոց | Cloudflare R2 | ⬜ | quote attachments, order product images |
| 6.2 | CDN | Vercel Edge | ⬜ | |
| 6.3 | Պատկերների օպտիմիզացիա | next/image | ⬜ | |

---

## 7. Արտաքին սերվիսներ

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 7.1 | Email / mailings | Resend | ✅ | reply to leads, payment link email; env: RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_REPLY_TO_EMAILS (customer Reply-To), optional ADMIN_NOTIFY_EMAIL |
| 7.2 | Վճարումներ | Stripe | ⬜ | payment links, Full / 50-50 |
| 7.3 | Անալիտիկա | պետք չէ | ➖ | կամ Vercel Analytics |
| 7.4 | Error tracking | պետք չէ / Sentry | ⬜ | ադապտիվ |
| 7.5 | Որոնում | պետք չէ | ➖ | |
| 7.6 | Push / WebSocket | պետք չէ | ➖ | |
| 7.7 | SMS | պետք չէ | ➖ | |
| 7.8 | AI սերվիսներ | պետք չէ | ➖ | |
| 7.9 | CMS | պետք չէ | ➖ | |
| 7.10 | Քարտեզներ | պետք չէ | ➖ | |

---

## 8. DevOps և հոսթինգ

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 8.1 | Frontend հոսթինգ | Vercel | ⬜ | fullstack app |
| 8.2 | Backend հոսթինգ | — | ➖ | Next.js API/Vercel |
| 8.3 | CI/CD | GitHub Actions | ⬜ | |
| 8.4 | Docker | պետք չէ | ➖ | |
| 8.5 | WAF | պետք չէ | ➖ | |
| 8.6 | Մոնիտորինգ | պետք չէ | ➖ | |
| 8.7 | Լոգավորում | Pino (prod) | ⬜ | |
| 8.8 | Շրջակա միջավայրեր | dev + prod | ⬜ | Neon branch, Vercel env |
| 8.9 | Դոմեն | Vercel ավտո / անհատական | ⬜ | ադապտիվ |
| 8.10 | ԲԴ բեքափներ | Neon auto (PITR) | ⬜ | |

---

## 9. Թեստավորում

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 9.1 | Unit թեստեր | Vitest | ⬜ | |
| 9.2 | Կոմպոնենտային թեստեր | React Testing Library | ⬜ | կրիտիկական կոմպոնենտներ |
| 9.3 | E2E թեստեր | պետք չէ | ➖ | MVP |
| 9.4 | Ծածկույթ (նպատակ) | ≥70% (բիզնես-լոգիկա) | ⬜ | ադապտիվ |
| 9.5 | API թեստեր | supertest / Vitest | ⬜ | API routes |

---

## 10. Անվտանգություն (պարտադիր)

| # | Պարամետր | Ստատուս | Նշում |
|---|----------|---------|-------|
| 10.1 | CORS | ⬜ | |
| 10.2 | CSRF պաշտպանություն | ⬜ | forms, Server Actions |
| 10.3 | Helmet (NestJS) | ➖ | Next.js |
| 10.4 | Մուտքային տվյալների վալիդացիա | ⬜ | Zod բոլոր սահմաններում |
| 10.5 | argon2 գաղտնաբառերի համար | ⬜ / ➖ | Credentials provider-ի դեպքում |
| 10.6 | Rate limiting | ⬜ | quote, auth |
| 10.7 | Env-փոփոխականներ (ոչ կոդում) | ⬜ | |

---

## 11. Նախագծի փաստաթղթավորում

| # | Փաստաթուղթ | Ստատուս | Նշում |
|---|-------------|---------|-------|
| 11.1 | docs/BRIEF.md | ✅ | |
| 11.2 | docs/TECH_CARD.md | ✅ | այս ֆայլը |
| 11.3 | docs/01-ARCHITECTURE.md | ✅ | |
| 11.4 | docs/PROGRESS.md | ✅ | |
| 11.5 | Նախագծի README.md | ✅ | project.md, src/, docs աղյուսակ |
| 11.6 | .env.example | ✅ | DATABASE_URL, DIRECT_URL, R2, Resend, Stripe, Auth |

---

## 12. Նախագծի եզրափակիչ ստուգում

> Լրացվում է զարգացման ավարտին։

### Կոդ և որակ
| # | Կետ | Ստատուս |
|---|-----|---------|
| 12.1 | TypeScript strict, 0 սխալ | ✅ |
| 12.2 | ESLint — 0 warnings | ✅ |
| 12.3 | Unit թեստեր (Vitest) — validations, utils | ✅ |
| 12.4 | Կոմպոնենտային թեստեր (RTL) — quote form, admin forms | ✅ |
| 12.5 | Ֆունկցիաներ ≤50 տող, ֆայլեր ≤300 տող | ✅ |

### Տվյալներ և անվտանգություն
| # | Կետ | Ստատուս |
|---|-----|---------|
| 12.6 | Zod վալիդացիա — quote, order, lead reply, checkout | ✅ |
| 12.7 | Rate limiting (quote, auth) | ✅ |
| 12.8 | Գաղտնաբառ — bcrypt (Credentials) | ✅ |
| 12.9 | Env — .env.example, ոչ գաղտնիքներ կոդում | ✅ |

### Դեպլոյ
| # | Կետ | Ստատուս |
|---|-----|---------|
| 12.10 | Vercel — project connect, env | ⬜ մշակող |
| 12.11 | Neon — prod branch, migration | ⬜ մշակող |

### Փաստաթղթավորում
| # | Կետ | Ստատուս |
|---|-----|---------|
| 12.12 | PROGRESS.md — թարմացված | ✅ |
| 12.13 | TASKS.md — 7.1, 7.2 done | ✅ |

---

## Ամփոփում

**Կետերի ընդհանուր.** 11 բաժին (1–11)  
**Հաստատված.** 1.1, 1.2, 1.3, 1.8  
**Պետք չէ.** 1.6, 2.7, 2.11, 3.5, 3.6, 4.9, 4.10, 5.5, 5.6, 7.3–7.10, 8.2, 8.4, 8.5, 8.6, 9.3, 10.3  
**Քննարկել.** 4.4–4.7 (timeouts), 5.2 (auth provider), 7.4 (Sentry), 8.9 (դոմեն), 9.4 (ծածկույթ)

> **Նախագծի սկիզբ.** հաստատի՛ր 1–11 բաժինները, փոխի՛ր ստատուսը **հաստատված**։  
> **Նախագծի ավարտ.** անցի՛ր 12-րդ բաժինը → ստատուս **ավարտված**։
