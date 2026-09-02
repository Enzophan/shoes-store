"use client"
import React, { useState } from 'react'

export default function EditProduct({ product }: { product: any }) {
  const [variants, setVariants] = useState(product.variants || [])
  const [message, setMessage] = useState<string | null>(null)

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
      setMessage('Updated')
    } catch (err:any) {
      setMessage(err.message || 'Error')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <div className="mt-4">
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
                <td className="p-2">${v.price}</td>
                <td className="p-2">
                  <input type="number" defaultValue={v.inventory} min={0} id={`inv-${v.id}`} className="w-24 p-1 border rounded" />
                </td>
                <td className="p-2">
                  <button onClick={() => {
                    const el = document.getElementById(`inv-${v.id}`) as HTMLInputElement | null
                    const val = el ? Number(el.value) : v.inventory
                    updateInventory(v.id, val)
                  }} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-sm text-gray-600">{message}</div>
    </div>
  )
}
