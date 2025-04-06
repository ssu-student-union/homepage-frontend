import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMemo } from 'react';
import { To } from 'react-router';

interface LinkPaginationProps {
  totalPages: number;
  maxDisplay: number;
  page: number;
  url: (page: number) => To;
}

const LinkPagination = ({ totalPages, maxDisplay, page, url }: LinkPaginationProps) => {
  const displayStart = useMemo(
    () => Math.max(1, Math.min(page - Math.floor(maxDisplay / 2), totalPages - maxDisplay + 1)),
    [page, maxDisplay, totalPages]
  );
  const pages = Array.from({ length: Math.min(maxDisplay, totalPages - displayStart + 1) }, (_, i) => displayStart + i);

  return (
    <PaginationContainer>
      <PaginationContent>
        {displayStart > 1 && <PaginationPrevious to={url(Math.max(displayStart - maxDisplay, 1))} />}
        {pages.map((pageDef) => (
          <PaginationItem key={pageDef} isActive={pageDef === page}>
            <PaginationLink to={url(pageDef)}>{pageDef}</PaginationLink>
          </PaginationItem>
        ))}
        {page + maxDisplay <= totalPages && <PaginationNext to={url(page + maxDisplay)} />}
      </PaginationContent>
    </PaginationContainer>
  );
};

export default LinkPagination;
