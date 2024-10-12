/* Temporary Mock API queries -- delete after API implementation */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FileResponse } from '@/types/apis/get';

enum PostAcl {
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

async function waitSecondAndReturn<T>(ms: number, data: T) {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
  return data;
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
      fileName: 'test',
      fileUrl: 'https://picsum.photos/200/300',
      fileType: 'images' as 'images' | 'files',
    },
  ],
  officialCommentList: [],
};

export function useMockGetHumanRightsBoardDetail({
  postId,
}: {
  postId: number;
}): UseQueryResult<MockHumanRightsPost, AxiosError> {
  const queryKey = ['get-board-boardCode-posts-postId', 'human_rights_report', postId];

  return useQuery<MockHumanRightsPost, AxiosError>({
    queryKey,
    queryFn: async () => await waitSecondAndReturn(1500, mockPost),
  });
}
