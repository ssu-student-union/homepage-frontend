import { FileResponse } from '@/schemas/post';

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
  category: string;
  authorName: string;
  allowedAuthorities: string[];
  title: string;
  content: string;
  createdAt: string;
  lastEditedAt: string | null;
  isAuthor: boolean;
  isLiked: boolean;
  studentId: string;
  likeCount: number;
  status: string;
  fileResponseList: FileResponse[];
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
}

export interface getBoardPostsProps {
  page?: number;
  take: number;
  groupCode?: string;
  memberCode?: string;
  category?: string;
  boardCode?: string;
  q?: string;
}

export interface getUserProfileResponse {
  data: {
    name: string;
    nickname?: string;
    account?: string;
    studentId?: string;
    majorCode?: string;
    memberCode: string;
    isUnion: boolean;
  };
}

export interface patchUserProfileRequest {
  nickname: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface patchUserProfileResponse {
  name: string;
  nickname: string;
  account: string;
  studentId: string | null;
  majorCode: string | null;
  memberCode: string;
  isUnion: boolean;
}
