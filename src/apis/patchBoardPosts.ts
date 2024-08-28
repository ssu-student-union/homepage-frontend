import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

// PATCH:/board/{boardCode}/posts/{postId} 요청

export interface patchBoardPostsProps {
  boardCode: string;
  postId: number;
  data: {
    title: string;
    content: string;
    categoryCode: string;
    thumbNailImage?: string;
  };
}

export async function patchBoardPosts({ boardCode, postId, data }: patchBoardPostsProps): Promise<PatchBoardPostsResp> {
  const resp: AxiosResponse<PatchBoardPostsResp> = await clientAuth<PatchBoardPostsResp>({
    method: 'patch',
    url: `/board/${boardCode}/posts/${postId}`,
    data: data,
  });
  return resp.data;
}
