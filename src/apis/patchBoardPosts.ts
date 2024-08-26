import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import { patchBoardPostProps, patchBoardPostsResponse } from '@/types/patchBoardPosts';

export const patchBoardPosts = async ({
  boardCode,
  postId,
  posts,
}: patchBoardPostProps): Promise<patchBoardPostsResponse> => {
  const response: AxiosResponse<patchBoardPostsResponse> = await clientAuth({
    url: `/board/${boardCode}/posts/${postId}`,
    method: 'patch',
    data: {
      title: posts.title,
      content: posts.content,
      categoryCode: posts.categoryCode,
      thumbnailImage: posts.thumbnailImage,
    },
  });
  return response.data;
};
