import { getBoardPostCommentProps, getBoardPostCommentResponse } from '@/types/getBoardPostComment';
import { clientAuth } from './client';

export const getBoardPostComment = async ({
  postId,
  type,
}: getBoardPostCommentProps): Promise<getBoardPostCommentResponse> => {
  const response = await clientAuth<getBoardPostCommentResponse>({
    url: `/board/posts/${postId}/comments`,
    method: 'get',
    params: {
      type: type,
    },
  });
  // console.log(response.data);
  return response.data;
};
