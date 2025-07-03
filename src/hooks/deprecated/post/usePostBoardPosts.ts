import { postBoardPosts, postBoardPostsProps } from '@/apis/postBoardPosts';
import { PostBoardPostsResponse } from '@/types/apis/post';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * @deprecated new/mutations/usePatchPost로 대체
 */
export function usePostBoardPosts(): UseMutationResult<PostBoardPostsResponse, AxiosError, postBoardPostsProps> {
  const queryClient = useQueryClient();
  return useMutation<PostBoardPostsResponse, AxiosError, postBoardPostsProps>({
    mutationFn: postBoardPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPetitionTopLiked'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts-search'] });
    },
  });
}
