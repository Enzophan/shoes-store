import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  // support both numeric id and orderNumber
  let order
  if (/^\d+$/.test(id)) {
    order = await prisma.order.findUnique({ where: { id: Number(id) }, include: { items: { include: { variant: true } }, shippingAddress: true } })
  } else {
    order = await prisma.order.findUnique({ where: { orderNumber: id }, include: { items: { include: { variant: true } }, shippingAddress: true } })
  }

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  return NextResponse.json(order)
}
