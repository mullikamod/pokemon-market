"use client";

import { ShoppingBag } from "lucide-react";
import Button from "../Button/Button";
import { cartTotals, useCartStore } from "@/store/cartStore";

type CartButtonProps = {
  onClick: () => void;
};

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  const cartLines = useCartStore((state) => state.lines);
  const { totalQuantity } = cartTotals(cartLines);

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="relative">
      <Button onClick={handleClick}>
        <ShoppingBag className="w-6 h-6 text-white" />
      </Button>

      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-white btn-glow text-primary text-xs font-bold rounded-full px-2 py-0.5">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartButton;
