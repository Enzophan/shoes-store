"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

interface Banner {
  id: string
  imageUrl: string
  linkUrl: string
  displayOrder: number
  isActive: boolean
}

interface BannerFormValues {
  imageUrl: string
  linkUrl: string
  displayOrder: number
  isActive: boolean
}

export default function AddBanner({ editingBanner, onSubmit, onCancel }: { editingBanner: Banner | null; onSubmit: (data: BannerFormValues) => void; onCancel: () => void }) {
  const router = useRouter()
  // const [formValues, setFormValues] = useState<BannerFormValues>({
  //   imageUrl: '',
  //   linkUrl: '',
  //   displayOrder: 0,
  //   isActive: true,
  // })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const imageUrl = formData.get('imageUrl') as string
    const linkUrl = formData.get('linkUrl') as string
    const displayOrder = formData.get('displayOrder') as string
    const isActive = formData.get('isActive') === 'on'

    const bannerData: BannerFormValues = {
      imageUrl,
      linkUrl,
      displayOrder: displayOrder !== '' ? Number(displayOrder) : 0,
      isActive,
    }
    onSubmit(bannerData)

    // Submit to API
    // const response = await fetch('/api/banners', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     imageUrl,
    //     linkUrl,
    //     displayOrder: displayOrder !== '' ? Number(displayOrder) : 0,
    //     isActive,
    //   }),
    // })

    // console.log('response:', response) // Debugging log

    // if (!response.ok) {
    //   const errorData = await response.json()
    //   alert('Failed to add banner: ' + (errorData.error || 'Unknown error'))
    //   return
    // }

    // const createdBanner = await response.json()
    // console.log('Created banner:', createdBanner) // Debugging log
    router.push('/admin/banners')
    // router.refresh()
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

        <div className="bg-chalk p-6 border border-pearl rounded mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-stone mb-2 displayOrder" />
              <input
                name="imageUrl"
                type="text"
                className="w-full p-3 border border-pearl rounded focus-outline"
                placeholder="Image URL"
                defaultValue={''}
                required
              />
            </div>

            <div>
              <label className="block text-stone mb-2 linkUrl" />
              <input
                name="linkUrl"
                type="text"
                className="w-full p-3 border border-pearl rounded focus-outline"
                placeholder="Link URL"
                defaultValue={''}
                required
              />
            </div>

            <div>
              <label className="block text-stone mb-2 displayOrder" />
              <input
                name="displayOrder"
                type="number"
                className="w-full p-3 border border-pearl rounded focus-outline"
                placeholder="Display order (numeric)"
                defaultValue={''}
                required
              />
            </div>

            <div>
              <label className="block text-stone mb-2 isActive" />
              <div className="flex items-center gap-2">
                <input
                  name="isActive"
                  type="checkbox"
                  defaultChecked={true}
                  className="w-4 h-4 rounded border focus-outline"
                />
                <span className="text-stone">Active</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-rose text-chalk px-4 py-2 rounded hover:bg-rose/90 transition-colors"
              >
                <strong>+</strong> Add Banner
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-pearl text-ink px-4 py-2 rounded hover:bg-pearl/90 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}