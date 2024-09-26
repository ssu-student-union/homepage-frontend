import { PageInforamtion } from '@/types/getPetitionTopLiked';

export interface AuditContentResponse {
  category: string;
  content: string;
  date: string;
  postId: number;
  status: string;
  thumbNail: string;
  title: string;
}

export interface AuditResponse {
  code: string;
  message: string;
  data: {
    postListResDto: AuditContentResponse[];
    allowedAuthorities?: string[];
    deniedAuthorities?: string[];
    pageInfo: PageInforamtion;
  };
  isSuccess: boolean;
}
