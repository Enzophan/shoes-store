"use client"

import { useRouter } from 'next/navigation'
import BannerForm, { BannerFormValues } from '../BannerForm'

export default function AddBannerPage() {
  const router = useRouter()

  const handleCreate = async (data: BannerFormValues) => {
    const response = await fetch('/api/banners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(body.error || 'Failed to add banner')
    }

    router.push('/admin/banners')
    router.refresh()
  }

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">
            Add New Banner
          </h1>
          <p className="mt-3 text-stone">
            Create a new homepage rotating banner.
          </p>
        </header>

        <BannerForm
          onSubmit={handleCreate}
          onCancel={() => router.push('/admin/banners')}
        />
      </div>
    </div>
  )
}
