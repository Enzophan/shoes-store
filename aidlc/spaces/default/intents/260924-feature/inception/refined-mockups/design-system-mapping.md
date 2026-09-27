# Design System Mapping — Homepage Banner Management

## 1. Color Tokens (from project CSS variables)

### 1.1 Semantic Color Mapping

| Semantic Role | CSS Variable | Hex (Example) | Usage |
|---------------|--------------|---------------|-------|
| **Primary Text** | `--ink` | `#1a1a1a` | Headings, body text, icons |
| **Surface** | `--chalk` | `#fafafa` | Page background, card backgrounds |
| **Primary Accent** | `--rose` | `#e11d48` | Primary buttons, active states, focus rings |
| **Accent Soft** | `--rose-soft` | `#fce7f3` | Hover backgrounds, subtle accents |

### 1.2 Component-Specific Colors

| Component | Element | Token | State Variants |
|-----------|---------|-------|----------------|
| **Carousel** | Container bg | `bg-[var(--chalk)]` | — |
| | Arrow buttons | `bg-[var(--ink)]/80` | `hover:bg-[var(--ink)]` |
| | Arrow icons | `text-[var(--chalk)]` | — |
| | Pagination dots | `bg-[var(--ink)]/40` | `hover:bg-[var(--ink)]`, `active:bg-[var(--rose)]` |
| | Pause button | `bg-[var(--rose)]` | `hover:bg-[var(--rose)]/90` |
| | Pause icon | `text-[var(--chalk)]` | — |
| **Admin Table** | Header text | `text-[var(--ink)]/60` | — |
| | Row hover | `bg-[var(--rose-soft)]/30` | — |
| | Active badge | `bg-green-100 text-green-800` | — |
| | Inactive badge | `bg-gray-100 text-gray-600` | — |
| **Forms** | Input border | `border-[var(--ink)]/20` | `focus:border-[var(--rose)] focus:ring-[var(--rose)]/20` |
| | Label text | `text-[var(--ink)]` | — |
| | Helper text | `text-[var(--ink)]/50` | — |
| | Error border | `border-red-500` | `focus:ring-red-500/20` |
| | Error text | `text-red-600` | — |
| **Buttons** | Primary | `bg-[var(--rose)] text-[var(--chalk)]` | `hover:bg-[var(--rose)]/90`, `active:bg-[var(--rose)]`, `disabled:opacity-50` |
| | Secondary | `border border-[var(--ink)]/20 text-[var(--ink)]` | `hover:bg-[var(--ink)]/5`, `active:bg-[var(--ink)]/10` |
| | Ghost | `text-[var(--ink)]/70` | `hover:bg-[var(--ink)]/5` |
| | Danger | `bg-red-600 text-white` | `hover:bg-red-700` |
| **Modals** | Overlay | `bg-black/50` | — |
| | Panel | `bg-[var(--chalk)]` | `shadow-lg` |
| **Toasts** | Success | `bg-green-600 text-white` | — |
| | Error | `bg-red-600 text-white` | — |
| | Info | `bg-[var(--rose)] text-[var(--chalk)]` | — |

---

## 2. Typography Scale

| Role | Font Size | Line Height | Font Weight | Token |
|------|-----------|-------------|-------------|-------|
| **Display** | 48px / 3rem | 1.1 | 700 | `text-4xl font-bold` |
| **H1** | 36px / 2.25rem | 1.2 | 700 | `text-3xl font-bold` |
| **H2** | 30px / 1.875rem | 1.3 | 600 | `text-2xl font-semibold` |
| **H3** | 24px / 1.5rem | 1.4 | 600 | `text-xl font-semibold` |
| **Body Large** | 18px / 1.125rem | 1.6 | 400 | `text-lg` |
| **Body** | 16px / 1rem | 1.6 | 400 | `text-base` |
| **Body Small** | 14px / 0.875rem | 1.5 | 400 | `text-sm` |
| **Caption** | 12px / 0.75rem | 1.5 | 400 | `text-xs` |
| **Button** | 14px / 0.875rem | 1.5 | 500 | `text-sm font-medium` |
| **Label** | 14px / 0.875rem | 1.5 | 500 | `text-sm font-medium` |

**Font Stack**: `font-sans` (system: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)

---

## 3. Spacing System (8px Base Unit)

| Step | Value | Tailwind | Usage |
|------|-------|----------|-------|
| 0.5 | 4px | `p-1`, `m-1`, `gap-1` | Tight inline gaps |
| 1 | 8px | `p-2`, `m-2`, `gap-2`, `space-y-2` | Standard gaps |
| 1.5 | 12px | `p-3`, `gap-3` | Form field gaps |
| 2 | 16px | `p-4`, `m-4`, `gap-4`, `space-y-4` | Card padding, section gaps |
| 3 | 24px | `p-6`, `gap-6`, `space-y-6` | Page section gaps |
| 4 | 32px | `p-8`, `gap-8` | Large section gaps |
| 5 | 40px | `p-10` | Page margins |
| 6 | 48px | `p-12` | Hero sections |

