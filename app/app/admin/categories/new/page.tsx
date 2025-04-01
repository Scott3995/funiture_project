
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCategoryPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })
    router.push('/admin/categories')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
      <input className="w-full p-2 border mb-4" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <textarea className="w-full p-2 border mb-4" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  )
}
