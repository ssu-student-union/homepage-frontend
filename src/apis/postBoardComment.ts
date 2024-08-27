import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import { postCommentList } from '@/types/getBoardPostComment';

export interface postBoardPostCommentProps {
  postId: number;
  content: string;
}

export interface postBoardPostReplyCommentProps {
  commentId: number;
  content: string;
}

export interface postBoardPostCommentResponse {
  code: string;
  message: string;
  data: postCommentList[];
  isSuccess: boolean;
}

export interface postBoardPostReplyCommentResponse {
  code: string;
  message: string;
  isSuccess: string;
}

export const postBoardComment = async ({
  postId,
  content,
}: postBoardPostCommentProps): Promise<postBoardPostCommentResponse> => {
  const response: AxiosResponse<postBoardPostCommentResponse> = await clientAuth<postBoardPostCommentResponse>({
    url: `/board/posts/${postId}/comments`,
    method: 'post',
    data: {
      content: content,
    },
  });
  return response.data;
};

export const postBoardReplyComment = async ({
  commentId,
  content,
}: postBoardPostReplyCommentProps): Promise<postBoardPostReplyCommentResponse> => {
  const response: AxiosResponse<postBoardPostReplyCommentResponse> =
    await clientAuth<postBoardPostReplyCommentResponse>({
      url: `/board/posts/comments/${commentId}/reply-comments`,
      method: 'post',
      data: {
        content: content,
      },
    });
  return response.data;
};
