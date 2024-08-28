import { PostBoardPostsResponse } from '@/types/apis/post';
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

export async function postBoardPosts({ boardCode, post }: postBoardPostsProps): Promise<PostBoardPostsResponse> {
  const resp: AxiosResponse<PostBoardPostsResponse> = await clientAuth<PostBoardPostsResponse>({
    method: 'post',
    url: `/board/${boardCode}/posts`,
    data: post,
  });
  return resp.data;
}
