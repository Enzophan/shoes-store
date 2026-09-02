"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CartItem = { variantId: number; quantity: number; productName?: string; color?: string; size?: string; price?: number }

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState({ fullName: '', line1: '', city: '', postalCode: '', country: '' })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const total = cart.reduce((s, it) => s + ((it.price || 0) * it.quantity), 0)

  async function checkoutCOD() {
    if (cart.length === 0) return setMessage({ type: 'error', text: 'Cart is empty' })
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((c) => ({ variantId: c.variantId, quantity: c.quantity })),
          user: { email, name },
          shippingAddress: address
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order failed')
      localStorage.removeItem('cart')
      setCart([])
      const orderId = data.id || data.orderNumber
      router.push(`/order/${orderId}`)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Checkout error' })
    }
  }

  function updateQuantity(variantId: number, quantity: number) {
    if (quantity < 1) return
    setCart(prev => prev.map(item => item.variantId === variantId ? { ...item, quantity } : item))
  }

  function removeItem(variantId: number) {
    setCart(prev => prev.filter(item => item.variantId !== variantId))
  }

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">YOUR CART</h1>
          <p className="mt-3 text-stone">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
        </header>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone mb-6">Your cart is empty.</p>
            <Link href="/products" className="inline-flex items-center gap-1 font-mono text-sm text-ink hover:text-rose transition-colors">
              Continue Shopping
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item, index) => (
                <article key={index} className="flex gap-4 bg-chalk p-4 relative">
                  <div className="w-24 h-24 flex-shrink-0 bg-pearl rounded overflow-hidden relative">
                    <div className="absolute top-2 left-2 font-mono text-[10px] bg-ink text-chalk px-1.5 py-0.5 rounded">{item.color}</div>
                    <div className="w-full h-full flex items-center justify-center text-stone text-xs">No Image</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-ink truncate">{item.productName}</h3>
                    <p className="font-mono text-xs text-stone mt-0.5">{item.color} / {item.size}</p>
                    <p className="font-mono font-medium text-sm text-rose mt-1">${item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 border border-pearl rounded">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-ink hover:bg-pearl disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="font-mono text-sm text-ink w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="px-2 py-1 text-ink hover:bg-pearl"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                    <p className="font-mono font-medium text-sm text-rose">${(item.price || 0) * item.quantity}</p>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="font-mono text-xs text-stone hover:text-rose transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <section aria-labelledby="shipping-heading">
                  <h2 id="shipping-heading" className="font-display font-bold text-lg tracking-tight text-ink mb-4">SHIPPING ADDRESS</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Full Name</span>
                      <input
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Full name"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Email</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Email"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Address Line 1</span>
                      <input
                        value={address.line1}
                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Street address"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">City</span>
                      <input
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="City"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Postal Code</span>
                      <input
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Postal code"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Country</span>
                      <input
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Country"
                        required
                      />
                    </label>
                  </div>
                </section>

                <section aria-labelledby="contact-heading">
                  <h2 id="contact-heading" className="font-display font-bold text-lg tracking-tight text-ink mb-4">CONTACT (OPTIONAL)</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Name</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Name"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono uppercase tracking-widest text-xs text-pearl block mb-1">Phone</span>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                        placeholder="Phone"
                      />
                    </label>
                  </div>
                </section>
              </div>

              <aside className="bg-chalk p-6 rounded sticky top-24" aria-labelledby="summary-heading">
                <h2 id="summary-heading" className="font-display font-bold text-lg tracking-tight text-ink mb-4">ORDER SUMMARY</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-stone">Subtotal</dt>
                    <dd className="font-mono font-medium text-ink">${total.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">Shipping</dt>
                    <dd className="font-mono font-medium text-ink">Free</dd>
                  </div>
                  <div className="border-t border-pearl pt-3 flex justify-between">
                    <dt className="font-medium text-ink">Total</dt>
                    <dd className="font-mono font-medium text-lg text-rose">${total.toFixed(2)}</dd>
                  </div>
                </dl>
                <button
                  onClick={checkoutCOD}
                  disabled={!address.fullName || !address.line1 || !address.city || !address.postalCode || !address.country}
                  className="w-full mt-6 px-6 py-3 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose disabled:bg-pearl disabled:text-stone disabled:cursor-not-allowed"
                >
                  Checkout with COD
                </button>
                {message && (
                  <p className={`font-mono text-xs mt-3 flex items-center justify-center gap-1 ${
                    message.type === 'success' ? 'text-rose' : 'text-stone'
                  }`}>
                    {message.type === 'success' && <span aria-hidden="true">✓</span>}
                    {message.text}
                  </p>
                )}
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}