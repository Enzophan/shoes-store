# Refined Mockups — Planning Questions

## Design Approach

**Context**: Based on user stories (14 stories, 3 personas) and requirements (FR-1 through FR-8, NFR-1 through NFR-4), we need refined mockups for:
1. Admin Banner Management UI (CRUD + reorder)
2. Public Homepage Banner Carousel

---

## Question 1: Carousel Visual Design
**Question**: What visual style for the carousel?
**Options**:
- A. Full-width hero, banner fills viewport width, 16:9 aspect ratio
- B. Container-width (max 1200px), centered, with subtle shadow
- C. Edge-to-edge with background color bleed, banner image inset
- X. Other (please specify)

**Recommendation**: A — Matches current hero pattern, full impact for promotions.

---

## Question 2: Carousel Controls Visibility
**Question**: How should navigation controls (arrows, pagination) appear?
**Options**:
- A. Always visible (arrows on hover/focus, dots always)
- B. Visible on hover/focus only (cleaner default)
- C. Arrows always, dots on hover
- X. Other (please specify)

**Recommendation**: A — Accessibility requires visible controls; WCAG 2.1 AA.

---

## Question 3: Admin Table Density
**Question**: Row density for banner list table?
**Options**:
- A. Comfortable (48px row height, generous padding)
- B. Compact (36px row height, dense information)
- C. Configurable density toggle
- X. Other (please specify)

**Recommendation**: A — Better for scanning thumbnails and actions.

---

## Question 4: Image Upload UX
**Question**: How should image upload work in create/edit forms?
**Options**:
- A. Drag-and-drop zone + click to browse, instant preview
- B. Traditional file input + separate preview area
- C. Two-step: upload first, then crop/focal point, then save
- X. Other (please specify)

**Recommendation**: A — Modern, efficient, matches admin patterns.

---

## Question 5: Empty State for Carousel
**Question**: When no active banners exist?
**Options**:
- A. Show original static hero ("NEW SEASON DROP") as fallback (per US4.1 AC4.1.3)
- B. Hide carousel section entirely, move Highlights Bar up
- C. Show placeholder: "No active banners — configure in admin"
- X. Other (please specify)

**Recommendation**: A — Matches requirements, graceful degradation.

---

## Question 6: Mobile Carousel Behavior
**Question**: Touch swipe on mobile — edge resistance?
**Options**:
- A. Standard Swiper behavior (swipe to next, rubber-band at edges)
- B. No edge resistance (hard stop at first/last)
- C. Infinite loop swipe (always can swipe)
- X. Other (please specify)

**Recommendation**: A — Native feel, Swiper default.

---

## Consolidated Summary Confirmation

**Does this mockup plan look correct before proceeding to generation?**

[Answer]: Looks correct

**Selected: Looks correct** — Proceed to refined mockup generation