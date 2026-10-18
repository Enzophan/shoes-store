import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const url = new URL(request.url)
  const pathname = url.pathname // /api/products/1

  // Extract product ID from path: /api/products/1 -> '1'
  const pathParts = pathname.split('/').filter(Boolean)
  const idIndex = pathParts.indexOf('products')
  const productId = idIndex >= 0 && idIndex + 1 < pathParts.length ? pathParts[idIndex + 1] : null

  if (productId) {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { variants: true }
    })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json(product)
  }

  // If no ID in path, return all products
  const products = await prisma.product.findMany({
    include: { variants: true }
  })
  return NextResponse.json(products)
}

export async function PUT(request: Request) {
  const url = new URL(request.url)
  const pathname = url.pathname // /api/products/1

  // Extract product ID from path: /api/products/1 -> '1'
  const pathParts = pathname.split('/').filter(Boolean)
  const idIndex = pathParts.indexOf('products')
  const productId = idIndex >= 0 && idIndex + 1 < pathParts.length ? pathParts[idIndex + 1] : null

  if (!productId) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
  }

  const body = await request.json()
  const { name, description, category, image } = body

  const product = await prisma.product.update({
    where: { id: Number(productId) },
    data: {
      name,
      description: description || null,
      category,
      image: image || null
    },
    include: { variants: true }
  })
  return NextResponse.json(product)
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const pathname = url.pathname // /api/products/1

  // Extract product ID from path: /api/products/1 -> '1'
  const pathParts = pathname.split('/').filter(Boolean)
  const idIndex = pathParts.indexOf('products')
  const productId = idIndex >= 0 && idIndex + 1 < pathParts.length ? pathParts[idIndex + 1] : null

  if (!productId) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
  }

  await prisma.product.delete({
    where: { id: Number(productId) }
  })
  return NextResponse.json({ success: true })
}