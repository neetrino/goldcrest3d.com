# Responsive Audit — Goldcrest 3D

**Date:** 2025-03-19  
**Scope:** Full Next.js codebase, UI/layout only. No business logic or content-structure changes.  
**Goal:** Document current state, identify responsiveness issues, and define a safe implementation plan so the existing desktop design works across screen sizes.

---

## 1. Project overview

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS (v4 via `@import "tailwindcss"`), TypeScript.
- **Origin:** Desktop-first implementation from Figma; many dimensions and positions are tuned for a single viewport.
- **Structure:** Single public landing page (`/`), admin area (`/admin/*`), order payment (`/order/[token]`), auth sign-in (`/auth/signin`). No dedicated `tailwind.config` in repo (Tailwind v4 uses `@theme` in `globals.css`).
- **Breakpoints in use:** Only `md` (768px) and a few `sm`/`lg`; no consistent system. Default Tailwind breakpoints apply: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.
- **Global layout:** Root `layout.tsx` only sets fonts and body; no shared container. Landing uses `<main className="min-h-screen">` and `LandingSections`; admin uses flex layout with fixed-width sidebar.

---

## 2. Page inventory

| Route | File | Purpose | Layout notes |
|-------|------|--------|--------------|
| `/` | `src/app/page.tsx` | Landing: nav + `LandingSections` | No container; full-width. |
| `/admin` | `src/app/admin/page.tsx` | Redirect to `/admin/leads` | — |
| `/admin/leads` | `src/app/admin/leads/page.tsx` | Leads inbox (list + detail) | Wraps `AdminLeadsInbox` in `h-full`. |
| `/admin/leads/[id]` | `src/app/admin/leads/[id]/page.tsx` | Single lead view | — |
| `/admin/orders` | `src/app/admin/orders/page.tsx` | Orders list | `max-w-5xl overflow-auto px-4 py-6 sm:px-6`. |
| `/admin/orders/new` | `src/app/admin/orders/new/page.tsx` | New order form | — |
| `/admin/orders/[id]` | `src/app/admin/orders/[id]/page.tsx` | Edit order | — |
| `/admin/reports` | `src/app/admin/reports/page.tsx` | Reports | `max-w-5xl overflow-auto px-4 sm:px-6`. |
| `/admin/settings` | `src/app/admin/settings/page.tsx` | Settings | `max-w-2xl overflow-auto px-4 sm:px-6`. |
| `/order/[token]` | `src/app/order/[token]/page.tsx` | Order payment | `max-w-lg px-4 py-10` — already constrained. |
| `/auth/signin` | `src/app/auth/signin/page.tsx` | Admin sign-in | `min-h-screen flex items-center justify-center p-4`; form `max-w-sm`. |

**Summary:** Public-facing critical paths are `/` (landing) and `/order/[token]`. Admin and auth are secondary for responsiveness but still need to work on tablet/small laptop.

---

## 3. Shared component inventory

### 3.1 Landing (public)