---

## 4. Border Radius

| Size | Value | Tailwind | Usage |
|------|-------|----------|-------|
| **None** | 0 | `rounded-none` | — |
| **Small** | 4px | `rounded-sm` | Badges, pills |
| **Medium** | 6px | `rounded-md` | Inputs, buttons |
| **Large** | 8px | `rounded-lg` | Cards, modals, dropdowns |
| **XL** | 12px | `rounded-xl` | Large cards |
| **Full** | 9999px | `rounded-full` | Pills, avatar, pagination dots |

---

## 5. Shadows

| Level | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| **None** | none | `shadow-none` | — |
| **Sm** | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `shadow-sm` | Cards, table rows |
| **Base** | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | `shadow` | Dropdowns |
| **Md** | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | `shadow-md` | Modals, popovers |
| **Lg** | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | `shadow-lg` | Large modals, toast |
| **Xl** | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | `shadow-xl` | — |

---

## 6. Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| **Base** | 0 | Page content |
| **Dropdown** | 10 | Select menus, popovers |
| **Sticky** | 20 | Sticky headers |
| **Modal Backdrop** | 40 | Modal overlay |
| **Modal** | 50 | Modal panel |
| **Toast** | 60 | Toasts, notifications |
| **Tooltip** | 70 | Tooltips |

---

## 7. Breakpoints (Tailwind Default)

| Name | Min Width | Usage |
|------|-----------|-------|
| **sm** | 640px | Tablet portrait |
| **md** | 768px | Tablet landscape |
| **lg** | 1024px | Desktop |
| **xl** | 1280px | Large desktop |
| **2xl** | 1536px | Ultra-wide |

**Carousel Breakpoints** (custom):
- Mobile: `< 640px` — 1 slide, dots only
- Tablet: `640–1024px` — 1 slide + peek, arrows + dots
- Desktop: `> 1024px` — 1 slide + peek, arrows outside + dots

---

## 8. Component Token Mapping

### 8.1 Carousel Component

```tsx
// Container
<div className="relative aspect-[16/9] bg-[var(--chalk)] overflow-hidden">

// Arrow Buttons
<button className="absolute top-1/2 -translate-y-1/2 p-2 rounded-full 
  bg-[var(--ink)]/80 text-[var(--chalk)] hover:bg-[var(--ink)] 
  transition-colors shadow-md focus:outline-none focus:ring-2 
  focus:ring-[var(--rose)] focus:ring-offset-2 focus:ring-offset-[var(--chalk)]"
>

// Pagination Dots
<button className="w-2 h-2 rounded-full 
  bg-[var(--ink)]/40 hover:bg-[var(--ink)] 
  focus:outline-none focus:ring-2 focus:ring-[var(--rose)] 
  focus:ring-offset-2 focus:ring-offset-[var(--chalk)]
  [&.swiper-pagination-bullet-active]:bg-[var(--rose)]"
>

// Pause/Play Button
<button className="absolute bottom-4 right-4 p-2 rounded-full 
  bg-[var(--rose)] text-[var(--chalk)] 
  hover:bg-[var(--rose)]/90 
  focus:outline-none focus:ring-2 focus:ring-[var(--rose)] 
  focus:ring-offset-2 focus:ring-offset-[var(--chalk)]"
>
```

### 8.2 Admin Table

```tsx
// Table Container
<div className="overflow-x-auto rounded-lg border border-[var(--ink)]/10 bg-[var(--chalk)]">

// Header
<th className="px-4 py-3 text-left text-sm font-semibold 
  text-[var(--ink)]/60 uppercase tracking-wider 
  border-b border-[var(--ink)]/10">

// Row
<tr className="border-b border-[var(--ink)]/5 
  hover:bg-[var(--rose-soft)]/30 
  transition-colors 
  [&:last-child]:border-b-0">

// Thumbnail
<td className="px-4 py-3">
  <div className="w-20 h-11 aspect-[16/9] rounded-md 
    bg-[var(--ink)]/5 overflow-hidden">
    <Image className="w-full h-full object-cover" />
  </div>
</td>

// Status Badge
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full 
  text-xs font-medium 
  [&.active]:bg-green-100 [&.active]:text-green-800 
  [&.inactive]:bg-gray-100 [&.inactive]:text-gray-600">
```

### 8.3 Forms

