import React from 'react'
import { PrismaClient } from '@prisma/client'
import ProductDetail from './ProductDetail'

const prisma = new PrismaClient()

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { variants: true } })
  if (!product) return <div className="p-8">Product not found</div>

  return (
    <main className="p-8">
      <ProductDetail product={product} />
    </main>
  )
}