| Component | Path | Role |
|----------|------|------|
| `LandingNav` | `src/components/landing/LandingNav.tsx` | Sticky nav: logo, links (hidden below `md`), “Request a Quote” CTA. |
| `LandingSections` | `src/components/landing/LandingSections.tsx` | Composes all landing sections + footer. |
| `PowerBanners` | `src/components/landing/PowerBanners.tsx` | Hero: 3 slides (Modeling, Rendering, Design); heavy use of absolute positioning and px. |
| `SectionPhilosophy` | `src/components/landing/SectionPhilosophy.tsx` | Philosophy block; fixed typography. |
| `SectionModeling` | `src/components/landing/SectionModeling.tsx` | Modeling grid + fixed-height title block. |
| `SectionDivider` | `src/components/landing/SectionDivider.tsx` | Thin divider line; low risk. |
| `SectionManufacturing` | `src/components/landing/SectionManufacturing.tsx` | Accordion + image; grid at `lg`. |
| `SectionFounder` | `src/components/landing/SectionFounder.tsx` | Founder card + photo; flex at `md`. |
| `SectionFinishedCreations` | `src/components/landing/SectionFinishedCreations.tsx` | Gallery: **fixed-pixel grids** — high risk. |
| `SectionProcess` | `src/components/landing/SectionProcess.tsx` | 5-step process; grid 1 → 2 → 5 cols. |
| `SectionQuote` | `src/components/landing/SectionQuote.tsx` | Quote section + `QuoteForm`. |
| `LandingFooter` | `src/components/landing/LandingFooter.tsx` | Footer: logo, links, contact, social; grid 1 → 4 cols at `md`. |
| `GetAQuoteButton` | `src/components/landing/GetAQuoteButton.tsx` | CTA link; fixed min-width. |
| `QuoteForm` | `src/components/quote-form/QuoteForm.tsx` | Form: 2-col at `md`, file upload, submit button. |
| `ModelingCard` | `src/components/landing/modeling/ModelingCard.tsx` | Reusable card (image + text); overlay and gradient variants; absolute positioning in some variants. |
| `ModelingSpecializationTitle` | `src/components/landing/modeling/ModelingSpecializationTitle.tsx` | Section title in fixed-height block. |
| `ModelingBlock*` | `src/components/landing/modeling/ModelingBlock*.tsx` | HipHop, Bridal, Portrait, Mechanical, Heritage, HighJewelry — all use `ModelingCard`. |

### 3.2 Admin

| Component | Path | Role |
|----------|------|------|
| `AdminSidebar` | `src/app/admin/AdminSidebar.tsx` | Fixed `w-[256px]` sidebar; no collapse/drawer. |
| `AdminSignInGate` | `src/app/admin/AdminSignInGate.tsx` | Centered gate when unauthenticated. |
| `AdminLeadsInbox` | `src/app/admin/leads/AdminLeadsInbox.tsx` | Header + list (`w-[380px]`) + detail panel. |

---

## 4. Current layout system analysis

- **Containers:** Sections use mixed constraints: `max-w-4xl`, `max-w-6xl`, `max-w-7xl`, `max-w-[848px]`, `max-w-[1200px]`, `max-w-[1400px]`, `max-w-[1920px]`. No single “page container” or design tokens for width.
- **Spacing:** Many fixed px paddings: `py-[94px]`, `py-[67px]`, `mt-[120px]`, `pl-[51px]`, `pr-[153px]`, etc. Only a few use responsive spacing (`px-4 md:px-6`).
- **Grid/Flex:** Landing modeling grid is responsive (`grid-cols-1 sm:grid-cols-2`). SectionProcess is 1 → 2 → 5 columns. SectionFinishedCreations uses **fixed template columns** (see below). PowerBanners hero is a vertical stack of full-width blocks with absolute-positioned content.
- **Navigation:** `LandingNav`: logo with `left-[18rem]`, nav links `hidden` below `md` (no hamburger), CTA with `-translate-x-56` and fixed `w-[190px]`. No mobile menu.
- **Typography:** Many fixed sizes: `text-[48px]`, `text-[24px] md:text-[42px]`, `text-[20px]`, etc. `globals.css` uses fixed `font-size`/`line-height` for hero subtitles (e.g. 20px/28px, 18px/26px). No fluid type (clamp).
- **Images/backgrounds:** Hero backgrounds use CSS variables and fixed px nudge values; aspect ratios set (e.g. 274/101). Section2 has fixed `--section2-block-visible-height: 615px` and `--section2-bg-layout-height: 712px`. Founder/Manufacturing use `fill` + `object-cover` with responsive `sizes` in places.
- **Z-index / sticky:** Nav is `sticky top-0 z-50`. Hero text and CTAs use `z-10`. No obvious stacking issues beyond potential overlap on narrow viewports.

---

## 5. Responsive issues found

### 5.1 Critical (horizontal scroll / broken layout)

