export interface patchBoardDataPostProps {
  fileCategory: string;
  postId: number;
  posts: {
    title: string;
    content: string;
    categoryCode?: string;
    isNotice?: boolean;
    thumbnailImage: string | null;
    postFileList: number[];
  };
}

export interface patchBoardDataPostsResponse {
  status: number;
  code: string;
  message: string;
  data: number;
  isSuccess: boolean;
}
