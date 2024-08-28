export interface Post {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: string;
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

export interface OfficialCommentList {
  authorName: string;
  commentType: string;
  content: string;
  createdAt: string;
  id: number;
  isAuthor: boolean;
  lastEditedAt: string;
}

export interface PostDetailResDto {
  postId: number;
  categoryName: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  lastEditedAt: string;
  isAuthor: boolean;
  studentId: string;
  likeCount: number;
  imageList: string[];
  officialCommentList: OfficialCommentList[];
}

export interface GetBoardDetailResponse {
  data: {
    postDetailResDto: PostDetailResDto;
  };
}

export interface getBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number | null;
}

export interface getBoardPostsProps {
  page?: number;
  take: number;
  groupCode?: string;
  memberCode?: string;
  category?: string;
  boardCode?: string;
}

export interface getBoardPostsProps {
  page?: number;
  take: number;
  groupCode?: string;
  memberCode?: string;
  category?: string;
  boardCode: string;
}
