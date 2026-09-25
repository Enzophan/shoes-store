# Requirements — Homepage Banner Management

## Functional Requirements

### FR-1: Banner Data Model
**Description**: Define a `Banner` entity in Prisma schema to store banner content and metadata.
**Priority**: Must Have
**Traceability**: [intent-statement] Initial Scope Signal → [build-vs-buy] Build Scope (MVP) → [architecture] Integration Points for Banner Feature

**Acceptance Criteria**:
- `Banner` model added to `prisma/schema.prisma` with fields:
  - `id` (String, @id, @default(cuid()))
  - `imageUrl` (String) — Next.js Image optimized URL
  - `altText` (String) — Accessibility description
  - `linkUrl` (String?) — Optional CTA destination
  - `order` (Int) — Display priority (0 = first)
  - `isActive` (Boolean, @default(true)) — Soft enable/disable
  - `createdAt` (DateTime, @default(now()))
  - `updatedAt` (DateTime, @updatedAt)
- Migration generated and applied without data loss
- Model accessible via Prisma Client with full type safety

### FR-2: Admin Banner CRUD API
**Description**: RESTful API endpoints for admin to manage banners.
**Priority**: Must Have
**Traceability**: [build-vs-buy] Build Scope (MVP): Admin CRUD for banners → [architecture] Integration Points for Banner Feature → [code-structure] API Routes pattern

**Acceptance Criteria**:
- `GET /api/admin/banners` — Returns paginated list of all banners (active + inactive), sorted by `order` ASC
- `POST /api/admin/banners` — Creates new banner; validates required fields (`imageUrl`, `altText`); auto-assigns next `order`
- `GET /api/admin/banners/[id]` — Returns single banner by ID
- `PATCH /api/admin/banners/[id]` — Updates banner fields; validates `order` uniqueness if changed
- `DELETE /api/admin/banners/[id]` — Soft delete (sets `isActive=false`) or hard delete with confirmation
- `POST /api/admin/banners/reorder` — Batch update `order` values for drag-drop reordering
- All endpoints return consistent JSON envelope: `{ data, error?, meta? }`
- Zod validation schemas in `lib/validation.ts` for request bodies
- 400 for validation errors, 404 for not found, 500 for server errors

### FR-3: Admin Banner Management UI
**Description**: Admin dashboard section to create, edit, reorder, and delete banners.
**Priority**: Must Have
**Traceability**: [build-vs-buy] Build Scope (MVP): Admin CRUD for banners → [code-structure] Admin routes pattern → [team-practices] Code Organization

**Acceptance Criteria**:
- New route: `/admin/banners/page.tsx` — List view with table showing: thumbnail, alt text, link, order, status, actions
- New route: `/admin/banners/new/page.tsx` — Create form with image upload (preview), alt text, link URL, active toggle
- New route: `/admin/banners/[id]/page.tsx` — View banner details
- New route: `/admin/banners/[id]/EditBanner.tsx` — Edit form (reuses create form components)
- Drag-and-drop reordering (using `@dnd-kit/core` or native HTML5 DnD) with optimistic UI update
- Image upload via existing pattern (Vercel blob / local upload to `/public/uploads/banners/`)
- Toast notifications for success/error actions
- Follows existing admin layout: sidebar navigation, page header, consistent styling
- "Manage Banners" link added to admin dashboard (`/admin/page.tsx`)

### FR-4: Public Banner Carousel Component
**Description**: Homepage carousel displaying active banners with auto-play and manual navigation.
**Priority**: Must Have
**Traceability**: [intent-statement] Problem Statement & Success Metrics → [build-vs-buy] Build Scope (MVP): Swiper integration → [architecture] Integration Points for Banner Feature

**Acceptance Criteria**:
- New component: `app/components/BannerCarousel.tsx` (Client Component, `use client`)
- Uses `swiper/react` with modules: `Navigation`, `Pagination`, `Autoplay`, `EffectFade`
- Fetches active banners via `fetch('/api/banners')` in parent Server Component, passed as prop
- Auto-play: 10 second interval (`autoplay: { delay: 10000, disableOnInteraction: false }`)
- Pause on hover/focus (`autoplay.pauseOnMouseEnter: true`)
- Navigation arrows (prev/next) and pagination bullets
- Fade transition effect between slides
- Responsive: single slide on mobile, optional 2-slide peek on desktop
- Next.js `<Image />` for all banner images with `priority` on first slide
- Loading skeleton while data fetches
- Error boundary fallback: static hero banner if carousel fails

