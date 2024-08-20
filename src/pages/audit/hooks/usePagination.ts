import { useNavigate } from 'react-router-dom';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { getCurrentPosts } from '../utils/paginationUtils';
import { useResponseHook } from './useResponseHook';
import { useFetchPost } from './useFetchPost';

export function usePagination(boardCode: string, groupCode: string, memberCode: string, accessToken: string) {
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const { itemsPerPage, size } = useResponseHook();
  const { posts, totalPages } = useFetchPost(boardCode, groupCode, memberCode, accessToken, currentPage, itemsPerPage);
  const navigate = useNavigate();

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
