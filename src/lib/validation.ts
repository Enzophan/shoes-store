export type CartItem = { variantId: number; quantity: number }

export function validateCartItems(items: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!Array.isArray(items)) {
    return { valid: false, errors: ['items must be an array'] }
  }
  if (items.length === 0) return { valid: true, errors: [] }

  for (let idx = 0; idx < items.length; idx++) {
    const it = items[idx]
    if (typeof it.variantId !== 'number' || !Number.isInteger(it.variantId) || it.variantId <= 0) {
      errors.push(`items[${idx}].variantId must be a positive integer`)
    }
    if (typeof it.quantity !== 'number' || !Number.isInteger(it.quantity) || it.quantity <= 0) {
      errors.push(`items[${idx}].quantity must be a positive integer`)
    }
  }

  return { valid: errors.length === 0, errors }
}

export function validateEmail(email?: string): boolean {
  if (!email) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validateShippingAddress(addr: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!addr) return { valid: false, errors: ['address required'] }
  if (!addr.fullName) errors.push('fullName required')
  if (!addr.line1) errors.push('line1 required')
  if (!addr.city) errors.push('city required')
  if (!addr.postalCode) errors.push('postalCode required')
  if (!addr.country) errors.push('country required')
  return { valid: errors.length === 0, errors }
}
