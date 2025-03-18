import { clientAuth } from '@/apis/client';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiResponse } from '@/hooks/new/useStuQuery';
import { DataPostEditRequest } from '../../schema';
import { UsePatchPostOptions } from '@/hooks/new/mutations/usePatchPost';

type UsePatchDataPostOptions = Omit<UsePatchPostOptions<DataPostEditRequest>, 'boardCode'> & { fileCategory: string };

export function usePatchDataPost({ fileCategory, mutationOptions }: UsePatchDataPostOptions) {
  const parsedCategory = fileCategory.replace(/ /g, '_').replace(/·/g, '');
  return useStuMutation(async ({ id, post }) => {
    return (
      await clientAuth<ApiResponse<number>>({
        method: 'patch',
        url: `/board/data/${parsedCategory}/posts/${id}`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}
