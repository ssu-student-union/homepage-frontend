export interface FileImageUrl {
  id: number;
  url: string;
}

export interface PostBoardImagesResponse {
  code: string;
  message: number;
  data: {
    thumbnailUrl: string;
    postFiles: FileImageUrl[];
  };
  isSuccess: boolean;
}
