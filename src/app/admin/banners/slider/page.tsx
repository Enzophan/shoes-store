"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BannerSlider from '../../../components/BannerSlider'

interface Banner {
  id: string
  imageUrl: string
  linkUrl?: string
  displayOrder: number
  isActive: boolean
}

export default function BannerSliderPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/banners')
      .then((res) => res.json())
      .then((data) => {
        setBanners(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch banners:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-stone">Loading banners...</p>
      </div>
    )
  }

  console.log('Fetched banners:', banners) // Debugging log

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto w-full">
          <BannerSlider
            banners={banners}
            transitionInterval={5000}
            autoPlay={true}
          />
        </div>
      </div>
    </div>
  )
}