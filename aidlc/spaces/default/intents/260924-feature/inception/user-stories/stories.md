# User Stories — Homepage Banner Management

## Epic 1: Admin Banner Management (Must Have)

### US1.1: Create Banner
**As an** Admin
**I want to** create a new banner with image, alt text, and optional link
**So that** I can promote new products or campaigns on the homepage

**Priority**: Must Have
**Dependencies**: US1.2 (list), US1.4 (edit), FR-1, FR-2, FR-3

**Acceptance Criteria**:
- **AC1.1.1**: Given I am on `/admin/banners/new`, when I fill in required fields (image upload, alt text) and optional link URL, then click "Create", the banner is saved and appears in the list at `/admin/banners`
- **AC1.1.2**: Given I upload an image, when the upload completes, then a thumbnail preview is shown in the form
- **AC1.1.3**: Given I leave required fields empty, when I submit, then validation errors appear inline for each missing field
- **AC1.1.4**: Given a new banner is created, when it is saved, then it is assigned the next sequential `order` value automatically

**INVEST Notes**: Independent (can be tested alone), Valuable (core admin capability), Small (single form + API), Testable (clear ACs)

---

### US1.2: List Banners
**As an** Admin
**I want to** view all banners (active and inactive) in a table with thumbnail, alt text, link, order, and status
**So that** I can see the current state of all promotional content at a glance

**Priority**: Must Have
**Dependencies**: US1.1 (create), FR-2, FR-3

**Acceptance Criteria**:
- **AC1.2.1**: Given I navigate to `/admin/banners`, when the page loads, then I see a table with columns: Thumbnail, Alt Text, Link, Order, Status (Active/Inactive), Actions
- **AC1.2.2**: Given banners exist, when the list loads, then they are sorted by `order` ASC (0 = first)
- **AC1.2.3**: Given inactive banners exist, when I view the list, then they are visibly distinguished (e.g., muted row, "Inactive" badge)
- **AC1.2.4**: Given I am on the list page, when I click "New Banner", then I am taken to `/admin/banners/new`

**INVEST Notes**: Independent, Valuable, Small, Testable

---

### US1.3: View Banner Details
**As an** Admin
**I want to** view a single banner's details
**So that** I can verify content before editing or confirm what shoppers will see

**Priority**: Must Have
**Dependencies**: US1.2 (list), FR-2

**Acceptance Criteria**:
- **AC1.3.1**: Given I am on `/admin/banners`, when I click a banner's "View" action, then I navigate to `/admin/banners/[id]` showing full details
- **AC1.3.2**: Given I am on the detail page, when I view the banner, then I see: full-size image, alt text, link URL, order, status, created/updated timestamps

**INVEST Notes**: Independent, Small, Testable

---

### US1.4: Edit Banner
**As an** Admin
**I want to** edit an existing banner's image, alt text, link, order, and active status
**So that** I can update promotions without recreating them

**Priority**: Must Have
**Dependencies**: US1.2 (list), US1.1 (create), FR-2, FR-3

**Acceptance Criteria**:
- **AC1.4.1**: Given I am on `/admin/banners`, when I click "Edit" on a banner, then I navigate to `/admin/banners/[id]/edit` with pre-filled form
- **AC1.4.2**: Given I change the image, when I save, then the new image replaces the old one and thumbnail updates
- **AC1.4.3**: Given I change the `order` value, when I save, then the list reorders accordingly (see US1.6 for drag-drop)
- **AC1.4.4**: Given I toggle `isActive`, when I save, then the banner immediately appears/disappears from the public carousel
- **AC1.4.5**: Given I submit with validation errors, when I correct and resubmit, then the banner updates successfully

**INVEST Notes**: Independent, Valuable, Testable

---

### US1.5: Delete Banner
**As an** Admin
**I want to** delete a banner (soft delete by deactivating, or hard delete with confirmation)
**So that** I can permanently remove outdated promotions

**Priority**: Must Have
**Dependencies**: US1.2 (list), FR-2, FR-3

**Acceptance Criteria**:
- **AC1.5.1**: Given I am on `/admin/banners`, when I click "Delete" on a banner, then a confirmation modal appears
- **AC1.5.2**: Given I confirm deletion, when the action completes, then the banner is soft-deleted (`isActive=false`) and removed from public carousel
- **AC1.5.3**: Given I choose hard delete (if implemented), when I confirm twice, then the banner record is permanently removed
- **AC1.5.4**: Given a banner is deleted, when I view the list, then it no longer appears (or shows as inactive)

**INVEST Notes**: Independent, Valuable, Testable

---

### US1.6: Reorder Banners (Drag-and-Drop)
**As an** Admin
**I want to** drag and drop banners to change their display order
**So that** I can prioritize promotions visually without editing order numbers manually

**Priority**: Could Have
**Dependencies**: US1.2 (list), FR-3, FR-2 (reorder API)

**Acceptance Criteria**:
- **AC1.6.1**: Given I am on `/admin/banners`, when I drag a banner row to a new position, then the row moves visually with drag feedback
- **AC1.6.2**: Given I drop a banner in a new position, when the drop completes, then an optimistic UI update shows the new order immediately
- **AC1.6.3**: Given the reorder is saved via API, when the response succeeds, then the new order persists on page refresh
- **AC1.6.4**: Given a reorder fails, when the API returns an error, then the UI reverts to the previous order and shows a toast error
- **AC1.6.5**: Given I use keyboard navigation, when I focus the drag handle and press Space/Arrows, then I can reorder via keyboard (per @dnd-kit accessibility)

**INVEST Notes**: Independent (separate UX), Valuable (major UX improvement), Testable (clear interactions)

**Note**: Per developer objection, drag-drop moved to "Could Have" due to complexity (8 SP estimate). Alternative: number-input reorder (US1.6a) at 2 SP could be "Should Have" fallback.

---

## Epic 2: Public Banner Carousel (Must Have)

### US2.1: View Banner Carousel
**As a** Shopper
**I want to** see a carousel of promotional banners on the homepage
**So that** I discover multiple promotions without scrolling

**Priority**: Must Have
**Dependencies**: FR-4, FR-5, FR-6

**Acceptance Criteria**:
- **AC2.1.1**: Given I load the homepage, when the page renders, then a carousel displays at the top above the Highlights Bar
- **AC2.1.2**: Given multiple active banners exist, when I view the carousel, then the first banner is displayed with pagination indicating total slides
- **AC2.1.3**: Given I swipe on mobile or drag on desktop, when I interact, then the carousel responds to touch/drag gestures
- **AC2.1.4**: Given no active banners exist, when I visit the homepage, then the original static hero ("NEW SEASON DROP") displays as fallback

**INVEST Notes**: Independent (core carousel display), Valuable, Testable

---

### US2.1a: Auto-Play Carousel
**As a** Shopper
**I want the** carousel to auto-advance every 10 seconds
**So that** I see all promotions without manual interaction

**Priority**: Must Have
**Dependencies**: US2.1, FR-4

**Acceptance Criteria**:
- **AC2.1a.1**: Given the carousel is visible, when 10 seconds elapse, then it auto-advances to the next banner
- **AC2.1a.2**: Given I hover over the carousel, when auto-play is active, then auto-play pauses
- **AC2.1a.3**: Given I move focus into the carousel (keyboard), when auto-play is active, then auto-play pauses
- **AC2.1a.4**: Given I have `prefers-reduced-motion: reduce`, when the carousel loads, then auto-play is disabled

**INVEST Notes**: Independent (progressive enhancement), Valuable, Testable

---

### US2.2: Navigate Carousel Manually
**As a** Shopper
**I want to** navigate between banners using previous/next arrows and pagination dots
**So that** I can browse promotions at my own pace

**Priority**: Must Have
**Dependencies**: US2.1, FR-4

**Acceptance Criteria**:
- **AC2.2.1**: Given the carousel is visible, when I click the "next" arrow, then the carousel advances to the next banner
- **AC2.2.2**: Given the carousel is visible, when I click the "previous" arrow, then the carousel goes to the previous banner
- **AC2.2.3**: Given pagination dots are visible, when I click a dot, then the carousel jumps to that specific banner
- **AC2.2.4**: Given I am on the last banner, when I click "next", then the carousel loops to the first banner (and vice versa)

**INVEST Notes**: Independent, Valuable, Small, Testable

---

### US2.3: Accessible Carousel (WCAG 2.1 AA)
**As a** Shopper using assistive technology
**I want to** use the carousel with keyboard and screen reader
**So that** I have equal access to promotional content

