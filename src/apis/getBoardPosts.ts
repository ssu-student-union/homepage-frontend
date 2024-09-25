import { GetBoardDetailResponse, getBoardPostsProps } from '@/types/apis/get';
import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

export const getBoardPosts = async ({
  page,
  take,
  groupCode,
  memberCode,
  category,
  boardCode,
}: getBoardPostsProps): Promise<GetBoardDetailResponse> => {
  const response: AxiosResponse<GetBoardDetailResponse> = await clientAuth({
    url: `/board/${boardCode}/posts`,
    method: 'get',
    params: {
      page: page,
      take: take,
      groupCode: groupCode,
      memberCode: memberCode,
      category: category,
    },
  });
  return response.data;
};
