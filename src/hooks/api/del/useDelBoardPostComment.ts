import { delBoardPostComment, delBoardPostCommentResponse, delBoardPostReplyComment } from '@/apis/delBoardPostComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDelBoardPostComment = () => {
  const queryClient = useQueryClient();
  return useMutation<delBoardPostCommentResponse, Error, number>({
    mutationFn: (commentId: number) => delBoardPostComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};

export const useDelBoardPostReplyComment = () => {
  const queryClient = useQueryClient();
  return useMutation<delBoardPostCommentResponse, Error, number>({
    mutationFn: (replycommentId: number) => delBoardPostReplyComment(replycommentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};
