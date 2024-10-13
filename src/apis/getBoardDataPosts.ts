import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

interface Filters {
  [key: string]: any;
}

interface GetBoardDataPostsParams {
  filters?: Filters;
  page: number;
}

export const getBoardDataPosts = async ({
  filters = {},
  page,
}: GetBoardDataPostsParams): Promise<GetBoardDataPostsParams> => {
  const response: AxiosResponse<GetBoardDataPostsParams> = await clientAuth({
    url: `/board/data/posts`,
    method: 'get',
    params: {
      take: 5,
      page: page - 1,
      ...filters,
    },
  });
  return response.data;
};
