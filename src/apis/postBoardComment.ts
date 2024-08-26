import { AxiosResponse } from 'axios';
import { clientAuth } from './client';

export interface postBoardPostCommentProps {
  postId: number;
  content: string;
}

export interface postBoardPostCommentResponse {
  code: string;
  message: string;
  data: {
    id: number;
    authorName: string;
    studentId: string;
    content: string;
    commentType: string;
    createdAt: string;
    lastEditedAt: string;
    likeCount: number;
    isAuthor: boolean;
    postReplyComments: string[];
  };
  isSuccess: boolean;
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
