import { postBoardComment, postBoardPostCommentResponse, postBoardPostCommentProps } from '@/apis/postBoardComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostBoardPostComment = () => {
  const queryClient = useQueryClient();
  return useMutation<postBoardPostCommentResponse, Error, postBoardPostCommentProps>({
    mutationFn: (postComment: postBoardPostCommentProps) => postBoardComment(postComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};
