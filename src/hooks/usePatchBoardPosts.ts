import { patchBoardPosts, patchBoardPostsProps } from '@/apis/patchBoardPosts';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function usePatchBoardPosts(): UseMutationResult<PatchBoardPostsResp, AxiosError, patchBoardPostsProps> {
  return useMutation<PatchBoardPostsResp, AxiosError, patchBoardPostsProps>({
    mutationFn: patchBoardPosts,
  });
}