| Location | Issue | File / class |
|----------|--------|--------------|
| **Finished Creations gallery** | Row1: `grid-cols-[540px_575px_540px]`; Row2: `grid-cols-[412px_412px_412px_412px]`. Total width > 1655px and 1652px — forces horizontal scroll on viewports < ~1680px. | `SectionFinishedCreations.tsx` |
| Same | Row1 items use fixed `w-[540px]` / `w-[575px]` and `h-[360px]`; Row2 `h-[235px]`. No fluid or fractional columns. | Same |
| **Landing nav** | Logo link `left-[18rem]` (288px) pushes logo right; on narrow screens this can overlap or sit off. Nav links `hidden` below `md` with no replacement (no mobile menu). CTA `-translate-x-56` can push button off-screen. | `LandingNav.tsx` |
| **Hero (PowerBanners)** | Section2 block has fixed height `615px` and bg height `712px`; section3 uses `min-height: 440px` / `640px`. Design (section3) text uses `translate(-185px, 180px)` — can push content off on small widths. | `PowerBanners.tsx`, `globals.css` |
| **Jewelry Design (section3)** | Text cluster positioned with fixed `DESIGN_SECTION_TEXT_NUDGE_LEFT_PX = 185` and `DESIGN_SECTION_TEXT_NUDGE_DOWN_PX = 180` — not responsive. | `PowerBanners.tsx` |

### 5.2 High (overflow / alignment / touch targets)

| Location | Issue | File |
|----------|--------|------|
| **Hero titles** | `whitespace-nowrap` on main titles (Modeling, Rendering, Design) — long text will overflow on small screens. | `PowerBanners.tsx` |
| **Hero subtitles** | Rendering subtitle lines use `whitespace-nowrap` — overflow on narrow. | `PowerBanners.tsx` |
| **ModelingCard** | Some cards use `whitespace-nowrap` for description line; absolute `top`/`left` in % (e.g. Portrait `titleBlockLeft="5%"`); `pl-[40%]`/`pr-[50%]` overlays — can be tight on small cards. | `ModelingCard.tsx` |
| **Section headings** | Philosophy, Manufacturing, Founder use `text-[48px]` with no scaling — can dominate or overflow on mobile. | `SectionPhilosophy.tsx`, `SectionManufacturing.tsx`, `SectionFounder.tsx` |
| **Nav CTA** | Fixed `h-[36px] w-[190px]` and negative translate — may overlap or clip. | `LandingNav.tsx` |
| **Admin Leads** | List column `w-[380px] shrink-0`; header search `max-w-[448px]` — on narrow admin viewport the layout will not reflow. | `AdminLeadsInbox.tsx` |
| **Admin sidebar** | `w-[256px] shrink-0` always visible — no drawer/collapse for tablet/small laptop. | `AdminSidebar.tsx` |

### 5.3 Medium (spacing / typography / visuals)

| Location | Issue | File |
|----------|--------|------|
| **Section padding** | Many sections use single or two-step padding (`px-4 md:px-6`, `py-[94px]`) — no tablet-specific or fluid padding. | Multiple section components |
| **Founder** | `mt-[120px]` and fixed `max-w-[493px]` for image — large top margin on mobile. | `SectionFounder.tsx` |
| **Manufacturing** | `mt-[120px]` for content block. | `SectionManufacturing.tsx` |
| **Quote form** | Submit button `h-[68px] min-w-[266px]`; upload area `max-w-[848px]` — acceptable but fixed. | `QuoteForm.tsx` |
| **Modeling title block** | Fixed `MODELING_TITLE_BLOCK_HEIGHT_PX = 200` — doesn’t adapt to content or viewport. | `SectionModeling.tsx` |
| **Footer** | `md:px-[5.05%] md:pr-[8.23%]` — percentage padding; logo block `max-w-[384px]`. Fine on desktop; ensure no overflow on very small. | `LandingFooter.tsx` |
| **globals.css** | Hero CTA and subtitle transforms use fixed px/rem; only one media at 768px. | `globals.css` |

### 5.4 Lower (consistency / future-proofing)

