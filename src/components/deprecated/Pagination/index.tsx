import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
} from '../../ui/pagination';
import { PaginationUtils } from './utils/PaginationUtils';
import { getPageGroup } from './utils/PageNumberUtils';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * @deprecated 이 페이지네이션은 시멘틱 링크로 동작하지 않습니다. 대신 `LinkPagination`을 사용하세요.
 */
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
