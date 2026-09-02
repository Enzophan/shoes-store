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
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <div className="mt-4">
        <EditProduct product={product} />
      </div>
    </main>
  )
}
