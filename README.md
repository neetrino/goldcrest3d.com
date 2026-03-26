# Goldcrest 3D

Goldcrest-ի 3D մոդելավորման և արտադրության ծառայությունների պրոմո-կայք — single-page landing (Apple-սթայլ) և admin panel (հայտեր, պատվերներ, վճարման հղումներ Full / 50-50).

**Ֆունկցիոնալ զադրանք.** [project.md](./project.md)  
**Task-եր (հերթով).** [TASKS.md](./TASKS.md) — անել հերթով, done նշել կողքը  
**Փաստաթղթեր.** [docs/](./docs/) — BRIEF, TECH_CARD, 01-ARCHITECTURE, 02–05, PROGRESS, DECISIONS

---

## Կառուցվածք

- `src/app/` — էջեր, layout (Landing, Admin, Client payment page)
- `src/components/` — UI (landing, quote-form, admin, ui)
- `src/lib/` — DB, auth, email, R2, Stripe, validations
- `prisma/` — ԲԴ սխեմա, միգրացիաներ
- `public/` — ստատիկ ֆայլեր
- `docs/` — փաստաթղթեր

---

## Մեկնարկ

```bash
pnpm install
cp .env.example .env
# Լրացրու՛ .env — DATABASE_URL, DIRECT_URL, (R2, Resend, Stripe, Auth)
pnpm db:generate
pnpm dev
```

Բացվում է http://localhost:3000

**ԲԴ (առաջին անգամ).**  
Neon-ից connection string ավելացրու՛ `.env`-ում, ապա.

```bash
pnpm db:migrate
```

---

## Հրամաններ

| Հրաման | Նշանակություն |
|--------|----------------|
| `pnpm dev` | Զարգացման սերվեր |
| `pnpm build` | Build (Prisma generate + Next build) |
| `pnpm start` | Production start |
| `pnpm db:generate` | Prisma client generate |
| `pnpm db:push` | Schema push (dev) |
| `pnpm db:migrate` | Միգրացիա (dev) |

---

## Փաստաթղթեր

| Փաստաթուղթ | Նշանակություն |
|-------------|----------------|
| [project.md](./project.md) | Ֆունկցիոնալ զադրանք |
| [docs/BRIEF.md](./docs/BRIEF.md) | Տեխզադրանք |
| [docs/TECH_CARD.md](./docs/TECH_CARD.md) | Տեխնոլոգիական քարտ |
| [docs/01-ARCHITECTURE.md](./docs/01-ARCHITECTURE.md) | Ճարտարապետություն |
| [docs/02-TECH_STACK.md](./docs/02-TECH_STACK.md) | Տեխնոլոգիաների stack |
| [docs/03-STRUCTURE.md](./docs/03-STRUCTURE.md) | Ֆայլերի կառուցվածք |
| [docs/04-API.md](./docs/04-API.md) | API / Server Actions |
| [docs/05-DATABASE.md](./docs/05-DATABASE.md) | ԲԴ սխեմա |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | Առաջընթաց |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Կայացված որոշումներ |
