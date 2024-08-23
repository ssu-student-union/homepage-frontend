import { PostListDtoResponse } from '@/components/PostTextPetition/types';
import { client } from './client';

// 청원 게시판 게시물 전체 리스트 불러오는 api

export interface PetitionNoticePostDataResponse {
  code: string;
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

export const PetitionNoticePopularContentApi = async () => {
  try {
    const response = await client.get<PetitionNoticePostDataResponse>('/boards/청원게시판/posts/top-liked', {
      params: {
        page: 0,
        take: 4,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 청원 게시판 글쓰기 이미지 변환 api

export interface ImageToUrlDataType {
  id: number;
  url: string;
}

export interface PetitionNoticeEditResponse {
  code: string;
  message: number;
  data: ImageToUrlDataType[];
  isSuccess: boolean;
}

export const PetitionNoticeEditApi = (images: FormData) => {
  const accessToken = localStorage.getItem('accessToken');
  return client.post<PetitionNoticeEditResponse>('/board/청원게시판/files', images, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
