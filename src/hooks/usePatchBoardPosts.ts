import { patchBoardPosts } from '@/apis/patchBoardPosts';
import { patchBoardPostProps, patchBoardPostsResponse } from '@/types/patchBoardPosts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchBoardPosts = () => {
  const queryClient = useQueryClient();
  return useMutation<patchBoardPostsResponse, Error, patchBoardPostProps>({
    mutationFn: (patchData: patchBoardPostProps) => patchBoardPosts(patchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPetitionTopLiked'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts'] });
    },
  });
};
