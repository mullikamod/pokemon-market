"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import Button from "../Button/Button";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage }) => {
  const currentPage = useFilterStore((state) => state.page);
  const setFilterState = useFilterStore((state) => state.set);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  if (totalPages <= 1) return null;

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setFilterState({ page: targetPage });
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    pages.push(1);

    if (currentPage - delta > 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + delta < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      {/* Prev */}
      <div className="w-content">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          buttonType="tertiary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Page numbers */}
      {visiblePages.map((page, idx) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${idx}`} className="px-3 py-1 text-white/60">
              ...
            </span>
          );
        }
        const pageNumber = page as number;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2.5 rounded-lg transition ${pageNumber === currentPage
                ? "bg-accent text-white"
                : "bg-surface hover:bg-white/10 text-white"
              }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <div className="w-content">
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          buttonType="tertiary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

    </div>
  );
};

export default Pagination;
