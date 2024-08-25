import { client } from './client';

export const getBoardDataPosts = (filters = {}) => {
  return client.get('/board/data/posts', {
    params: {
      take: 100000,
      ...filters, // Spread filters into the params
    },
  });
};
