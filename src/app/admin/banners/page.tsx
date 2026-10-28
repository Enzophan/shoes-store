"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import BannerForm from './BannerForm';

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
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Fetch banners from API or use local state
  useEffect(() => {
    // In a real implementation, this would fetch from an API endpoint
    const fetchBanners = async () => {
      const response = await fetch('/api/banners')
      const data = await response.json()
      setBanners(data)
    }
    fetchBanners()
  }, [])

  const handleSubmit = async (data: BannerFormValues) => {
    if (editingBanner) {
      // Update existing banner
      const updatedBanner: Banner = {
        ...editingBanner,
        ...data,
      }
      setBanners(
        banners.map((banner) => (banner.id === editingBanner.id ? updatedBanner : banner))
      )
    } else {
      // Add new banner
      const newBanner: Banner = {
        id: crypto.randomUUID(),
        ...data,
      }
      setBanners([...banners, newBanner]);
      // Submit to API
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBanner),
      });
      if (!response.ok) {
        const errorData = await response.json()
        alert('Failed to add banner: ' + (errorData.error || 'Unknown error'))
        return
      }
    }
    setShowForm(false)
    setEditingBanner(null)
  }
  // const onSubmit = (event: React.FormEvent) => {
  //   event.preventDefault()
  //   const formData = new FormData(event.target as HTMLFormElement)
  //   const imageUrl = formData.get('imageUrl') as string | undefined
  //   const linkUrl = formData.get('linkUrl') as string | undefined
  //   const displayOrder = formData.get('displayOrder') as string | undefined
  //   const isActive = formData.get('isActive') === 'on'

  //   const newBanner: Banner = {
  //     id: editingBanner?.id || crypto.randomUUID(),
  //     imageUrl: imageUrl ? imageUrl : (editingBanner?.imageUrl || ''),
  //     linkUrl: linkUrl ? linkUrl : (editingBanner?.linkUrl || ''),
  //     displayOrder: displayOrder ? Number(displayOrder) : (editingBanner?.displayOrder || 0),
  //     isActive: isActive ?? editingBanner?.isActive ?? true,
  //   }

  //   if (editingBanner) {
  //     // Update existing banner
  //     setBanners(
  //       banners.map((banner) => (banner.id === editingBanner.id ? newBanner : banner))
  //     )
  //   } else {
  //     // Add new banner
  //     setBanners([...banners, newBanner])
  //   }

  //   setShowForm(false)
  //   setEditingBanner(null)
  // }

  const deleteBanner = async (bannerId: string) => {
    const response = await fetch(`/api/banners?id=${bannerId}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    if (data.success) {
      setBanners(banners.filter((banner) => banner.id !== bannerId))
    }
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
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setShowForm(true)}
              className="bg-rose text-chalk px-4 py-2 rounded hover:bg-rose/90 transition-colors text-sm"
            >
              <strong>+</strong> Add New Banner
            </button>
          </div>
        </header>

        {/* Add Banner Form */}
        {showForm &&
          <BannerForm
            key={editingBanner?.id ?? 'new'}
            editingBanner={editingBanner}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingBanner(null)
            }}
          />
        }

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
                    No banners configured.
                    {/* <a
                      href="/admin/banners/add"
                      className="text-rose hover:text-rose/90 transition-colors"
                    >
                      Add first banner
                    </a> */}
                    <Link
                      href="/admin/banners/add"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose"
                    >
                      + Add banner
                    </Link>
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