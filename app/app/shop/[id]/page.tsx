
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ProductDetailPage() {
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

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({ ...product, quantity: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    router.push('/cart')
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-4">R {product.price}</p>
      <button onClick={addToCart} className="bg-green-600 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  )
}
