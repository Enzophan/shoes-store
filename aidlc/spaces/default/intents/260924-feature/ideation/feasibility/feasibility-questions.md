## Sources

- [desc] Initial description: "As an owner, I would like a homepage banner management feature that allows for the display of 3 to 10 rotating (sliding) topics, cycling every 10 seconds."
- [scope] Workflow-selected scope: `feature`.
- [Q1] We need to showcase multiple promotions/products on the homepage without cluttering the UI.
- [Q2] External customers visiting the homepage — they miss important promotions.
- [Q3] Increased click-through rate on banner links.
- [Q4] Current static banner limits marketing flexibility.
- [Q8] Feature scope is correct — this is a discrete feature for the homepage.
- [MR-Q1] Shopify themes with built-in banner sliders
- [MR-Q2] Shopify: native, no extra cost, limited customization
- [MR-Q3] Accessibility requirements (WCAG 2.1) for auto-rotating content
- [MR-Q4] Table-stakes: Multiple banners, auto-rotation, pause on hover, mobile responsive
- [MR-Q5] React libraries: react-slick, swiper/react, embrace-carousel
- [MR-Q6] Build: Full control, integrate with existing stack, one-time dev cost
- [MR-Q7] All store visitors (homepage traffic)

## Q1. What existing systems must this integrate with?

[Answer]:A

A. Next.js frontend (pages/app router)
B. Existing admin dashboard (if any) or new admin routes
C. Image storage (Next.js Image optimization / Cloudinary / S3)
D. Analytics/event tracking system (GA4, custom events)
E. Not yet defined
X. Other (please specify)

## Q2. Are there regulatory/compliance requirements (PCI, HIPAA, SOC2, data residency)?

[Answer]:A

A. No specific regulatory requirements for banner management
B. Standard e-commerce privacy (cookie consent for tracking)
C. Accessibility compliance (WCAG 2.1 AA) — mandatory per market research
D. Data residency: images served from CDN in same region
E. Not applicable
X. Other (please specify)

## Q3. What is the team's current tech stack and skill profile?

[Answer]:A

A. Next.js 14+ (App Router), React 18, TypeScript
B. Tailwind CSS for styling
C. Node.js backend (API routes or separate service)
D. PostgreSQL/Prisma or similar ORM
E. Team proficient in React, TypeScript, Next.js
F. Not yet defined
X. Other (please specify)

## Q4. What are the budget and timeline constraints?

[Answer]:

A. Timeline: 2-3 weeks for MVP (per build-vs-buy estimate)
B. Budget: Internal dev time only (no SaaS budget)
C. Sprint capacity: 1-2 developers
D. Must ship before next major campaign (seasonal deadline?)
E. Not yet defined
X. Other (please specify)

## Q5. Are there organizational blockers (change freeze, competing priorities)?

[Answer]:

A. No known blockers
B. Competing: checkout optimization sprint
C. Change freeze: none scheduled
D. Dependency: design system update in progress
E. Not yet defined
X. Other (please specify)

## Q6. What AWS services and accounts are currently in use?

[Answer]:

A. Hosting: Vercel (Next.js) — not AWS
B. CDN: Vercel Edge Network / Cloudflare
C. Image storage: Next.js Image (Vercel) or S3 + CloudFront
D. Database: Managed PostgreSQL (RDS/Neon/Supabase)
E. Analytics: GA4 + custom events
F. Not applicable / Not on AWS
X. Other (please specify)

## Q7. Technical feasibility concerns for the carousel implementation?

[Answer]:

A. Swiper.js integration with Next.js App Router (SSR/hydration)
B. Image optimization for 3-10 banners (CLS prevention)
C. Accessibility: pause button, keyboard nav, ARIA live regions
D. Touch/swipe on mobile, reduced-motion preference
E. State management for auto-play/pause across route changes
F. Not yet defined
X. Other (please specify)

## Q8. Does the build-vs-buy decision (hybrid: Swiper + custom admin) remain viable?

[Answer]:

A. Yes, Swiper is well-maintained and Next.js compatible
B. Admin UI can leverage existing component library
C. Image upload: integrate with existing file upload or add new
D. Risk: Swiper major version upgrade breaking changes
E. Not yet defined
X. Other (please specify)