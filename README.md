# Goldcrest 3D

Landing + Admin (Leads Inbox, Orders, Payment Links) — Goldcrest-ի 3D մոդելավորման և արտադրության ծառայությունների պրոմո-կայք։

- **Public:** single-page landing (Apple-սթայլ scroll-to-section), «Ուղարկել հայտ» ֆորմ
- **Admin:** հայտեր (inbox + reply email), պատվերներ (CRUD), վճարման հղումներ (Full / 50-50) client-ի email-ին

---

## Կառուցվածք

| Թղթապանակ | Նշանակություն |
|------------|----------------|
| **`_project/`** | **Միայն նախագծի կոդ** — Next.js app (app, components, lib, prisma, public). Բոլոր հրամանները այստեղից. |
| `docs/` | Փաստաթղթեր (BRIEF, TECH_CARD, ARCHITECTURE, PROGRESS) |
| `reference/` | Տեղեկատուներ (platforms, templates) |
| `.cursor/` | AI կանոններ |
| `project.md` | Ֆունկցիոնալ զադրանք |

---

## Տեղական մեկնարկ

```bash
cd _project
pnpm install
cp .env.example .env   # (կամ .env արդեն կա — Neon միացված)
pnpm db:generate
pnpm dev               # http://localhost:3000
```

ԲԴ միգրացիա. `cd _project && pnpm db:migrate`

---

## Ինչպես սկսել

1. **Փաստաթղթեր** — կարդա՛ `docs/BRIEF.md`, `docs/TECH_CARD.md`, `docs/01-ARCHITECTURE.md`
2. **Հաստատում** — TECH_CARD-ի 1–11 բաժինները հաստատի՛ր (stack, DB, auth, payments, email, R2)
3. **Env** — պատճենի՛ր `.env.example` → `.env`, լրացրու՛ (Neon, R2, Resend, Stripe, Auth.js) — տվյալները AI-ն կխնդրի ըստ need-ի
4. **Կոդ** — «Սկսի՛ր զարգացումը ըստ docs/01-ARCHITECTURE.md և docs/PROGRESS.md» — AI-ին

---

## Նախագծի փաստաթղթեր

| Փաստաթուղթ | Նշանակություն |
|-------------|----------------|
| [project.md](project.md) | Ֆունկցիոնալ զադրանք (spec) |
| [docs/BRIEF.md](docs/BRIEF.md) | Տեխզադրանք, stack, ինտեգրացիաներ |
| [docs/TECH_CARD.md](docs/TECH_CARD.md) | Տեխնոլոգիական քարտ |
| [docs/01-ARCHITECTURE.md](docs/01-ARCHITECTURE.md) | Ճարտարապետություն, կառուցվածք |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Զարգացման առաջընթաց |
| [docs/02-FRONTEND-BACKEND.md](docs/02-FRONTEND-BACKEND.md) | **Որտեղ է front, որտեղ՝ back** |

---

## Չափ և stack

- **Չափ.** A (փոքր) — 1–3 ամիս, պարզ կառուցվածք `app/`, `components/`, `lib/`
- **Stack.** Next.js 15 (App Router), Tailwind, shadcn/ui, Prisma, Neon PostgreSQL, Auth.js, Resend, Stripe, Cloudflare R2

Մանրամասն — `docs/TECH_CARD.md`, `reference/platforms/`.

---

## Մշակողի դերը

- **Կոդից առաջ.** TECH_CARD և ճարտարապետություն — հաստատել
- **Տվյալներ.** Neon (DATABASE_URL), R2 (bucket + keys), Vercel env, Auth (OAuth/Credentials), Resend, Stripe — AI-ն կխնդրի անհրաժեշտության դեպքում
- **Ընթացքում.** PROGRESS.md թարմացնել, փուլերը թեստավորել

---

[MIT](LICENSE)
