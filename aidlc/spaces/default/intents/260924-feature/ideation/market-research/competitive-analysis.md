# Competitive Analysis — Homepage Banner Management

## Market Landscape

### Competitor Categories

| Category | Examples | Strengths | Weaknesses | Pricing |
|----------|----------|-----------|------------|---------|
| **E-commerce Platform Native** | Shopify themes, BigCommerce banners | No extra cost, native integration, zero maintenance | Limited customization, platform lock-in | Included in platform |
| **WordPress Plugins** | Slider Revolution, Smart Slider 3, MetaSlider | Feature-rich, visual builders, many templates | Performance overhead, subscription model | $29-99/year |
| **SaaS Banner Tools** | Bannerbear, OptinMonster, ConvertFlow | Advanced targeting, A/B testing, analytics | Monthly recurring cost, vendor lock-in | $19-99/month |
| **Open-Source Libraries** | Swiper.js, Embla Carousel, Slick | Free, full control, lightweight | Requires dev effort, no admin UI | Free (dev time) |
| **React Component Libraries** | react-slick, swiper/react, embrace-carousel | TypeScript support, React-native, maintained | Learning curve, bundle size | Free |

### Competitive Positioning

Our feature targets the **Build** approach using React libraries (Q5: B, Q6: A), integrating with our existing Next.js stack. This avoids SaaS recurring costs while leveraging proven carousel libraries rather than building from scratch.

## Key Differentiators to Consider

1. **Admin UI for non-technical users** — Competitors like Shopify provide this natively; we need a lightweight admin interface
2. **Scheduling & targeting** — SaaS tools offer this as differentiator (Q4: D); MVP may defer
3. **Analytics dashboard** — SaaS includes this (Q4: E); could integrate with existing analytics
4. **Accessibility compliance** — Critical for all (Q3: A); must meet WCAG 2.1 for auto-rotation