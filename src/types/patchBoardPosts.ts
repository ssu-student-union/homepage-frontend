export interface patchBoardPostProps {
  boardCode: string;
  postId: number;
  posts: {
    postFileList: number;
    title: string;
    content: string;
    categoryCode: string;
    thumbnailImage: string | null;
    postFileList: number[];
  };
}

export interface patchBoardPostsResponse {
  status: number;
  code: string;
  message: string;
  data: number;
  isSuccess: boolean;
}
