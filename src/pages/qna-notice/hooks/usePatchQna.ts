// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QnaPostForm } from '../edit/types';
import { usePatchPost, UsePatchPostOptions } from '@/hooks/new/mutations/usePatchPost';

export function usePatchQna({
  mutationOptions,
}: Omit<UsePatchPostOptions<Omit<QnaPostForm, 'qnaMemberCode' | 'qnaMajorCode'>>, 'boardCode'> = {}) {
  return usePatchPost({ boardCode: '질의응답게시판', mutationOptions });
}
