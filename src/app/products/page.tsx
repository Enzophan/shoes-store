import ProductCard from '@/app/components/ProductCard'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products — Sole & Strand',
  description: 'Browse our full collection of sneakers, boots, bags, hats, and backpacks.',
}

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">
            ALL PRODUCTS
          </h1>
          <p className="mt-3 text-stone max-w-2xl">
            {products.length} items — sneakers, boots, bags, and accessories. Filter by category or sort by what matters.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 flex-shrink-0 hidden lg:block" aria-label="Filters">
            <nav>
              <h2 className="font-mono uppercase tracking-widest text-xs text-pearl mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-sm text-ink font-medium block py-1">All</Link>
                </li>
                <li>
                  <Link href="/products?category=sneakers" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Sneakers</Link>
                </li>
                <li>
                  <Link href="/products?category=boots" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Boots</Link>
                </li>
                <li>
                  <Link href="/products?category=bags" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Bags</Link>
                </li>
                <li>
                  <Link href="/products?category=backpacks" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Backpacks</Link>
                </li>
                <li>
                  <Link href="/products?category=hats" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Hats</Link>
                </li>
              </ul>
              <h2 className="font-mono uppercase tracking-widest text-xs text-pearl mt-8 mb-4">Sort</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/products?sort=newest" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Newest</Link>
                </li>
                <li>
                  <Link href="/products?sort=bestselling" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Best Selling</Link>
                </li>
                <li>
                  <Link href="/products?sort=price-asc" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Price: Low to High</Link>
                </li>
                <li>
                  <Link href="/products?sort=price-desc" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Price: High to Low</Link>
                </li>
                <li>
                  <Link href="/products?sort=deal" className="text-sm text-stone hover:text-ink block py-1 transition-colors">Best Deals</Link>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-stone">No products found.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}