```tsx
// Field Wrapper
<div className="space-y-1.5">

// Label
<label className="block text-sm font-medium text-[var(--ink)]">

// Input
<input className="w-full px-3 py-2 rounded-md border 
  border-[var(--ink)]/20 bg-[var(--chalk)] 
  text-[var(--ink)] placeholder-[var(--ink)]/30 
  focus:outline-none focus:border-[var(--rose)] 
  focus:ring-2 focus:ring-[var(--rose)]/20 
  disabled:opacity-50 disabled:cursor-not-allowed
  [&.error]:border-red-500 [&.error]:focus:ring-red-500/20" />

// Helper Text
<p className="text-sm text-[var(--ink)]/50">

// Error Text
<p className="text-sm text-red-600" role="alert">
```

### 8.4 Buttons

```tsx
// Primary
<button className="inline-flex items-center justify-center px-4 py-2 
  rounded-md text-sm font-medium 
  bg-[var(--rose)] text-[var(--chalk)] 
  hover:bg-[var(--rose)]/90 active:bg-[var(--rose)] 
  disabled:opacity-50 disabled:cursor-not-allowed 
  focus:outline-none focus:ring-2 focus:ring-[var(--rose)] 
  focus:ring-offset-2 focus:ring-offset-[var(--chalk)] 
  transition-colors">

// Secondary
<button className="inline-flex items-center justify-center px-4 py-2 
  rounded-md text-sm font-medium 
  border border-[var(--ink)]/20 bg-transparent 
  text-[var(--ink)] 
  hover:bg-[var(--ink)]/5 active:bg-[var(--ink)]/10 
  disabled:opacity-50 
  focus:outline-none focus:ring-2 focus:ring-[var(--ink)] 
  focus:ring-offset-2 focus:ring-offset-[var(--chalk)] 
  transition-colors">

// Ghost
<button className="inline-flex items-center justify-center px-3 py-2 
  rounded-md text-sm font-medium 
  text-[var(--ink)]/70 
  hover:bg-[var(--ink)]/5 active:bg-[var(--ink)]/10 
  focus:outline-none focus:ring-2 focus:ring-[var(--ink)] 
  focus:ring-offset-2 focus:ring-offset-[var(--chalk)] 
  transition-colors">
```

---

## 9. Motion & Animation

| Property | Value | Usage |
|----------|-------|-------|
| **Transition Fast** | `150ms ease-out` | Hover states, focus rings |
| **Transition Base** | `200ms ease-out` | Modals, dropdowns, tooltips |
| **Transition Slow** | `300ms ease-out` | Page transitions, sidebars |
| **Carousel Slide** | `600ms ease-out` | Swiper `speed: 600` |
| **Carousel Fade** | `600ms ease-out` | Cross-fade transition |
| **Drag Lift** | `200ms ease-out` | Row lift animation |
| **Toast Enter** | `300ms ease-out` | Slide down + fade |
| **Toast Exit** | `200ms ease-in` | Slide up + fade |

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 10. Accessibility Color Contrast

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| `--ink` on `--chalk` | ~15:1 | AAA |
| `--rose` on `--chalk` | ~4.5:1 | AA (large text) / AA (UI) |
| `--ink`/80 on `--chalk` | ~12:1 | AAA |
| `--ink`/40 on `--chalk` | ~3:1 | AA (UI only) |
| White on `--rose` | ~4.5:1 | AA |

**Banner Text Overlays** (if added):
- Require gradient overlay: `bg-gradient-to-t from-[var(--ink)]/80 to-transparent`
- Ensures 4.5:1 contrast on any image

---

## 11. Icon System

| Icon | Size | Usage |
|------|------|-------|
| Chevron Left/Right | 20×20 | Carousel arrows |
| Pause/Play | 20×20 | Carousel pause button |
| Drag Handle (≡) | 16×16 | Admin reorder |
| Upload/Cloud | 24×24 | Image upload zone |
| Trash/Delete | 16×16 | Delete actions |
| Edit/Pencil | 16×16 | Edit actions |
| Eye/View | 16×16 | View actions |
| Check/Chevron Down | 16×16 | Dropdowns, selects |
| Spinner | 20×20 | Loading states |

**Implementation**: SVG inline, `currentColor` for theming, `aria-hidden="true"`

---

## 12. Responsive Token Usage

```tsx
// Carousel responsive peek
<div className="swiper-container 
  [--swiper-slides-per-view]:1 
  lg:[--swiper-slides-per-view]:1.2 
  [--swiper-space-between]:0">

// Admin table responsive
<div className="overflow-x-auto lg:overflow-visible">
  <table className="min-w-full lg:min-w-0">
```

---

## 13. Dark Mode (Future)

> Not in current scope. Tokens structured for easy dark mode addition:
> - `--ink` → `--ink-dark`
> - `--chalk` → `--chalk-dark`
> - `--rose` → `--rose-dark` (may need luminance adjustment)

---

*Generated for Refined Mockups stage — single-stage run*