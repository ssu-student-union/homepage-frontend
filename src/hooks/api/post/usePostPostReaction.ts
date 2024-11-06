import { postPostReaction } from '@/apis/postPostReaction';
import { postPostReactionProps, postPostReactionResponse } from '@/types/postPostReaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostPostReaction = () => {
  const queryClient = useQueryClient();
  return useMutation<postPostReactionResponse, Error, postPostReactionProps>({
    mutationFn: (postReaction: postPostReactionProps) => postPostReaction(postReaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPetitionTopLiked'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts'] });
      queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts-postId'] });
    },
  });
};
