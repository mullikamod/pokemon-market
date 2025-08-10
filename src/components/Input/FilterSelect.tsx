"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";

type Opt = { label: string; value: string };

type FilterSelectProps = {
  label: string;
  field: "type" | "rarity" | "setId";
  options: Opt[];
};
const FilterSelect: React.FC<FilterSelectProps> = ({ label, field, options }) => {
  const val = useFilterStore((s) => s[field]);
  const set = useFilterStore((s) => s.set);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === val);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const handleSelect = (o?: Opt) => {
    set({ [field]: o?.value ?? "", page: 1 } as Partial<Record<typeof field, string>> & { page: number });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 bg-surface border border-white/8 rounded-xl px-3 py-2 text-white/90 hover:border-white/12"
      >
        <span className={selected ? "" : "text-white/60"}>{selected ? selected.label : label}</span>
        <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute mt-2 w-48 rounded-xl h-80 overflow-scroll bg-surface border border-white/12 shadow-lg z-50">
          <button
            onClick={() => handleSelect()}
            className={`w-full text-left px-4 py-2 flex justify-between ${!selected ? "bg-white/5" : ""}`}
          >
            All
            {!selected && <Check className="w-4 h-4 text-white/70" />}
          </button>
          {options.map(o => {
            const active = val === o.value;
            return (
              <button
                key={o.value}
                onClick={() => handleSelect(o)}
                className={`w-full text-left px-4 py-2 flex justify-between hover:bg-white/5 ${active ? "text-white" : "text-white/90"}`}
              >
                {o.label}
                {active && <Check className="w-4 h-4 text-white/70" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterSelect;