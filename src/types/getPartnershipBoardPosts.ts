import { PageInfo } from './apis/get';

export interface GetPartnershipBoardPostsResponse {
  code: number;
  message: string;
  data: {
    postListResDto: PartnershipPostListResDto[];
    pageInfo: PageInfo;
    allowedAuthorities: string[];
    deniedAuthorities: string[];
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
