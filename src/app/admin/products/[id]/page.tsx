import Link from 'next/link'
import React from 'react'
import { PrismaClient } from '@prisma/client'
import EditProduct from './EditProduct'

const prisma = new PrismaClient()

export default async function AdminEditPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const product = await prisma.product.findUnique({ where: { id }, include: { variants: true } })
  if (!product) return <div className="p-8">Product not found</div>

  return (
    <main className="p-8">
      <nav className="mb-6">
        <Link
          href="/admin/products"
          className="font-mono text-sm text-stone hover:text-ink transition-colors"
        >
          ← Back to Products List
        </Link>
      </nav>

      <div className="mt-4">
        <EditProduct product={product} />
      </div>
    </main>
  )
}
