import {
  patchBoardPostComment,
  patchBoardPostCommentProps,
  patchBoardPostCommentResponse,
  patchBoardPostReplyComment,
  patchBoardPostReplyCommentProps,
  patchBoardPostReplyCommentResponse,
} from '@/apis/patchBoardPostComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchBoardPostsComment = () => {
  const queryClient = useQueryClient();
  return useMutation<patchBoardPostCommentResponse, Error, patchBoardPostCommentProps>({
    mutationFn: (patchData: patchBoardPostCommentProps) => patchBoardPostComment(patchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};

export const usePatchBoardPostsReplyComment = () => {
  const queryClient = useQueryClient();
  return useMutation<patchBoardPostReplyCommentResponse, Error, patchBoardPostReplyCommentProps>({
    mutationFn: (patchData: patchBoardPostReplyCommentProps) => patchBoardPostReplyComment(patchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostComment'] });
    },
  });
};
