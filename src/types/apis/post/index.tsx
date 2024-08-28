export interface File {
  id: number;
  url: string;
  originalFileName: string;
}

export interface PostBoardFilesResponse {
  code: string;
  message: string;
  data: {
    postFiles: File[];
    thumbnailUrl: string;
  };
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
