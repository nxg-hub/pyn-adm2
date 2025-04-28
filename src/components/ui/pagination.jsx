import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { Button } from "./button";

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems, itemLabel }) => {
  const getVisiblePages = () => {
    
    const pages = [];
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getVisiblePages();
  const startUser = (currentPage - 1) * itemsPerPage + 1;
  const endUser = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground p-2">
            Showing {startUser}–{endUser} of {totalItems} {itemLabel}

              </div>

            <div className="flex items-center gap-5">

      {/* Left arrow */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </Button>

      {/* Page numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant="outline"
              size="sm"
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "bg-[#3A859E] text-white "
              : "bg-black text-white "
          }`}
        >
          {page}
        </Button>
      ))}

      {/* Right arrow */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </Button>
      </div>
      {/* <span className="text-sm text-gray-500">
        Showing {startUser}–{endUser} of {totalItems} {itemLabel}
      </span> */}
      </div>
  );
};

export default Pagination;
