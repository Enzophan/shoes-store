**Collaborator:** aidlc-quality-agent

## Contribution — Quality & Testability Perspective

### Test Strategy Alignment

Per team practices: **test-after**, 80% line coverage floor for feature scope.
Test types: Unit (lib/services), Integration (API routes), Component (React), E2E (critical flows).

### Testability Assessment per Story

| Story | Test Types | Coverage Target | Key Test Scenarios |
|-------|------------|-----------------|-------------------|
| US1.1 Create | Unit (validation), Integration (API), Component (form) | 80%+ | Valid submit, missing fields, invalid image, upload error |
| US1.2 List | Integration (API), Component (table) | 80%+ | Empty state, pagination, sort order, active/inactive display |
| US1.3 View | Component | 70%+ | Data display, navigation from list |
| US1.4 Edit | Unit, Integration, Component | 80%+ | Pre-filled form, image replace, order change, toggle active |
| US1.5 Delete | Integration, Component | 70%+ | Soft delete, confirmation modal, hard delete (if impl) |
| US1.6 Reorder | Integration (API), Component (DnD), E2E | 80%+ | Drag-drop, optimistic update, API failure rollback, keyboard |
| US2.1 Auto-Play | Component, E2E | 80%+ | Auto-advance timing, pause on hover, pause on focus |
| US2.2 Navigation | Component, E2E | 80%+ | Arrow click, pagination click, loop behavior |
| US2.3 Accessibility | Component (a11y), E2E (axe) | 90%+ | Keyboard nav, ARIA attrs, reduced motion, focus visible, contrast |
| US2.4 Responsive | Component (viewport), E2E | 70%+ | Mobile swipe, tablet peek, desktop peek, aspect ratio |
| US2.5 Performance | E2E (Lighthouse CI), Unit (bundle) | 70%+ | LCP < 2.5s, CLS = 0, bundle < 50KB, ISR revalidation |
| US3.1 Click Tracking | Integration (API), Component | 70%+ | sendBeacon fires, 202 response, analytics event |
| US4.1 Homepage | Integration, E2E | 80%+ | Carousel renders, fallback shows, OG tag present |

### Test Infrastructure Requirements

**Unit/Integration (Jest + @testing-library/react)**:
- Already configured per A5 assumption — verify `jest.config.js` exists
- API route testing: Use `createMocks` from `node-mocks-http` or Next.js test utilities
- Prisma: Mock with `jest-mock-extended` or use test database

**Component (React Testing Library)**:
- `BannerCarousel`: Render with mocked banners, test Swiper interactions via user-event
- Admin forms: Test validation, submission, loading states
- Mock Swiper: Create test wrapper that provides Swiper context

**E2E (Playwright or Cypress)**:
- Critical flows: Admin CRUD, Carousel auto-play/navigation, Accessibility
- Lighthouse CI: Integrate in CI for performance budgets
- Axe-core: Automated accessibility testing in E2E

### Specific Test Cases for High-Risk Stories

**US1.6 (Drag-Drop Reorder)**:
```typescript
// Component test
test('drag-drop reorders banners optimistically', async () => {
  render(<BannerList banners={mockBanners} />)
  await userEvent.dragAndDrop(screen.getByTestId('banner-2'), screen.getByTestId('banner-0'))
  expect(screen.getByTestId('banner-0')).toHaveTextContent('Banner 2') // optimistic
  await waitFor(() => expect(api.reorder).toHaveBeenCalledWith([2, 0, 1]))
})

// API test
test('reorder API validates unique order values', async () => {
  const res = await request(app).post('/api/admin/banners/reorder').send({ orders: [{id:1, order:0}, {id:2, order:0}] })
  expect(res.status).toBe(400)
})
```

**US2.3 (Accessibility)**:
```typescript
// Axe-core integration
test('carousel has no accessibility violations', async () => {
  render(<BannerCarousel banners={mockBanners} />)
  const results = await axe(document.body)
  expect(results.violations).toHaveLength(0)
})

// Keyboard navigation
test('arrow keys navigate carousel', async () => {
  render(<BannerCarousel banners={mockBanners} />)
  const carousel = screen.getByRole('region', { name: /promotional banners/i })
  await userEvent.tab() // focus carousel
  await userEvent.keyboard('{ArrowRight}')
  expect(carousel).toHaveAttribute('data-swiper-active-index', '1')
})

// Reduced motion
test('respects prefers-reduced-motion', async () => {
  // Mock matchMedia
  render(<BannerCarousel banners={mockBanners} />)
  expect(screen.getByRole('region')).toHaveAttribute('data-autoplay', 'false')
})
```

