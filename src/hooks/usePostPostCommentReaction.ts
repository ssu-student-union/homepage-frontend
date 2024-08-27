import { postPostCommentReaction, postPostReplyCommentReaction } from '@/apis/postPostCommentReaction';
import {
  postPostCommentReactionProps,
  postPostCommentReactionResponse,
  postPostReplyCommentReactionProps,
  postPostReplyCommentReactionResponse,
} from '@/types/postPostReaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostPostCommentReaction = () => {
  // const queryClient = useQueryClient();
  return useMutation<postPostCommentReactionResponse, Error, postPostCommentReactionProps>({
    mutationFn: (postReaction: postPostCommentReactionProps) => postPostCommentReaction(postReaction),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    // },
  });
};

export const usePostPostReplyCommentReaction = () => {
  const queryClient = useQueryClient();
  return useMutation<postPostReplyCommentReactionResponse, Error, postPostReplyCommentReactionProps>({
    mutationFn: (postReaction: postPostReplyCommentReactionProps) => postPostReplyCommentReaction(postReaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};
