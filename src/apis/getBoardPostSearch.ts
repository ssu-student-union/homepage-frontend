import { getBoardPostsProps } from '@/types/apis/get';
import { client } from './client';

export const getBoardPostSearch = async ({
  page,
  take,
  groupCode,
  memberCode,
  category,
  boardCode,
  q,
}: getBoardPostsProps) => {
  try {
    const response = await client.get(`/board/${boardCode}/posts/search`, {
      params: {
        page: page,
        take: take,
        groupCode: groupCode,
        memberCode: memberCode,
        category: category,
        q: q,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
