# Requirements Analysis — Questions for Approval

## Clarifying Questions

### Q1: Banner Content Fields
**Question**: Should banners support rich text overlays (headline, subheadline, CTA button text) in addition to image + link, or is image-only with alt text sufficient for MVP?
**Options**:
- A. Image + alt text + link URL only (simpler, matches current static hero)
- B. Add optional headline, subheadline, CTA button text fields (more marketing flexibility)
- C. Support both: simple mode (image only) and rich mode (with overlay text)
- X. Other (please specify)

**Recommendation**: A — Keep MVP minimal per build-vs-buy decision; rich overlays add CMS complexity.

Answer: A

### Q2: Auto-play Behavior on Mobile
**Question**: Should auto-play be disabled on mobile devices by default (touch interaction conflicts), or enabled with pause-on-touch?
**Options**:
- A. Enabled on all devices, pause on hover/touch (Swiper default)
- B. Disabled on mobile (< 640px), enabled on tablet/desktop
- C. Enabled but longer interval on mobile (15s vs 10s)
- X. Other (please specify)

**Recommendation**: A — Swiper handles touch correctly; pauseOnMouseEnter covers touch.

Answer: A

### Q3: Banner Image Aspect Ratio
**Question**: What aspect ratio should banner images use? This affects layout stability and design.
**Options**:
- A. 16:9 (1920×1080) — Standard widescreen, fits most hero designs
- B. 2:1 (1920×960) — Slightly taller, more content visible below fold
- C. 21:9 (1920×907) — Ultra-wide, cinematic
- D. Flexible: any ratio, container adapts (risk of layout shift)
- X. Other (please specify)

**Recommendation**: A — 16:9 balances visibility and standard asset sizes.

Answer: A

### Q4: Admin Reordering UX
**Question**: How should banner reordering work in admin?
**Options**:
- A. Drag-and-drop (visual, intuitive) — requires @dnd-kit
- B. Number input fields (order: 1, 2, 3...) — simpler, no new dependency
- C. Up/down arrow buttons per row — middle ground
- X. Other (please specify)

**Recommendation**: A — Drag-and-drop is standard for carousel management; @dnd-kit is lightweight (~12KB).

Answer: A

### Q5: Click Tracking Storage
**Question**: Where should banner click events be stored for MVP analytics?
**Options**:
- A. New `BannerClick` Prisma model (structured, queryable)
- B. Vercel Analytics / Google Analytics events (no backend storage)
- C. Console log only (development), defer storage to Phase 2
- X. Other (please specify)

**Recommendation**: B — Zero backend cost, leverages existing analytics; add model in Phase 2 if needed.

Answer: C

### Q6: Fallback for Empty State
**Question**: What displays when no active banners exist?
**Options**:
- A. Show original static hero ("NEW SEASON DROP") as fallback
- B. Hide carousel section entirely (collapse space)
- C. Show placeholder with "Configure banners in admin" message (admin only)
- X. Other (please specify)

**Recommendation**: A — Graceful degradation, no empty homepage.

Answer: A

### Q7: Image Upload Strategy
**Question**: How should banner images be uploaded and served?
**Options**:
- A. Vercel Blob Storage (native, CDN, paid tier)
- B. Local `/public/uploads/banners/` (free, simple, no CDN)
- C. External CDN (Cloudinary, ImageKit) — existing integration?
- X. Other (please specify)

**Recommendation**: B — Zero cost for MVP; migrate to Vercel Blob if scale demands.

Answer: B

### Q8: Transition Animation
**Question**: Which slide transition effect for the carousel?
**Options**:
- A. Fade (cross-fade) — Smooth, professional, matches Swiper `effect: 'fade'`
- B. Slide (horizontal translate) — Classic carousel feel
- C. Cube / Flip / Cards — Too flashy for e-commerce
- X. Other (please specify)

**Recommendation**: A — Fade is elegant, less motion sickness risk, works with auto-play.

Answer: A

---

## Assumption Confirmations

### A1: Admin Auth Middleware Exists
**Assumption**: Current codebase has middleware or pattern to protect `/admin/*` routes.
**Confirm**: 
- A. Yes, use existing pattern
- B. No, need to implement basic auth check for this feature
- X. Other

Answer: A

### A2: Image Upload Configured
**Assumption**: Project has working file upload (local or Vercel Blob).
**Confirm**:
- A. Yes, reuse existing upload utility
- B. No, implement local upload to `/public/uploads/banners/`
- X. Other

Answer: B

### A3: Homepage is Server Component
**Assumption**: `app/page.tsx` uses async/await for data fetching (Server Component).
**Confirm**:
- A. Yes, fetch banners in page.tsx, pass to client carousel
- B. No, it's a Client Component — need different data fetching pattern
- X. Other

Answer: A

### A4: CSS Variables Available
**Assumption**: Theme colors (`--ink`, `--chalk`, `--rose`, `--rose-soft`) defined in globals.css.
**Confirm**:
- A. Yes, use existing variables
- B. No, define banner-specific colors
- X. Other

Answer: A

### A5: Test Infrastructure Ready
**Assumption**: Jest + @testing-library/react configured and working.
**Confirm**:
- A. Yes, write tests per 80% coverage floor
- B. No, configure Jest first (adds scope)
- X. Other

Answer: A

### A6: No Existing Carousel
**Assumption**: No carousel library currently in dependencies.
**Confirm**:
- A. Confirmed — install swiper fresh
- B. Existing library found — evaluate migration
- X. Other

Answer: A

---

## Scope Confirmation

### S1: MVP Scope Boundary
**Statement**: The following are IN SCOPE for this feature (feature scope MVP):
- Banner CRUD (admin API + UI)
- Swiper carousel on homepage (10s auto-play, fade, pause on hover)
- Accessibility (WCAG 2.1 AA: pause button, keyboard nav, reduced motion)
- Basic click tracking (analytics event, no backend storage)
- Responsive images (Next.js Image)
- 80% test coverage (unit + component + integration)

The following are OUT OF SCOPE (deferred):
- Scheduling (start/end dates)
- A/B testing
- Audience targeting
- Analytics dashboard
- Visual banner builder
- Video banners

**Confirm**:
- A. Scope is correct — proceed
- B. Add scheduling to MVP (increases effort ~2 days)
- C. Remove click tracking from MVP (reduces effort ~0.5 days)
- X. Other (please specify)

Answer: A

---

## Decision Required

**Please answer all questions above (Q1–Q8, A1–A6, S1) with your chosen option letter (A/B/C/X).**

Format your response as:
```
Q1: A
Q2: A
Q3: A
Q4: A
Q5: B
Q6: A
Q7: B
Q8: A
A1: A
A2: B
A3: A
A4: A
A5: A
A6: A
S1: A
```

After you respond, I will generate the final requirements artifact and submit for the approval gate.

---

## Consolidated Summary Confirmation

**Do the generated requirements.md and requirements-analysis-questions.md look correct before proceeding to the approval gate?**

[Answer]: Looks correct

Options:
- A. Looks correct
- B. Request changes