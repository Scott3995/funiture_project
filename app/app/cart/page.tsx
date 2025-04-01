
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))

    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const updateQuantity = (index: number, quantity: number) => {
    const updatedCart = cart.map((item, i) => i === index ? { ...item, quantity } : item)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const checkout = async () => {
    if (!user) {
      alert('Please log in first.')
      router.push('/login')
      return
    }

    const items = cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const order = {
      customer_id: user.customer_id,
      total_amount: total,
      status: 'pending',
      items
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })

    if (res.ok) {
      alert('Order placed successfully!')
      localStorage.removeItem('cart')
      setCart([])
      router.push('/shop')
    } else {
      alert('Error placing order.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <ul>
            {cart.map((item, i) => (
              <li key={i} className="border-b py-2 flex justify-between items-center">
                <span>{item.name}</span>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={e => updateQuantity(i, parseInt(e.target.value))}
                  className="w-16 p-1 border rounded text-center mx-2"
                />
                <span>R {(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeItem(i)} className="text-red-600 ml-4">Remove</button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <strong>Total: R {total.toFixed(2)}</strong>
          </div>
          <button onClick={checkout} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Checkout
          </button>
        </>
      )}
    </div>
  )
}
