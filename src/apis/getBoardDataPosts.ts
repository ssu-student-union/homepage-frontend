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
  return client.get('/board/data/posts', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // FormData를 보내는 경우 Content-Type은 자동으로 설정됨
    },
    params: {
      take: 5,
      page: page - 1,
      ...filters,
    },
  });
};
