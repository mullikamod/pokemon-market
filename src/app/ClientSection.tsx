"use client";

import { fetchFilterOptions, FilterOptions, PokemonSet, usePokemonCards } from "@/hooks/usePokemonCards";
import PokemonCard from "@/components/Card/PokemonCard";
import CardSkeleton from "@/components/Card/CardSkeleton";  
import FilterBar from "../components/Filters/FilterBar";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";


const ClientSection: React.FC = () => {
  const { loading: isCardsLoading, cards, total, pageSize } = usePokemonCards();


  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setIsOptionsLoading(true);
        const result = await fetchFilterOptions();
        if (!isMounted) return;
        setFilterOptions({
          types: result.types ?? [],
          rarities: result.rarities ?? [],
          sets: (result.sets ?? []).map((s: PokemonSet) => ({ id: s.id, name: s.name, total: s.total })),
        });
        setOptionsError(null);
      } catch {
        if (!isMounted) return;
        setOptionsError("Failed to load filter options");
      } finally {
        if (isMounted) setIsOptionsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
   {/* Filter bar */}
      {isOptionsLoading ? (
        <div className="h-10 rounded-xl bg-white/5 animate-pulse" />
      ) : optionsError ? (
        <div className="text-sm text-white/70">{optionsError}</div>
      ) : filterOptions ? (
        <FilterBar options={filterOptions} />
      ) : null}

      {/* Cards grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {isCardsLoading
          ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          : cards.map((card) => <PokemonCard key={card.id} card={card} />)}
      </div>
       <Pagination totalItems={total} itemsPerPage={pageSize} />
    </section>
  ); 
}

export default ClientSection;