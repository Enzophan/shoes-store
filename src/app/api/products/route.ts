import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.product.findMany({
    include: { variants: true }
  })
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      category: body.category,
      variants: {
        create: body.variants
      }
    },
    include: { variants: true }
  })
  return NextResponse.json(product)
}
