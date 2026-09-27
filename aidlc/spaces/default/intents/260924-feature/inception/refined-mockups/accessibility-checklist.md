# Accessibility Checklist — Homepage Banner Management

## WCAG 2.1 AA Compliance Target

All checklist items reference specific WCAG 2.1 Success Criteria (SC).

---

## 1. Carousel Component (`BannerCarousel.tsx`)

### 1.1 Keyboard Accessible (SC 2.1.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C1 | All functionality operable via keyboard | ☐ | Arrows, pagination, pause/play, slide links |
| A11Y-C2 | No keyboard traps | ☐ | Tab enters/exits carousel cleanly |
| A11Y-C3 | Logical focus order | ☐ | Region → Pause → Prev → Next → Pagination → Slide link |
| A11Y-C4 | Focus visible on all interactive elements | ☐ | `focus:outline-none focus:ring-2 focus:ring-[var(--rose)]` |
| A11Y-C5 | Arrow keys navigate slides | ☐ | ArrowRight/Left, Home/End |

### 1.2 Pause, Stop, Hide (SC 2.2.2)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C6 | Auto-play pauses on hover | ☐ | `pauseOnMouseEnter: true` |
| A11Y-C7 | Auto-play pauses on keyboard focus | ☐ | Focus within carousel region |
| A11Y-C8 | Visible pause/play control | ☐ | Button with `aria-live="polite"` |
| A11Y-C9 | Pause/play accessible via keyboard | ☐ | Tab focusable, Enter/Space toggles |

### 1.3 Animation from Interactions (SC 2.3.3)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C10 | Respects `prefers-reduced-motion` | ☐ | Auto-play off, instant transitions |
| A11Y-C11 | No auto-play if reduced motion | ☐ | `autoplay: false` when media query matches |

### 1.4 Focus Visible (SC 2.4.7)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C12 | Focus indicator on arrows | ☐ | 2px ring, offset 2px |
| A11Y-C13 | Focus indicator on pagination | ☐ | 2px ring, offset 2px |
| A11Y-C14 | Focus indicator on pause button | ☐ | 2px ring, offset 2px |
| A11Y-C15 | Focus indicator on slide links | ☐ | Inherited from global focus styles |

### 1.5 Name, Role, Value (SC 4.1.2)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C16 | Carousel region labeled | ☐ | `<section aria-label="Promotional banners carousel">` |
| A11Y-C17 | Slides have role/group | ☐ | `role="group" aria-roledescription="slide"` |
| A11Y-C18 | Slide labeled with position + alt | ☐ | `aria-label="Slide X of Y: [alt text]"` |
| A11Y-C19 | Arrows have accessible names | ☐ | `aria-label="Previous slide" / "Next slide"` |
| A11Y-C20 | Pagination as tablist | ☐ | `role="tablist"`, bullets `role="tab"` |
| A11Y-C21 | Pagination bullets labeled | ☐ | `aria-label="Go to slide X"` |
| A11Y-C22 | Pause button has state | ☐ | `aria-pressed="true/false"` |
| A11Y-C23 | Pause button announces state | ☐ | `aria-live="polite"` + SR-only text |

### 1.6 Images (SC 1.1.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C24 | All images have alt text | ☐ | From `Banner.altText` (required field) |
| A11Y-C25 | Alt text descriptive (< 125 chars) | ☐ | Validated in admin form |
| A11Y-C26 | Decorative images hidden | ☐ | N/A — all banners are content |
| A11Y-C27 | First slide `priority` + `fetchpriority` | ☐ | LCP optimization |

### 1.7 Contrast (SC 1.4.3)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C28 | Arrow buttons 4.5:1 | ☐ | `--ink`/80 on `--chalk` (~12:1) |
| A11Y-C29 | Pagination dots 3:1 (UI) | ☐ | `--ink`/40 on `--chalk` (~3:1) |
| A11Y-C30 | Pause button 4.5:1 | ☐ | `--rose` on `--chalk` (~4.5:1) |
| A11Y-C31 | Text overlays (if any) 4.5:1 | ☐ | Gradient overlay if text on image |

### 1.8 Resize Text (SC 1.4.4)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-C32 | Carousel usable at 200% zoom | ☐ | Relative units, no fixed widths |

---

## 2. Admin Banner Management

### 2.1 Keyboard (SC 2.1.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-A1 | All actions keyboard accessible | ☐ | Create, Edit, View, Delete, Reorder |
| A11Y-A2 | Drag-drop keyboard alternative | ☐ | Space to lift, arrows to move, Space to drop |
| A11Y-A3 | Modal focus trap | ☐ | Delete confirmation, focus trapped |
| A11Y-A4 | Form fields keyboard navigable | ☐ | Tab order logical |

### 2.2 Forms (SC 3.3.2, 3.3.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-A5 | Labels associated with inputs | ☐ | `<label htmlFor>` + `id` |
| A11Y-A6 | Required fields marked | ☐ | `required` attr + visual indicator |
| A11Y-A7 | Error messages announced | ☐ | `role="alert"` or `aria-live="assertive"` |
| A11Y-A8 | Error linked to field | ☐ | `aria-describedby` on error |
| A11Y-A9 | Instructions provided | ☐ | Helper text for alt text, link URL |

