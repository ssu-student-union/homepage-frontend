export interface GetDataFileCategoriesParams {
  majorCategory?: string;
  middleCategory?: string;
  subCategory?: string;
}

export interface DataFileCategoriesData {
  fileCategoryList: string[];
}

export interface DataFileCategoriesResponse {
  code: string;
  message: string;
  data: DataFileCategoriesData;
  isSuccess: boolean;
}
