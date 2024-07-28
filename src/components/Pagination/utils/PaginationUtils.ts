export const PaginationUtils = (
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void
) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handleTenPrevious = () => {
    const newPage = currentPage - 10;
    handlePageChange(newPage < 1 ? 1 : newPage);
  };

  const handleTenNext = () => {
    const newPage = currentPage + 10;
    handlePageChange(newPage > totalPages ? totalPages : newPage);
  };

  return {
    handlePageChange,
    handleTenPrevious,
    handleTenNext,
  };
};
