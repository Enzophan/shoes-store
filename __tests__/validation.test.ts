import { validateCartItems, validateEmail, validateShippingAddress } from '../src/lib/validation'

describe('validation', () => {
  test('validateCartItems accepts valid items', () => {
    const res = validateCartItems([{ variantId: 1, quantity: 2 }])
    expect(res.valid).toBe(true)
    expect(res.errors.length).toBe(0)
  })

  test('validateCartItems rejects invalid items', () => {
    const res = validateCartItems([{ variantId: -1, quantity: 0 }, { variantId: 'a', quantity: 1 } as any])
    expect(res.valid).toBe(false)
    expect(res.errors.length).toBeGreaterThanOrEqual(2)
  })

  test('validateEmail', () => {
    expect(validateEmail('alice@example.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
  })

  test('validateShippingAddress', () => {
    const ok = validateShippingAddress({ fullName: 'A', line1: 'L1', city: 'C', postalCode: 'P', country: 'X' })
    expect(ok.valid).toBe(true)
    const no = validateShippingAddress({})
    expect(no.valid).toBe(false)
    expect(no.errors.length).toBeGreaterThan(0)
  })
})
