
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: any) => (
            <tr key={customer.customer_id} className="border-t">
              <td className="p-2">{customer.full_name}</td>
              <td className="p-2">{customer.email}</td>
              <td className="p-2">{customer.phone}</td>
              <td className="p-2">
                <Link href={'/admin/customers/' + customer.customer_id}
                      className="text-blue-600 hover:underline mr-4">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