**US2.5 (Performance)**:
```typescript
// Lighthouse CI budget (lighthouse-ci.json)
{
  "budgets": [
    { "resourceSizes": [{ "resourceType": "script", "budget": 50 }], // KB gzipped
    { "resourceCounts": [{ "resourceType": "third-party", "budget": 0 }] }
  ],
  "assert": {
    "categories:performance": ["error", { "minScore": 0.9 }],
    "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
    "cumulative-layout-shift": ["error", { "maxNumericValue": 0 }]
  }
}
```

### Quality Gates & CI Integration

**Pre-merge CI Pipeline** (per team practices):
1. `npm run lint` — ESLint + Prettier (zero errors)
2. `npm run typecheck` — `tsc --noEmit` (strict mode)
3. `npm run test` — Jest unit/integration/component (80% coverage)
4. `npm run test:e2e` — Playwright critical flows
5. `npm run lighthouse` — Performance budgets (optional gate)

**Coverage Enforcement**:
- Global: 80% lines, 70% branches, 80% functions
- Per-file: Fail if any file < 60% lines (prevents untested utils)

### Objections / Positions

**OBJECT**: US2.3 (Accessibility) acceptance criteria need explicit test references:
- Add AC: "Automated axe-core scan passes with zero violations in CI"
- Add AC: "Manual keyboard testing documented in test plan"
- Add AC: "Screen reader tested with NVDA (Windows) and VoiceOver (macOS)"

Rationale: Accessibility cannot be fully verified by automated tools alone; manual testing criteria must be explicit.

**OBJECT**: US1.6 (Drag-Drop) needs E2E test for keyboard accessibility — `@dnd-kit` keyboard support must be verified end-to-end.

Rationale: Unit tests can't verify actual keyboard interaction with DOM; E2E required.

**AGREE**: 80% coverage floor is appropriate. Carousel component will be hardest to cover (Swiper internals) — exclude Swiper bundle from coverage, test only wrapper logic.

**AGREE**: Performance budgets as CI gate (Lighthouse CI) — prevents regression. Set thresholds at 90% of current baseline.

**AGREE**: Click tracking (US3.1) test should verify `sendBeacon` called, not backend storage (out of scope for MVP).

### Recommended Test File Structure

```
tests/
├── unit/
│   ├── lib/validation.test.ts           // Zod schemas
│   └── lib/banner-utils.test.ts         // helpers
├── integration/
│   ├── api/admin/banners.test.ts        // CRUD + reorder
│   └── api/banners.test.ts              // public API
├── component/
│   ├── BannerCarousel.test.tsx          // rendering, nav, a11y
│   ├── admin/BannerForm.test.tsx        // create/edit validation
│   └── admin/BannerList.test.tsx        // table, delete, reorder
└── e2e/
    ├── admin-banners.spec.ts            // full CRUD flow
    ├── homepage-carousel.spec.ts        // auto-play, nav, a11y
    └── performance.spec.ts              // Lighthouse CI
```

### Traceability: Test Coverage → Stories

| Story | Unit | Integration | Component | E2E |
|-------|------|-------------|-----------|-----|
| US1.1 | ✓ | ✓ | ✓ | |
| US1.2 | | ✓ | ✓ | |
| US1.3 | | | ✓ | |
| US1.4 | ✓ | ✓ | ✓ | |
| US1.5 | | ✓ | ✓ | |
| US1.6 | | ✓ | ✓ | ✓ |
| US2.1 | | | ✓ | ✓ |
| US2.2 | | | ✓ | ✓ |
| US2.3 | | | ✓ | ✓ |
| US2.4 | | | ✓ | ✓ |
| US2.5 | ✓ | | | ✓ |
| US3.1 | | ✓ | ✓ | |
| US4.1 | | ✓ | | ✓ |