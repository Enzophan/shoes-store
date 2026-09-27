# Refined Mockups — Homepage Banner Management

## Design System Mapping

**Colors** (from CSS variables):
- `--ink`: Primary text, headings
- `--chalk`: Background, card surfaces
- `--rose`: Primary accent, CTAs, active states
- `--rose-soft`: Hover states, subtle backgrounds

**Typography**:
- Headings: System font stack, semibold
- Body: System font stack, regular
- UI labels: 14px, medium

**Spacing**: 8px base unit (Tailwind `space-y-4`, `gap-4`, `p-4`)

**Shadows**: `shadow-sm` (cards), `shadow-md` (modals), `shadow-lg` (dropdowns)

**Border Radius**: `rounded-lg` (8px) for cards, `rounded-full` for pills/buttons

---

## 1. Admin Banner Management

### 1.1 Banner List Page (`/admin/banners`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ▸ Dashboard  ▸ Banners                                    [New Banner +]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Thumbnail          │ Alt Text              │ Link        │ Order  │   │
│  ├─────────────────────┼───────────────────────┼─────────────┼────────┤   │
│  │  ┌────────┐         │ Summer Sale 2024      │ /sale       │   0    │   │
│  │  │  IMG   │         │                       │             │        │   │
│  │  └────────┘         │                       │             │        │   │
│  │  ████████ (80x45)   │                       │             │        │   │
│  ├─────────────────────┼───────────────────────┼─────────────┼────────┤   │
│  │  ┌────────┐         │ New Arrival: Sneakers │ /new        │   1    │   │
│  │  │  IMG   │         │                       │             │        │   │
│  │  └────────┘         │                       │             │        │   │
│  │  ████████ (80x45)   │                       │             │        │   │
│  ├─────────────────────┼───────────────────────┼─────────────┼────────┤   │
│  │  ┌────────┐         │ Winter Collection     │ /winter     │   2    │   │
│  │  │  IMG   │         │                       │             │        │   │
│  │  └────────┘         │                       │             │        │   │
│  │  ████████ (80x45)   │                       │             │        │   │
│  │  ──────────────────  (muted — inactive)     │             │        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  [≡]  [Edit]  [View]  [Delete ▼]  per row (actions dropdown)              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Interactions**:
- **Drag handle (≡)**: Click + drag to reorder (desktop); long-press to drag (mobile)
- **Keyboard**: Tab to row, Space to lift, ↑/↓ to move, Space to drop
- **Status badge**: "Active" (green pill) / "Inactive" (gray pill)
- **Empty state**: Illustration + "No banners yet. Create your first banner."

---

### 1.2 Create Banner Page (`/admin/banners/new`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ▸ Dashboard  ▸ Banners  ▸ New Banner                              [Cancel] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Banner Image                                          [Upload]     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │     Drag & drop image here, or click to browse             │   │   │
│  │  │     PNG, JPG, WebP • Max 5MB • Recommended 1920×1080 (16:9)│   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │  Preview: ┌─────────────────────────────────────────────────┐     │   │
│  │           │                                                 │     │   │
│  │           │              [Image Preview]                    │     │   │
│  │           │                                                 │     │   │
│  │           └─────────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Alt Text *                                    [________________]  │   │
│  │  Descriptive text for screen readers and SEO                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Link URL (optional)                       [________________]      │   │
│  │  Destination when banner is clicked (e.g., /sale, /new-arrivals)   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Status                                    [● Active] [○ Inactive]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  [Cancel]                                    [Create Banner →]              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Validation** (inline, on blur/submit):
- Image: Required, valid type, ≤5MB
- Alt Text: Required, max 125 chars (accessibility best practice)
- Link URL: Valid URL if provided

---

### 1.3 Edit Banner Page (`/admin/banners/[id]/edit`)

Same as Create, pre-filled with existing data. Additional:
- **Current image** shown with "Replace" button
- **Order field**: Number input (0–99) with up/down steppers
- **Delete button** in footer (opens confirmation modal)

---

### 1.4 Delete Confirmation Modal

```
┌─────────────────────────────────────────────┐
│  Delete Banner                          [×] │
├─────────────────────────────────────────────┤
│                                             │
│  Are you sure you want to delete           │
│  "Summer Sale 2024"?                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ [●] Deactivate (soft delete)        │   │
│  │     Banner hidden from homepage,    │   │
│  │     retained in admin for restore   │   │
│  ├─────────────────────────────────────┤   │
│  │ [○] Permanently delete              │   │
│  │     Cannot be undone                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Cancel]                    [Delete]       │
│                                             │
└─────────────────────────────────────────────┘
```

---

