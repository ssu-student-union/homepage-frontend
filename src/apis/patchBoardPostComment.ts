import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import { postReplyCommentList } from '@/types/getBoardPostComment';

export interface patchBoardPostCommentProps {
  commentId: number;
  content: string;
}

export interface patchBoardPostCommentResponse {
  code: string;
  message: string;
  isSuccess: boolean;
}

export const patchBoardPostComment = async ({
  commentId,
  content,
}: patchBoardPostCommentProps): Promise<patchBoardPostCommentResponse> => {
  const response: AxiosResponse<patchBoardPostCommentResponse> = await clientAuth<patchBoardPostCommentResponse>({
    url: `/board/posts/comments/${commentId}`,
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
  replycommentId: number;
  content: string;
}

export const patchBoardPostReplyComment = async ({
  replycommentId,
  content,
}: patchBoardPostReplyCommentProps): Promise<patchBoardPostReplyCommentResponse> => {
  const response: AxiosResponse<patchBoardPostReplyCommentResponse> =
    await clientAuth<patchBoardPostReplyCommentResponse>({
      url: `/board/posts/comments/reply-comments/${replycommentId}`,
      method: 'patch',
      data: {
        content: content,
      },
    });
  return response.data;
};
