import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (req: NextRequest) => {
  const banners = await prisma.banner.findMany({
    orderBy: { displayOrder: 'asc' },
  })
  return new Response(JSON.stringify(banners), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const newBanner = await prisma.banner.create({
    data: {
      imageUrl: body.imageUrl,
      linkUrl: body.linkUrl,
      displayOrder: body.displayOrder ?? 0,
      isActive: body.isActive ?? true,
    },
  })
  return new Response(JSON.stringify(newBanner), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (id) {
    await prisma.banner.delete({
      where: { id },
    })
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}