import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime Cuts Butchery - Premium Quality Fresh Meats",
  description: "Premium quality fresh meats delivered to your door. Grass-fed beef, free-range chicken, artisan sausages, and more from your trusted local butcher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
