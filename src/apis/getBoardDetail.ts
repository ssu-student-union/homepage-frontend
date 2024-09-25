import { getBoardDetailProps, GetBoardDetailResponse } from '@/types/apis/get';
import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

export const getBoardDetail = async ({ boardCode, postId }: getBoardDetailProps): Promise<GetBoardDetailResponse> => {
  const response: AxiosResponse<GetBoardDetailResponse> = await clientAuth({
    url: `/board/${boardCode}/posts/${postId}`,
    method: 'get',
  });
  return response.data;
};
