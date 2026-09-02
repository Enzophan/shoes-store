export async function createOrder(prisma: any, body: any) {
  const items = body.items as Array<{ variantId: number; quantity: number }>
  const userInfo = body.user as { email?: string; name?: string; phone?: string } | undefined
  const address = body.shippingAddress

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('No items provided')
  }

  // Validate variants and availability
  const variantRecords = await Promise.all(
    items.map(async (it: any) => {
      const v = await prisma.variant.findUnique({ where: { id: it.variantId } })
      if (!v) throw new Error(`Variant ${it.variantId} not found`)
      if (v.inventory < it.quantity) throw new Error(`Insufficient inventory for variant ${it.variantId}`)
      return { v, qty: it.quantity }
    })
  )

  const total = variantRecords.reduce((s: number, r: any) => s + r.v.price * r.qty, 0)

  // Create or find user if email provided
  let userId: number | undefined = undefined
  if (userInfo && userInfo.email) {
    let user = await prisma.user.findUnique({ where: { email: userInfo.email } })
    if (!user) {
      user = await prisma.user.create({ data: { email: userInfo.email, name: userInfo.name || undefined, phone: userInfo.phone || undefined } })
    }
    userId = user.id
  }

  // Create shipping address if provided
  let shippingAddressId: number | undefined = undefined
  if (address) {
    const addr = await prisma.address.create({
      data: {
        userId: userId || undefined,
        fullName: address.fullName,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        phone: address.phone
      }
    })
    shippingAddressId = addr.id
  }

  // Transaction: create order and decrement inventories
  const createdOrder = await prisma.$transaction(async (tx: any) => {
    const order = await tx.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        total: total,
        paymentMethod: 'COD',
        status: 'pending',
        userId: userId || undefined,
        shippingAddressId: shippingAddressId || undefined,
        items: {
          create: variantRecords.map((r: any) => ({ variantId: r.v.id, quantity: r.qty, price: r.v.price }))
        }
      },
      include: { items: true }
    })

    // decrement inventory
    for (const r of variantRecords) {
      await tx.variant.update({ where: { id: r.v.id }, data: { inventory: r.v.inventory - r.qty } })
    }

    return order
  })

  return createdOrder
}
