export interface PostListDtoResponse {
  postId: number;
  title: string;
  content: string | null;
  date: string;
  likeCount: number;
  onGoingStatus: '진행중' | '접수완료' | '답변완료' | '종료됨';
  category?: string;
}

export interface GetPetitionPostsTopLikedProps {
  page: number;
  take: number;
}

export interface PetitionPostsTopLikedResponse {
  code: string;
  message: string;
  data: {
    postListResDto: PostListDtoResponse[];
    allowedAuthorities?: string[];
    deniedAuthorities?: string[];
    pageInfo: PageInforamtion;
  };
  isSuccess: boolean;
}

export interface PageInforamtion {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
