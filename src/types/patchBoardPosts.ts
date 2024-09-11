export interface patchBoardPostProps {
  boardCode: string;
  postId: number;
  posts: {
    title: string;
    content: string;
    categoryCode?: string;
    thumbnailImage: string | null;
    postFileList: number[];
  };
}

export interface patchBoardPostsResponse {
  code: string;
  message: string;
  data: number;
  isSuccess: boolean;
}
