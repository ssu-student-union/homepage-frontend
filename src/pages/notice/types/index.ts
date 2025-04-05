import { PageInforamtion } from '@/types/getPetitionTopLiked';

export interface NoticeContentResponse {
  author: string;
  category: string;
  content: string;
  date: string;
  isEmergency: boolean;
  postId: number;
  status: '긴급공지' | '새로운' | '일반';
  thumbNail: string;
  title: string;
}

export interface NoticeResponse {
  code: string;
  message: string;
  data: {
    postListResDto: NoticeContentResponse[];
    allowedAuthorities?: string[];
    deniedAuthorities?: string[];
    pageInfo: PageInforamtion;
  };
  isSuccess: boolean;
}
