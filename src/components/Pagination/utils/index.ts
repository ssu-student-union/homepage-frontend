const getPageNumbers = (totalPages: number, currentPage: number) => {
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 6) {
    if (currentPage <= 3) {
      endPage = 6;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 5;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
};

export { getPageNumbers };
