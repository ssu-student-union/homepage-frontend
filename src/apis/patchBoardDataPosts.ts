import { AxiosResponse } from 'axios';
import { clientAuth } from './client';
import { patchBoardDataPostProps, patchBoardDataPostsResponse } from '@/types/patchBoardDataPosts';

export const patchBoardDataPosts = async ({
  fileCategory,
  postId,
  posts,
}: patchBoardDataPostProps): Promise<patchBoardDataPostsResponse> => {
  const response: AxiosResponse<patchBoardDataPostsResponse> = await clientAuth({
    url: `/board/data/${fileCategory}/posts/${postId}`,
    method: 'patch',
    data: {
      title: posts.title,
      content: posts.content,
      categoryCode: posts.categoryCode,
      isNotice: posts.isNotice,
      thumbnailImage: posts.thumbnailImage,
      postFileList: posts.postFileList,
    },
  });
  return response.data;
};
