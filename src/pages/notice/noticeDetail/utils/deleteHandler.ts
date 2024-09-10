import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface DeleteHandlerProps {
  boardCode: string;
  postId: number;
  fileurl: string[];
  mutPost: UseMutationResult<AxiosResponse<any>, AxiosError, { boardCode: string; postId: number; fileurl: string[] }>;
}

export const deleteHandler = ({ boardCode, postId, fileurl, mutPost }: DeleteHandlerProps) => {
  mutPost.mutate(
    { boardCode, postId, fileurl },
    {
      onError: () => {
        alert('삭제 권한이 없습니다.');
      },
    }
  );
};
