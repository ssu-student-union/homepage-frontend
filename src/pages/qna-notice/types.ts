import { qnaMajorCodesData, qnaMemberCodeData } from './collegesData';

export type QnaMemberCode = (typeof qnaMemberCodeData)[number];
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
  memberCode: QnaMemberCode | '';
  isUnion: boolean;
}

export interface LoginCheckObject {
  loginState: boolean;
}
