"use client";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button/Button";
import { useCartStore } from "@/store/cartStore";

type CartSidebarProps = {
  open: boolean;
  onClose: (flag: boolean) => void;
};


const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Read cart data from store
const lines = useCartStore((state) => state.lines);
const clearCart = useCartStore((state) => state.clearCart);
  const itemIds = Object.keys(lines);

  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    if (open) {
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
    } else {
      body.style.overflow = prevOverflow || "";
      body.style.paddingRight = prevPaddingRight || "";
    }

    return () => {
      body.style.overflow = prevOverflow || "";
      body.style.paddingRight = prevPaddingRight || "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!open) return null;
  return (
    <div className="w-full h-full bg-black/70 absolute top-0 left-0 z-20 overflow-hidden">
      <aside className={`fixed right-0 top-0 h-full w-full bg-[#1F1D2B] border-l border-white/10 transition-transform z-10
      ${open ? "translate-x-0" : "translate-x-full"}
      ${!isMobile && "max-w-md"}`
      }>
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[26px]">Cart</h3>
            <p className="text-sm text-muted underline cursor-pointer" onClick={clearCart}>Clear all</p>
          </div>

          <div className="w-content">
            <Button onClick={() => onClose(!open)}>
              <X className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-300px)]">
          {itemIds.length > 0 && <div className="grid grid-cols-6 text-sm text-white border-b border-white/8 pb-2 mb-2 gap-2">
            <div className="col-span-1">Item</div>
            <div className="col-span-4">Price</div>
            <div className="col-span-1">Qty</div>
          </div>}
          {itemIds.length === 0 && <div className="text-sm text-muted">Your cart is empty</div>}
          {itemIds.map((id) => (
            <CartItem key={id} card={lines[id].card} />
          ))}
        </div>
        <div className="px-4"><CartFooter /></div>
      </aside>
    </div>
  );
}

export default CartSidebar;
