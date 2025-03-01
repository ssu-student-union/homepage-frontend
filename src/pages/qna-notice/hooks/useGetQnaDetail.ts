import { QnaDetail } from '../[id]/types';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';

export function useGetQnaDetail({ postId, queryOptions }: Omit<GetPostOptions<QnaDetail>, 'boardCode' | 'zodSchema'>) {
  return useGetPost({
    boardCode: '질의응답게시판',
    postId,
    queryOptions,
  });
}