| Location | Issue |
|----------|--------|
| **Breakpoints** | Inconsistent use of `sm`/`md`/`lg`; no `xl`/`2xl` for large desktop. |
| **Containers** | Mixed `max-w-*`; no shared wrapper or design token. |
| **Forms** | QuoteForm and auth form are usable but could use consistent input sizing and tap targets on small screens. |

---

## 6. High-risk areas that can break the design

1. **SectionFinishedCreations** — Changing the grid too aggressively could alter the “2 rows, 3+4 items” layout and proportions. **Risk:** Layout and aspect ratios are tied to fixed px. **Mitigation:** Replace fixed columns with responsive grid (e.g. 1 col mobile, 2–3 tablet, 3–4 desktop) and use aspect-ratio or max-width so images scale without breaking the composition.
2. **PowerBanners (hero)** — Many absolute positions and fixed transforms. **Risk:** Tweaking one slide can misalign others; background positioning is px-based. **Mitigation:** Introduce mobile/tablet-specific CSS variables or classes for nudges and text position; allow titles to wrap on small widths.
3. **LandingNav** — Logo offset and CTA translate are desktop-centric. **Risk:** Removing or changing them can shift the whole nav balance. **Mitigation:** Reduce or zero out `left` and `translate` below a breakpoint; add a proper mobile menu (hamburger + overlay/drawer) so links and CTA remain accessible.
4. **ModelingCard** — Used in 6 variants with different overlays and absolute blocks. **Risk:** Changing base card layout can affect all specializations. **Mitigation:** Prefer media-query overrides and optional props for “compact” or “stacked” mode rather than rewriting the core layout in one go.
5. **AdminLeadsInbox** — Fixed list width and two-column layout. **Risk:** On tablet, 256px sidebar + 380px list leaves little space for detail. **Mitigation:** Collapsible sidebar and/or stack list above detail below a breakpoint.

---

## 7. Recommended breakpoint strategy

Use a single, explicit scale and keep desktop (current design) as the reference:

| Breakpoint | Min width | Role |
|------------|-----------|------|
| **Mobile** | 0 | Single column; stacked nav (e.g. hamburger); hero text wraps; no fixed-px grids. |
| **Large mobile** | 480px | Optional: slightly larger typography or padding; same structure as mobile. |
| **Tablet** | 768px (md) | Two columns where appropriate; nav can show links (or keep hamburger until 1024px); hero and sections start to resemble desktop. |
| **Small laptop** | 1024px (lg) | Sidebars and multi-column content; admin list+detail side-by-side. |
| **Desktop** | 1280px (xl) | Current Figma design preserved; max-widths and spacing as today. |
| **Large desktop** | 1536px (2xl) | Optional: cap max-width so content doesn’t over-stretch; preserve aspect ratios. |

**Rules:**

- **Below 768px:** No fixed-pixel grid columns; no `whitespace-nowrap` on hero titles/subtitles; nav must provide mobile menu; reduce or remove large negative margins/translates.
- **768px–1024px:** Transition from stacked to side-by-side where it makes sense; keep hero and cards readable.
- **1024px and up:** Preserve current desktop layout and proportions; only add max-width caps if needed for very wide screens.

**What stays unchanged on desktop (≥1024px):**

- Hero slide structure, background positions, and CTA positions (with possible refinement only via CSS variables).
- Section order and content.
- Nav: logo position, link order, CTA style.
- Modeling grid: 2 columns on large screens; card aspect ratio 83/43.
- Footer column layout and content.
- Admin: sidebar visible; list + detail layout.

**What adapts on smaller screens:**

- Nav: logo centering or reduced offset; hamburger + drawer; CTA full width or smaller.
- Hero: title/subtitle wrap; reduced nudge/translate; section heights via variables or media queries.
- Sections: single column; reduced vertical margins; smaller heading sizes (e.g. 48px → 32px on mobile).
- Finished Creations: 1 column → 2 → 3/4 with fluid widths.
- Admin: collapsible sidebar; list full-width with detail below or modal.

