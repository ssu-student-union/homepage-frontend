import { client } from './client';

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

export const PetitionNoticeListApi = (page: number, take: number) => {
  return client.get<PetitionNoticePostDataResponse>('/board/청원게시판/posts', {
    params: {
      page: page,
      take: take,
    },
  });
};

interface ImageToUrlDataType {
  id: number;
  url: string;
}

interface PetitionNoticeEditResponse {
  code: number;
  message: number;
  data: ImageToUrlDataType[];
  isSuccess: boolean;
}

export const PetitionNoticeEditApi = (file: FormData, type: string) => {
  return client.post<PetitionNoticeEditResponse>('/board/청원게시판/files', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer eyJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzI0MzMwNDA2LCJleHAiOjE3MjQzNDEyMDZ9.vnQs0aIzZpYvsb4_NZWG-P9BfIqRyFZy6P45E47MfRA',
    },
    params: {
      type: type,
    },
  });
};