### FR-5: Public Banner API Endpoint
**Description**: Read-only API for frontend to fetch active banners for carousel.
**Priority**: Must Have
**Traceability**: [architecture] Data Flow (Homepage) → [code-structure] API Routes pattern

**Acceptance Criteria**:
- `GET /api/banners` — Returns only active banners (`isActive: true`), sorted by `order` ASC
- Response: `{ data: Banner[], meta: { count: number } }`
- Cached with `next: { revalidate: 60 }` (ISR) or `no-store` for real-time updates
- No authentication required (public endpoint)
- Rate limited via Vercel edge config (optional)

### FR-6: Homepage Integration
**Description**: Replace static hero banner with dynamic carousel on homepage.
**Priority**: Must Have
**Traceability**: [intent-statement] Problem Statement → [business-overview] Current Homepage Structure → [architecture] Integration Points for Banner Feature

**Acceptance Criteria**:
- `app/page.tsx` imports `BannerCarousel` and passes banner data from `fetch('/api/banners')`
- Static hero section (lines 68-96 in current `page.tsx`) removed/replaced
- Carousel positioned at top of homepage, above Highlights Bar
- Maintains existing CSS variable theming (`--rose`, `--rose-soft`, `--ink`, `--chalk`)
- No layout shift: reserve space with aspect-ratio container
- SEO: first banner image included in Open Graph metadata

### FR-7: Accessibility Compliance
**Description**: Carousel meets WCAG 2.1 AA standards.
**Priority**: Must Have
**Traceability**: [build-vs-buy] Build Scope (MVP): Accessibility → [team-practices] Code Style (Accessibility implied)

**Acceptance Criteria**:
- Pause/play button visible and keyboard accessible (ARIA: `aria-live="polite"`)
- Keyboard navigation: Tab to enter carousel, Arrow keys for prev/next, Enter/Space to activate link
- All images have descriptive `alt` text (from `Banner.altText`)
- Focus indicators visible on all interactive elements
- Auto-play pauses on hover AND keyboard focus
- Reduced motion: respects `prefers-reduced-motion: reduce` (disable auto-play, instant transitions)
- Semantic HTML: `<section aria-label="Promotional banners">`, `<figure>`/`<figcaption>` for slides
- Color contrast ratios meet 4.5:1 for text over images (overlay gradient if needed)

### FR-8: Click Tracking (Basic Analytics)
**Description**: Track banner clicks for conversion measurement.
**Priority**: Should Have
**Traceability**: [intent-statement] Success Metrics: Increased click-through rate → [build-vs-buy] Build Scope (MVP): Basic analytics

**Acceptance Criteria**:
- `POST /api/banners/[id]/click` — Records click event (banner ID, timestamp, referrer)
- Lightweight: fire-and-forget, non-blocking response
- Client-side: `onClick` handler on banner link calls API via `navigator.sendBeacon()` or `fetch(keepalive)`
- No PII collected; anonymous session ID optional
- Data stored in new `BannerClick` Prisma model (deferred to post-MVP if scope tight)

---

## Non-Functional Requirements

### NFR-1: Performance
**Description**: Carousel must not degrade homepage Core Web Vitals.
**Priority**: Must Have
**Traceability**: [architecture] Data Flow (Homepage) → [team-practices] Testing Posture (E2E for critical flows)

**Acceptance Criteria**:
- LCP impact < 100ms vs. static hero baseline
- Carousel JS bundle < 50KB gzipped (Swiper tree-shaken)
- First slide image loaded with `priority` and `fetchpriority="high"`
- Subsequent slides lazy-loaded (`loading="lazy"`)
- No layout shift (CLS = 0) — aspect-ratio container reserves space
- ISR revalidation ≤ 60s for banner updates to appear

### NFR-2: Responsiveness
**Description**: Carousel works across all viewport sizes.
**Priority**: Must Have
**Traceability**: [build-vs-buy] Technology Choices: Swiper responsive → [team-practices] CSS: Tailwind CSS

**Acceptance Criteria**:
- Mobile (< 640px): Single slide, touch swipe enabled, pagination dots
- Tablet (640px–1024px): Single slide, optional peek, arrows + dots
- Desktop (> 1024px): Single slide or 1.2 peek, arrows + dots
- Images maintain aspect ratio (recommend 16:9 or 2:1)
- Text overlays (if any) scale with viewport

### NFR-3: Maintainability
**Description**: Code follows project conventions and is testable.
**Priority**: Must Have
**Traceability**: [team-practices] Code Style, Way of Working → [project] Forbidden/Mandated rules

**Acceptance Criteria**:
- TypeScript strict mode: no `any`, proper interfaces
- ESLint/Prettier: zero errors/warnings
- Components: PascalCase, colocated in `app/components/`
- API routes: `route.ts` in route segment directories
- Zod schemas in `lib/validation.ts`
- Unit tests for validation logic, API handlers
- Component tests for `BannerCarousel` (render, navigation, autoplay pause)
- Integration tests for `/api/admin/banners*` and `/api/banners`

### NFR-4: Security
**Description**: Admin endpoints protected; public endpoints safe.
**Priority**: Must Have
**Traceability**: [project] Forbidden: NEVER commit secrets → [architecture] Infrastructure (Vercel)

**Acceptance Criteria**:
- Admin API routes: middleware checks for admin session (existing auth pattern)
- Image upload: validate file type (image/*), max size (5MB), sanitize filename
- Public API: rate limited, no sensitive data exposed
- No SQL injection: Prisma parameterized queries only
- CORS: same-origin for admin, public API accessible from frontend origin

---

## Technical Requirements

### TR-1: Database Migration
**Description**: Safe schema migration for new `Banner` model.
**Priority**: Must Have

**Acceptance Criteria**:
- `prisma migrate dev --name add_banner_model` creates migration
- Migration includes index on `isActive, order` for query performance
- Down migration tested (rollback capability)
- Seed script updated with 3 sample banners for development

### TR-2: Swiper Configuration
**Description**: Swiper initialized with exact specifications.
**Priority**: Must Have

**Acceptance Criteria**:
```typescript
// BannerCarousel.tsx Swiper config
const swiperConfig = {
  modules: [Navigation, Pagination, Autoplay, EffectFade],
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: { delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true },
  navigation: true,
  pagination: { clickable: true },
  loop: true,
  speed: 600,
  grabCursor: true,
  watchSlidesProgress: true,
  on: {
    init() { this.el.setAttribute('data-swiper-ready', 'true'); },
    slideChange() { /* analytics hook */ }
  }
};
```

### TR-3: Image Handling
**Description**: Banner images use Next.js Image optimization.
**Priority**: Must Have

**Acceptance Criteria**:
- Images served via `next/image` with `sizes` and `quality={85}`
- Remote patterns configured in `next.config.js` for upload destination
- Fallback: `unoptimized` for local development if needed
- Blur placeholder (Base64) for first slide LCP improvement

---

## Out of Scope (Post-MVP)

| Feature | Deferred To |
|---------|-------------|
| Scheduling (start/end dates) | Phase 2 |
| A/B testing framework | Phase 2 |
| Audience targeting (geo, segment) | Phase 2 |
| Analytics dashboard | Phase 2 |
| Visual banner builder (drag-drop canvas) | Phase 2 |
| Video banner support | Future |
| Multi-language banner content | Future |

---

## Assumptions

1. **A1**: Existing admin authentication middleware can protect `/admin/banners*` routes
2. **A2**: Image upload destination (Vercel Blob / local `/public`) is already configured
3. **A3**: Current homepage `page.tsx` is a Server Component (async data fetching)
4. **A4**: Tailwind CSS and CSS variables (`--rose`, `--ink`, etc.) are available globally
5. **A5**: Jest + `@testing-library/react` configured for component/unit tests
6. **A6**: No existing carousel library in codebase (confirmed in component-inventory.md)

---

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| `swiper` (v11+) | npm production | To install |
| `@dnd-kit/core` + `@dnd-kit/sortable` | npm production | To install (admin reorder) |
| Prisma migration | DB | Pending |
| Admin auth middleware | Existing code | Verify exists |