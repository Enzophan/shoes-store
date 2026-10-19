"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Variant {
    id?: number
    sku: string
    color: string
    size: string
    price: number
    inventory: number
}


const EditVariant = (props: { variants: Variant[] }) => {
    const [variants, setVariants] = useState<Variant[]>(props.variants);
    const [newVariant, setNewVariant] = useState<Variant>({ sku: '', color: '', size: '', price: 0, inventory: 0 });


    const addVariant = () => {
        if (variants.findIndex(v => v.id === undefined) === -1) {
            setVariants([...variants, { sku: '', color: '', size: '', price: 0, inventory: 0 }])
        }
    }

    const handleAddVariant = (index: number, field: keyof Variant, value: string | number) => {
        const updatedVariants = [...variants];
        updatedVariants[index] = { ...updatedVariants[index], [field]: value };
        setVariants(updatedVariants);
    };

    const handleDeleteVariant = (id: number) => {
        setVariants(variants.filter(variant => variant.id !== id));
    };



    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Edit Variant</h2>
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
            <div className="space-y-4">
                {variants.map((variant, index) => (
                    <div key={index} className="p-4 border border-pearl rounded-lg bg-white space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-stone">Variant {index + 1}</span>
                            {variants.length > 1 && (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { }}
                                        className="border-gray-300 text-stone hover:text-rose transition-colors font-mono text-sm"
                                        aria-label="Update variant"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteVariant(variant.id!)}
                                        className="border-red-300 text-stone hover:text-rose transition-colors font-mono text-sm"
                                        aria-label="Remove variant"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="space-y-2">
                                <label htmlFor={`sku-${index}`} className="block font-medium text-sm text-ink">SKU</label>
                                <input
                                    id={`sku-${index}`}
                                    type="text"
                                    value={variant.sku}
                                    onChange={(e) => handleAddVariant(index, 'sku', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                    placeholder="e.g., AM90-BLK-10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor={`color-${index}`} className="block font-medium text-sm text-ink">Color</label>
                                <input
                                    id={`color-${index}`}
                                    type="text"
                                    value={variant.color}
                                    onChange={(e) => handleAddVariant(index, 'color', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors"
                                    placeholder="e.g., Black"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor={`size-${index}`} className="block font-medium text-sm text-ink">Size</label>
                                <input
                                    id={`size-${index}`}
                                    type="text"
                                    value={variant.size}
                                    onChange={(e) => handleAddVariant(index, 'size', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                    placeholder="e.g., 10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor={`price-${index}`} className="block font-medium text-sm text-ink">Price</label>
                                <input
                                    id={`price-${index}`}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={variant.price}
                                    onChange={(e) => handleAddVariant(index, 'price', Number(e.target.value))}
                                    required
                                    className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                    placeholder="120.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor={`inventory-${index}`} className="block font-medium text-sm text-ink">Inventory</label>
                                <input
                                    id={`inventory-${index}`}
                                    type="number"
                                    min="0"
                                    value={variant.inventory}
                                    onChange={(e) => handleAddVariant(index, 'inventory', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-pearl bg-white text-ink placeholder-stone focus:border-ink focus:outline-none focus:ring-2 focus:ring-rose-soft transition-colors font-mono text-sm"
                                    placeholder="50"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default EditVariant