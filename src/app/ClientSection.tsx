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

        const { data: filterData, errors: filterErrors } = await fetchFilterOptions();

        if (!isMounted) return;

        setFilterOptions({
          types: filterData.types ?? [],
          rarities: filterData.rarities ?? [],
          sets: filterData.sets?.map((setItem: PokemonSet) => ({
            id: setItem.id,
            name: setItem.name,
            total: setItem.total,
          })) ?? [],
        });

        if (filterErrors.types || filterErrors.rarities || filterErrors.sets) {
          console.warn("Some filter options failed to load:", filterErrors);
        }

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
      <div className="flex flex-col md:flex-row lg:items-center gap-3 justify-between">
        <h2 className="text-lg font-semibold">Choose Card</h2>
        <>
          {isOptionsLoading ? (
            <div className="h-10 rounded-xl bg-white/5 animate-pulse" />
          ) : optionsError ? (
            <div className="text-red-500">{optionsError}</div>
          ) : filterOptions ? (
            <FilterBar options={filterOptions} />
          ) : null}
        </>
      </div>


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