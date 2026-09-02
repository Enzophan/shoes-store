import { createOrder } from '../src/lib/orderService'

describe('orderService', () => {
  test('creates order when inventory sufficient', async () => {
    const prisma: any = {
      variant: { findUnique: jest.fn().mockResolvedValue({ id: 1, inventory: 5, price: 10 }) },
      user: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue({ id: 2 }) },
      address: { create: jest.fn().mockResolvedValue({ id: 3 }) },
      $transaction: jest.fn(async (cb: any) => {
        const tx = {
          order: { create: jest.fn().mockResolvedValue({ id: 10, orderNumber: 'ORD-10', items: [] }) },
          variant: { update: jest.fn().mockResolvedValue({ id: 1, inventory: 3 }) }
        }
        return cb(tx)
      })
    }

    const body = { items: [{ variantId: 1, quantity: 2 }], user: { email: 'a@b.com' }, shippingAddress: { fullName: 'A', line1: 'L1', city: 'C', postalCode: 'P', country: 'X' } }

    const order = await createOrder(prisma, body)
    expect(order).toBeDefined()
    expect(order.id).toBe(10)
  })

  test('throws when insufficient inventory', async () => {
    const prisma: any = {
      variant: { findUnique: jest.fn().mockResolvedValue({ id: 1, inventory: 1, price: 10 }) },
      user: { findUnique: jest.fn(), create: jest.fn() },
      address: { create: jest.fn() },
      $transaction: jest.fn()
    }

    const body = { items: [{ variantId: 1, quantity: 2 }] }

    await expect(createOrder(prisma, body)).rejects.toThrow(/Insufficient inventory/)
  })
})
