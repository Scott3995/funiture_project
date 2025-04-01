
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/new" className="bg-blue-600 text-white px-4 py-2 rounded">Add Category</Link>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <tr key={category.category_id} className="border-t">
              <td className="p-2">{category.name}</td>
              <td className="p-2">{category.description}</td>
              <td className="p-2">
                <Link href={'/admin/categories/' + category.category_id}
                      className="text-blue-600 hover:underline mr-4">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
