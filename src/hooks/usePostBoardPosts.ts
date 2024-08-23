import { postBoardPosts, postBoardPostsProps, PostBoardPostsResponse } from '@/apis/postBoardPosts';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function usePostBoardPosts(): UseMutationResult<PostBoardPostsResponse, AxiosError, postBoardPostsProps> {
  return useMutation<PostBoardPostsResponse, AxiosError, postBoardPostsProps>({
    mutationFn: postBoardPosts,
    onSuccess: (data) => {
      console.log('게시물 작성 성공:', data);
    },
    onError: (error) => {
      console.error('게시물 작성 실패:', error);
    },
  });
}
