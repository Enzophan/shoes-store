import React from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  image?: string
  variants: Array<{ id: string; color: string; size: string; price: number }>
  isBestseller?: boolean
  isNewArrival?: boolean
  isDeal?: boolean
  isRestock?: boolean
}

function getDropTag(product: Product) {
  if (product.isBestseller) return { label: 'BEST', variant: 'rose' }
  if (product.isNewArrival) return { label: 'FW25 ↓', variant: 'rose' }
  if (product.isDeal) return { label: 'DEAL', variant: 'ink' }
  if (product.isRestock) return { label: 'RESTOCK', variant: 'stone' }
  return { label: 'ARCHIVE', variant: 'pearl' }
}

function DropTag({ label, variant }: { label: string; variant: string }) {
  const variants = {
    rose: 'bg-rose text-chalk',
    ink: 'bg-ink text-chalk',
    stone: 'bg-stone text-chalk',
    pearl: 'bg-pearl text-ink',
  }
  return (
    <span className={`font-mono font-medium text-[11px] px-2 py-1 rounded ${variants[variant as keyof typeof variants]}`}>
      {label}
    </span>
  )
}

export default function ProductCard({ product }: { product: Product }) {
  const tag = getDropTag(product)
  const price = product.variants?.[0]?.price

  return (
    <article className="relative group bg-chalk">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-pearl" aria-label={`${product.name}, ${price ? `$${price}` : 'price unavailable'}`}>
        {product.image ? (
          <img
            src={product.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone text-sm">No Image</div>
        )}
        <div className="absolute top-2 left-2">
          <DropTag {...tag} />
        </div>
      </Link>
      <div className="p-4 pt-3">
        <p className="font-mono uppercase tracking-widest text-[10px] text-stone mb-1">{product.category}</p>
        <h3 className="font-medium text-sm text-ink group-hover:text-rose transition-colors line-clamp-1 mb-1">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="font-mono font-medium text-sm text-rose">
          ${price || '—'}
        </p>
      </div>
    </article>
  )
}