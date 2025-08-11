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
    <div className="flex items-center gap-3">
      {options.sets.length > 0 && (
        <FilterSelect label="Set" field="setId" options={options.sets.map((set) => ({ label: set.name, value: set.id }))} />
      )}
      {options.rarities.length > 0 && (
        <FilterSelect label="Rarity" field="rarity" options={options.rarities.map((rarity) => ({ label: rarity, value: rarity }))} />
      )}
      {options.types.length > 0 && (
        <FilterSelect label="Type" field="type" options={options.types.map((type) => ({ label: type, value: type }))} />
      )}
    </div>
  );
}

export default FilterBar;
