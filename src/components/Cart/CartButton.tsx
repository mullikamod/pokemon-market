"use client";


import { ShoppingBag } from "lucide-react";
import Button from "../Button/Button";

type CartButtonProps = {
  onClick: () => void;
};

const CartButton = ({ onClick }: CartButtonProps) => {

  return (
    <Button onClick={onClick}>
      <ShoppingBag className="w-6 h-6 text-white" />
    </Button>
  );
}

export default CartButton;
