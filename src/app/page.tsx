import Link from 'next/link'
import { Metadata } from 'next'
import ProductCard from '@/app/components/ProductCard'

export const metadata: Metadata = {
  title: 'Sole & Strand — Curated Footwear & Accessories',
  description: 'Sneakers, boots, bags, and accessories. Seasonal drops, restocked classics, and the deals worth catching.',
}

const highlights = [
  { label: 'Best Seller', href: '/products?sort=bestselling', active: true },
  { label: 'New Arrival', href: '/products?sort=newest', active: false },
  { label: 'Best Deals', href: '/products?sort=deal', active: false },
  { label: 'Sneakers', href: '/products?category=sneakers', active: false },
  { label: 'Boots', href: '/products?category=boots', active: false },
  { label: 'Bags', href: '/products?category=bags', active: false },
  { label: 'Hats', href: '/products?category=hats', active: false },
  { label: 'Backpacks', href: '/products?category=backpacks', active: false },
]

const categories = [
  { name: 'SNEAKERS', slug: 'sneakers', bg: 'bg-chalk' },
  { name: 'BOOTS', slug: 'boots', bg: 'bg-[var(--rose-soft)]' },
  { name: 'BAGS & BACKPACKS', slug: 'bags', bg: 'bg-chalk' },
]

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

function getDropTag(product: any) {
  if (product.isBestseller) return { label: 'BEST', variant: 'rose' }
  if (product.isNewArrival) return { label: 'FW25 ↓', variant: 'rose' }
  if (product.isDeal) return { label: 'DEAL', variant: 'ink' }
  if (product.isRestock) return { label: 'RESTOCK', variant: 'stone' }
  return { label: 'ARCHIVE', variant: 'pearl' }
}

function DropTag({ label, variant }: { label: string; variant: string }) {
  const variants = {
    rose: 'bg-rose text-chalk',
    ink: 'bg-ink text-chalk',
    stone: 'bg-stone text-chalk',
    pearl: 'bg-pearl text-ink',
  }
  return (
    <span className={`font-mono font-medium text-xs px-2 py-1 rounded ${variants[variant as keyof typeof variants]}`}>
      {label}
    </span>
  )
}