**Priority**: Must Have
**Dependencies**: US2.1, US2.2, FR-7

**Acceptance Criteria**:
- **AC2.3.1**: Given I navigate with Tab, when I reach the carousel, then a visible pause/play button is focusable with `aria-live="polite"` (WCAG SC 2.2.2)
- **AC2.3.2**: Given I am in the carousel, when I press Arrow Right/Left, then the carousel navigates to next/previous slide (WCAG SC 2.1.1)
- **AC2.3.3**: Given I am on a banner with a link, when I press Enter/Space, then the link activates (WCAG SC 2.1.1)
- **AC2.3.4**: Given I use a screen reader, when a slide changes, then the new slide's alt text is announced (WCAG SC 4.1.2)
- **AC2.3.5**: Given I have `prefers-reduced-motion: reduce`, when the carousel loads, then auto-play is disabled and transitions are instant (WCAG SC 2.3.3)
- **AC2.3.6**: Given I focus any interactive element, when focus is visible, then a clear focus indicator appears (WCAG SC 2.4.7)
- **AC2.3.7**: Given banner images have text overlays, when viewed, then color contrast meets 4.5:1 ratio (overlay gradient if needed) (WCAG SC 1.4.3)
- **AC2.3.8**: Automated axe-core scan passes with zero violations in CI
- **AC2.3.9**: Manual keyboard testing documented in test plan
- **AC2.3.10**: Screen reader tested with NVDA (Windows) and VoiceOver (macOS)

**INVEST Notes**: Independent (accessibility is cross-cutting), Valuable (legal/compliance), Testable (specific criteria)

---

### US2.4: Responsive Carousel
**As a** Shopper on mobile/tablet/desktop
**I want the** carousel to adapt to my screen size
**So that** I have an optimal viewing experience on any device

**Priority**: Must Have
**Dependencies**: US2.1, FR-4, NFR-2

**Acceptance Criteria**:
- **AC2.4.1**: Given I view on mobile (< 640px), when the carousel loads, then it shows a single slide with touch swipe enabled and pagination dots
- **AC2.4.2**: Given I view on tablet (640px–1024px), when the carousel loads, then it shows a single slide with optional peek, arrows and dots
- **AC2.4.3**: Given I view on desktop (> 1024px), when the carousel loads, then it shows single slide or 1.2 peek with arrows and dots
- **AC2.4.4**: Given any viewport, when images load, then they maintain aspect ratio (16:9) without layout shift

**INVEST Notes**: Independent (responsive is cross-cutting), Valuable, Testable

---

### US2.5: Fast-Loading Carousel (Performance)
**As a** Shopper
**I want the** carousel to load instantly without delaying the page
**So that** I see promotions immediately and the page feels fast

**Priority**: Must Have
**Dependencies**: US2.1, NFR-1, FR-4, TR-3

**Acceptance Criteria**:
- **AC2.5.1**: Given the homepage loads, when the first banner image loads, then it uses `priority` and `fetchpriority="high"` for LCP optimization
- **AC2.5.2**: Given subsequent slides, when they load, then they use `loading="lazy"` to defer loading
- **AC2.5.3**: Given the carousel JS bundle loads, when measured, then it is < 50KB gzipped (tree-shaken Swiper)
- **AC2.5.4**: Given banner updates, when I revisit within 60 seconds, then I see the latest banners (ISR revalidation ≤ 60s)
- **AC2.5.5**: Given the carousel renders, when measured, then CLS = 0 (aspect-ratio container reserves space)

**INVEST Notes**: Independent (performance is cross-cutting), Valuable (Core Web Vitals), Testable (measurable thresholds)

---

## Epic 3: Analytics Foundation (Should Have)

### US3.1: Track Banner Clicks
**As a** Marketing Stakeholder
**I want to** track clicks on each banner
**So that** I can measure which promotions drive traffic

**Priority**: Should Have
**Dependencies**: US2.1, US2.2, FR-8

**Acceptance Criteria**:
- **AC3.1.1**: Given a shopper clicks a banner link, when the click occurs, then a `POST /api/banners/[id]/click` request fires via `navigator.sendBeacon()` or `fetch(keepalive)`
- **AC3.1.2**: Given the click API is called, when it responds, then it returns 202 Accepted immediately (fire-and-forget)
- **AC3.1.3**: Given clicks are tracked, when I check analytics (Vercel/GA), then banner click events appear with banner ID and timestamp
- **AC3.1.4**: Given no backend storage for MVP, when clicks occur, then they are sent to existing analytics (Vercel Analytics / GA) without PII

