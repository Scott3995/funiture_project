
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { full_name, email, password } = await req.json()

  console.log({ full_name, email, password })
  const existingUser = await prisma.customer.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.customer.create({
    data: {
      full_name,
      email,
      password: hashedPassword,
    }
  })

  return NextResponse.json({ message: 'Signup successful', user }, { status: 201 })
}
