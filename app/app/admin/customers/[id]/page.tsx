
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditCustomerPage() {
  const { id } = useParams()
  const router = useRouter()
  const [customer, setCustomer] = useState<any>(null)

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        const found = data.find((c: any) => c.customer_id == id)
        setCustomer(found)
      })
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/customers/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    })
    router.push('/admin/customers')
  }

  const handleDelete = async () => {
    await fetch('/api/customers/' + id, {
      method: 'DELETE',
    })
    router.push('/admin/customers')
  }

  if (!customer) return <p>Loading...</p>

  return (
    <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
      <input className="w-full p-2 border mb-4" value={customer.full_name} onChange={e => setCustomer({ ...customer, full_name: e.target.value })} />
      <input className="w-full p-2 border mb-4" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
      <input className="w-full p-2 border mb-4" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
      <textarea className="w-full p-2 border mb-4" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </form>
  )
}
