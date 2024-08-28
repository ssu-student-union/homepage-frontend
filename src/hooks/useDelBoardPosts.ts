import { delBoardPosts } from '@/apis/delBoardPosts';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export function useDelBoardPosts(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError,
  { boardCode: string; postId: number }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardCode, postId }) => delBoardPosts(boardCode, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPetitionTopLiked'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts'] });
    },
  });
}
