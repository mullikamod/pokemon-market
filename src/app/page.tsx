'use client';
import CartSidebar from "@/components/Cart/CartSidebar";
import { useState } from "react";
import Header from "@/components/Header/header";
import FilterBar from "@/components/Filters/FilterBar";
import PokemonCard from "@/components/Card/PokemonCard";
import ClientSection from "./ClientSection";

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