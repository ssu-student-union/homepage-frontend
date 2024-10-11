import { useState } from 'react';

export function useCurrentPage(initPage: number = 1) {
  const [currentPage, setCurrentPage] = useState<number>(initPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
  };
}
