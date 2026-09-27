**Collaborator:** aidlc-design-agent

## Contribution — Design Perspective on Personas & Stories

### Persona Fidelity Assessment

**P1 Admin**: Well-defined for content management tasks. Consider adding:
- "Preview mode" toggle to see how banner looks on homepage before publishing
- Bulk actions (activate/deactivate multiple) for seasonal campaigns
- Image crop/focal point tool for consistent thumbnail presentation

**P2 Shopper**: Strong on accessibility requirements. Consider:
- Adding "reduced motion" persona variant explicitly (users with vestibular disorders)
- Touch gesture expectations for mobile swipe (velocity thresholds, edge resistance)
- Loading state design: skeleton vs. blur placeholder for LCP optimization

**P3 Marketing Stakeholder**: Under-served in current stories. Suggest:
- Story for "View banner performance dashboard" (even if deferred to Phase 2)
- Story for "Duplicate banner as template" for recurring campaigns
- Story for "Preview banner in context" before publishing

### UX Recommendations for Stories

**US1.6 (Drag-Drop Reorder)**:
- Use `@dnd-kit` with `sortable` preset — keyboard accessible by default
- Show drag handle (≡) on hover/focus only to reduce visual clutter
- Announce reorder via `aria-live="polite"`: "Banner moved to position 2"
- Touch: long-press to initiate drag (standard mobile pattern)

**US2.3 (Accessibility)**:
- Add explicit "Pause auto-play" button (not just keyboard) — visible control for all users
- Carousel region: `role="region" aria-label="Promotional banners carousel"`
- Each slide: `role="group" aria-roledescription="slide"` with `aria-label="Slide X of Y: [alt text]"`
- Pagination: `aria-label="Go to slide X"` on each dot

**US2.4 (Responsive)**:
- Mobile: Consider vertical stack alternative if >3 banners (carousel fatigue)
- Tablet: 1.15 peek ratio balances visibility and touch target size
- Desktop: 1.2 peek with subtle shadow on peeked slide for depth cue

**US2.5 (Performance)**:
- Blur placeholder (LQIP) for first slide: extract dominant color server-side
- Preload first slide image via `<link rel="preload" as="image">` in `<head>`
- Swiper modules: import only `Navigation`, `Pagination`, `Autoplay`, `EffectFade` — tree-shake rest

### Design System Compliance

- Colors: Use existing `--rose`, `--rose-soft`, `--ink`, `--chalk` variables
- Spacing: Follow 8px base unit (Tailwind `space-y-4`, `gap-4`)
- Typography: Existing heading/body scales; no new font sizes needed
- Shadows: Use existing elevation tokens (if defined) or `shadow-lg` for carousel container

### Objections / Positions

**OBJECT**: US2.1 combines auto-play and display — split into separate stories for:
1. "Display carousel with first banner" (core)
2. "Auto-advance with 10s interval" (enhancement)
3. "Pause on hover/focus" (accessibility)

Rationale: Auto-play is a progressive enhancement; core value is seeing multiple banners. Separation allows shipping static carousel first if auto-play causes issues.

**OBJECT**: US2.3 (Accessibility) acceptance criteria should reference specific WCAG SC numbers:
- AC2.3.1 → SC 2.2.2 (Pause, Stop, Hide)
- AC2.3.2 → SC 2.1.1 (Keyboard)
- AC2.3.5 → SC 2.3.3 (Animation from Interactions)

Rationale: Traceability to standards aids audit and QA verification.