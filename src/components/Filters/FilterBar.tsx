"use client";

import FilterSelect from "../Input/FilterSelect";

type FilterBarProps = {
  options: {
    types: string[];
    rarities: string[];
    sets: { id: string; name: string }[];
  };
};

const FilterBar = ({ options }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <h2 className="text-lg font-semibold">Choose Card</h2>
      <div className="flex items-center gap-3">
        <FilterSelect label="Set" field="setId" options={options.sets.map((set) => ({ label: set.name, value: set.id }))} />
        <FilterSelect label="Rarity" field="rarity" options={options.rarities.map((rarity) => ({ label: rarity, value: rarity }))} />
        <FilterSelect label="Type" field="type" options={options.types.map((type) => ({ label: type, value: type }))} />
      </div>
    </div>
  );
}

export default FilterBar;
