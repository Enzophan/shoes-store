"use client"
import React, { useState } from 'react'

interface Variant {
  id: number
  sku: string
  color: string
  size: string
  price: number
  inventory: number
}

interface ProductFormValues {
  name: string
  description: string
  category: string
  imageUrl: string
}

export default function EditProduct({ product }: { product: any }) {
  const [variants, setVariants] = useState(product.variants || [])
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Product detail state
  const [name, setName] = useState(product.name || '')
  const [description, setDescription] = useState(product.description || '')
  const [category, setCategory] = useState(product.category || '')
  const [imageUrl, setImageUrl] = useState(product.image || '')

  async function updateInventory(variantId: number, inventory: number) {
    try {
      const res = await fetch(`/api/admin/variants/${variantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Update failed')
      setVariants((v:any[]) => v.map((x:any) => x.id === variantId ? { ...x, inventory: data.inventory } : x))
      setMessage('Inventory updated')
    } catch (err:any) {
      setMessage(err.message || 'Error')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Update product
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description: description || null,
          category,
          image: imageUrl || null
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update product')
      setMessage('Product updated successfully')
    } catch (err:any) {
      setMessage(err.message || 'Error updating product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6">Edit Product</h2>

      {/* Product Details Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
          <label htmlFor="name" className="block font-medium text-sm text-ink mb-2">Name</label>
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

        <div>
          <label htmlFor="description" className="block font-medium text-sm text-ink mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors resize-y"
            placeholder="Product description..."
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium text-sm text-ink mb-2">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        <div>
          <label htmlFor="imageUrl" className="block font-medium text-sm text-ink mb-2">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl || ''}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="e.g., https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors"
          />
          <p className="font-mono text-xs text-stone">Optional. Image display on product page and home page.</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-1 inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>

      {/* Variants Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">SKU</th>
              <th className="p-2">Color</th>
              <th className="p-2">Size</th>
              <th className="p-2">Price</th>
              <th className="p-2">Inventory</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v:any) => (
              <tr key={v.id} className="border-t">
                <td className="p-2">{v.sku}</td>
                <td className="p-2">{v.color}</td>
                <td className="p-2">{v.size}</td>
                <td className="p-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={v.price}
                    onChange={(e) => setVariants(variants.map((x:any) => x.id === v.id ? { ...x, price: Number(e.target.value) } : x))}
                    className="w-24 p-1 border rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    min={0}
                    defaultValue={v.inventory}
                    id={`inv-${v.id}`} 
                    className="w-24 p-1 border rounded"
                  />
                </td>
                <td className="p-2">
                  <button onClick={() => {
                    const el = document.getElementById(`inv-${v.id}`) as HTMLInputElement | null
                    const val = el ? Number(el.value) : v.inventory
                    updateInventory(v.id, val)
                  }} className="px-3 py-1 bg-blue-600 text-white rounded">Save Inventory</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