**INVEST Notes**: Independent (separate from display), Valuable (measures ROI), Small, Testable

---

## Epic 4: Homepage Integration (Must Have)

### US4.1: Replace Static Hero with Carousel
**As a** Shopper
**I want to** see the dynamic carousel instead of the static hero banner
**So that** I see multiple rotating promotions on the homepage

**Priority**: Must Have
**Dependencies**: US2.1, US2.2, US2.3, US2.4, US2.5, FR-6

**Acceptance Criteria**:
- **AC4.1.1**: Given I visit the homepage, when the page renders, then the static hero section is replaced by the `BannerCarousel` component
- **AC4.1.2**: Given the carousel is in place, when banners exist, then they display in order above the Highlights Bar
- **AC4.1.3**: Given no active banners exist, when I visit the homepage, then the original static hero ("NEW SEASON DROP") displays as fallback
- **AC4.1.4**: Given the carousel renders, when I inspect SEO metadata, then the first banner image is included in Open Graph tags

**INVEST Notes**: Independent (integration point), Valuable (visible change), Testable

---

## Story Summary

| ID | Title | Epic | Priority | Persona |
|----|-------|------|----------|---------|
| US1.1 | Create Banner | Admin CRUD | Must Have | Admin |
| US1.2 | List Banners | Admin CRUD | Must Have | Admin |
| US1.3 | View Banner Details | Admin CRUD | Must Have | Admin |
| US1.4 | Edit Banner | Admin CRUD | Must Have | Admin |
| US1.5 | Delete Banner | Admin CRUD | Must Have | Admin |
| US1.6 | Reorder Banners (Drag-Drop) | Admin CRUD | Could Have | Admin |
| US2.1 | View Banner Carousel | Public Carousel | Must Have | Shopper |
| US2.1a | Auto-Play Carousel | Public Carousel | Must Have | Shopper |
| US2.2 | Navigate Carousel Manually | Public Carousel | Must Have | Shopper |
| US2.3 | Accessible Carousel (WCAG 2.1 AA) | Public Carousel | Must Have | Shopper |
| US2.4 | Responsive Carousel | Public Carousel | Must Have | Shopper |
| US2.5 | Fast-Loading Carousel | Public Carousel | Must Have | Shopper |
| US3.1 | Track Banner Clicks | Analytics | Should Have | Marketing |
| US4.1 | Replace Static Hero with Carousel | Homepage Integration | Must Have | Shopper |

**Total**: 14 stories (11 Must Have, 2 Should Have, 1 Could Have)

---

## Dependencies Summary

```
US1.1 → US1.2 → US1.3, US1.4, US1.5, US1.6
US1.2 → US1.6
US2.1 → US2.1a, US2.2, US2.3, US2.4, US2.5
US2.1a → US3.1
US2.1 → US4.1
US2.1a → US4.1
US2.2 → US4.1
US2.3 → US4.1
US2.4 → US4.1
US2.5 → US4.1
```

---

## Traceability to Requirements

| Requirement | Covered By Stories |
|-------------|-------------------|
| FR-1 (Banner Model) | US1.1, US1.2, US1.3, US1.4, US1.5 |
| FR-2 (Admin CRUD API) | US1.1, US1.2, US1.3, US1.4, US1.5, US1.6 |
| FR-3 (Admin UI) | US1.1, US1.2, US1.3, US1.4, US1.5, US1.6 |
| FR-4 (Carousel Component) | US2.1, US2.1a, US2.2, US2.3, US2.4, US2.5 |
| FR-5 (Public API) | US2.1, US2.1a, US2.2 |
| FR-6 (Homepage Integration) | US4.1 |
| FR-7 (Accessibility) | US2.3 |
| FR-8 (Click Tracking) | US3.1 |
| NFR-1 (Performance) | US2.5 |
| NFR-2 (Responsiveness) | US2.4 |
| NFR-3 (Maintainability) | All stories (via ACs) |
| NFR-4 (Security) | US1.1-1.5 (admin auth), US3.1 (no PII) |