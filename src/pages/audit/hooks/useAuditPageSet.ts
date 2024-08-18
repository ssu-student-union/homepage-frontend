import { useState, useEffect } from 'react';
import { Size } from '@/components/PostCard/const/state';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { calculateTotalPages, getCurrentPosts } from '../utils/paginationUtils';
import { useNavigate } from 'react-router-dom';

export function useAuditPageSet(posts: any[]) {
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [size, setSize] = useState<Size>(Size.default);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 720) {
        setItemsPerPage(5);
        setSize(Size.small);
      } else if (width < 1440) {
        setItemsPerPage(5);
        setSize(Size.mediumSmall);
      } else if (width < 1920) {
        setItemsPerPage(6);
        setSize(Size.audit);
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
    navigate('/audit/edit');
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
