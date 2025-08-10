"use client";
import { cartTotals, useCartStore } from "@/store/cartStore";
import Button from "../Button/Button";

const CartFooter = () => {
  // Read cart data from store
  const lines = useCartStore((s) => s.lines);

  // Calculate totals using helper function
  const { totalQuantity, totalPrice } = cartTotals(lines);

  return (
    <div className="sticky bottom-0 pt-3 pb-4 gap-4 flex flex-col bg-[#1F1D2B]">
      <div className="flex flex-row items-center justify-between">
        <div className="text-muted text-xs">Total card amount</div>
        <div className="font-bold text-base">{totalQuantity}</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-muted text-xs">Total price</div>
        <div className="font-bold text-base">${totalPrice.toFixed(2)}</div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="mt-3 flex gap-2 w-full">
          <Button onClick={() => alert("Proceeding to payment")}>
            <p className="w-full">Continue to Payment</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
