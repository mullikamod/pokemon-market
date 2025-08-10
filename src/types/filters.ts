export type FilterPatch = Partial<{
  name: string;
  type: string;
  rarity: string;
  setId: string;
  page: number;
}>;

export interface FilterState {
  name: string;
  type: string;
  rarity: string;
  setId: string;
  page: number;
  set(patch: FilterPatch): void;
  reset(): void;
}
