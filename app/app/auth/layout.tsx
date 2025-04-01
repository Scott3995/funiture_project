import Header from "@/components/Header";
import Image from "next/image";
import sofaLogo from "@/assets/sofa-logo.png";

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                    alt=""
                    src={sofaLogo}
                    className="h-36 w-auto"
                />
            </a>
            <h2 className="text-2xl mb-8">Furniture Store</h2>
            {children}
        </div>
    )
}
