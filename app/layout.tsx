import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "./components/footer/Footer";
import NavBar from "./components/nav/NavBar";
import "./globals.css";
import { CartProvider } from "@/provider/CartProvider";

const poppin = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppin.className} text-slate-700`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen ">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
