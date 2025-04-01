
'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      alert('Login successful')
      // Redirect or update session here
    }
  }

  return (
      <>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-6">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                 className="w-full p-2 mb-4 border rounded" required/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                 className="w-full p-2 mb-4 border rounded" required/>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account?{' '}
          <a href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up
          </a>
        </p>
      </>
  )
}
