import { PAGE_PER_GROUP } from '../const';

const getPageGroup = (currentPage: number, totalPages: number) => {
  const groupNumber = Math.ceil(currentPage / PAGE_PER_GROUP);

  const startPage = (groupNumber - 1) * PAGE_PER_GROUP + 1;
  const endPage = Math.min(totalPages, groupNumber * PAGE_PER_GROUP);

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};

export { getPageGroup };
