import { clientAuth } from '@/apis/client';
import { CreatePostResponse } from '@/hooks/new/mutations/useCreatePost';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 자료집 POST
interface CreatePostVariables<T> {
  post: T;
}

interface UseCreatePostOptions<TPostRequest> {
  fileCategory: string;
  mutationOptions?: Omit<
    UseMutationOptions<CreatePostResponse, AxiosError | ApiError, CreatePostVariables<TPostRequest>>,
    'mutationFn'
  >;
}

export function useCreateDataPost<DataPostEditRequest>({
  fileCategory,
  mutationOptions,
}: UseCreatePostOptions<DataPostEditRequest>) {
  return useStuMutation(async ({ post }) => {
    return (
      await clientAuth<ApiResponse<CreatePostResponse>>({
        method: 'post',
        url: `/board/data/${fileCategory}/post`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}
