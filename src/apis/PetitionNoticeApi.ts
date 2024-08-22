import { client } from './client';

interface PetitionNoticeProps {
  page: number;
  take: number;
}

interface PostListDtoResponse {
  postId: number;
  title: string;
  content: string;
  date: string;
  likeCount: number;
  status: string;
}

interface PetitionNoticePostDataResponse {
  code: number;
  message: string;
  data: {
    postListResDto: PostListDtoResponse[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

export const PetitionNoticeListApi = ({ page, take }: PetitionNoticeProps) => {
  return client.get<PetitionNoticePostDataResponse>('/board/청원게시판/posts', {
    params: {
      page: page,
      take: take,
    },
  });
};
