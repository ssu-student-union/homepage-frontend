import { getBoardPostsProps } from '@/types/apis/get';
import { client } from './client';

export const getBoardDataPostSearch = async ({
  page = 0,
  take,
  groupCode,
  memberCode,
  category,
  q,
}: getBoardPostsProps) => {
  try {
    const response = await client.get(`/board/data/posts/search`, {
      params: {
        page: page - 1,
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
