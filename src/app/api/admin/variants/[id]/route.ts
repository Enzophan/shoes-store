import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { validateVariantPatch } from '@/lib/validation'

const prisma = new PrismaClient()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid variant id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { valid, errors } = validateVariantPatch(body)
    if (!valid) return NextResponse.json({ error: errors[0], errors }, { status: 400 })

    const data: { sku?: string; color?: string; size?: string; price?: number; inventory?: number } = {}
    if ('sku' in body) data.sku = body.sku.trim()
    if ('color' in body) data.color = body.color.trim()
    if ('size' in body) data.size = body.size.trim()
    if ('price' in body) data.price = body.price
    if ('inventory' in body) data.inventory = body.inventory

    const updated = await prisma.variant.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ error: 'Variant not found' }, { status: 404 })
    }
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'SKU already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid variant id' }, { status: 400 })
  }

  try {
    const variant = await prisma.variant.findUnique({
      where: { id },
      include: { _count: { select: { orderItems: true } } }
    })
    if (!variant) {
      return NextResponse.json({ error: 'Variant not found' }, { status: 404 })
    }
    if (variant._count.orderItems > 0) {
      return NextResponse.json(
        { error: 'Cannot delete variant with existing orders' },
        { status: 409 }
      )
    }

    await prisma.variant.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ error: 'Variant not found' }, { status: 404 })
    }
    if (err?.code === 'P2003' || err?.code === 'P2014') {
      return NextResponse.json(
        { error: 'Cannot delete variant with existing orders' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
