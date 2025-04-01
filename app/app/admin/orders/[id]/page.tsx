
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function OrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        const found = data.find((o: any) => o.order_id == id)
        setOrder(found)
      })
  }, [id])

  if (!order) return <p>Loading...</p>

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/orders/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order }),
    })
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order #{order.order_id}</h1>
      <p><strong>Customer:</strong> {order.customer?.full_name}</p>
      <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
      <p><strong>Status:</strong></p>
      <form onSubmit={handleStatusUpdate} className="my-4">
        <select value={order.status} onChange={e => setOrder({ ...order, status: e.target.value })}
                className="p-2 border rounded mr-4">
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Status</button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item: any) => (
            <tr key={item.order_item_id} className="border-t">
              <td className="p-2">{item.product_id}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">R {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
