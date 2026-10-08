"use client"

import React, { useState, useEffect } from 'react'

interface Banner {
  id: string
  imageUrl: string
  linkUrl?: string
  displayOrder: number
  isActive: boolean
}

interface BannerSliderProps {
  banners: Banner[]
  transitionInterval?: number
  autoPlay?: boolean
}

const DEFAULT_TRANSITION_INTERVAL = 10000 // 10 seconds

export function BannerSlider({ banners, transitionInterval = DEFAULT_TRANSITION_INTERVAL, autoPlay = true }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)

  useEffect(() => {
    if (!autoPlay || isPaused) return
    const intervalId = setInterval(() => {
      setCurrentIndex((idx) => {
        if (idx >= banners.length - 1) return 0
        return idx + 1
      })
    }, transitionInterval)

    return () => clearInterval(intervalId)
  }, [banners, transitionInterval, isPaused, autoPlay])

  const handleArrowClick = (direction: 'prev' | 'next') => {
    setCurrentIndex((idx) => {
      if (direction === 'next') {
        if (idx >= banners.length - 1) return 0
        return idx + 1
      } else {
        if (idx <= 0) return banners.length - 1
        return idx - 1
      }
    })
    // Reset auto-play timer on manual navigation
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    setIsPaused(true)
    setIsPaused(false)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const banner = banners[currentIndex]

  if (banners.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-stone text-lg bg-pearl/50">
        <p>No banners configured</p>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-[400px] overflow-hidden rounded-lg shadow-lg bg-pearl/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {banner && (
        <a
          href={banner.linkUrl || '#'}
          className="block w-full h-full"
          target={banner.linkUrl ? '_blank' : undefined}
          rel={banner.linkUrl ? 'noopener noreferrer' : undefined}
        >
          <img
            src={banner.imageUrl}
            alt={`Banner ${banner.displayOrder}: ${banner.linkUrl ? 'linked' : 'promotional'} content`}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
        </a>
      )}

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white/100 focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-2"
        onClick={() => handleArrowClick('prev')}
        aria-label="Previous banner"
        disabled={banners.length <= 1}
      >
        <svg className="w-5 h-5 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path className="arrow" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white/100 focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-2"
        onClick={() => handleArrowClick('next')}
        aria-label="Next banner"
        disabled={banners.length <= 1}
      >
        <svg className="w-5 h-5 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path className="arrow" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={`rounded-full w-3 h-3 bg-stone/30 ${
              index === currentIndex ? 'bg-rose' : 'bg-stone/50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-current={index === currentIndex ? 'step' : undefined}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerSlider