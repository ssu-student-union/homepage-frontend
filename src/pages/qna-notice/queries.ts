import { useQuery } from '@tanstack/react-query';
import { useGetUserInfoForQna } from './hooks/useGetUserInfoQna';
import { QnaListData, UserInfoForQna } from './types';
import { QnaPostParams, useGetQnaList } from './hooks/useGetQnaList';
import { QnaDetailData } from './[id]/types';
import { useGetQnaDetail } from './hooks/useGetQnaDetail';

export function qnaPostsList(params: QnaPostParams) {
  return useQuery<QnaListData, Error>({
    queryKey: ['qnaPostsList', params],
    queryFn: async () => {
      const response = await useGetQnaList(params);
      return response.data;
    },
  });
}

export function qnaPostDetail(postId?: number) {
  return useQuery<QnaDetailData, Error>({
    queryKey: ['qnaPostDetail', postId],
    queryFn: async () => {
      if (!postId) {
        throw new Error('postId is required');
      }
      const response = await useGetQnaDetail(postId);
      return response.data;
    },
    enabled: !!postId,
  });
}

export function qnaPostsUserInfo(isLogin: boolean) {
  return useQuery<UserInfoForQna, Error>({
    queryKey: ['qnaUser'],
    queryFn: async () => {
      const response = await useGetUserInfoForQna();
      return response.data;
    },
    enabled: isLogin,
  });
}
