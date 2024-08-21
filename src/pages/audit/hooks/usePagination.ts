import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useResponseHook } from './useResponseHook';
import { useFetchPost } from './useFetchPost';

export function usePagination(boardCode: string, accessToken: string) {
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const { itemsPerPage, size } = useResponseHook();
  const { posts, totalPages, loading } = useFetchPost(boardCode, accessToken, currentPage, itemsPerPage);
  const navigate = useNavigate();

  const [currentPosts, setCurrentPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      setCurrentPosts(posts);
    }
  }, [posts, loading]);

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
    loading,
  };
}
