import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
} from '../ui/pagination';
import { PaginationUtils } from './utils/PaginationUtils';
import { getPageGroup } from './utils/PageNumberUtils';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const { handlePageChange, handleTenPrevious, handleTenNext } = PaginationUtils(totalPages, currentPage, onPageChange);

  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationTenPrevious onClick={handleTenPrevious} to="#" />
        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} to="#" />
        {getPageGroup(currentPage, totalPages).map((page) => (
          <PaginationItem key={page} isActive={page === currentPage}>
            <PaginationLink onClick={() => handlePageChange(page)} to="#">
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} to="#" />
        <PaginationTenNext onClick={handleTenNext} to="#" />
      </PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
