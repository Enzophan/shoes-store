import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createOrder } from '../../../lib/orderService'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createOrder(prisma, body)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ info: 'POST to create order (COD supported)' })
}
