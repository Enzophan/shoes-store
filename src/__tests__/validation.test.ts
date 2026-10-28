import {
  validateCartItems,
  validateEmail,
  validateShippingAddress,
  validateVariantInput,
  validateVariantPatch,
} from '../lib/validation'

describe('validateCartItems', () => {
  it('should return valid: true for valid cart items', () => {
    const result = validateCartItems([{ variantId: 1, quantity: 2 }])
    expect(result).toEqual({ valid: true, errors: [] })
  })

  it('should return valid: false and error for non-array input', () => {
    const result = validateCartItems('not an array' as any)
    expect(result).toEqual({ valid: false, errors: ['items must be an array'] })
  })

  it('should return valid: true and empty errors for empty array', () => {
    const result = validateCartItems([])
    expect(result).toEqual({ valid: true, errors: [] })
  })

  it('should return valid: false and error for invalid variantId', () => {
    const result = validateCartItems([{ variantId: -1, quantity: 1 }] as any)
    expect(result.errors).toContain('items[0].variantId must be a positive integer')
  })

  it('should return valid: false and error for invalid quantity', () => {
    const result = validateCartItems([{ variantId: 1, quantity: 0 }] as any)
    expect(result.errors).toContain('items[0].quantity must be a positive integer')
  })
})

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('should return false for invalid email', () => {
    expect(validateEmail('not-an-email')).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(validateEmail(undefined)).toBe(false)
  })

  it('should return false for null', () => {
    expect(validateEmail(null as any)).toBe(false)
  })
})

describe('validateShippingAddress', () => {
  it('should return valid: true for valid shipping address', () => {
    const result = validateShippingAddress({
      fullName: 'John Doe',
      line1: '123 Main St',
      city: 'Toronto',
      postalCode: 'M5V 2T1',
      country: 'Canada',
    })
    expect(result).toEqual({ valid: true, errors: [] })
  })

  it('should return valid: false and error for missing fullName', () => {
    const result = validateShippingAddress({
      fullName: '',
      line1: '123 Main St',
      city: 'Toronto',
      postalCode: 'M5V 2T1',
      country: 'Canada',
    })
    expect(result).toEqual({ valid: false, errors: expect.arrayContaining(['fullName required']) })
  })

  it('should return valid: false and error for missing line1', () => {
    const result = validateShippingAddress({
      fullName: 'John Doe',
      line1: '',
      city: 'Toronto',
      postalCode: 'M5V 2T1',
      country: 'Canada',
    })
    expect(result).toEqual({ valid: false, errors: expect.arrayContaining(['line1 required']) })
  })

  it('should return valid: false and error for missing city', () => {
    const result = validateShippingAddress({
      fullName: 'John Doe',
      line1: '123 Main St',
      city: '',
      postalCode: 'M5V 2T1',
      country: 'Canada',
    })
    expect(result).toEqual({ valid: false, errors: expect.arrayContaining(['city required']) })
  })

  it('should return valid: false and error for missing postalCode', () => {
    const result = validateShippingAddress({
      fullName: 'John Doe',
      line1: '123 Main St',
      city: 'Toronto',
      postalCode: '',
      country: 'Canada',
    })
    expect(result).toEqual({ valid: false, errors: expect.arrayContaining(['postalCode required']) })
  })

  it('should return valid: false and error for missing country', () => {
    const result = validateShippingAddress({
      fullName: 'John Doe',
      line1: '123 Main St',
      city: 'Toronto',
      postalCode: 'M5V 2T1',
      country: '',
    })
    expect(result).toEqual({ valid: false, errors: expect.arrayContaining(['country required']) })
  })

  it('should return valid: false and error when address is falsy', () => {
    const result = validateShippingAddress(undefined as any)
    expect(result).toEqual({ valid: false, errors: ['address required'] })
  })

  it('should return valid: false and error when address is null', () => {
    const result = validateShippingAddress(null as any)
    expect(result).toEqual({ valid: false, errors: ['address required'] })
  })
})

describe('validateVariantInput', () => {
  const validInput = {
    productId: 1,
    sku: 'AM90-BLK-10',
    color: 'Black',
    size: '10',
    price: 120,
    inventory: 50,
  }

  it('should return valid: true for a complete variant', () => {
    expect(validateVariantInput(validInput)).toEqual({ valid: true, errors: [] })
  })

  it('should reject non-object input', () => {
    expect(validateVariantInput(null)).toEqual({ valid: false, errors: ['variant must be an object'] })
    expect(validateVariantInput([])).toEqual({ valid: false, errors: ['variant must be an object'] })
  })

  it('should require a positive integer productId', () => {
    expect(validateVariantInput({ ...validInput, productId: 0 }).errors).toContain(
      'productId must be a positive integer'
    )
    expect(validateVariantInput({ ...validInput, productId: 1.5 }).errors).toContain(
      'productId must be a positive integer'
    )
  })

  it('should require non-empty sku, color and size', () => {
    expect(validateVariantInput({ ...validInput, sku: '   ' }).errors).toContain('sku is required')
    expect(validateVariantInput({ ...validInput, color: '' }).errors).toContain('color is required')
    expect(validateVariantInput({ ...validInput, size: '' }).errors).toContain('size is required')
  })

  it('should require a price greater than 0', () => {
    expect(validateVariantInput({ ...validInput, price: 0 }).errors).toContain(
      'price must be a number greater than 0'
    )
    expect(validateVariantInput({ ...validInput, price: -5 }).errors).toContain(
      'price must be a number greater than 0'
    )
  })

  it('should require a non-negative integer inventory', () => {
    expect(validateVariantInput({ ...validInput, inventory: -1 }).errors).toContain(
      'inventory must be a non-negative integer'
    )
    expect(validateVariantInput({ ...validInput, inventory: 1.5 }).errors).toContain(
      'inventory must be a non-negative integer'
    )
  })
})

describe('validateVariantPatch', () => {
  it('should accept a single valid field', () => {
    expect(validateVariantPatch({ inventory: 5 })).toEqual({ valid: true, errors: [] })
    expect(validateVariantPatch({ sku: 'NEW-SKU' })).toEqual({ valid: true, errors: [] })
  })

  it('should accept multiple valid fields', () => {
    expect(validateVariantPatch({ sku: 'NEW-SKU', price: 99.5, inventory: 0 })).toEqual({
      valid: true,
      errors: [],
    })
  })

  it('should reject an empty payload', () => {
    expect(validateVariantPatch({})).toEqual({
      valid: false,
      errors: ['at least one field is required'],
    })
  })

  it('should reject invalid field values', () => {
    expect(validateVariantPatch({ sku: '  ' }).errors).toContain('sku must be a non-empty string')
    expect(validateVariantPatch({ price: 0 }).errors).toContain('price must be a number greater than 0')
    expect(validateVariantPatch({ inventory: -1 }).errors).toContain(
      'inventory must be a non-negative integer'
    )
  })

  it('should reject non-object input', () => {
    expect(validateVariantPatch(undefined)).toEqual({
      valid: false,
      errors: ['variant must be an object'],
    })
  })
})