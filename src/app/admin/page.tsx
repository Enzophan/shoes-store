import Link from 'next/link'

export default function AdminHome() {
  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">ADMIN DASHBOARD</h1>
          <p className="mt-3 text-stone">Manage products, inventory, and orders.</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/admin/products"
            className="bg-chalk p-6 border border-pearl rounded transition-all hover:border-ink hover:shadow-lg"
          >
            <h2 className="font-display font-bold text-lg text-ink mb-2">Manage Products</h2>
            <p className="text-stone text-sm">Create, edit, and organize products and variants.</p>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-chalk p-6 border border-pearl rounded transition-all hover:border-ink hover:shadow-lg"
          >
            <h2 className="font-display font-bold text-lg text-ink mb-2">View Orders</h2>
            <p className="text-stone text-sm">Monitor and fulfill customer orders.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}