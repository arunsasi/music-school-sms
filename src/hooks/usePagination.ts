
import { useState, useEffect } from 'react';

interface PaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination<T>({ 
  data, 
  itemsPerPage = 10,
  initialPage = 1 
}: PaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  
  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);
  
  // Update page if current page is outside bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);
  
  // Change page
  const changePage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  return {
    currentPage,
    totalPages,
    currentItems,
    itemsPerPage,
    changePage,
  };
}
