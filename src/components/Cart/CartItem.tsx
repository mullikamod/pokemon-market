"use client";
import Image from "next/image";
import Button from "../Button/Button";
import { useCartStore } from "@/store/cartStore";

type CartItemProps = {
  card: PokemonCard; // keep UI props shape
};

const CartItem: React.FC<CartItemProps> = ({ card }) => {
  // Read the current line from cart by card id
  const line = useCartStore((s) => s.lines[card.id]);
  const qty = line?.qty ?? 0;

  // Cart actions
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeItem  = useCartStore((s) => s.removeItem);

  // Price calculations (fallback to 0)
  const unitPrice = card.cardmarket?.prices?.averageSellPrice ?? 0;
  const lineTotal = unitPrice * qty;

  // Handlers (do not change UI)
  const onDecrease = () => {
    if (qty <= 1) removeItem(card.id);
    else decreaseQty(card.id);
  };
  const onIncrease = () => increaseQty(card.id);

  return (
    <div className="w-full gap-2 flex flex-col">
      <div className="grid grid-cols-6 gap-2 pt-2">
        <div className="col-span-1">
          <div className="relative h-15 aspect-[2/3] overflow-hidden rounded">
            <Image
              src={card.images.small}
              alt="Pokemon card image"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-4">
          <div className="flex-1">
            <div className="text-sm line-clamp-1">{card.name}</div>
            {/* unit price */}
            <div className="badge">
              ${unitPrice.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="col-span-1">
          {/* line total = unit * qty */}
          <div className="badge">
            ${lineTotal.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 pt-2">
        <div className="col-span-1">
          <div className="w-content">
            {/* decrease or remove when qty <= 1 */}
            <Button onClick={onDecrease} buttonType="secondary">-</Button>
          </div>
        </div>

        <div className="col-span-4">
          <div className="w-full">
            {/* display qty only (read-only) */}
            <Button onClick={() => {}} buttonType="secondary" readOnly>
              {String(qty)}
            </Button>
          </div>
        </div>

        <div className="col-span-1">
          <div className="w-content">
            {/* increase */}
            <Button buttonType="secondary" onClick={onIncrease}>+</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
