import { MainNoticesType } from '.';

export interface GetNoticeBoardPostsResponse {
  code: number;
  message: string;
  data: {
    postListResDto: NoticePostListResDto[];
    pageInfo: NoticePageInfo;
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

interface NoticePageInfo {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
