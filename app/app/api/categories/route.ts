
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description } = body
  const category = await prisma.category.create({
    data: { name, description },
  })
  return NextResponse.json(category, { status: 201 })
}
