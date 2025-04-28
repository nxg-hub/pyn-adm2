"use client"
import { Button } from "../ui/button"

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, pageSize }) => {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>
      <div className="flex items-center gap-5">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = i + 1
          return (
            <Button
              key={pageNumber}
              variant="outline"
              size="sm"
              className={pageNumber === currentPage ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          )
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
