import { delBoardPosts } from '@/apis/delBoardPosts';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export function useDelBoardPosts(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError,
  { boardCode: string; postId: number }
> {
  return useMutation({
    mutationFn: ({ boardCode, postId }) => delBoardPosts(boardCode, postId),
  });
}
