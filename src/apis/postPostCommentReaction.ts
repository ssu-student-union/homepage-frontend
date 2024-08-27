import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import {
  postPostCommentReactionProps,
  postPostCommentReactionResponse,
  postPostReplyCommentReactionProps,
} from '@/types/postPostReaction';

export const postPostCommentReaction = async ({
  commentId,
  reaction,
}: postPostCommentReactionProps): Promise<postPostCommentReactionResponse> => {
  const response: AxiosResponse<postPostCommentReactionResponse> = await clientAuth({
    url: `/toggle/posts/comments/${commentId}`,
    method: 'post',
    data: {
      reaction: reaction,
    },
  });
  return response.data;
};

export const postPostReplyCommentReaction = async ({
  replycommentId,
  reaction,
}: postPostReplyCommentReactionProps): Promise<postPostCommentReactionResponse> => {
  const response: AxiosResponse<postPostCommentReactionResponse> = await clientAuth({
    url: `/toggle/posts/comments/reply-comments/${replycommentId}`,
    method: 'post',
    data: {
      reaction: reaction,
    },
  });
  return response.data;
};