---

## 8. Safe refactor strategy

- **Do not:** Redesign visuals, change copy, alter section order, or introduce new UI patterns (e.g. new carousel library) unless necessary for responsiveness.
- **Do:** Replace only layout and spacing that cause overflow or broken alignment; use media queries and Tailwind responsive prefixes; prefer `max-w-*`, `min-w-0`, and flexible grids; allow text to wrap where it currently uses `whitespace-nowrap` on small viewports.
- **Containment:** One section or component at a time; test at 320px, 768px, 1024px, 1440px after each change.
- **CSS variables:** Use variables in `globals.css` for hero heights and nudges so one place controls breakpoint behavior (e.g. `--section2-block-visible-height` with different values in media queries).
- **Admin:** Treat as a separate pass after landing is stable; sidebar collapse and Leads layout are the main items.

---

## 9. Step-by-step implementation plan

Ordered by **lowest risk and highest impact**; each step is independently testable.

| Step | Task | Files | Risk |
|------|------|-------|------|
| 1 | **SectionFinishedCreations:** Replace fixed grid with responsive grid. Row1: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, Row2: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Use `w-full` and aspect-ratio or min-height so images scale. Remove fixed `w-[540px]` etc. | `SectionFinishedCreations.tsx` | Medium — layout change but contained. |
| 2 | **LandingNav:** Below `md`: remove or reduce `left-[18rem]` and CTA `-translate-x-56`; center or left-align logo; make CTA full width or smaller. Add hamburger + mobile menu (links + CTA) so nav is usable. | `LandingNav.tsx` | Medium — new mobile menu component. |
| 3 | **PowerBanners:** Allow hero titles to wrap below `md`: remove `whitespace-nowrap` for viewports &lt; 768px (e.g. conditional class or override). Do the same for Rendering subtitle lines. | `PowerBanners.tsx` | Low. |
| 4 | **PowerBanners section3 (Design):** Reduce or zero `DESIGN_SECTION_TEXT_NUDGE_LEFT_PX` and `DESIGN_SECTION_TEXT_NUDGE_DOWN_PX` below `md` (e.g. style with media or CSS variables). Ensure text block stays within viewport. | `PowerBanners.tsx`, optionally `globals.css` | Low. |
| 5 | **Section headings:** Add responsive font sizes for Philosophy, Manufacturing, Founder (e.g. `text-3xl md:text-[48px]` or similar) so they don’t overflow on mobile. | `SectionPhilosophy.tsx`, `SectionManufacturing.tsx`, `SectionFounder.tsx` | Low. |
| 6 | **Section padding/margins:** Replace large fixed `mt-[120px]` with responsive spacing (e.g. `mt-12 md:mt-[120px]`) in Founder and Manufacturing. Standardize section padding (e.g. `px-4 py-12 md:px-6 md:py-16` or similar). | Multiple section files | Low. |
| 7 | **ModelingCard:** Ensure overlay text doesn’t overflow on narrow cards: add `min-w-0` where needed; allow description to wrap where currently `whitespace-nowrap` (e.g. only when space is sufficient). Consider a single “compact” mode below `sm` if needed. | `ModelingCard.tsx` | Medium — used in 6 blocks. |
| 8 | **SectionModeling title block:** Make height responsive (e.g. `min-h-[120px] md:min-h-[200px]`) or allow block to grow with content so it doesn’t clip on small screens. | `SectionModeling.tsx` | Low. |
| 9 | **globals.css hero:** Add media queries for hero CTA and subtitle transforms (e.g. smaller or zero translate on narrow viewports); consider CSS variables for nudge values per breakpoint. | `globals.css` | Low. |
| 10 | **QuoteForm / SectionQuote:** Ensure form is usable on mobile (inputs full width, button not clipped); already has `grid-cols-1 md:grid-cols-2`. Minor tweaks only. | `QuoteForm.tsx`, `SectionQuote.tsx` | Low. |
| 11 | **LandingFooter:** Verify no horizontal scroll; ensure grid stacks correctly at 1 col. Already has `grid-cols-1 md:grid-cols-4`. | `LandingFooter.tsx` | Low. |
| 12 | **Admin sidebar:** Add drawer/collapse for viewports &lt; 1024px; show overlay or push content when open. | `AdminSidebar.tsx`, `admin/layout.tsx` | Medium. |
| 13 | **Admin Leads:** Below `lg`, stack list above detail or show list full-width with detail in a panel/modal; remove fixed `w-[380px]` in favor of max-width or flex. | `AdminLeadsInbox.tsx` | Medium. |

