import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import { postPostReactionProps, postPostReactionResponse } from '@/types/postPostReaction';

export const postPostReaction = async ({
  postId,
  userId,
  reaction,
}: postPostReactionProps): Promise<postPostReactionResponse> => {
  const response: AxiosResponse<postPostReactionResponse> = await clientAuth({
    url: `/toggle/posts/${postId}`,
    method: 'post',
    params: {
      userId: userId,
    },
    data: {
      reaction: reaction,
    },
  });
  return response.data;
};
