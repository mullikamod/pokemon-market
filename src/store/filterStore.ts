import { create } from "zustand";
import type { FilterState, FilterPatch } from "@/types/filters";

export const useFilterStore = create<FilterState>()((set) => ({
  name: "",
  type: "",
  rarity: "",
  setId: "",
  page: 1,

  set: (patch: FilterPatch) =>
    set((prev) => ({ ...prev, ...patch })),

  reset: () =>
    set({ name: "", type: "", rarity: "", setId: "", page: 1 }),
}));
