'use client';
import { useEffect, useMemo, useState } from "react";
import { useFilterStore } from "@/store/filterStore";
import api from "@/lib/api";


const PAGE_SIZE = 20;

const usePokemonCards = () => {
  const { name, type, rarity, setId, page } = useFilterStore();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [total, setTotal] = useState(0);
  const q = useMemo(() => {
    const clauses: string[] = [];
    if (name) clauses.push(`name:*${name}*`);
    if (type) clauses.push(`types:${type}`);
    if (rarity) clauses.push(`rarity:${rarity}`);
    if (setId) clauses.push(`set.id:${setId}`);
    return clauses.join(" ");
  }, [name, type, rarity, setId]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/cards", { params: { q, page, pageSize: PAGE_SIZE, orderBy: "name" } })
      .then((res) => {
        console.log("Fetched Pokemon Cards:", res.data);
        
        setCards(res.data.data);
        setTotal(res.data.totalCount);
      })
      .finally(() => setLoading(false));
  }, [q, page]);

  return { loading, cards, total, pageSize: PAGE_SIZE };
}

export type PokemonSet = { id: string; name: string; total: number };
export type FilterOptions = {
  types: string[];
  rarities: string[];
  sets: PokemonSet[];
};

const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const [types, rarities, sets] = await Promise.all([
    api.get("/types"),
    api.get("/rarities"),
    api.get("/sets", { params: { orderBy: "name" } }),
  ]);
  console.log("Fetched Filter Options:", { types, rarities, sets });
  
  if (!types.data || !rarities.data || !sets.data) {
    throw new Error("Failed to fetch filter options");
  }
  return {
    types: types.data.data as string[],
    rarities: rarities.data.data as string[],
    sets: (sets.data.data as PokemonSet[]).map((s) => ({ id: s.id, name: s.name, total: s.total })),
  };
}

export { usePokemonCards, fetchFilterOptions };
