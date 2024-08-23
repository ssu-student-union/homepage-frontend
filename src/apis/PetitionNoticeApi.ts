import { PostListDtoResponse } from '@/components/PostTextPetition/types';
import { client, clientAuth } from './client';

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

export const PetitionNoticeListApi = async (page: number, take: number) => {
  try {
    const response = await client.get<PetitionNoticePostDataResponse>('/board/청원게시판/posts', {
      params: {
        page: page,
        take: take,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 청원 게시판 인기 청원 4개 가져오는 api

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
  return clientAuth<PetitionNoticeEditResponse>({
    url: '/board/청원게시판/files',
    method: 'post',
    data: {
      files: images,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
