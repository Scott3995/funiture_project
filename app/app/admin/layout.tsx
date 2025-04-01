
import Link from 'next/link'
import Image from "next/image";
import sofaLogo from "@/assets/sofa-logo.png";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin/products" className="hover:text-blue-300">Products</Link>
          <Link href="/admin/orders" className="hover:text-blue-300">Orders</Link>
          <Link href="/admin/customers" className="hover:text-blue-300">Customers</Link>
          <Link href="/admin/categories" className="hover:text-blue-300">Categories</Link>
        </nav>
      </aside>
        <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
            <div className="flex flex-col items-center justify-center">
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <Image
                        alt=""
                        src={sofaLogo}
                        className="h-12 w-auto"
                    />
                </a>
                <h2 className="text-md mb-8">Furniture Store</h2>
            </div>
            {children}
        </main>
    </div>
  )
}
