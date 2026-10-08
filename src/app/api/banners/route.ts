import type { NextRequest } from 'next/server'

// In-memory storage for banners (replace with database in production)
const banners: Array<{
  id: string
  imageUrl: string
  linkUrl: string
  displayOrder: number
  isActive: boolean
}> = [
  {
    id: 'banner-1',
    imageUrl: '/placeholder-banner-1.jpg',
    linkUrl: 'https://example.com/collection/spring',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'banner-2',
    imageUrl: '/placeholder-banner-2.jpg',
    linkUrl: 'https://example.com/collection/summer',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'banner-3',
    imageUrl: '/placeholder-banner-3.jpg',
    linkUrl: 'https://example.com/collection/autumn',
    displayOrder: 3,
    isActive: true,
  },
]

export const GET = async (req: NextRequest) => {
  return new Response(JSON.stringify(banners), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const newBanner = {
    id: `banner-${Date.now()}`,
    imageUrl: body.imageUrl,
    linkUrl: body.linkUrl,
    displayOrder: body.displayOrder,
    isActive: body.isActive ?? true,
  }
  banners.push(newBanner)
  return new Response(JSON.stringify(newBanner), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (id) {
    const index = banners.findIndex((banner) => banner.id === id)
    if (index > -1) {
      banners.splice(index, 1)
    }
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}