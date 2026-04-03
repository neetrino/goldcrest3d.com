# Կոդային ֆայլեր՝ 350-ից ավելի տող

**Թարմացման ամսաթիվ.** 2026-04-03  
**Շեմ.** ավելի քան 350 տող (`Measure-Object -Line` / PowerShell)  
**Շրջանակ.** միայն նախագծի կոդ (կիրառելի ծրագրի և գործիքային սկրիպտների ֆայլեր)

## Ներառված են

- `src/` — բոլոր `*.ts`, `*.tsx`, `*.js`, `*.jsx`, `*.mjs`, `*.cjs`, `*.css`, `*.scss`
- `scripts/` — նույն ընդլայնումները
- `prisma/` — նույն ընդլայնումները
- Repository root — նույն ընդլայնումները (օր. `next.config.ts`, `vitest.config.ts`)

## Բացառված են

- `node_modules`, `.git`, `.next`, `dist`, `build`, `coverage`, `.turbo`, `out`, `.vercel`, `mcps`
- Lock-ֆայլեր, բինար/մեդիա, `.md`/`.mdc` փաստաթղթեր, `reference/`, `.cursor/` և այլ ոչ-կոդային պարունակություն

## Ցանկ (ըստ տողերի՝ նվազման կարգով)

| Տողեր | Ֆայլ |
|------:|------|
| 962 | `src/app/globals.css` |
| 704 | `src/components/landing/modeling/ModelingCard.tsx` |
| 428 | `src/app/admin/leads/AdminLeadsInbox.tsx` |

**Ընդհանուր.** 3 ֆայլ

Ստուգման ժամանակ `prisma/` մեջ ոչ մի ֆայլ չի գերազանցել 350 տողը (ներառյալ `schema.prisma` և միգրացիաների SQL-ը)։

---

*Այս ցանկը կարելի է կրկին ստանալ PowerShell-ով՝ սահմանելով նույն շրջանակը և ֆիլտրը `Lines -gt 350`։*
