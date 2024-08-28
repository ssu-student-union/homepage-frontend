import { delBoardFiles } from '@/apis/delBoardFiles';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export function useDelBoardFiles(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError,
  { boardCode: string; fileUrls: string[] }
> {
  return useMutation({
    mutationFn: ({ boardCode, fileUrls }) => delBoardFiles(boardCode, fileUrls),
  });
}
