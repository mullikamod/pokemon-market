'use client';
import CartSidebar from "@/components/Cart/CartSidebar";
import { useState } from "react";
import ClientSection from "./ClientSection";
import Header from "@/components/Header/header";

export default function Page() {
  const [openCart, setOpenCart] = useState(false);
  return (
    <main className="container-app py-8 px-4">
      <Header setOpenCart={setOpenCart} />
      <ClientSection />
      <CartSidebar open={openCart} onClose={(flag) => setOpenCart(flag)} />
    </main>
  );
}