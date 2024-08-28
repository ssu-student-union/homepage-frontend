import {
  postBoardComment,
  postBoardPostCommentResponse,
  postBoardPostCommentProps,
  postBoardPostReplyCommentResponse,
  postBoardPostReplyCommentProps,
  postBoardReplyComment,
} from '@/apis/postBoardComment';
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

export const usePostBoardPostReplyComment = () => {
  const queryClient = useQueryClient();
  return useMutation<postBoardPostReplyCommentResponse, Error, postBoardPostReplyCommentProps>({
    mutationFn: (postReplyComment: postBoardPostReplyCommentProps) => postBoardReplyComment(postReplyComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};
