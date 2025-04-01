
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock_quantity, setStock] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), stock_quantity: parseInt(stock_quantity) }),
    })
    router.push('/admin/products')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <input className="w-full p-2 border mb-4" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input className="w-full p-2 border mb-4" placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      <input className="w-full p-2 border mb-4" placeholder="Stock Quantity" type="number" value={stock_quantity} onChange={e => setStock(e.target.value)} required />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  )
}
