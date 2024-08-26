import { getBoardPostsProps } from '@/types/apis/get';
import { client } from './client';

export const getBoardPosts = async ({ page, take, groupCode, memberCode, category, boardCode }: getBoardPostsProps) => {
  try {
    const response = await client.get(`/board/${boardCode}/posts`, {
      params: {
        page: page,
        take: take,
        groupCode: groupCode,
        memberCode: memberCode,
        category: category,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
