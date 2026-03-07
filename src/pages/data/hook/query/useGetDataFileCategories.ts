import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery';
import { DataFileCategoriesData } from '@/types/getDataFileCategories';
import { AxiosError } from 'axios';

export function useGetDataFileCategories({
  majorCategory,
  middleCategory,
}: {
  majorCategory: string;
  middleCategory: string;
}) {
  return useStuQuery<DataFileCategoriesData, string[], AxiosError | ApiError>(
    ['dataFileCategories', majorCategory, middleCategory],
    {
      url: '/data/file-categories',
      method: 'get',
      params: { majorCategory, middleCategory },
    },
    {
      enabled: !!majorCategory && !!middleCategory,
      select: (data) => data.fileCategoryList,
    }
  );
}