export default async function Home() {
  const products = await getProducts()

  const featured = products.slice(0, 3)
  const categoryProducts = {
    sneakers: products.filter((p: any) => p.category?.toLowerCase() === 'sneakers').slice(0, 8),
    boots: products.filter((p: any) => p.category?.toLowerCase() === 'boots').slice(0, 8),
    bags: products.filter((p: any) => p.category?.toLowerCase() === 'bags' || p.category?.toLowerCase() === 'backpacks').slice(0, 8),
  }

  return (
    <>
      {/* Banner / Hero */}
      <section className="relative bg-[var(--rose-soft)] overflow-hidden" aria-labelledby="hero-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <h1 id="hero-title" className="font-display font-extrabold tracking-tight text-ink text-balance leading-[1.05] clamp-text-4xl-5xl">
              NEW SEASON DROP
            </h1>
            <p className="mt-6 text-lg text-stone max-w-md font-medium">
              The silhouettes that define spring. Updated classics and new profiles in leather, mesh, and technical knits.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products?sort=newest"
                className="inline-flex items-center justify-center px-6 py-3 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose"
              >
                Shop the Drop
              </Link>
              <Link
                href="/products?sort=bestselling"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-ink text-ink font-medium text-sm rounded transition-colors hover:bg-ink hover:text-chalk focus-visible:outline-rose"
              >
                Best Sellers
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose/30 to-transparent" aria-hidden="true" />
      </section>

      {/* Highlights Bar */}
      <nav className="bg-chalk border-b border-pearl sticky top-16 z-30" aria-label="Product highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4" role="list">
            {highlights.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-mono font-medium text-xs whitespace-nowrap px-4 py-2 rounded-full transition-all ${
                  item.active
                    ? 'bg-ink text-chalk shadow-[0_4px_12px_rgba(10,10,11,0.15)]'
                    : 'text-stone hover:text-ink hover:bg-pearl'
                }`}
                role="listitem"
                aria-current={item.active ? 'true' : 'false'}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Featured Edit */}
      <section className="bg-chalk py-16 lg:py-24" aria-labelledby="featured-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <h2 id="featured-title" className="font-display font-bold text-2xl lg:text-3xl tracking-tight text-ink">
              FEATURED THIS WEEK
            </h2>
            <Link
              href="/products"
              className="font-mono text-sm text-stone hover:text-ink transition-colors flex items-center gap-1"
            >
              View All
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {featured.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hero product - spans 2 cols on lg */}
              <article className="lg:col-span-2 relative group">
                <Link href={`/products/${featured[0].slug}`} className="block relative aspect-[4/3] overflow-hidden bg-pearl">
                  {featured[0].image ? (
                    <img
                      src={featured[0].image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone">No Image</div>
                  )}
                  <div className="absolute top-4 left-4">
                    <DropTag {...getDropTag(featured[0])} />
                  </div>
                </Link>
                <div className="mt-4">
                  <h3 className="font-display font-bold text-xl tracking-tight text-ink group-hover:text-rose transition-colors">
                    <Link href={`/products/${featured[0].slug}`}>{featured[0].name}</Link>
                  </h3>
                  <p className="font-mono font-medium text-base text-rose mt-1">
                    ${featured[0].variants?.[0]?.price || '—'}
                  </p>
                </div>
              </article>

              {/* Secondary cards */}
              {featured.slice(1).map((product: any, idx: number) => (
                <article key={product.id} className="relative group">
                  <Link href={`/products/${product.slug}`} className="block aspect-square overflow-hidden bg-pearl">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone">No Image</div>
                    )}
                    <div className="absolute top-3 left-3">
                      <DropTag {...getDropTag(product)} />
                    </div>
                  </Link>
                  <div className="mt-3">
                    <h3 className="font-medium text-sm text-ink group-hover:text-rose transition-colors line-clamp-1">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="font-mono font-medium text-sm text-rose mt-0.5">
                      ${product.variants?.[0]?.price || '—'}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Strips */}
      {categories.map((cat) => (
        <section key={cat.slug} className={`${cat.bg} py-12 lg:py-16`} aria-labelledby={`${cat.slug}-title`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <h2 id={`${cat.slug}-title`} className="font-display font-bold text-xl lg:text-2xl tracking-tight text-ink">
                {cat.name}
              </h2>
              <Link
                href={`/products?category=${cat.slug}`}
                className="font-mono text-sm text-stone hover:text-ink transition-colors flex items-center gap-1"
              >
                View All
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {categoryProducts[cat.slug as keyof typeof categoryProducts]?.length > 0 && (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-snap-x pb-4 -mx-4 px-4">
                {categoryProducts[cat.slug as keyof typeof categoryProducts]!.map((product: any) => (
                  <article
                    key={product.id}
                    className="flex-shrink-0 w-64 sm:w-72 scroll-snap-start"
                  >
                    <Link href={`/products/${product.slug}`} className="block aspect-square overflow-hidden bg-pearl rounded">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone">No Image</div>
                      )}
                      <div className="absolute top-2 left-2">
                        <DropTag {...getDropTag(product)} />
                      </div>
                    </Link>
                    <div className="mt-3 text-left">
                      <h3 className="font-medium text-sm text-ink hover:text-rose transition-colors line-clamp-1">
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <p className="font-mono font-medium text-sm text-rose mt-0.5">
                        ${product.variants?.[0]?.price || '—'}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Fallback if no products */}
      {products.length === 0 && (
        <section className="py-24 text-center">
          <p className="text-stone">No products yet. Add some via the admin panel.</p>
        </section>
      )}
    </>
  )
}

// Helper for fluid type clamp
// Using inline styles for clamp since Tailwind doesn't have it by default
function clampText4xl5xl({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      lineHeight: '1.05'
    }}>
      {children}
    </span>
  )
}