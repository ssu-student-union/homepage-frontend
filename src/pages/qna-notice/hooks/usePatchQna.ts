// 작성페이지 및 수정 페이지 만든 후에 작업 하자

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';
import { QnaPostForm } from '../edit/types';
import { useNavigate } from 'react-router-dom';

interface PatchQnaDetailRequest {
  postId: number;
  formData: Omit<QnaPostForm, 'qnaMemberCode' | 'qnaMajorCode'>;
}

export function usePatchQna() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<number, AxiosError, PatchQnaDetailRequest>({
    mutationFn: async ({ postId, formData }: PatchQnaDetailRequest) => {
      const response = await clientAuth<ApiResponse<number>>({
        method: 'patch',
        url: `/board/질의응답게시판/posts/${postId}`,
        data: formData,
      });

      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['qnaPostsList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['qnaPostDetail', data],
      });
      navigate(`/qna/${data}`);
    },
  });
}
