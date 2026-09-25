# Build vs. Buy Assessment — Homepage Banner Management

## Decision: **Build with Hybrid Approach** (Q6: A, Q5: B)

### Recommended Approach
**Build admin UI + Use proven React carousel library (Swiper/Embla)**

### Rationale

| Factor | Build (Custom) | Buy (SaaS) | Hybrid (Recommended) |
|--------|----------------|------------|----------------------|
| **Control** | Full | Limited | Full (admin + library choice) |
| **Time-to-Market** | 2-3 weeks | Days | 1-2 weeks |
| **Recurring Cost** | None | $19-99/mo | None |
| **Integration** | Native | API/iframe | Native Next.js |
| **Maintenance** | Internal | Vendor | Library updates only |
| **Customization** | Unlimited | Configurable | Unlimited |
| **Accessibility** | Our responsibility | Vendor | Our responsibility |

### Technology Choices (Q5: B)

**Carousel Library: Swiper.js (swiper/react)**
- Most popular, ~10M weekly downloads
- Touch/swipe, keyboard, RTL, virtual slides
- WCAG 2.1 compliant with proper config
- Tree-shakeable, ~35KB gzipped
- Active maintenance, TypeScript first-class

**Alternative: Embla Carousel**
- Lighter (~5KB), headless
- More custom implementation needed
- Excellent accessibility primitives

### Build Scope (Feature Scope Confirmed)

**In Scope (MVP):**
- Admin CRUD for banners (image, link, alt text, order)
- Swiper integration with 10s auto-play, pause on hover
- Responsive images (Next.js Image optimization)
- Accessibility: pause button, keyboard nav, ARIA
- Basic analytics: click tracking via existing event system

**Deferred (Post-MVP):**
- Scheduling (start/end dates)
- A/B testing framework
- Audience targeting
- Analytics dashboard
- Visual banner builder (drag-drop)

### Cost Estimate

| Component | Effort |
|-----------|--------|
| Admin API + UI | ~3-5 days |
| Carousel integration | ~1-2 days |
| Accessibility compliance | ~1-2 days |
| Testing (unit + e2e) | ~1-2 days |
| **Total** | **~6-11 days** |

vs. SaaS: $228-1,188/year ongoing