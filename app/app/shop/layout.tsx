import Header from "@/components/Header";

export default function ShopLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
     <div>
         <Header />
         <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
             {children}
         </div>
     </div>
    )
  }
