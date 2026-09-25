# Technology Stack — shoes-store

## Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ (App Router) | Full-stack React framework |
| React | 18 | UI library |
| TypeScript | 5.x | Type safety |

## Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.x | Utility-first CSS |
| PostCSS | 8.x | CSS processing |
| Autoprefixer | 10.x | Vendor prefixes |

## Database & ORM
| Technology | Version | Purpose |
|------------|---------|---------|
| PostgreSQL | 15+ | Primary database |
| Prisma | 5.x | Type-safe ORM |
| @prisma/client | 5.x | Generated client |

## Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| ESLint | 8.x | Linting |
| Prettier | 3.x | Formatting |
| Jest | 29.x | Testing (configured) |
| tsconfig.json | - | Strict TypeScript config |

## Deployment & Infrastructure
| Technology | Purpose |
|------------|---------|
| Vercel | Hosting, edge functions, image optimization |
| Neon / Supabase / RDS | Managed PostgreSQL |
| GitHub Actions | CI/CD (assumed) |

## Package.json Dependencies (Key)
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "@prisma/client": "5.x"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/react": "18.x",
    "@types/node": "20.x",
    "tailwindcss": "3.x",
    "postcss": "8.x",
    "autoprefixer": "10.x",
    "prisma": "5.x",
    "eslint": "8.x",
    "jest": "29.x"
  }
}
```

## For Banner Feature (Additions)
| Technology | Version | Purpose |
|------------|---------|---------|
| Swiper.js | 11.x | Carousel library (swiper/react) |
| @types/swiper | - | TypeScript types (built-in) |

## Browser Support
- Modern browsers (ES2020+)
- Mobile Safari, Chrome, Firefox, Edge
- No IE11 support

## Performance Budgets
- Next.js Image optimization (automatic)
- Vercel Edge Network (global CDN)
- Server Components (reduced client JS)
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms