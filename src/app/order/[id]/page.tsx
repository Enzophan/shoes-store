import React from 'react'

async function getOrder(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/orders/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)
  if (!order) return <div className="p-8">Order not found</div>

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Order Confirmation</h1>
      <p className="mt-2">Order: {order.orderNumber || order.id}</p>
      <p className="mt-2">Status: {order.status}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Items</h3>
        <ul>
          {order.items.map((it: any) => (
            <li key={it.id} className="py-2 border-b">
              <div>{it.variant?.sku || it.variantId} — {it.quantity} x ${it.price}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
