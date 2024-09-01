import { clientAuth } from './client';

export interface delBoardPostCommentResponse {
  code: string;
  message: string;
  isSuccess: boolean;
}

export const delBoardPostComment = async (commentId: number): Promise<delBoardPostCommentResponse> => {
  const response = await clientAuth<delBoardPostCommentResponse>({
    url: `/board/posts/comments/${commentId}`,
    method: 'delete',
  });
  return response.data;
};

export const delBoardPostReplyComment = async (replycommentId: number): Promise<delBoardPostCommentResponse> => {
  const response = await clientAuth<delBoardPostCommentResponse>({
    url: `/board/posts/comments/reply-comments/${replycommentId}`,
    method: 'delete',
  });
  return response.data;
};
