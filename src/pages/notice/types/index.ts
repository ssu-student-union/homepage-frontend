import { PageInforamtion } from '@/types/getPetitionTopLiked';

export interface NoticeContentResponse {
  author: string;
  category: string;
  content: string;
  date: string;
  isEmergency: boolean;
  postId: number;
  status: string;
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
