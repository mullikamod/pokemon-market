"use client";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Button from "../Button/Button";
import { useCartStore } from "@/store/cartStore";

type PokemonCardProps = { card: PokemonCard };

export default function PokemonCard({ card }: PokemonCardProps) {
  const price = card.cardmarket?.prices?.averageSellPrice ?? 0;
  const setTotal = card.set?.total ?? 0;

  const addItemToCart = useCartStore((state) => state.addItem);

 const handleAddToCart = () => {
    addItemToCart(card, 1); // Add 1 quantity of the card
  };

  return (
    <div className="relative flex flex-col">
      <div className="pt-[calc(93.333%_-_50px)]" />
      <div
        className="absolute left-1/2 -translate-x-1/2
               w-[70%] aspect-[3/4] overflow-hidden rounded-lg
               z-1 bottom-40"
      >

        <Image
          src={card.images.large}
          alt={card.name}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <div className="relative rounded-2xl bg-surface pt-20 pb-6 px-4flex flex-col p-4">
        <div className="mt-auto text-center text-base font-medium leading-snug tracking-tight">
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
