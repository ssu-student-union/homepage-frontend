import { MainNoticesType } from '.';

interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface GetNoticeBoardPostsResponse {
  code: number;
  message: string;
  data: {
    postListResDto: NoticePostListResDto[];
    pageInfo: PageInfo;
  };
  isSuccess: true;
}

interface NoticePostListResDto {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: MainNoticesType;
  thumbNail: string;
  status: statusType;
  author: MainNoticesType;
  isEmergency: boolean;
}

export interface GetLostArticlePostsResponse {
  code: string;
  message: string;
  data: {
    postListResDto: LostArticlePostListResDto[];
    pageInfo: PageInfo;
  };
  isSuccess: boolean;
}

interface LostArticlePostListResDto {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: string;
  lostId: number;
  thumbNail: string;
}