import { useState } from 'react';

export function useCurrentPage(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
  };
}
