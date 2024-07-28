import {
  PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
} from "../ui/pagination";
import { cn } from "@/libs/utils";
import { getPageNumbers } from "./utils/PageNumberUtils";
import { PaginationUtils } from "./utils/PaginationUtils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  const { handlePageChange, handleTenPrevious, handleTenNext } =
    PaginationUtils(totalPages, currentPage, onPageChange);

  return (
    <PaginationContainer className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationTenPrevious onClick={handleTenPrevious} />
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {currentPage > 3 && totalPages > 6 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 4 && <PaginationEllipsis />}
          </>
        )}
        {getPageNumbers(totalPages, currentPage).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages - 2 && totalPages > 6 && (
          <>
            {currentPage < totalPages - 3 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          <PaginationTenNext onClick={handleTenNext} />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
