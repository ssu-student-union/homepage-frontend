import { clientAuth } from './client';
import { AxiosResponse } from 'axios';
import { DataFileCategoriesResponse, GetDataFileCategoriesParams } from '@/types/getDataFileCategories';

export const getDataFileCategories = async ({
  majorCategory,
  middleCategory,
  subCategory,
}: GetDataFileCategoriesParams = {}): Promise<DataFileCategoriesResponse> => {
  const response: AxiosResponse<DataFileCategoriesResponse> = await clientAuth({
    url: `/data/file-categories`,
    method: 'get',
    params: {
      majorCategory,
      middleCategory,
      subCategory,
    },
  });

  return response.data;
};
