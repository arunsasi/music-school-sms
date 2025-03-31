
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Generate page items
  const renderPageItems = () => {
    // Always show first page, last page, current page, and 1 page before and after current
    const pageNumbers: (number | 'ellipsis')[] = [];

    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always add first page
      pageNumbers.push(1);

      // Add ellipsis if current page is > 3
      if (currentPage > 3) {
        pageNumbers.push('ellipsis');
      }

      // Add page before current if current > 2
      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }

      // Add current page if not 1 or last
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }

      // Add page after current if current < totalPages - 1
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }

      // Add ellipsis if current page < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push('ellipsis');
      }

      // Always add last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) => {
      if (page === 'ellipsis') {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <span className="flex h-9 w-9 items-center justify-center text-sm">...</span>
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={page}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        
        {renderPageItems()}
        
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
