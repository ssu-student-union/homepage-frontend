import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

// POST:/board/{boardCode}/posts 요청

export interface postBoardPostsProps {
  boardCode: string;
  post: {
    title: string;
    content: string;
    categoryCode?: string;
    thumbNailImage?: string | null;
    isNotice?: boolean;
    postFileList?: number[];
  };
}

export interface PostBoardPostsResponse {
  code: string;
  message: string;
  data: {
    post_id: number;
    boardCode: string;
  };
  isSuccess: boolean;
}

export async function postBoardPosts({ boardCode, post }: postBoardPostsProps): Promise<PostBoardPostsResponse> {
  try {
    const response: AxiosResponse<PostBoardPostsResponse> = await clientAuth<PostBoardPostsResponse>({
      method: 'post',
      url: `/board/${boardCode}/posts`,
      data: post,
    });
    console.log('API 요청 성공:', response.data);
    return response.data;
  } catch (e) {
    console.log('API 요청 실패:', e);
    throw e;
  }
}
