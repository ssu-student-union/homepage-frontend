import { useState, useEffect } from 'react';
import { Size } from '@/components/PostCard/const/state';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { calculateTotalPages, getCurrentPosts } from '../utils/paginationUtils';

export function useAuditPageSet(posts: any[]) {
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [size, setSize] = useState<Size>(Size.default);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 390) {
        setItemsPerPage(5);
        setSize(Size.small);
      } else if (width <= 1080) {
        setItemsPerPage(5);
        setSize(Size.medium);
      } else if (width <= 1440) {
        setItemsPerPage(6);
        setSize(Size.medium);
      } else {
        setItemsPerPage(9);
        setSize(Size.default);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalPages = calculateTotalPages(posts.length, itemsPerPage);
  const currentPosts = getCurrentPosts(posts, currentPage, itemsPerPage);

  const handleWriteClick = () => {
    alert('글 작성 페이지로 이동합니다.');
  };

  return {
    currentPage,
    handlePageChange,
    size,
    currentPosts,
    totalPages,
    handleWriteClick,
  };
}
