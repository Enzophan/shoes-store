"use client"

import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { validateVariantInput, validateVariantPatch } from '@/lib/validation'

interface Variant {
    id?: number
    sku: string
    color: string
    size: string
    price: number
    inventory: number
}

interface VariantRow extends Variant {
    clientKey: string
    isNew: boolean
}

interface RowStatus {
    saving?: boolean
    deleting?: boolean
    error?: string
}

const EditVariant = ({ productId, initialVariants }: { productId: number; initialVariants: Variant[] }) => {
    const router = useRouter()
    const nextKey = useRef(0)

    const [variants, setVariants] = useState<VariantRow[]>(() =>
        initialVariants.map((variant) => ({
            ...variant,
            clientKey: `existing-${variant.id}`,
            isNew: false,
        }))
    )
    const [status, setStatus] = useState<Record<string, RowStatus>>({})
    const [message, setMessage] = useState<string | null>(null)

    const setRowStatus = (clientKey: string, patch: RowStatus) => {
        setStatus((prev) => ({ ...prev, [clientKey]: { ...prev[clientKey], ...patch } }))
    }

    const makeEmptyRow = (): VariantRow => ({
        clientKey: `new-${nextKey.current++}`,
        isNew: true,
        sku: '',
        color: '',
        size: '',
        price: 0,
        inventory: 0,
    })

    const addVariant = () => {
        if (variants.some((variant) => variant.isNew)) {
            setMessage('Save the new variant before adding another')
            return
        }
        setMessage(null)
        setVariants((prev) => [...prev, makeEmptyRow()])
    }

    const handleChange = (clientKey: string, field: keyof Variant, value: string | number) => {
        setVariants((prev) =>
            prev.map((variant) =>
                variant.clientKey === clientKey ? { ...variant, [field]: value } : variant
            )
        )
    }

    const saveVariant = async (variant: VariantRow) => {
        const payload = {
            sku: variant.sku.trim(),
            color: variant.color.trim(),
            size: variant.size.trim(),
            price: Number(variant.price),
            inventory: Number(variant.inventory),
        }

        const validation = variant.isNew
            ? validateVariantInput({ productId, ...payload })
            : validateVariantPatch(payload)
        if (!validation.valid) {
            setRowStatus(variant.clientKey, { error: validation.errors[0] })
            return
        }

        setMessage(null)
        setRowStatus(variant.clientKey, { saving: true, error: undefined })

        try {
            const res = await fetch(
                variant.isNew ? '/api/admin/variants' : `/api/admin/variants/${variant.id}`,
                {
                    method: variant.isNew ? 'POST' : 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(variant.isNew ? { productId, ...payload } : payload),
                }
            )
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.error || 'Update failed')

            setVariants((prev) =>
                prev.map((row) =>
                    row.clientKey === variant.clientKey
                        ? {
                            ...row,
                            id: data.id,
                            sku: data.sku,
                            color: data.color,
                            size: data.size,
                            price: data.price,
                            inventory: data.inventory,
                            isNew: false,
                        }
                        : row
                )
            )
            setStatus((prev) => ({ ...prev, [variant.clientKey]: {} }))
            setMessage(variant.isNew ? 'Variant created' : 'Variant updated')
            router.refresh()
        } catch (err: any) {
            setRowStatus(variant.clientKey, { error: err.message || 'Update failed' })
        } finally {
            setRowStatus(variant.clientKey, { saving: false })
        }
    }

    const removeVariant = async (variant: VariantRow) => {
        if (variants.length <= 1) return

        if (variant.isNew) {
            setVariants((prev) => prev.filter((row) => row.clientKey !== variant.clientKey))
            setStatus((prev) => {
                const next = { ...prev }
                delete next[variant.clientKey]
                return next
            })
            return
        }

        if (!window.confirm(`Remove variant ${variant.sku}?`)) return

        setMessage(null)
        setRowStatus(variant.clientKey, { deleting: true, error: undefined })

        try {
            const res = await fetch(`/api/admin/variants/${variant.id}`, { method: 'DELETE' })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.error || 'Delete failed')

            setVariants((prev) => prev.filter((row) => row.clientKey !== variant.clientKey))
            setStatus((prev) => {
                const next = { ...prev }
                delete next[variant.clientKey]
                return next
            })
            setMessage('Variant deleted')
            router.refresh()
        } catch (err: any) {
            setRowStatus(variant.clientKey, { error: err.message || 'Delete failed' })
        } finally {
            setRowStatus(variant.clientKey, { deleting: false })
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-ink">Variants</h2>
                <button
                    type="button"
                    onClick={addVariant}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink text-chalk font-medium text-sm rounded transition-colors hover:bg-stone focus-visible:outline-rose"
                >
                    + Add Variant
                </button>
            </div>

            {message && (
                <p className="mt-3 font-mono text-sm text-stone" role="status" aria-live="polite">
                    {message}
                </p>
            )}

            <div className="space-y-4 mt-4">
                {variants.map((variant, index) => {
                    const rowStatus = status[variant.clientKey] || {}
                    const isBusy = Boolean(rowStatus.saving || rowStatus.deleting)

                    return (
                        <div key={variant.clientKey} className="p-4 border border-pearl rounded-lg bg-white space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-sm text-stone">
                                    Variant {index + 1}
                                    {variant.isNew && ' (unsaved)'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => saveVariant(variant)}
                                        disabled={isBusy}
                                        className="border-gray-300 text-stone hover:text-rose transition-colors font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Save variant"
                                    >
                                        {rowStatus.saving ? 'Saving...' : 'Save'}
                                    </button>
                                    {variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(variant)}
                                            disabled={isBusy}
                                            className="border-red-300 text-stone hover:text-rose transition-colors font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Remove variant"
                                        >
                                            {rowStatus.deleting ? 'Removing...' : 'Remove'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {rowStatus.error && (
                                <p className="font-mono text-sm text-rose" role="alert">
                                    {rowStatus.error}
                                </p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor={`sku-${variant.clientKey}`} className="block font-medium text-sm text-ink">SKU</label>
                                    <input
                                        id={`sku-${variant.clientKey}`}
                                        type="text"
                                        value={variant.sku}
                                        onChange={(e) => handleChange(variant.clientKey, 'sku', e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                        placeholder="e.g., AM90-BLK-10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor={`color-${variant.clientKey}`} className="block font-medium text-sm text-ink">Color</label>
                                    <input
                                        id={`color-${variant.clientKey}`}
                                        type="text"
                                        value={variant.color}
                                        onChange={(e) => handleChange(variant.clientKey, 'color', e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors"
                                        placeholder="e.g., Black"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor={`size-${variant.clientKey}`} className="block font-medium text-sm text-ink">Size</label>
                                    <input
                                        id={`size-${variant.clientKey}`}
                                        type="text"
                                        value={variant.size}
                                        onChange={(e) => handleChange(variant.clientKey, 'size', e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                        placeholder="e.g., 10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor={`price-${variant.clientKey}`} className="block font-medium text-sm text-ink">Price</label>
                                    <input
                                        id={`price-${variant.clientKey}`}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={variant.price}
                                        onChange={(e) => handleChange(variant.clientKey, 'price', Number(e.target.value))}
                                        required
                                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                        placeholder="120.00"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor={`inventory-${variant.clientKey}`} className="block font-medium text-sm text-ink">Inventory</label>
                                    <input
                                        id={`inventory-${variant.clientKey}`}
                                        type="number"
                                        min="0"
                                        value={variant.inventory}
                                        onChange={(e) => handleChange(variant.clientKey, 'inventory', Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                        placeholder="50"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default EditVariant
