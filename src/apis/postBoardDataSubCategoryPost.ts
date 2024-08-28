import { client } from '@/apis/client';

export const postBoardDataSubCategoryPosts = (
  fileCategory: string,
  fileType: string,
  resBody: object,
  accessToken: string
) => {
  return client.post(`/board/data/${fileCategory}/${fileType}/post`, resBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
