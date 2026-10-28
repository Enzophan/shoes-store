import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { validateVariantInput } from '@/lib/validation'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { valid, errors } = validateVariantInput(body)
    if (!valid) return NextResponse.json({ error: errors[0], errors }, { status: 400 })

    const product = await prisma.product.findUnique({ where: { id: body.productId } })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const variant = await prisma.variant.create({
      data: {
        sku: body.sku.trim(),
        color: body.color.trim(),
        size: body.size.trim(),
        price: body.price,
        inventory: body.inventory,
        productId: body.productId
      }
    })

    return NextResponse.json(variant, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'SKU already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
