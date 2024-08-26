export interface Post {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: string | null;
  thumbNail: string;
  status: string;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface GetBoardPostsResp {
  postListResDto: Post[];
  pageInfo: PageInfo;
}

export interface PostDetailResDto {
  title: string;
  createdAt: string;
  content: string;
  imageList: string[];
}

export interface GetBoardDetailResponse {
  data: {
    postDetailResDto: PostDetailResDto;
  };
}

export interface getBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number;
}

export interface getBoardPostsProps {
  page?: number;
  take: number;
  groupCode?: string;
  memberCode?: string;
  category?: string | null;
  boardCode: string;
}
