
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.product_id == id)
        setProduct(found)
      })
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/products/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        price: parseFloat(product.price),
        stock_quantity: parseInt(product.stock_quantity),
      }),
    })
    router.push('/admin/products')
  }

  const handleDelete = async () => {
    await fetch('/api/products/' + id, {
      method: 'DELETE',
    })
    router.push('/admin/products')
  }

  if (!product) return <p>Loading...</p>

  return (
    <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <input className="w-full p-2 border mb-4" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
      <input className="w-full p-2 border mb-4" type="number" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
      <input className="w-full p-2 border mb-4" type="number" value={product.stock_quantity} onChange={e => setProduct({ ...product, stock_quantity: e.target.value })} />
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </form>
  )
}
