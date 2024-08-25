import { postBoardPosts, postBoardPostsProps } from '@/apis/postBoardPosts';
import { PostBoardPostsResponse } from '@/types/apis/post';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function usePostBoardPosts(): UseMutationResult<PostBoardPostsResponse, AxiosError, postBoardPostsProps> {
  return useMutation<PostBoardPostsResponse, AxiosError, postBoardPostsProps>({
    mutationFn: postBoardPosts,
  });
}
