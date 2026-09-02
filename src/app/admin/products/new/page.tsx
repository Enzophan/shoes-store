"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Variant {
  sku: string
  color: string
  size: string
  price: number
  inventory: number
}

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [variants, setVariants] = useState<Variant[]>([{ sku: '', color: '', size: '', price: 0, inventory: 0 }])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function addVariant() {
    setVariants([...variants, { sku: '', color: '', size: '', price: 0, inventory: 0 }])
  }

  function removeVariant(index: number) {
    if (variants.length <= 1) return
    setVariants(variants.filter((_, i) => i !== index))
  }

  function updateVariant(index: number, field: keyof Variant, value: string | number) {
    setVariants(variants.map((v, i) => i === index ? { ...v, [field]: value } : v))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const validVariants = variants.filter(v => v.sku && v.color && v.size && v.price > 0)
    if (validVariants.length === 0) {
      setError('At least one complete variant is required')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          description: description || null,
          category,
          variants: validVariants
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create product')
      router.push(`/admin/products/${data.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Error creating product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">New Product</h1>
          <p className="mt-3 text-stone">Add a new product to the catalog</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <section className="space-y-6">
            <h2 className="font-display font-bold text-xl text-ink">Product Details</h2>

            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium text-sm text-ink">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors"
                placeholder="e.g., Air Max 90"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block font-medium text-sm text-ink">Slug</label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                required
                className="w-full px-4 py-3 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                placeholder="e.g., air-max-90"
              />
              <p className="font-mono text-xs text-stone">Unique URL identifier (auto-generated from name)</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block font-medium text-sm text-ink">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-3 border border-pearl bg-white text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors"
              >
                <option value="">Select category</option>
                <option value="running">Running</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="basketball">Basketball</option>
                <option value="training">Training</option>
                <option value="jordan">Jordan</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block font-medium text-sm text-ink">Description (optional)</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors resize-y"
                placeholder="Product description..."
              />
            </div>
          </section>

          <section className="space-y-6 border-t border-pearl pt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-ink">Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose"
              >
                + Add Variant
              </button>
            </div>

            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="p-4 border border-pearl rounded-lg bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-stone">Variant {index + 1}</span>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-stone hover:text-rose transition-colors font-mono text-sm"
                        aria-label="Remove variant"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <label htmlFor={`sku-${index}`} className="block font-medium text-sm text-ink">SKU</label>
                      <input
                        id={`sku-${index}`}
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                        placeholder="e.g., AM90-BLK-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={`color-${index}`} className="block font-medium text-sm text-ink">Color</label>
                      <input
                        id={`color-${index}`}
                        type="text"
                        value={variant.color}
                        onChange={(e) => updateVariant(index, 'color', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors"
                        placeholder="e.g., Black"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={`size-${index}`} className="block font-medium text-sm text-ink">Size</label>
                      <input
                        id={`size-${index}`}
                        type="text"
                        value={variant.size}
                        onChange={(e) => updateVariant(index, 'size', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                        placeholder="e.g., 10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={`price-${index}`} className="block font-medium text-sm text-ink">Price</label>
                      <input
                        id={`price-${index}`}
                        type="number"
                        step="0.01"
                        min="0"
                        value={variant.price}
                        onChange={(e) => updateVariant(index, 'price', Number(e.target.value))}
                        required
                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                        placeholder="120.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={`inventory-${index}`} className="block font-medium text-sm text-ink">Inventory</label>
                      <input
                        id={`inventory-${index}`}
                        type="number"
                        min="0"
                        value={variant.inventory}
                        onChange={(e) => updateVariant(index, 'inventory', Number(e.target.value))}
                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                        placeholder="50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {variants.length === 0 && (
              <p className="text-center text-stone py-8">No variants added yet. Click "Add Variant" to start.</p>
            )}
          </section>

          {error && (
            <div className="p-4 bg-rose-soft border border-rose text-rose rounded-lg text-sm" role="alert">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-4 border-t border-pearl pt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 text-sm font-medium text-ink hover:text-rose transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}