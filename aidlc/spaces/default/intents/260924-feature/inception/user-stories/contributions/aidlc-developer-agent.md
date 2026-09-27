**Collaborator:** aidlc-developer-agent

## Contribution — Developer Perspective on Implementability & Sizing

### Technical Feasibility Assessment

All stories are technically feasible with current stack (Next.js 14, Prisma, Tailwind, Vercel). No blockers identified.

### Story Sizing Estimates (Story Points / Days)

| Story | Estimate | Rationale |
|-------|----------|-----------|
| US1.1 Create Banner | 3 SP / 1.5 days | Form + upload + API + validation |
| US1.2 List Banners | 2 SP / 1 day | Server component table + pagination |
| US1.3 View Banner | 1 SP / 0.5 day | Simple detail page |
| US1.4 Edit Banner | 3 SP / 1.5 days | Reuses create form + order handling |
| US1.5 Delete Banner | 1 SP / 0.5 day | Soft delete API + confirmation modal |
| US1.6 Drag-Drop Reorder | 5 SP / 2.5 days | @dnd-kit integration + optimistic UI + API |
| US2.1 Auto-Play Carousel | 5 SP / 2.5 days | Swiper setup + SSR data fetching + client hydration |
| US2.2 Manual Navigation | 2 SP / 1 day | Built into Swiper config |
| US2.3 Accessibility | 5 SP / 2.5 days | ARIA, keyboard, reduced motion, testing |
| US2.4 Responsive | 2 SP / 1 day | Swiper breakpoints + CSS |
| US2.5 Performance | 3 SP / 1.5 days | Image optimization, bundle analysis, ISR config |
| US3.1 Click Tracking | 2 SP / 1 day | sendBeacon + analytics integration |
| US4.1 Homepage Integration | 2 SP / 1 day | Replace hero + fallback + OG tags |

**Total**: ~36 SP / ~18 days (single developer) — aligns with feature scope MVP

### Implementation Notes & Risks

**US1.1/1.4 (Create/Edit) — Image Upload**:
- Use existing upload pattern (verify A2 assumption: local `/public/uploads/banners/`)
- Validate: `image/*`, max 5MB, sanitize filename (UUID + extension)
- Consider: Sharp for server-side resize/optimization before save
- Risk: Local upload doesn't work on Vercel serverless — need Vercel Blob for production

**US1.6 (Drag-Drop) — @dnd-kit Integration**:
- `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` (~12KB gzipped)
- Keyboard support built-in (Space to lift, Arrows to move, Space to drop)
- Optimistic UI: update local state immediately, sync via `POST /api/admin/banners/reorder`
- Conflict resolution: if API fails, revert + toast; consider retry with exponential backoff

**US2.1/2.2/2.4 (Carousel) — Swiper v11**:
- Must use `swiper/react` package (not `swiper`)
- Modules: `Navigation`, `Pagination`, `Autoplay`, `EffectFade` — import individually
- SSR challenge: Swiper requires DOM — use dynamic import with `ssr: false` or `use client` wrapper
- Data fetching: `app/page.tsx` (Server Component) fetches `/api/banners`, passes to client `BannerCarousel`

**US2.3 (Accessibility) — WCAG 2.1 AA**:
- `prefers-reduced-motion`: detect via `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Auto-play pause: Swiper `autoplay.pauseOnMouseEnter: true` + custom focus handler
- Focus management: trap focus in carousel? No — allow tab out. Use `roving tabindex` pattern for slides
- Color contrast: Ensure overlay gradient on images with text (if any) — design to provide

**US2.5 (Performance) — Core Web Vitals**:
- LCP: First slide image must be `priority` + `fetchpriority="high"` + preload link
- CLS: Aspect-ratio container (e.g., `aspect-[16/9]`) on carousel wrapper
- Bundle: `import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'`
- ISR: `export const revalidate = 60` on `/api/banners` route

**US3.1 (Click Tracking)**:
- Client-side: `navigator.sendBeacon('/api/banners/[id]/click', JSON.stringify({}))`
- Fallback: `fetch(url, { method: 'POST', keepalive: true })`
- API: `export const dynamic = 'force-dynamic'` (no caching), return 202 immediately
- Analytics: Push to `window.va('event', 'banner_click', { banner_id: id })` for Vercel Analytics

**US4.1 (Homepage Integration)**:
- `app/page.tsx`: `const banners = await fetch('/api/banners').then(r => r.json())`
- Pass to `<BannerCarousel banners={banners.data} />`
- Fallback: `if (!banners.data?.length) return <StaticHero />`
- OG: `<meta property="og:image" content={banners.data[0]?.imageUrl} />`

### Database Migration (FR-1, TR-1)

```prisma
model Banner {
  id        String   @id @default(cuid())
  imageUrl  String
  altText   String
  linkUrl   String?
  order     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([isActive, order])
}
```

Run: `prisma migrate dev --name add_banner_model`
Seed: 3 sample banners with varying orders, one inactive

### API Route Structure

```
app/api/
├── admin/
│   └── banners/
│       ├── route.ts              // GET (list), POST (create)
│       ├── reorder/route.ts      // POST (batch reorder)
│       └── [id]/
│           ├── route.ts          // GET, PATCH, DELETE
│           └── click/route.ts    // POST (public click tracking)
└── banners/
    └── route.ts                  // GET (public, active only)
```

### Objections / Positions

**OBJECT**: US1.6 (Drag-Drop) at 5 SP is optimistic — @dnd-kit + optimistic UI + conflict resolution + keyboard testing = 8 SP / 4 days minimum.

Rationale: Drag-drop is deceptively complex. Keyboard accessibility, touch support, screen reader announcements, and optimistic UI rollback all add significant scope. Recommend moving to "Could Have" or splitting into:
- US1.6a: Number input reorder (2 SP)
- US1.6b: Drag-drop enhancement (5 SP)

**OBJECT**: US2.3 (Accessibility) at 5 SP assumes Swiper handles most ARIA — it doesn't. Custom `Pagination`, `Navigation`, `Autoplay` controls needed for full WCAG compliance. Actual: 8 SP.

Rationale: Swiper's built-in controls are not fully accessible (e.g., pagination buttons lack `aria-label`, no pause button). Custom accessible controls required.

**AGREE**: US2.5 performance targets are realistic with Next.js Image + Swiper tree-shaking. 50KB gzipped is achievable.

**AGREE**: Database index on `[isActive, order]` covers both admin list (all, order by order) and public API (active only, order by order).