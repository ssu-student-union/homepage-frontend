import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery.ts';
import { useStuMutation } from '@/hooks/new/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UseCreatePostOptions<TPostRequest> {
  boardCode: string;
  mutationOptions?: Omit<
    UseMutationOptions<CreatePostResponse, AxiosError | ApiError, CreatePostVariables<TPostRequest>>,
    'mutationFn'
  >;
}

interface CreatePostVariables<T> {
  post: T;
}

export interface CreatePostResponse {
  post_id: number;
  boardCode: string;
}

export function useCreatePost<TPostRequest>({ boardCode, mutationOptions }: UseCreatePostOptions<TPostRequest>) {
  return useStuMutation(async ({ post }) => {
    return (
      await clientAuth<ApiResponse<CreatePostResponse>>({
        method: 'post',
        url: `/board/${boardCode}/posts`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}
