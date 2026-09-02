import './styles/globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sole & Strand — Curated Footwear & Accessories',
  description: 'Sneakers, boots, bags, and accessories. Seasonal drops, restocked classics, and the deals worth catching.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <header className="sticky top-0 z-40 bg-chalk/95 backdrop-blur supports-[backdrop-filter]:bg-chalk/80 border-b border-pearl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-ink" aria-label="Sole & Strand home">
                SOLE & STRAND
              </Link>
              <nav className="flex items-center gap-4" aria-label="Primary actions">
                <Link href="/products" className="text-sm font-medium text-stone hover:text-ink transition-colors">
                  Shop
                </Link>
                <Link href="/cart" className="relative text-sm font-medium text-stone hover:text-ink transition-colors" aria-label="Cart, 0 items">
                  Cart
                  <span className="absolute -top-1.5 -right-5 font-mono text-xs text-rose bg-rose-soft px-1.5 py-0.5 rounded">0</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-ink text-chalk" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <p className="font-display font-bold text-lg tracking-tight mb-4">SOLE & STRAND</p>
                <p className="text-stone text-sm leading-relaxed max-w-xs">
                  Curated footwear & accessories since 2024. Seasonal drops, restocked classics, and the deals worth catching.
                </p>
              </div>
              <nav aria-label="Shop">
                <h3 className="font-mono uppercase tracking-widest text-xs text-pearl mb-3">Shop</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/products?category=sneakers" className="hover:text-rose transition-colors">New Arrivals</Link></li>
                  <li><Link href="/products?sort=bestselling" className="hover:text-rose transition-colors">Best Sellers</Link></li>
                  <li><Link href="/products?sort=deal" className="hover:text-rose transition-colors">Sale</Link></li>
                  <li><Link href="/products?category=sneakers" className="hover:text-rose transition-colors">Sneakers</Link></li>
                  <li><Link href="/products?category=boots" className="hover:text-rose transition-colors">Boots</Link></li>
                  <li><Link href="/products?category=bags" className="hover:text-rose transition-colors">Bags & Backpacks</Link></li>
                </ul>
              </nav>
              <nav aria-label="Support">
                <h3 className="font-mono uppercase tracking-widest text-xs text-pearl mb-3">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/shipping" className="hover:text-rose transition-colors">Shipping</Link></li>
                  <li><Link href="/returns" className="hover:text-rose transition-colors">Returns</Link></li>
                  <li><Link href="/contact" className="hover:text-rose transition-colors">Contact</Link></li>
                  <li><Link href="/faq" className="hover:text-rose transition-colors">FAQ</Link></li>
                </ul>
              </nav>
              <nav aria-label="Company">
                <h3 className="font-mono uppercase tracking-widest text-xs text-pearl mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="hover:text-rose transition-colors">About</Link></li>
                  <li><Link href="/careers" className="hover:text-rose transition-colors">Careers</Link></li>
                  <li><Link href="/press" className="hover:text-rose transition-colors">Press</Link></li>
                  <li><Link href="/sustainability" className="hover:text-rose transition-colors">Sustainability</Link></li>
                </ul>
              </nav>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-stone text-sm">© 2025 Sole & Strand. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-stone hover:text-rose transition-colors" aria-label="Instagram">IG</a>
                <a href="#" className="text-stone hover:text-rose transition-colors" aria-label="Twitter">X</a>
                <a href="#" className="text-stone hover:text-rose transition-colors" aria-label="Discord">DC</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}