---

## 10. “Do not change” list (preserve design identity)

- **Visual style:** Colors, gradients (gold CTA, section backgrounds), border-radius, shadows, font families (Inter, Manrope).
- **Content:** All copy, section order, number of cards/steps/accordion items.
- **Hero structure:** Three slides (Modeling, Rendering, Design); same imagery and background treatment; only layout and text wrapping/positioning may change.
- **Modeling specializations:** All six blocks (HipHop, Bridal, Portrait, Mechanical, Heritage, HighJewelry); card aspect ratio 83/43 on desktop; gradient vs image overlay behavior.
- **Footer:** Four-column layout on desktop; links and contact block order; “Precision in every dimension” and copyright.
- **Admin:** Sidebar item order (Inbox/Leads, Orders, Reports), badge on Leads, user block at bottom; no change to auth or data flow.
- **Business logic:** Form validation, submit actions, auth, order payment flow, admin CRUD.

---

## Prioritized checklist

- [ ] **P0 — Horizontal scroll:** Fix SectionFinishedCreations grid (Step 1).
- [ ] **P0 — Mobile nav:** LandingNav mobile menu and CTA/nav visibility (Step 2).
- [ ] **P1 — Hero overflow:** PowerBanners title/subtitle wrap and section3 nudge (Steps 3–4).
- [ ] **P1 — Section headings:** Responsive heading sizes (Step 5).
- [ ] **P2 — Spacing:** Section margins and padding (Step 6).
- [ ] **P2 — ModelingCard:** Overlay and wrap on small cards (Step 7).
- [ ] **P3 — Modeling title block:** Responsive height (Step 8).
- [ ] **P3 — globals.css hero:** Responsive transforms (Step 9).
- [ ] **P3 — Form/Footer:** Verify QuoteForm and Footer (Steps 10–11).
- [ ] **P4 — Admin:** Sidebar and Leads layout (Steps 12–13).

---

## First files/components to fix

1. **`src/components/landing/SectionFinishedCreations.tsx`** — Remove fixed grid columns and fixed widths; implement responsive grid and fluid image containers. This is the main source of horizontal scroll.
2. **`src/components/landing/LandingNav.tsx`** — Adjust logo and CTA for small screens; add hamburger and mobile menu so navigation and “Request a Quote” work on mobile.
3. **`src/components/landing/PowerBanners.tsx`** — Allow titles and subtitles to wrap below `md`; adjust Design slide text position for narrow viewports.
4. **`src/app/globals.css`** — Add responsive overrides for hero CTA and subtitle transforms (and optionally nudge variables) so hero doesn’t break on small screens.

---

## Safest approach summary

- **Fix overflow first:** SectionFinishedCreations and LandingNav (no horizontal scroll, usable nav on all sizes).
- **Then hero:** Wrap text and reduce fixed positioning on PowerBanners and in globals.css so the hero looks correct on mobile/tablet without changing the desktop look.
- **Then sections:** Responsive headings and spacing; keep existing structure and visuals.
- **Then cards and polish:** ModelingCard and SectionModeling title; QuoteForm and Footer checks.
- **Admin last:** Sidebar and Leads layout as a separate, lower-priority pass.

Keep the current desktop design as the single source of truth; every change should be additive (media queries, responsive classes) or a minimal replacement of fixed layout (e.g. grid columns) so that at 1024px and above the site looks and behaves as it does today.
