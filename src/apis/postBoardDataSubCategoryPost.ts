import { client } from '@/apis/client';

export const postBoardDataSubCategoryPosts = (fileCategory: string, resBody: object, accessToken: string) => {
  return client.post(`/board/data/${fileCategory}/post`, resBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
