import { qnaMajorCodesData } from './collegesData';

export type QnaMemberCode =
  | ''
  | '총학생회'
  | '인문대학'
  | '자연과학대학'
  | '법과대학'
  | '사회과학대학'
  | '경제통상대학'
  | '경영대학'
  | '공과대학'
  | 'IT대학'
  | '융합특성화자유전공학부'
  | '베어드학부대학';

export type QnaMajorCode = (typeof qnaMajorCodesData)[number];

export interface QnaPost {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: '답변대기' | '답변완료';
  department: string;
  college: string;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface QnaListData {
  postListResDto: QnaPost[];
  allowedAuthorities: string[];
  deniedAuthorities: string[];
  pageInfo: PageInfo;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
  isSuccess: boolean;
}

export interface UserInfoForQna {
  name: string;
  nickname: string | null;
  account: string | null;
  studentId: string | null;
  majorCode: QnaMajorCode | null;
  memberCode: QnaMemberCode;
  isUnion: boolean;
}

export interface LoginCheckObject {
  loginState: boolean;
}
