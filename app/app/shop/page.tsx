
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ShopPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.product_id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">R {product.price}</p>
            <Link href={'/shop/' + product.product_id} className="text-blue-600 hover:underline">View</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
