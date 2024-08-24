export interface FileData {
  id: number;
  url: string;
}

export interface PostBoardFilesResponse {
  code: string;
  message: string;
  data: FileData[];
  isSuccess: boolean;
}

export interface PostBoardPostsResponse {
  code: string;
  message: string;
  data: {
    post_id: number;
    boardCode: string;
  };
  isSuccess: boolean;
}
