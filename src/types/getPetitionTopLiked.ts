import { PostListDtoResponse } from '@/components/PostTextPetition/types';

export interface GetPetitionPostsTopLikedProps {
  page: number;
  take: number;
}

export interface PetitionPostsTopLikedResponse {
  code: string;
  message: string;
  data: {
    postListResDto: PostListDtoResponse[];
    pageInfo: PageInforamtion;
  };
  isSuccess: boolean;
}

interface PageInforamtion {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