### 1.5 Drag-and-Drop Reorder (Desktop)

```
Row being dragged:     ┌─────────────────────────────────────────┐
                       │  ≡  ┌────┐  Summer Sale 2024  /sale  0  ▼│  ← lifted, semi-transparent
                       │     │IMG │                              │
                       │     └────┘                              │
                       └─────────────────────────────────────────┘
                              ↓ drop zone indicator (blue line)
Target position:       ┌─────────────────────────────────────────┐
                       │  ≡  ┌────┐  New Arrival: Sneakers /new 1▼│
                       └─────────────────────────────────────────┘
```

**Optimistic UI**: Local reorder immediate → `POST /api/admin/banners/reorder` → success: persist / error: revert + toast

---

## 2. Public Homepage Carousel

### 2.1 Carousel Component (`BannerCarousel.tsx`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ◀                                                                 ▶ │   │  ← Prev/Next arrows (always visible on desktop, hover on mobile)
│  │                                                                     │   │
│  │    ┌─────────────────────────────────────────────────────────┐     │   │
│  │    │                                                         │     │   │
│  │    │                    [BANNER IMAGE]                       │     │   │
│  │    │         (1920×1080, 16:9, fills container)             │     │   │
│  │    │                                                         │     │   │
│  │    └─────────────────────────────────────────────────────────┘     │   │
│  │                                                                     │   │
│  │        ●  ●  ●  ●  ●   ← Pagination dots (clickable, ARIA labeled)  │   │
│  │        │  │  │  │  │                                                │   │
│  │        ▼  ▼  ▼  ▼  ▼                                                │   │
│  │  [⏸ Pause]          ← Pause/Play button (visible, keyboard focus)   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Aspect ratio container: 16:9 (reserves space, prevents CLS)             │
│  First slide: priority + fetchpriority="high" + preload link              │
│  Subsequent slides: loading="lazy"                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**States**:
- **Loading**: Skeleton (shimmer) in 16:9 container
- **Error**: Fallback static hero image
- **Empty**: Fallback static hero ("NEW SEASON DROP")

---

### 2.2 Carousel — Mobile (< 640px)

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │    [BANNER IMAGE]     │  │  ← Touch swipe enabled
│  │                       │  │
│  └───────────────────────┘  │
│        ●  ●  ●              │  ← Pagination dots (primary nav)
│                             │
│  [⏸ Pause]                  │  ← Pause button (always visible)
└─────────────────────────────┘
```
- Single slide view
- Arrows hidden (swipe is primary)
- Dots centered below

---

### 2.3 Carousel — Tablet (640px–1024px)

```
┌────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────┐  │
│  │ ◀                    [BANNER]           ▶ │  ← Arrows + dots visible
│  │                                          │  │
│  └──────────────────────────────────────────┘  │
│        ●  ●  ●  ●  ●                          │
│  [⏸ Pause]                                    │
└────────────────────────────────────────────────┘
```
- Optional 1.15 peek (next slide slightly visible)
- Touch swipe + arrows + dots

---

### 2.4 Carousel — Desktop (> 1024px)

```
┌────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ◀                    [BANNER]                     ▶      │  ← Arrows outside
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│        ●  ●  ●  ●  ●                                          │
│  [⏸ Pause]                                                    │
└────────────────────────────────────────────────────────────────┘
```
- Single slide or 1.2 peek
- Arrows on sides, dots centered
- Hover pauses auto-play

---

## 3. Accessibility Annotations

### 3.1 Carousel ARIA Structure

```html
<section aria-label="Promotional banners carousel" role="region">
  <div class="swiper" data-swiper-ready="true">
    <div class="swiper-wrapper">
      <div class="swiper-slide" role="group" aria-roledescription="slide" 
           aria-label="Slide 1 of 3: Summer Sale 2024">
        <figure>
          <img src="..." alt="Summer Sale 2024 - Up to 50% off running shoes" 
               priority fetchpriority="high" />
          <figcaption class="sr-only">Summer Sale 2024</figcaption>
        </figure>
      </div>
      <!-- ... more slides ... -->
    </div>
    
    <!-- Navigation -->
    <button class="swiper-button-prev" aria-label="Previous slide">
      <svg><!-- chevron left --></svg>
    </button>
    <button class="swiper-button-next" aria-label="Next slide">
      <svg><!-- chevron right --></svg>
    </button>
    
    <!-- Pagination -->
    <div class="swiper-pagination" role="tablist" aria-label="Slide navigation">
      <button role="tab" aria-label="Go to slide 1" aria-selected="true"></button>
      <button role="tab" aria-label="Go to slide 2"></button>
      <!-- ... -->
    </div>
    
    <!-- Pause/Play -->
    <button class="carousel-pause" aria-live="polite" aria-pressed="false">
      <span class="pause-icon" aria-hidden="true"></span>
      <span class="play-icon" aria-hidden="true"></span>
      <span class="sr-only">Pause auto-play</span>
    </button>
  </div>
