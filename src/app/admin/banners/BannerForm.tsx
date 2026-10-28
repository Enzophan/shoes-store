"use client"

import React, { useState } from 'react'

export interface Banner {
  id: string
  imageUrl: string
  linkUrl: string
  displayOrder: number
  isActive: boolean
}

export interface BannerFormValues {
  imageUrl: string
  linkUrl: string
  displayOrder: number
  isActive: boolean
}

interface BannerFormProps {
  editingBanner?: Banner | null
  onSubmit: (data: BannerFormValues) => Promise<void> | void
  onCancel?: () => void
}

export default function BannerForm({ editingBanner = null, onSubmit, onCancel }: BannerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const imageUrl = (formData.get('imageUrl') as string) || ''
    const linkUrl = (formData.get('linkUrl') as string) || ''
    const displayOrder = formData.get('displayOrder') as string
    const isActive = formData.get('isActive') === 'on'

    const bannerData: BannerFormValues = {
      imageUrl,
      linkUrl,
      displayOrder: displayOrder !== '' ? Number(displayOrder) : 0,
      isActive,
    }

    setError(null)
    setIsSubmitting(true)
    try {
      await onSubmit(bannerData)
    } catch (err: any) {
      setError(err?.message || 'Failed to save banner')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-chalk p-6 border border-pearl rounded mb-6">
      <h2 className="font-display font-bold text-lg text-ink mb-4">
        {editingBanner ? 'Edit Banner' : 'Add New Banner'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="imageUrl" className="block text-stone mb-2">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            className="w-full p-3 border border-pearl rounded focus-outline"
            placeholder="Image URL"
            defaultValue={editingBanner?.imageUrl ?? ''}
            required
          />
        </div>

        <div>
          <label htmlFor="linkUrl" className="block text-stone mb-2">Link URL</label>
          <input
            id="linkUrl"
            name="linkUrl"
            type="text"
            className="w-full p-3 border border-pearl rounded focus-outline"
            placeholder="Link URL"
            defaultValue={editingBanner?.linkUrl ?? ''}
            required
          />
        </div>

        <div>
          <label htmlFor="displayOrder" className="block text-stone mb-2">Display Order</label>
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            className="w-full p-3 border border-pearl rounded focus-outline"
            placeholder="Display order (numeric)"
            defaultValue={editingBanner?.displayOrder?.toString() ?? ''}
            required
          />
        </div>

        <div>
          <label htmlFor="isActive" className="block text-stone mb-2">Status</label>
          <div className="flex items-center gap-2">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              defaultChecked={editingBanner?.isActive ?? true}
              className="w-4 h-4 rounded border focus-outline"
            />
            <span className="text-stone">Active</span>
          </div>
        </div>

        {error && (
          <p className="p-3 bg-rose-soft border border-rose text-rose rounded text-sm" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose text-chalk px-4 py-2 rounded hover:bg-rose/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : editingBanner ? 'Update Banner' : 'Add Banner'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-pearl text-ink px-4 py-2 rounded hover:bg-pearl/90 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
