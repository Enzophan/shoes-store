# Market Trends — Homepage Banner/Rotating Carousel

## Industry Trends (Q3)

### Accessibility (Critical)
- **WCAG 2.1 AA** requires: pause/stop/hide mechanism for auto-updating content (>5 seconds)
- Auto-rotating banners must provide: pause on hover, keyboard controls, ARIA live regions
- Our 10-second cycle exceeds 5-second threshold — **pause control mandatory**

### Core Web Vitals Impact
- **CLS (Cumulative Layout Shift)**: Sliding animations can cause layout shifts if not reserved space
- **LCP (Largest Contentful Paint)**: Banner images often LCP candidate — optimize image delivery
- **INP (Interaction to Next Paint)**: Pause/navigation controls must respond <200ms

### Mobile-First Requirements
- Touch/swipe navigation expected on mobile
- Responsive images (srcset) for different viewports
- Reduced motion preference (prefers-reduced-motion) support

### Privacy & Personalization
- Cookie consent banners may conflict with marketing banners
- GDPR/CCPA: banner personalization requires consent
- First-party data preferred over third-party tracking

## Customer Expectations (Q4)

### Table-Stakes (Must Have)
- Multiple banners (3-10 per requirements)
- Auto-rotation with configurable interval (10s specified)
- Pause on hover/focus
- Mobile responsive (swipe, resize)
- Admin UI: add/edit/reorder/delete banners
- Link management (URL, target, tracking params)

### Differentiators (Nice to Have)
- A/B testing built-in
- Scheduling (start/end dates, timezone support)
- Audience targeting (geo, referral, customer segment)
- Analytics dashboard (impressions, CTR, conversions)

## Market Sizing (Q7)

**Target Audience:** All store visitors (homepage traffic)
- Primary: New visitors — first impression, promotion discovery
- Secondary: Returning customers — new promotions, seasonal campaigns
- Segments: Mobile (~60-70%), Desktop (~30-40%)
- Future: Geographic/locale segments for localized banners