import { client } from './client';

interface Filters {
  [key: string]: any;
}

interface GetBoardDataPostsParams {
  filters?: Filters;
  page: number;
}

export const getBoardDataPosts = ({ filters = {}, page }: GetBoardDataPostsParams) => {
  const accessToken = localStorage.getItem('accessToken');
  const headers: { [key: string]: any } = {
    'Content-Type': 'multipart/form-data',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return client.get('/board/data/posts', {
    headers,
    params: {
      take: 5,
      page: page - 1,
      ...filters,
    },
  });
};
