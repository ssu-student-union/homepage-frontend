/* Temporary Mock API queries -- delete after API implementation */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  ApiResponse,
  HumanRightsCommentsResponse,
  HumanRightsPostResponse,
  HumanRightsPostsResponse,
} from '@/pages/human-rights/schema.ts';

async function waitSecondAndReturn<T>(ms: number, data: T): Promise<ApiResponse<T>> {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
  return {
    code: '200',
    message: 'Success',
    data: data,
    isSuccess: true,
  };
}

const mockPosts: HumanRightsPostsResponse = {
  postListResDto: [
    { postId: 0, title: '테스트', date: '2023/10/02', category: '접수대기', reportName: '테스트', author: false },
    { postId: 1, title: '테스트', date: '2023/10/02', category: '접수완료', reportName: '테스트', author: false },
    { postId: 2, title: '테스트', date: '2023/10/02', category: '접수대기', reportName: '테스트', author: false },
    { postId: 3, title: '테스트', date: '2023/10/02', category: '접수완료', reportName: '테스트', author: false },
    { postId: 4, title: '테스트', date: '2023/10/02', category: '접수대기', reportName: '테스트', author: false },
    { postId: 5, title: '테스트', date: '2023/10/02', category: '접수완료', reportName: '테스트', author: false },
  ],
  pageInfo: {
    pageNum: 1,
    pageSize: 2,
    totalElements: 6,
    totalPages: 3,
  },
  allowedAuthorities: [],
  deniedAuthorities: [],
};

const mockPost: HumanRightsPostResponse = {
  postId: 1,
  categoryName: '접수완료',
  authorName: '신고자',
  allowedAuthorities: ['READ', 'EDIT', 'DELETE'],
  title: '인권신고글제목입니다인권신고글제목입니다',
  rightsDetailList: [
    {
      name: '구효민',
      studentId: '20211561',
      major: '글로벌미디어학부',
      phoneNumber: '010-1234-5678',
      personType: 'REPORTER',
    },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'VICTIM' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'VICTIM' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'VICTIM' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'VICTIM' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'ATTACKER' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'ATTACKER' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'ATTACKER' },
    { name: '김이름', studentId: '20050905', major: '글로벌미디어학부', personType: 'ATTACKER' },
  ],
  content: `# 어쩌구어쩌구
  Lorem ipsum... 그 다음이 생각이 안나요 ㅠㅠ
  > 인용 테스트
  `,
  createdAt: '2024-10-12T02:03:18.596Z',
  lastEditedAt: null,
  isAuthor: false,
  fileResponseList: [
    {
      postFileId: 1,
      fileName: 'image1.png',
      fileUrl: 'https://picsum.photos/200/300',
      fileType: 'images' as 'images' | 'files',
    },
    {
      postFileId: 2,
      fileName: 'image2.png',
      fileUrl: 'https://picsum.photos/200/300',
      fileType: 'images' as 'images' | 'files',
    },
    {
      postFileId: 3,
      fileName: 'image3_file.png',
      fileUrl: 'https://picsum.photos/200/300',
      fileType: 'files' as 'images' | 'files',
    },
    {
      postFileId: 4,
      fileName: 'image4_file.png',
      fileUrl: 'https://picsum.photos/200/300',
      fileType: 'files' as 'images' | 'files',
    },
  ],
  officialCommentList: [],
};

const mockComments: HumanRightsCommentsResponse = {
  postComments: [
    {
      id: 0,
      authorName: '오피셜',
      studentId: '20211561',
      content: '오피셜입니다.',
      commentType: 'OFFICIAL',
      createdAt: '2024-10-12T02:03:18.596Z',
      lastEditedAt: null,
      isDeleted: false,
      isAuthor: true,
    },
    {
      id: 1,
      authorName: '일반',
      studentId: '20211561',
      content: '일반입니다.',
      commentType: 'GENERAL',
      createdAt: '2024-10-12T02:03:18.596Z',
      lastEditedAt: null,
      isDeleted: false,
      isAuthor: true,
    },
    {
      id: 2,
      authorName: '삭제',
      studentId: '20211561',
      content: '삭제되었나요?',
      commentType: 'GENERAL',
      createdAt: '2024-10-12T02:03:18.596Z',
      lastEditedAt: null,
      isDeleted: true,
      isAuthor: true,
    },
    {
      id: 3,
      authorName: '다른주인',
      studentId: '20211561',
      content: '저어는 아무 권한이 없습니다.',
      commentType: 'GENERAL',
      createdAt: '2024-10-12T02:03:18.596Z',
      lastEditedAt: null,
      isDeleted: false,
      isAuthor: false,
    },
  ],
  allowedAuthorities: ['COMMENT', 'DELETE_COMMENT'],
  total: 0,
};

export function useMockGetHumanRightsPosts({
  page,
  take = 50,
  category,
  delay = 1500,
}: {
  page?: number;
  take?: number;
  category?: string;
  delay?: number;
}): UseQueryResult<ApiResponse<HumanRightsPostsResponse>, AxiosError> {
  const queryKey = ['get-board-boardCode-posts', 'human_rights_report', category ?? 'ALL', take, page ?? 0];

  return useQuery<ApiResponse<HumanRightsPostsResponse>, AxiosError>({
    queryKey,
    queryFn: async () => await waitSecondAndReturn(delay, mockPosts),
  });
}

export function useMockGetHumanRightsBoardDetail({
  postId,
  delay = 1500,
}: {
  postId: number;
  delay?: number;
}): UseQueryResult<ApiResponse<HumanRightsPostResponse>, AxiosError> {
  const queryKey = ['get-board-boardCode-posts-postId', 'human_rights_report', postId];

  return useQuery<ApiResponse<HumanRightsPostResponse>, AxiosError>({
    queryKey,
    queryFn: async () => await waitSecondAndReturn(delay, mockPost),
  });
}

export function useMockGetHumanRightsPostComments({
  postId,
  delay = 1500,
}: {
  postId: number;
  delay?: number;
}): UseQueryResult<ApiResponse<HumanRightsCommentsResponse>, AxiosError> {
  const queryKey = ['get-board-boardCode-posts-postId-comments', 'human_rights_report', postId];

  return useQuery<ApiResponse<HumanRightsCommentsResponse>, AxiosError>({
    queryKey,
    queryFn: async () => await waitSecondAndReturn(delay, mockComments),
  });
}
