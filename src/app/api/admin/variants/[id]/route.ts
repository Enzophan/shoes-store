import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const body = await request.json()
    if (typeof body.inventory !== 'number') return NextResponse.json({ error: 'inventory must be a number' }, { status: 400 })

    const updated = await prisma.variant.update({ where: { id }, data: { inventory: body.inventory } })
    return NextResponse.json({ id: updated.id, inventory: updated.inventory })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
