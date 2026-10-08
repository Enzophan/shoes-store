import { createOrder } from '../lib/orderService'

describe('createOrder', () => {
  it('should create order successfully with valid items and user email', async () => {
    const mockPrisma = {
      variant: {
        findUnique: jest.fn().mockResolvedValueOnce({
          id: 1,
          price: 100,
          inventory: 50,
        }),
      },
      user: {
        findUnique: jest.fn().mockResolvedValueOnce({
          id: 1,
          email: 'test@example.com',
        }),
      },
      address: {
        create: jest.fn().mockResolvedValueOnce({ id: 1 }),
      },
      $transaction: jest.fn((fn: any) => fn(mockPrisma)),
      order: {
        create: jest.fn().mockResolvedValueOnce({
          id: 'ORD-123',
          total: 200,
          status: 'pending',
          orderNumber: 'ORD-123',
          items: [],
          userId: 1,
          shippingAddressId: 1,
        }),
      },
      variant: {
        update: jest.fn(),
      },
    }

    const result = await createOrder(mockPrisma, {
      items: [{ variantId: 1, quantity: 2 }],
      user: { email: 'test@example.com', name: 'Test User' },
      shippingAddress: {
        fullName: 'John Doe',
        line1: '123 Main St',
        city: 'Toronto',
        postalCode: 'M5V 2T1',
        country: 'Canada',
        phone: '555-1234',
      },
    } as any)

    expect(result.id).toBe('ORD-123')
    expect(result.total).toBe(200)
    expect(result.status).toBe('pending')
    expect(result.orderNumber).toBe('ORD-123')
  })

  it('should throw error when no items provided', async () => {
    const mockPrisma = {
      variant: { findUnique: jest.fn() },
      user: { findUnique: jest.fn() },
      address: { create: jest.fn() },
      $transaction: jest.fn((fn: any) => fn(mockPrisma)),
      order: { create: jest.fn() },
      variant: { update: jest.fn() },
    }

    await expect(createOrder(mockPrisma, {
      items: [] as any,
    } as any)).rejects.toThrow('No items provided')
  })

  it('should throw error when variant not found', async () => {
    const mockPrisma = {
      variant: {
        findUnique: jest.fn().mockResolvedValueOnce(null),
      },
      user: { findUnique: jest.fn() },
      address: { create: jest.fn() },
      $transaction: jest.fn((fn: any) => fn(mockPrisma)),
      order: { create: jest.fn() },
      variant: { update: jest.fn() },
    }

    await expect(createOrder(mockPrisma, {
      items: [{ variantId: 999, quantity: 1 }],
      user: {},
    } as any)).rejects.toThrow('Variant 999 not found')
  })

  it('should throw error when insufficient inventory', async () => {
    const mockPrisma = {
      variant: {
        findUnique: jest.fn().mockResolvedValueOnce({
          id: 1,
          price: 100,
          inventory: 1,
        }),
      },
      user: { findUnique: jest.fn() },
      address: { create: jest.fn() },
      $transaction: jest.fn((fn: any) => fn(mockPrisma)),
      order: { create: jest.fn() },
      variant: { update: jest.fn() },
    }

    await expect(createOrder(mockPrisma, {
      items: [{ variantId: 1, quantity: 5 }],
      user: {},
    } as any)).rejects.toThrow('Insufficient inventory for variant 999')
  })

  it('should create user when email provided and user does not exist', async () => {
    const mockPrisma = {
      variant: {
        findUnique: jest.fn().mockResolvedValueOnce({
          id: 1,
          price: 50,
          inventory: 10,
        }),
      },
      user: {
        findUnique: jest.fn().mockResolvedValueOnce(null),
      },
      user: {
        create: jest.fn().mockResolvedValueOnce({
          id: 2,
          email: 'new@example.com',
          name: 'New User',
        }),
      },
      address: { create: jest.fn().mockResolvedValueOnce({ id: 1 }) },
      $transaction: jest.fn((fn: any) => fn(mockPrisma)),
      order: { create: jest.fn().mockResolvedValueOnce({
        id: 'ORD-456',
        total: 50,
        status: 'pending',
        orderNumber: 'ORD-456',
        items: [],
        userId: 2,
        shippingAddressId: 1,
      }) },
      variant: { update: jest.fn() },
    }

    const result = await createOrder(mockPrisma, {
      items: [{ variantId: 1, quantity: 1 }],
      user: { email: 'new@example.com', name: 'New User' },
      shippingAddress: {
        fullName: 'John Doe',
        line1: '123 Main St',
        city: 'Toronto',
        postalCode: 'M5V 2T1',
        country: 'Canada',
      },
    } as any)

    expect(result.userId).toBe(2)
  })

  it('should handle address creation when address is provided', async () => {
    const mockPrisma = {
      variant: {
        findUnique: jest.fn().mockResolvedValueOnce({
          id: 1,
          price: 75,
          inventory: 20,
        }),
      },
      user: { findUnique: jest.fn().mockResolvedValueOnce({
        id: 1,
        email: 'test@example.com',
      }) },
      address: { create: jest.fn().mockResolvedValueOnce({ id: 2 }) },
      $transaction: jest.fn((fn: any) => fn(mockPrisma)),
      order: { create: jest.fn().mockResolvedValueOnce({
        id: 'ORD-789',
        total: 75,
        status: 'pending',
        orderNumber: 'ORD-789',
        items: [],
        userId: 1,
        shippingAddressId: 2,
      }) },
      variant: { update: jest.fn() },
    }

    const result = await createOrder(mockPrisma, {
      items: [{ variantId: 1, quantity: 1 }],
      user: { email: 'test@example.com' },
      shippingAddress: {
        fullName: 'John Doe',
        line1: '456 Oak Ave',
        city: 'Vancouver',
        postalCode: 'V6B 2C8',
        country: 'Canada',
      },
    } as any)

    expect(result.shippingAddressId).toBe(2)
  })
})