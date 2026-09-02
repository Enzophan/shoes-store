import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const items = body.items as Array<{ variantId: number; quantity: number }>
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const detailed = await Promise.all(
      items.map(async (it) => {
        const v = await prisma.variant.findUnique({ where: { id: it.variantId } })
        if (!v) return { variantId: it.variantId, available: false }
        return {
          variantId: it.variantId,
          quantity: it.quantity,
          price: v.price,
          inventory: v.inventory,
          available: v.inventory >= it.quantity
        }
      })
    )

    const total = detailed.reduce((s, d: any) => s + (d.price || 0) * (d.quantity || 0), 0)

    return NextResponse.json({ items: detailed, total })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ info: 'POST to validate cart items' })
}
