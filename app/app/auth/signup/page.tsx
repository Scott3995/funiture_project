
'use client'

import { useState } from 'react'

export default function SignupPage() {
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password }),
    })
    const data = await res.json()
    console.log(data)
    if (!res.ok) {
      setError(data.error)
    } else {
      alert('Signup successful')
      // Redirect or clear form
    }
  }

  return (
      <>
          <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-6">Sign Up</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <input type="text" placeholder="Full Name" value={full_name} onChange={(e) => setFullName(e.target.value)}
                     className="w-full p-2 mb-4 border rounded" required/>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                     className="w-full p-2 mb-4 border rounded" required/>
              <input type="password" placeholder="Password" value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full p-2 mb-4 border rounded" required/>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Sign Up
              </button>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{' '}
              <a href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Login
              </a>
          </p>
      </>
  )
}
