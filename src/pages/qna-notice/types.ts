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
