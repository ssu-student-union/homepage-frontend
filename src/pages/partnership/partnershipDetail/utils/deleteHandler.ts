import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface DeleteHandlerProps {
  boardCode: string;
  postId: number;
  fileurl: string[];
  mutation: UseMutationResult<
    AxiosResponse<void>,
    AxiosError,
    { boardCode: string; postId: number; fileurl: string[] }
  >;
}

export const deleteHandler = ({ boardCode, postId, fileurl, mutation }: DeleteHandlerProps) => {
  mutation.mutate(
    { boardCode, postId, fileurl },
    {
      onError: () => {
        alert('삭제 권한이 없습니다.');
      },
    }
  );
};
