"use client";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Button from "../Button/Button";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useRef, useState } from "react";

type PokemonCardProps = { card: PokemonCard };

const PokemonCard: React.FC<PokemonCardProps> = ({ card }) => {
  const price = card.cardmarket?.prices?.averageSellPrice ?? 0;
  const setTotal = card.set?.total ?? 0;

  const cardRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const addItemToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItemToCart(card, 1); // Add 1 quantity of the card
  };
  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      const height = (width * 4) / 3;
      setHeight(height - 70);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="relative" style={{ height }} >
        <div ref={cardRef} className="absolute left-1/2 -translate-x-1/2
               w-[70%] aspect-[3/4] overflow-hidden rounded-lg
               z-1 bottom-[-100] py-2"
        >

          <Image
            src={card.images.large}
            alt={card.name}
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative rounded-2xl bg-surface pb-6 px-4 flex flex-col h-full">
        <div className="h-[70px] mb-2" />
        <div className="mt-auto text-center text-base font-medium leading-snug tracking-tight pt-2">
          {card.name}
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 text-base text-muted">
          <span>${price.toFixed(2)}</span>
          <span className="text-white/8">•</span>
          <span>{setTotal} Cards</span>
        </div>


        <div className="mt-5">
          <Button onClick={handleAddToCart} buttonType="secondary">
            <ShoppingBag className="w-4 h-4 text-white/90" />
            <span className="text-xs font-medium">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
