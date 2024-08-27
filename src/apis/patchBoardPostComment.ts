import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import { postReplyCommentList } from '@/types/getBoardPostComment';

export interface patchBoardPostCommentProps {
  postId: number;
  commentId: number;
  content: string;
}

export interface patchBoardPostCommentResponse {
  code: string;
  message: string;
  isSuccess: boolean;
}

export const patchBoardPostComment = async ({
  postId,
  commentId,
  content,
}: patchBoardPostCommentProps): Promise<patchBoardPostCommentResponse> => {
  const response: AxiosResponse<patchBoardPostCommentResponse> = await clientAuth<patchBoardPostCommentResponse>({
    url: `/board/posts/${postId}/comments/${commentId}`,
    method: 'patch',
    data: {
      content: content,
    },
  });
  return response.data;
};

export interface patchBoardPostReplyCommentResponse {
  code: string;
  message: string;
  data: postReplyCommentList;
  isSuccess: boolean;
}

export interface patchBoardPostReplyCommentProps {
  commentId: number;
  replycommentId: number;
  content: string;
}

export const patchBoardPostReplyComment = async ({
  commentId,
  replycommentId,
  content,
}: patchBoardPostReplyCommentProps): Promise<patchBoardPostReplyCommentResponse> => {
  const response: AxiosResponse<patchBoardPostReplyCommentResponse> =
    await clientAuth<patchBoardPostReplyCommentResponse>({
      url: `/board/posts/comments/${commentId}/reply-comments/${replycommentId}`,
      method: 'patch',
      data: {
        content: content,
      },
    });
  return response.data;
};
