import { patchBoardPosts } from '@/apis/patchBoardPosts';
import { patchBoardPostProps, patchBoardPostsResponse } from '@/types/patchBoardPosts';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';

export const usePatchBoardPosts = (): UseMutationResult<patchBoardPostsResponse, Error, patchBoardPostProps> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patchData: patchBoardPostProps): Promise<patchBoardPostsResponse> => {
      return await patchBoardPosts(patchData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPetitionTopLiked'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts'] });
      queryClient.refetchQueries({ queryKey: ['get-board-boardCode-posts-postId'] });
    },
  });
};
