import { getBoardPostsProps } from '@/types/apis/get';
import { clientAuth } from './client';
import { PetitionPostsTopLikedResponse } from '@/types/getPetitionTopLiked';
import { AxiosResponse } from 'axios';

export const getBoardPostSearch = async ({
  page,
  take,
  groupCode,
  memberCode,
  category,
  boardCode,
  q,
}: getBoardPostsProps): Promise<PetitionPostsTopLikedResponse> => {
  const response: AxiosResponse<PetitionPostsTopLikedResponse> = await clientAuth({
    url: `/board/${boardCode}/posts/search`,
    method: 'get',
    params: {
      page: page,
      take: take,
      groupCode: groupCode,
      memberCode: memberCode,
      category: category,
      q: q,
    },
  });
  console.log(response);

  return response.data;
};
