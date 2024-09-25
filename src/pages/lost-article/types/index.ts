import { PageInforamtion } from '@/types/getPetitionTopLiked';

export interface LostArticleContentResponse {
  category: string;
  content: string;
  date: string;
  lostId: number;
  postId: number;
  thumbNail: string;
  title: string;
  status?: string;
}

export interface LostArticleResponse {
  code: string;
  message: string;
  data: {
    postListResDto: LostArticleContentResponse[];
    allowedAuthorities?: string[];
    deniedAuthorities?: string[];
    pageInfo: PageInforamtion;
  };
  isSuccess: boolean;
}