### 2.3 Tables (SC 1.3.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-A10 | Table has caption or aria-label | ☐ | `<table aria-label="Banner list">` |
| A11Y-A11 | Headers marked with `<th scope="col">` | ☐ | Semantic table structure |
| A11Y-A12 | Row actions accessible | ☐ | Buttons in actions cell, not links |

### 2.4 Status & Feedback (SC 4.1.3)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-A13 | Toast announcements | ☐ | `aria-live="polite"` region |
| A11Y-A14 | Loading states announced | ☐ | `aria-busy="true"` on submit |

---

## 3. Homepage Integration

### 3.1 Semantic Structure (SC 1.3.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-H1 | Carousel in logical heading order | ☐ | After `<header>`, before `<main>` highlights |
| A11Y-H2 | No heading level skipped | ☐ | Carousel has no heading (section only) |
| A11Y-H3 | Landmarks correct | ☐ | `<header>`, `<main>`, `<footer>` |

### 3.2 Fallback Content (SC 1.1.1)

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-H4 | Static hero has alt text | ☐ | Existing hero image has alt |
| A11Y-H5 | Fallback accessible | ☐ | Same structure as carousel |

---

## 4. Global Requirements

### 4.1 Page Level

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-G1 | Page has valid lang | ☐ | `<html lang="en">` |
| A11Y-G2 | Skip link present | ☐ | "Skip to main content" |
| A11Y-G3 | Title descriptive | ☐ | `<title>Shoe Store — Home</title>` |

### 4.2 Automated Testing

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-G4 | axe-core passes (zero violations) | ☐ | CI integration |
| A11Y-G5 | Lighthouse accessibility ≥ 90 | ☐ | CI budget |

### 4.3 Manual Testing

| ID | Check | Status | Notes |
|----|-------|--------|-------|
| A11Y-G6 | NVDA (Windows) tested | ☐ | Carousel + admin flows |
| A11Y-G7 | VoiceOver (macOS/iOS) tested | ☐ | Carousel + admin flows |
| A11Y-G8 | Keyboard-only navigation tested | ☐ | All user stories |
| A11Y-G9 | Zoom 200% tested | ☐ | No horizontal scroll, content readable |
| A11Y-G10 | High contrast mode tested | ☐ | Windows HCM / macOS Increase Contrast |

---

## 5. Testing Procedures

### 5.1 Carousel Keyboard Test Script

```
1. Load homepage
2. Tab until focus enters carousel region
3. Verify: Pause button focused, "Pause auto-play" announced
4. Press Space → Verify: "Auto-play paused" announced, button shows play icon
5. Press Space → Verify: "Auto-play resumed" announced
6. Press ArrowRight → Verify: Next slide, "Slide 2 of 3: [alt]" announced
7. Press ArrowLeft → Verify: Previous slide
8. Tab → Verify: Prev arrow focused
9. Enter → Verify: Previous slide
10. Tab → Verify: Next arrow focused
11. Tab → Verify: Pagination dots (roving tabindex)
12. ArrowRight on dots → Verify: Move between dots
13. Enter on dot → Verify: Jump to slide
14. Tab → Verify: Slide link (if present) focused
15. Enter on link → Verify: Navigation works
16. Tab → Verify: Exit carousel, continue to Highlights Bar
```

### 5.2 Admin Keyboard Test Script

```
1. Navigate to /admin/banners
2. Tab through table: headers → rows → actions
3. On row: Tab to drag handle → Space to lift
4. ArrowUp/Down → Verify: Row moves, position announced
5. Space → Verify: Row dropped, position announced
6. Escape → Verify: Cancel, row returns
7. Tab to "New Banner" → Enter
8. Fill form with keyboard only → Submit
9. Verify: Toast announced, list updated
10. Edit banner → Verify: Pre-filled, keyboard navigable
11. Delete banner → Verify: Modal focus trapped, Escape closes
```

### 5.3 Reduced Motion Test

```
1. Enable "Reduce motion" in OS settings
2. Reload homepage
3. Verify: Carousel does NOT auto-play
4. Verify: Slide transitions instant (no fade)
5. Verify: Pause button hidden or shows "Auto-play disabled"
6. Navigate with arrows → Verify: Instant slide change
```

---

## 6. Traceability to User Stories

| User Story | Accessibility Criteria |
|------------|------------------------|
| US2.1 (View Carousel) | A11Y-C1–C15 |
| US2.2 (Navigate) | A11Y-C1–C5, C19–C21 |
| US2.3 (Accessible) | **All A11Y-C\*** |
| US2.4 (Responsive) | A11Y-C1–C15 (all breakpoints) |
| US2.5 (Performance) | A11Y-C27 (priority loading) |
| US1.1–1.5 (Admin CRUD) | A11Y-A1–A14 |
| US1.6 (Reorder) | A11Y-A2, A11Y-A10–A11 |
| US4.1 (Integration) | A11Y-H1–H5 |

---

## 7. Definition of Done

- [ ] All **A11Y-C\*** checks pass (carousel)
- [ ] All **A11Y-A\*** checks pass (admin)
- [ ] All **A11Y-H\*** checks pass (homepage)
- [ ] All **A11Y-G\*** checks pass (global)
- [ ] axe-core CI: zero violations
- [ ] Manual NVDA + VoiceOver: no blockers
- [ ] Keyboard-only: all flows complete
- [ ] Reduced motion: verified
- [ ] 200% zoom: verified

---

*Generated for Refined Mockups stage — single-stage run*