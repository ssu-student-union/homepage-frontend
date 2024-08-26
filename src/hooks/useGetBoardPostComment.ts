import { getBoardPostComment } from '@/apis/getBoardPostComment';
import { getBoardPostCommentProps, getBoardPostCommentResponse } from '@/types/getBoardPostComment';
import { useQuery } from '@tanstack/react-query';

export const useGetBoardPostComment = ({ postId, type, userId }: getBoardPostCommentProps) => {
  return useQuery<getBoardPostCommentResponse>({
    queryKey: ['getPostComment', type, postId, userId],
    queryFn: () => getBoardPostComment({ postId, type, userId }),
  });
};
