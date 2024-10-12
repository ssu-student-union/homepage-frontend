/* Temporary Mock API queries -- delete after API implementation */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FileResponse } from '@/types/apis/get';

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
  isSuccess: boolean;
}

export enum PostAcl {
  READ = 'read',
  WRITE = 'write',
  EDIT = 'edit',
  DELETE = 'delete',
  COMMENT = 'comment',
  DELETE_COMMENT = 'delete_comment',
  REACTION = 'reaction',
}

export interface MockHumanRightsPerson {
  name: string;
  studentId: string;
  department: string;
}

export interface MockHumanRightsReporter extends MockHumanRightsPerson {
  contact: string;
}

interface MockHumanRightsPost {
  postId: number;
  categoryName: string;
  authorName: string;

  title: string;
  metadata: {
    reporter: MockHumanRightsReporter;
    victims: MockHumanRightsPerson[];
    invaders: MockHumanRightsPerson[];
  };
  content: string;
  createdAt: string;
  lastEditedAt: string | null;
  allowedAuthorities: PostAcl[];
  isAuthor: boolean;
  studentId: string;
  fileResponseList: FileResponse[];
}

interface MockHumanRightsComments {
  postComments: MockHumanRightsComment[];
  allowedAuthorities: PostAcl[];
  total: number;
}

interface MockHumanRightsComment {
  id: number;
  authorName: string;
  studentId: string;
  content: string;
  createdAt: string;
  commentType: 'GENERAL' | 'OFFICIAL';
  lastEditedAt: string | null;
  isDeleted: boolean;
  isAuthor: boolean;
}

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

const mockPost = {
  postId: 1,
  categoryName: '접수완료',
  authorName: '신고자',
  allowedAuthorities: [PostAcl.READ, PostAcl.EDIT, PostAcl.DELETE],
  title: '인권신고글제목입니다인권신고글제목입니다',
  metadata: {
    reporter: {
      name: '구효민',
      studentId: '20211561',
      department: '글로벌미디어학부',
      contact: '010-1234-5678',
    },
    victims: [
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
    ],
    invaders: [
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
      { name: '김이름', studentId: '20050905', department: '글로벌미디어학부' },
    ],
  },
  content: '어쩌구어쩌구',
  createdAt: '2024-10-12T02:03:18.596Z',
  lastEditedAt: null,
  isAuthor: false,
  studentId: '20050905',
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

const mockComments: MockHumanRightsComments = {
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
  allowedAuthorities: [PostAcl.COMMENT, PostAcl.DELETE_COMMENT],
  total: 0,
};

export function useMockGetHumanRightsBoardDetail({
  postId,
}: {
  postId: number;
}): UseQueryResult<ApiResponse<MockHumanRightsPost>, AxiosError> {
  const queryKey = ['get-board-boardCode-posts-postId', 'human_rights_report', postId];

  return useQuery<ApiResponse<MockHumanRightsPost>, AxiosError>({
    queryKey,
    queryFn: async () => await waitSecondAndReturn(1500, mockPost),
  });
}

export function useMockGetHumanRightsPostComments({
  postId,
}: {
  postId: number;
}): UseQueryResult<ApiResponse<MockHumanRightsComments>, AxiosError> {
  const queryKey = ['get-board-boardCode-posts-postId-comments', 'human_rights_report', postId];

  return useQuery<ApiResponse<MockHumanRightsComments>, AxiosError>({
    queryKey,
    queryFn: async () => await waitSecondAndReturn(1500, mockComments),
  });
}
