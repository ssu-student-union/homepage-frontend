import { getBoardPostComment } from '@/apis/getBoardPostComment';
import { getBoardPostCommentProps, getBoardPostCommentResponse } from '@/types/getBoardPostComment';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetBoardPostComment = ({
  postId,
  type,
}: getBoardPostCommentProps): UseQueryResult<getBoardPostCommentResponse, AxiosError> => {
  return useQuery<getBoardPostCommentResponse, AxiosError>({
    queryKey: ['getPostComment', type, postId],
    queryFn: () => getBoardPostComment({ postId, type }),
    staleTime: 0,
  });
};
