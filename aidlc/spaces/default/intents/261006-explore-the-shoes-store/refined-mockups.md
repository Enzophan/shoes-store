# Refined Mockups — Homepage Banner Slider

## Banner Slider Component Mockup

The banner slider is displayed prominently on the homepage above the product grid. It features:

- **Slider container**: Full-width responsive carousel with dot navigation
- **Transition**: Automatic 10-second interval fade transition between banners
- **Pause on hover**: Automatic transition pauses when user hovers over slider
- **Manual navigation**: Left/right arrows for manual navigation
- **Loop**: Slider loops continuously from last banner to first

### Banner Theme Structure

Each banner theme contains:
- **Image**: Full-width hero image (aspect ratio 16:9 recommended)
- **Link URL**: Destination URL when banner is clicked (optional)
- **Display order**: Numeric ordering determining slide sequence
- **Active status**: Toggle to enable/disable banner without deleting

### Slider Behavior

| Interaction | Behavior |
|-------------|----------|
| Auto-transition | Advances every 10 seconds |
| Hover pause | Transition pauses on mouse enter, resumes on mouse leave |
| Left arrow | Goes to previous banner, loops from first to last |
| Right arrow | Goes to next banner, loops from last to first |
| Manual click | Resets the auto-transition timer |
| Touch swipe | Swipe left/right on mobile navigates slides |

### Responsive Breakpoints

| Screen Width | Visible Banners | Slider Behavior |
|--------------|----------------|-----------------|
| < 640px (mobile) | 1 banner full-width | Full-width slider, hide navigation arrows, enable swipe |
| 640px - 1024px (tablet) | 1-2 banners | Single visible, expand on interaction |
| > 1024px (desktop) | 3 banners | Three banners side-by-side with scroll arrows |

### Admin Banner Management Interface

The admin interface includes:

1. **Banner List Table**
   - Image preview (thumbnail)
   - Link URL
   - Display order
   - Active/inactive toggle
   - Action buttons (edit, delete, reorder)

2. **Create/Edit Banner Form**
   - Image upload with preview
   - Link URL input
   - Display order numeric input
   - Active status checkbox
   - Cancel/Save buttons

3. **Reorder Interface**
   - Drag-and-drop to reorder banners
   - Visual reordering with numbered positions

### Component Placement

The banner slider component is placed in `src/app/components/BannerSlider.tsx` and integrated into the homepage at `src/app/page.tsx` above the product grid section.

### Accessibility Requirements

- Arrow buttons have `aria-label` describing navigation direction
- Dot navigation has `aria-current` attribute for current slide
- Image alt text required for each banner theme
- Keyboard navigation supported (left/right arrows focusable)
- Pause/play button accessible via keyboard

### Error States

- **No banners configured**: Display placeholder "No banners configured" message with call-to-action to add banners from admin
- **Image load failure**: Show fallback placeholder with "Image unavailable" text
- **Invalid link URL**: Display warning but still show the banner image