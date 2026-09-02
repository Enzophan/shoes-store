import Link from 'next/link'

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 lg:mb-14 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">PRODUCTS</h1>
            <p className="mt-3 text-stone">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose"
          >
            + New Product
          </Link>
        </header>

        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left" role="grid">
              <thead>
                <tr className="border-b border-pearl">
                  <th className="font-mono uppercase tracking-widest text-xs text-pearl py-3">Product</th>
                  <th className="font-mono uppercase tracking-widest text-xs text-pearl py-3">Category</th>
                  <th className="font-mono uppercase tracking-widest text-xs text-pearl py-3">Variants</th>
                  <th className="font-mono uppercase tracking-widest text-xs text-pearl py-3">Price Range</th>
                  <th className="font-mono uppercase tracking-widest text-xs text-pearl py-3 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => {
                  const prices = product.variants?.map((v: any) => v.price).filter(Boolean) || []
                  const minPrice = prices.length ? Math.min(...prices) : 0
                  const maxPrice = prices.length ? Math.max(...prices) : 0
                  return (
                    <tr key={product.id} className="border-b border-pearl/50 hover:bg-rose-soft/30 transition-colors">
                      <td className="py-4">
                        <div className="font-medium text-sm text-ink">{product.name}</div>
                        <div className="font-mono text-xs text-stone">{product.slug}</div>
                      </td>
                      <td className="py-4 font-mono text-sm text-stone capitalize">{product.category}</td>
                      <td className="py-4 font-mono text-sm text-stone">{product.variants?.length || 0}</td>
                      <td className="py-4 font-mono text-sm text-rose">
                        {minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} – $${maxPrice}`}
                      </td>
                      <td className="py-4 text-right pr-4">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-mono text-sm text-ink hover:text-rose transition-colors"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone mb-4">No products yet.</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1 font-mono text-sm text-ink hover:text-rose transition-colors"
            >
              Create your first product
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}