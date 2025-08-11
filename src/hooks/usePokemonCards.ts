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
export type FilterResult = { data: FilterOptions; errors: FilterOptions };

const fetchFilterOptions = async (): Promise<FilterResult> => {
  const [typesRes, raritiesRes, setsRes] = await Promise.allSettled([
    api.get("/types"),
    api.get("/rarities"),
    api.get("/sets", { params: { orderBy: "name" } }),
  ]);

  console.log("Filter Options Results:", {
    types: typesRes,
    rarities: raritiesRes,
    sets: setsRes,
  });
  
  const data: FilterOptions = {
    types:
      typesRes.status === "fulfilled" ? (typesRes.value.data?.data as string[]) ?? [] : [],
    rarities:
      raritiesRes.status === "fulfilled" ? (raritiesRes.value.data?.data as string[]) ?? [] : [],
    sets:
      setsRes.status === "fulfilled"
        ? ((setsRes.value.data?.data) ?? []).map((set: PokemonSet) => ({
            id: set.id,
            name: set.name,
            total: set.total,
          }))
        : [],
  };

  const errors = {
    types: typesRes.status === "rejected" ? typesRes.reason : undefined,
    rarities: raritiesRes.status === "rejected" ? raritiesRes.reason : undefined,
    sets: setsRes.status === "rejected" ? setsRes.reason : undefined,
  };

  return { data, errors };
};

export { usePokemonCards, fetchFilterOptions };
