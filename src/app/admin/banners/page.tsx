import React, { useState, useEffect } from 'react'
import { useNavigate } from 'next/navigation'
import { useForm } from 'react-hook-form'
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

export default function AdminBanners() {
  const navigate = useNavigate()
  const [banners, setBanners] = useState<Banner[]>([])
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Fetch banners from API or use local state
  useEffect(() => {
    // In a real implementation, this would fetch from an API endpoint
    // const fetchBanners = async () => {
    //   const response = await fetch('/api/banners')
    //   const data = await response.json()
    //   setBanners(data)
    // }
    // fetchBanners()
  }, [navigate])

  const { register, handleSubmit, reset } = useForm<BannerFormValues>()

  const onSubmit = async (data: BannerFormValues) => {
    const newBanner: Banner = {
      id: editingBanner?.id || uuidv4(),
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl,
      displayOrder: data.displayOrder,
      isActive: data.isActive,
    }

    if (editingBanner) {
      // Update existing banner
      setBanners(
        banners.map((banner) => (banner.id === editingBanner.id ? newBanner : banner))
      )
    } else {
      // Add new banner
      setBanners([...banners, newBanner])
    }

    reset()
    setShowForm(false)
    setEditingBanner(null)
  }

  const deleteBanner = (bannerId: string) => {
    setBanners(banners.filter((banner) => banner.id !== bannerId))
  }

  const startEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">
            Banner Management
          </h1>
          <p className="mt-3 text-stone">
            Manage homepage rotating banners and themes.
          </p>
        </header>

        {/* Add Banner Form */}
        {showForm && (
          <div className="bg-chalk p-6 border border-pearl rounded mb-6">
            <h2 className="font-display font-bold text-lg text-ink mb-4">
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-stone mb-2 displayOrder" />
                <input
                  ...register({
                    required: 'Image URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL',
                    },
                  })
                  className="w-full p-3 border border-pearl rounded focus-outline"
                  placeholder="Image URL"
                  defaultValue={editingBanner?.imageUrl || ''}
                />
              </div>

              <div>
                <label className="block text-stone mb-2 linkUrl" />
                <input
                  ...register({
                    required: 'Link URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL',
                    },
                  })
                  className="w-full p-3 border border-pearl rounded focus-outline"
                  placeholder="Link URL"
                  defaultValue={editingBanner?.linkUrl || ''}
                />
              </div>

              <div>
                <label className="block text-stone mb-2 displayOrder" />
                <input
                  ...register({ required: 'Display order is required' })
                  type="number"
                  className="w-full p-3 border border-pearl rounded focus-outline"
                  placeholder="Display order (numeric)"
                  defaultValue={editingBanner?.displayOrder?.toString() || ''}
                />
              </div>

              <div>
                <label className="block text-stone mb-2 isActive" />
                <div className="flex items-center gap-2">
                  <input
                    ...register({ required: 'Status is required' })
                    type="checkbox"
                    defaultChecked={editingBanner?.isActive ?? true}
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
                  {editingBanner ? 'Update Banner' : 'Add Banner'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset()
                    setShowForm(false)
                    setEditingBanner(null)
                  }}
                  className="bg-pearl text-ink px-4 py-2 rounded hover:bg-pearl/90 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Banner List Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-border rounded-lg">
            <thead>
              <tr className="border-b border-pearl">
                <th className="text-left p-3 text-stone font-medium text-sm">Image</th>
                <th className="text-left p-3 text-stone font-medium text-sm">Link</th>
                <th className="text-left p-3 text-stone font-medium text-sm">Order</th>
                <th className="text-left p-3 text-stone font-medium text-sm">Status</th>
                <th className="text-left p-3 text-stone font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-stone">
                    No banners configured. <a
                      href="/admin/banners/add"
                      className="text-rose hover:text-rose/90 transition-colors"
                    >
                      Add first banner
                    </a>
                  </td>
                </tr>
              )}
              {banners.map((banner) => (
                <tr key={banner.id} className="border-b border-pearl/50">
                  <td className="p-3">
                    <img
                      src={banner.imageUrl}
                      alt="Banner preview"
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">
                    <a
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose hover:text-rose/90 transition-colors text-sm"
                    >
                      {banner.linkUrl.length > 50
                        ? `${banner.linkUrl.substring(0, 50)}...`
                        : banner.linkUrl}
                    </a>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-sm text-stone">
                      {banner.displayOrder}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={banner.isActive
                        ? 'bg-rose text-chalk px-2 py-1 rounded text-xs'
                        : 'bg-stone text-ink px-2 py-1 rounded text-xs'}
                    >
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(banner)}
                        className="text-stone hover:text-rose/90 transition-colors text-sm"
                        aria-label="Edit banner"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="text-rose/50 hover:text-rose transition-colors text-sm"
                        aria-label="Delete banner"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}