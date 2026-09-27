# Interaction Specification — Homepage Banner Management

## 1. Carousel Auto-Play Behavior

### 1.1 Timing
- **Interval**: 10 seconds (10,000ms)
- **Pause on hover**: Yes (`pauseOnMouseEnter: true`)
- **Pause on focus**: Yes (keyboard focus within carousel region)
- **Resume**: After 3 seconds of no hover/focus

### 1.2 State Machine

```
┌─────────┐     hover/focus      ┌─────────┐
│ PLAYING │ ──────────────────▶ │  PAUSED │
└─────────┘                     └─────────┘
     ▲                              │
     │                              │ hover/focus ends
     │           3s delay           │
     └──────────────────────────────┘
```

### 1.3 Reduced Motion
- **Detection**: `window.matchMedia('(prefers-reduced-motion: reduce)')`
- **Behavior**: Auto-play disabled, transitions instant (`speed: 0`)

---

## 2. Carousel Navigation

### 2.1 Arrow Navigation
- **Prev/Next**: Always functional (loop enabled)
- **Keyboard**: ArrowLeft/ArrowRight when carousel focused
- **Touch**: Swipe left/right (mobile/tablet)
- **Click**: Arrow buttons (desktop hover, mobile tap)

### 2.2 Pagination Dots
- **Click**: Jump to specific slide
- **Keyboard**: Tab to dots, ArrowLeft/Right between dots, Enter/Space to activate
- **ARIA**: `role="tablist"` container, `role="tab"` buttons, `aria-selected`

### 2.3 Pause/Play Button
- **States**: Playing (shows pause icon) / Paused (shows play icon)
- **Keyboard**: Tab focusable, Enter/Space toggles
- **ARIA**: `aria-live="polite"`, `aria-pressed="true/false"`
- **Label**: "Pause auto-play" / "Resume auto-play"

---

## 3. Slide Transition

### 3.1 Fade Effect (from TR-2)
- **Effect**: Cross-fade (`fadeEffect: { crossFade: true }`)
- **Duration**: 600ms (`speed: 600`)
- **Easing**: CSS `ease-out` (Swiper default)

### 3.2 Loop Behavior
- **Infinite**: Last slide → First slide (seamless)
- **Clone slides**: Swiper creates clones for smooth loop

---

## 4. Admin Drag-and-Drop Reorder

### 4.1 Desktop (Mouse)
1. **Hover row** → Drag handle (≡) appears
2. **Click + hold** handle → Row lifts (shadow, opacity 0.8)
3. **Drag** → Drop zone indicator (blue line between rows)
4. **Release** → Row snaps to position
5. **API call** → `POST /api/admin/banners/reorder` with new order array

### 4.2 Keyboard (Accessibility)
1. **Tab** to row → Focus outline visible
2. **Space** → Lift row (announce "Row lifted, use arrows to move")
3. **ArrowUp/ArrowDown** → Move row (announce "Moved to position X")
4. **Space** → Drop row (announce "Row dropped at position X")
5. **Escape** → Cancel, return to original position

### 4.3 Touch (Mobile)
1. **Long press** (500ms) on drag handle → Row lifts
2. **Drag** → Visual feedback
3. **Release** → Drop
4. **Tap elsewhere** → Cancel

### 4.4 Optimistic UI
- **Immediate**: Local state updates, UI reorders
- **API success**: Confirm, persist
- **API error**: Revert to previous order, show toast error
- **Loading**: Subtle spinner on affected rows

---

## 5. Image Upload Flow

### 5.1 Create/Edit Form
1. **Drag file** onto drop zone OR **click** to open file picker
2. **Validation** (client-side):
   - Type: `image/*` (PNG, JPG, WebP)
   - Size: ≤ 5MB
   - Dimensions: ≥ 800×450 (warn if smaller)
3. **Preview**: Show thumbnail immediately (object-fit: cover, 16:9)
4. **Upload** (on form submit):
   - `POST /api/admin/upload` → returns `imageUrl`
   - Form submits with `imageUrl` to banner API

### 5.2 Error States
- **Invalid type**: "Please upload an image file (PNG, JPG, WebP)"
- **Too large**: "File must be smaller than 5MB"
- **Upload failed**: "Upload failed. Please try again."
- **Network error**: "Connection lost. Check your network."

---

## 6. Form Validation (Admin)

### 6.1 Create Banner
| Field | Required | Validation |
|-------|----------|------------|
| Image | Yes | File uploaded, valid type/size |
| Alt Text | Yes | 1–125 chars, descriptive |
| Link URL | No | Valid URL if provided |
| Status | Yes | Default: Active |

### 6.2 Edit Banner
Same as Create, plus:
| Field | Required | Validation |
|-------|----------|------------|
| Order | Yes | Integer 0–99, unique among active banners |

### 6.3 Inline Validation
- **On blur**: Validate single field
- **On submit**: Validate all, scroll to first error
- **Error display**: Red border + helper text below field

---

## 7. Delete Confirmation

### 7.1 Modal Flow
1. **Click Delete** → Modal opens
2. **Default**: Soft delete (Deactivate) selected
3. **User choice**:
   - Soft delete → `PATCH /api/admin/banners/[id]` with `isActive: false`
   - Hard delete → `DELETE /api/admin/banners/[id]` (requires double confirm)
4. **Confirm** → API call → Toast success → List refreshes

### 7.2 Keyboard
- **Escape**: Close modal
- **Tab**: Trap focus within modal
- **Enter**: Confirm (on focused button)

---

## 8. Public Carousel — Keyboard Navigation

### 8.1 Focus Order
```
1. Carousel region (Tab enters)
2. Pause/Play button
3. Previous arrow
4. Next arrow
5. Pagination dots (roving tabindex)
6. Slide link (if current slide has link)
7. Exit carousel (Tab continues)
```

### 8.2 Roving Tabindex (Pagination)
- Only active dot in tab order (`tabindex="0"`)
- Others `tabindex="-1"`
- Arrow keys move `tabindex="0"` + activate

### 8.3 Screen Reader Announcements
- **Slide change**: `aria-live="polite"` on pause button announces "Slide X of Y: [alt text]"
- **Auto-play pause**: "Auto-play paused" (on hover/focus)
- **Auto-play resume**: "Auto-play resumed" (after 3s delay)

---

## 9. Responsive Behavior

### 9.1 Breakpoint Transitions
| From → To | Behavior |
|-----------|----------|
| Desktop → Tablet | Arrows move inside, peek reduces |
| Tablet → Mobile | Arrows hide, dots center, swipe primary |
| Mobile → Tablet | Arrows show, peek enables |

### 9.2 Orientation Change
- Recalculate Swiper on `resize` event
- Maintain current slide index
- Preserve auto-play state

---

## 10. Loading & Error States

### 10.1 Carousel Loading
1. **Initial**: Skeleton (shimmer) in 16:9 container
2. **First slide loaded**: Image fades in (cross-fade from skeleton)
3. **Subsequent slides**: Lazy load on demand

### 10.2 Carousel Error
- **All slides fail**: Render fallback static hero
- **Single slide fail**: Show placeholder, continue with others
- **Network error**: Retry button on fallback

### 10.3 Admin Loading
- **List**: Skeleton rows (3–5)
- **Form submit**: Button disabled + spinner
- **Image upload**: Progress bar on drop zone

---

## 11. Analytics Events

### 11.1 Click Tracking (US3.1)
```javascript
// On banner link click
navigator.sendBeacon('/api/banners/[id]/click', JSON.stringify({
  bannerId: id,
  timestamp: Date.now(),
  referrer: document.referrer
}));

// Also push to Vercel Analytics
if (window.va) {
  window.va('event', 'banner_click', { banner_id: id });
}
```

### 11.2 Carousel Interactions (Optional)
- `carousel_slide_change`: { slideIndex, direction }
- `carousel_pause`: { trigger: 'hover' | 'focus' | 'button' }
- `carousel_navigate`: { method: 'arrow' | 'dot' | 'swipe' | 'keyboard' }

---

## 12. Performance Budgets (from NFR-1)

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP impact | < 100ms vs static hero | Lighthouse |
| JS bundle (carousel) | < 50KB gzipped | webpack-bundle-analyzer |
| First slide priority | `priority` + `fetchpriority="high"` | DevTools Network |
| CLS | 0 | Lighthouse |
| ISR revalidation | ≤ 60s | Vercel analytics |

---

## 13. Edge Cases

| Scenario | Handling |
|----------|----------|
| Single banner | No auto-play, no pagination, arrows hidden |
| No active banners | Fallback static hero (US4.1 AC4.1.3) |
| Image load fails | Placeholder + retry, no layout shift |
| Rapid navigation | Swiper handles queue, no double-fire |
| Tab away during auto-play | Page Visibility API pauses auto-play |
| Return to tab | Auto-play resumes after 3s |
| Admin reorder during public view | ISR updates within 60s, no flash |

---

*Generated for Refined Mockups stage — single-stage run*