</section>
```

### 3.2 Keyboard Navigation Map

| Key | Action |
|-----|--------|
| `Tab` | Enter carousel region → pause button → prev → next → pagination → first slide link |
| `ArrowRight` | Next slide |
| `ArrowLeft` | Previous slide |
| `Enter` / `Space` | Activate focused element (pause, nav, link) |
| `Home` | First slide |
| `End` | Last slide |

### 3.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .swiper {
    --swiper-transition-duration: 0ms;
  }
  .swiper-slide {
    transition: none !important;
  }
}
```
- Auto-play: `autoplay: false`
- Transitions: instant

---

## 4. Responsive Breakpoints

| Breakpoint | Slides Visible | Peek | Navigation |
|------------|----------------|------|------------|
| `< 640px` (mobile) | 1 | none | Dots + swipe |
| `640–1024px` (tablet) | 1 | 1.15 | Arrows + dots + swipe |
| `> 1024px` (desktop) | 1 | 1.2 | Arrows + dots |

**Image Aspect Ratio**: 16:9 (1920×1080 recommended) — `aspect-[16/9]` container

---

## 5. Homepage Integration (`app/page.tsx`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  <Header />                                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                    [BANNER CAROUSEL]                                │   │
│  │              (replaces static hero section)                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  HIGHLIGHTS BAR (existing — unchanged)                              │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │   │
│  │  │ Free    │ │ 30-Day  │ │ Secure  │ │ 24/7    │                   │   │
│  │  │ Shipping│ │ Returns │ │ Payment │ │ Support │                   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  <ProductGrid />  <Footer />                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Fallback (no active banners)**:
- Renders original static hero section with "NEW SEASON DROP" headline
- Maintains same spacing/layout as carousel

**SEO/Open Graph**:
```tsx
<meta property="og:image" content={banners[0]?.imageUrl} />
<meta property="og:image:width" content="1920" />
<meta property="og:image:height" content="1080" />
```

---

## 6. Component Specifications

### 6.1 `BannerCarousel.tsx` Props

```typescript
interface BannerCarouselProps {
  banners: Array<{
    id: string;
    imageUrl: string;
    altText: string;
    linkUrl?: string;
  }>;
}
```

### 6.2 Swiper Configuration (from TR-2)

```typescript
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
  },
  breakpoints: {
    640: { slidesPerView: 1, spaceBetween: 0, allowTouchMove: true },
    1024: { slidesPerView: 1, spaceBetween: 0, allowTouchMove: true },
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
    firstSlideMessage: 'This is the first slide',
    lastSlideMessage: 'This is the last slide',
    paginationBulletMessage: 'Go to slide {{index}}',
  }
};
```

---

## 7. Design Token Usage

| Element | Token |
|---------|-------|
| Carousel container bg | `bg-[var(--chalk)]` |
| Arrow buttons | `bg-[var(--ink)]/80 hover:bg-[var(--ink)] text-[var(--chalk)]` |
| Pagination dots | `bg-[var(--ink)]/40 hover:bg-[var(--ink)] active:bg-[var(--rose)]` |
| Pause button | `bg-[var(--rose)] text-[var(--chalk)]` |
| Admin table header | `text-[var(--ink)]/60 uppercase tracking-wider text-sm` |
| Admin row hover | `bg-[var(--rose-soft)]/30` |
| Primary buttons | `bg-[var(--rose)] text-[var(--chalk)] hover:bg-[var(--rose)]/90` |
| Secondary buttons | `border border-[var(--ink)]/20 text-[var(--ink)] hover:bg-[var(--ink)]/5` |
| Input borders | `border-[var(--ink)]/20 focus:border-[var(--rose)] focus:ring-[var(--rose)]/20` |
| Status badges | Active: `bg-green-100 text-green-800` / Inactive: `bg-gray-100 text-gray-600` |

---

## 8. Open Questions (from refined-mockups-questions.md)

1. **Carousel Visual Design** → A. Full-width hero
2. **Controls Visibility** → A. Always visible
3. **Admin Table Density** → A. Comfortable
4. **Image Upload UX** → A. Drag-drop + instant preview
5. **Empty State** → A. Static hero fallback
6. **Mobile Swipe** → A. Standard Swiper behavior

---

*Generated for Refined Mockups stage — single-stage run (isolated from main workflow)*