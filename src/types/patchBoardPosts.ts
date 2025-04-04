export interface patchBoardPostProps {
  boardCode: string;
  postId: number;
  posts: {
    title: string;
    content: string;
    categoryCode?: string | null;
    isNotice?: boolean | null;
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
