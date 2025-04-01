
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Customer</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.order_id} className="border-t">
              <td className="p-2">{order.customer?.full_name}</td>
              <td className="p-2">R {order.total_amount}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">{new Date(order.order_date).toLocaleDateString()}</td>
              <td className="p-2">
                <Link href={'/admin/orders/' + order.order_id}
                      className="text-blue-600 hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
