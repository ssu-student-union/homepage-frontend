import { useState } from 'react';

export function useCurrentPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
  };
}
