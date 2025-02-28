import { statusType } from '@/components/PostCard/type';
import { MainNoticesType } from './boardSelector';

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

export interface BoardPost {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: string | null;
  thumbNail: string | null;
  status: statusType;
  author: string;
  isEmergency: boolean;
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
