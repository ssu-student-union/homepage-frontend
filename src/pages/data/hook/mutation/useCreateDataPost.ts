import { clientAuth } from '@/apis/client';
import { CreatePostResponse, UseCreatePostOptions } from '@/hooks/new/mutations/useCreatePost';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiResponse } from '@/hooks/new/useStuQuery';
import { DataPostEditRequest } from '../../schema';

type UseCreateDataPostOptions = Omit<UseCreatePostOptions<DataPostEditRequest>, 'boardCode'> & { fileCategory: string };

// 자료집 POST
export function useCreateDataPost({ mutationOptions }: UseCreateDataPostOptions) {
  return useStuMutation(async ({ post }) => {
    return (
      await clientAuth<ApiResponse<CreatePostResponse>>({
        method: 'post',
        url: `/board/data/post`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}
