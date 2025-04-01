
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true }
  })
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description, price, stock_quantity, category_id, image_url } = body
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock_quantity,
      category_id,
      image_url,
    }
  })
  return NextResponse.json(product, { status: 201 })
}
