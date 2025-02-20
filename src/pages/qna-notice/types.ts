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

export type QnaMajorCode =
  | ''
  | '총학생회'
  | '인문대학'
  | '기독교학과'
  | '국어국문학과'
  | '영어영문학과'
  | '독어독문학과'
  | '불어불문학과'
  | '중어중문학과'
  | '일어일문학과'
  | '철학과'
  | '사학과'
  | '영화예술전공'
  | '문예창작전공'
  | '스포츠학부'
  | '자연과학대학'
  | '수학과'
  | '물리학과'
  | '화학과'
  | '정보통계보험수리학과'
  | '의생명시스템학부'
  | '법과대학'
  | '법학과'
  | '국제법무학과'
  | '사회과학대학'
  | '사회복지학부'
  | '행정학부'
  | '정치외교학과'
  | '정보사회학과'
  | '언론홍보학과'
  | '평생교육학과'
  | '경제통상대학'
  | '경제학과'
  | '글로벌통상학과'
  | '금융경제학과'
  | '국제무역학과'
  | '경영대학'
  | '경영학부'
  | '벤처중소기업학과'
  | '회계학과'
  | '금융학부'
  | '벤처경영학과'
  | '혁신경영학과'
  | '복지경영학과'
  | '회계세무학과'
  | '공과대학'
  | '화학공학과'
  | '산업정보시스템공학과'
  | '전기공학부'
  | '기계공학부'
  | '건축학부'
  | '신소재공학과'
  | 'IT대학'
  | '컴퓨터학부'
  | '정보보호학과'
  | '전자정보공학부'
  | '글로벌미디어학부'
  | '소프트웨어학부'
  | 'AI융합학부'
  | '미디어경영학과'
  | '융합특성화자유전공학부'
  | '자유전공학부(인문)'
  | '자유전공학부(자연)';

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
