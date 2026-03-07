export interface GetDataFileCategoriesParams {
  majorCategory?: string;
  middleCategory?: string;
  subCategory?: string;
}

export interface DataFileCategoriesResponse {
  code: string;
  message: string;
  data: string[];
  isSuccess: boolean;
}
