
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { customer: true, orderItems: true }
  })
  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { customer_id, total_amount, status, items } = body
  const order = await prisma.order.create({
    data: {
      customer_id,
      total_amount,
      status,
      orderItems: {
        create: items.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  })
  return NextResponse.json(order, { status: 201 })
}
