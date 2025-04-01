
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditCategoryPage() {
  const { id } = useParams()
  const router = useRouter()
  const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        const found = data.find((c: any) => c.category_id == id)
        setCategory(found)
      })
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/categories/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    })
    router.push('/admin/categories')
  }

  const handleDelete = async () => {
    await fetch('/api/categories/' + id, {
      method: 'DELETE',
    })
    router.push('/admin/categories')
  }

  if (!category) return <p>Loading...</p>

  return (
    <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <input className="w-full p-2 border mb-4" value={category.name} onChange={e => setCategory({ ...category, name: e.target.value })} />
      <textarea className="w-full p-2 border mb-4" value={category.description} onChange={e => setCategory({ ...category, description: e.target.value })} />
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </form>
  )
}
