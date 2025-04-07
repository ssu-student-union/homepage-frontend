import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useQueryUpdater } from '@/hooks/useQueryUpdater';
import { useCallback, useMemo } from 'react';

interface LinkPaginationProps {
  totalPages: number;
  maxDisplay: number;
  page: number;
  query?: string;
}

const LinkPagination = ({ totalPages, maxDisplay, page, query = 'page' }: LinkPaginationProps) => {
  const queryUpdater = useQueryUpdater();
  const pageLink = useCallback((page: number) => queryUpdater(query, `${page}`), [query, queryUpdater]);
  const displayStart = useMemo(
    () => Math.max(1, Math.min(page - Math.floor(maxDisplay / 2), totalPages - maxDisplay + 1)),
    [page, maxDisplay, totalPages]
  );
  const pages = useMemo(
    () => Array.from({ length: Math.min(maxDisplay, totalPages - displayStart + 1) }, (_, i) => displayStart + i),
    [maxDisplay, displayStart, totalPages]
  );
  const previous = useMemo(
    () => pageLink(Math.max(displayStart - maxDisplay, 1)),
    [pageLink, displayStart, maxDisplay]
  );
  const next = useMemo(() => pageLink(page + maxDisplay), [pageLink, page, maxDisplay]);

  return (
    <PaginationContainer>
      <PaginationContent>
        {displayStart > 1 && <PaginationPrevious to={previous} />}
        {pages.map((pageDef) => (
          <PaginationItem key={pageDef} isActive={pageDef === page}>
            <PaginationLink to={pageLink(pageDef)}>{pageDef}</PaginationLink>
          </PaginationItem>
        ))}
        {page + maxDisplay <= totalPages && <PaginationNext to={next} />}
      </PaginationContent>
    </PaginationContainer>
  );
};

export default LinkPagination;
