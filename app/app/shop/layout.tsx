import Header from "@/components/Header";

export default function ShopLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
     <>
         <Header />
        {children}
     </>
    )
  }
