import { delBoardPosts } from '@/apis/delBoardPosts';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

/**
 * @deprecated new/mutations/useDeltePost로 대체
 */
export function useDelBoardPosts(): UseMutationResult<
  AxiosResponse,
  AxiosError,
  { boardCode: string; postId: number; fileurl: string[] }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardCode, postId, fileurl }) => delBoardPosts(boardCode, postId, fileurl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPetitionTopLiked'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts-search'] });
    },
  });
}
