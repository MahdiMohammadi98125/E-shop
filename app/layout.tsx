import { CartProvider } from "@/provider/CartProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";
import NavBar from "./components/nav/NavBar";
import "./globals.css";

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
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51, 65, 85) ",
              color: "#fff",
            },
          }}
        />
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
