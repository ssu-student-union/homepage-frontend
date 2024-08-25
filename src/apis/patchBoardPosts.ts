import { AxiosResponse } from 'axios';
import { clientAuth } from './client';

export interface patchBoardPostProps {
  boardCode: string;
  postId: number;
  posts: {
    title: string;
    content: string;
    categoryCode: string;
    thumbnailImage: string | null;
  };
}

export interface patchBoardPostsResponse {
  code: string;
  message: string;
  data: number;
  isSuccess: boolean;
}

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
