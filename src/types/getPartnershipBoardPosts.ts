import { PageInfo } from './apis/get';

export interface GetPartnershipBoardPostsResponse {
  code: number;
  message: string;
  data: {
    postListResDto: PartnershipPostListResDto[];
    pageInfo: PageInfo;
  };
  isSuccess: true;
}

export interface PartnershipPostListResDto {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: string;
  thumbNail: string;
  status: statusType;
}
