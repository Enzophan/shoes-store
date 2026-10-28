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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validates the payload used to create a variant.
 * Used by POST /api/admin/variants and the admin EditVariant form.
 */
export function validateVariantInput(input: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, errors: ['variant must be an object'] }
  }

  if (typeof input.productId !== 'number' || !Number.isInteger(input.productId) || input.productId <= 0) {
    errors.push('productId must be a positive integer')
  }
  if (!isNonEmptyString(input.sku)) errors.push('sku is required')
  if (!isNonEmptyString(input.color)) errors.push('color is required')
  if (!isNonEmptyString(input.size)) errors.push('size is required')
  if (typeof input.price !== 'number' || !Number.isFinite(input.price) || input.price <= 0) {
    errors.push('price must be a number greater than 0')
  }
  if (typeof input.inventory !== 'number' || !Number.isInteger(input.inventory) || input.inventory < 0) {
    errors.push('inventory must be a non-negative integer')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validates a partial variant update. Every field is optional, but at least
 * one editable field must be present.
 * Used by PATCH /api/admin/variants/[id] and per-row saves in the admin form.
 */
export function validateVariantPatch(input: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, errors: ['variant must be an object'] }
  }

  const editableFields = ['sku', 'color', 'size', 'price', 'inventory'] as const
  const presentFields = editableFields.filter((field) => field in input)

  if (presentFields.length === 0) {
    return { valid: false, errors: ['at least one field is required'] }
  }

  if ('sku' in input && !isNonEmptyString(input.sku)) errors.push('sku must be a non-empty string')
  if ('color' in input && !isNonEmptyString(input.color)) errors.push('color must be a non-empty string')
  if ('size' in input && !isNonEmptyString(input.size)) errors.push('size must be a non-empty string')
  if ('price' in input && (typeof input.price !== 'number' || !Number.isFinite(input.price) || input.price <= 0)) {
    errors.push('price must be a number greater than 0')
  }
  if (
    'inventory' in input &&
    (typeof input.inventory !== 'number' || !Number.isInteger(input.inventory) || input.inventory < 0)
  ) {
    errors.push('inventory must be a non-negative integer')
  }

  return { valid: errors.length === 0, errors }
}
