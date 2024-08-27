import { client } from './client';

interface Filters {
  [key: string]: any;
}

interface GetBoardDataPostsParams {
  filters?: Filters;
  page: number;
}

export const getBoardDataPosts = ({ filters = {}, page }: GetBoardDataPostsParams) => {
  return client.get('/board/data/posts', {
    params: {
      take: 5,
      page: page - 1,
      ...filters,
    },
  });
};
