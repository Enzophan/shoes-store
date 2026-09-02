"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function ProductDetail({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const colors = Array.from(new Set(product.variants.map((v: any) => v.color)))
  const sizes = Array.from(new Set(product.variants.map((v: any) => v.size)))

  function findVariant() {
    return product.variants.find((v: any) => v.color === selectedColor && v.size === selectedSize)
  }

  function addToCart() {
    const variant = findVariant()
    if (!variant) {
      setMessage({ type: 'error', text: 'Please select color and size' })
      return
    }
    if (variant.inventory < quantity) {
      setMessage({ type: 'error', text: 'Not enough inventory' })
      return
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((i: any) => i.variantId === variant.id)
    if (existing) existing.quantity += quantity
    else cart.push({ variantId: variant.id, quantity, productName: product.name, color: variant.color, size: variant.size, price: variant.price })
    localStorage.setItem('cart', JSON.stringify(cart))
    setMessage({ type: 'success', text: 'Added to cart' })
  }

  const variant = findVariant()
  const price = variant?.price || product.variants[0]?.price

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <Link href="/products" className="inline-flex items-center gap-1 font-mono text-xs text-stone hover:text-ink mb-8 transition-colors">
        <span aria-hidden="true">←</span> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square bg-pearl overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone">No Image</div>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p className="font-mono uppercase tracking-widest text-xs text-pearl mb-2">{product.category}</p>
          <h1 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight text-ink mb-4">{product.name}</h1>
          <p className="font-mono font-medium text-2xl text-rose mb-6">${price}</p>

          <div className="prose max-w-none text-stone mb-8">
            {product.description ? (
              <p className="leading-relaxed">{product.description}</p>
            ) : (
              <p className="leading-relaxed">No description available.</p>
            )}
          </div>

          <div className="space-y-6 border-t border-pearl pt-6">
            <fieldset>
              <legend className="font-mono uppercase tracking-widest text-xs text-pearl mb-3 block">Color</legend>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Color options">
                {colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setSelectedSize(null); setMessage(null); }}
                    className={`font-mono text-sm px-4 py-2 rounded border-2 transition-all ${
                      selectedColor === color ? 'bg-ink text-chalk border-ink' : 'bg-chalk text-ink border-pearl hover:border-ink'
                    }`}
                    role="radio"
                    aria-checked={selectedColor === color}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-mono uppercase tracking-widest text-xs text-pearl mb-3 block">Size</legend>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size options">
                {sizes.map((size: string) => {
                  const variantForSize = product.variants.find((v: any) => v.color === selectedColor && v.size === size)
                  const disabled = !variantForSize || variantForSize.inventory === 0
                  return (
                    <button
                      key={size}
                      onClick={() => { if (!disabled) { setSelectedSize(size); setMessage(null); } }}
                      disabled={disabled}
                      className={`font-mono text-sm px-4 py-2 rounded border-2 transition-all ${
                        selectedSize === size ? 'bg-ink text-chalk border-ink' : disabled ? 'bg-pearl text-stone border-pearl line-through cursor-not-allowed' : 'bg-chalk text-ink border-pearl hover:border-ink'
                      }`}
                      role="radio"
                      aria-checked={selectedSize === size}
                      aria-disabled={disabled}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="quantity" className="font-mono uppercase tracking-widest text-xs text-pearl block mb-2">Quantity</label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={variant?.inventory || 99}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-24 px-3 py-2 border border-pearl rounded bg-chalk text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose/20"
                aria-label="Quantity"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={addToCart}
                disabled={!variant}
                className="w-full sm:w-auto flex-1 px-6 py-3 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose disabled:bg-pearl disabled:text-stone disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              {message && (
                <p className={`font-mono text-sm flex items-center gap-1 ${message.type === 'success' ? 'text-rose' : 'text-stone'}`}>
                  {message.type === 'success' && <span aria-hidden="true">✓</span>}
                  {message.text}
                </p>
              )}
            </div>

            <div className="border-t border-pearl pt-4 space-y-2 text-sm text-stone">
              <p><span className="font-mono text-pearl">SKU:</span> {variant?.sku || product.variants[0]?.sku}</p>
              <p><span className="font-mono text-pearl">In Stock:</span> {variant?.inventory ?? product.variants.reduce((a: number, v: any) => a + v.inventory, 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}