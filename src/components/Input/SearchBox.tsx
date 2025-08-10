"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilterStore } from "@/store/filterStore";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";


const SearchBox = () => {
  const name = useFilterStore((s) => s.name);
  const setFilter = useFilterStore((s) => s.set);

  // Local state to manage input value
  const [inputValue, setInputValue] = useState(name);
  const [focused, setFocused] = useState(false);
  const debouncedName = useDebouncedValue(inputValue, 500);

  // sync when store.name changes from outside (e.g., reset)
  useEffect(() => {
    setInputValue(name);
  }, [name]);

  // Update store when inputValue changes
  useEffect(() => {
    setFilter({ name: debouncedName, page: 1 });
  }, [debouncedName, setFilter]);

  return (
    <div className={`flex gap-2 px-4 items-center border rounded-md ${focused ? "border-white" : "border-white/8"}`}>
      <Search className="w-5 h-5" />
      <input
        className="input bg-transparent border-0 px-0 py-2 focus:outline-none"
        placeholder="Search by Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Search by name"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default SearchBox;
